import axios, { AxiosResponse } from "axios";
import config from "../lib/config";
import E2EE from "../lib/e2ee/e2ee";

import Logger from "../lib/logger";
import KTBankSchema from "../schema/KTBank.schema";
import { ame2eea } from "../lib/ame2eea";
import {
  AccountDetails,
  PreAuthMobileResponse,
  KTBankSchemaTypes,
  MakeRequest,
} from "../@types/KTBank";
import {
  IOTPGenerateResponse,
  IPreAuth,
  IAuth,
  IAuthResponse,
  IOTPGenerate,
  IOTPGrantResponse,
  IOTPVerify,
  IOTPGrant,
  IPINGrantResponse,
} from "../@types/KTBank.login";
import { MFAParams } from "../@types/KTBank.mfa";
import {
  IRecipient,
  PayeeFeeResponse,
  IPUTRequest,
  IPUTResponse,
} from "../@types/KTBank.payee";
import {
  MobileDeviceType,
  ProfilePreferenceType,
} from "../@types/KTBank.profile";
import {
  IBulk,
  IBulkItem,
  BulkDetail,
  BulkDetailExtended,
  BulkItemDetails,
  PayeeLookupType,
} from "../@types/KTBank.transfer";
import { KTBankError } from "./KTBankError";
export class KTBank {
  private companyId: string;
  private username: string;
  private password: string;
  private token: string = "";
  private transactionToken: string = "";
  private loginTokenUuid: string = "";
  private accountRefId: string | null = null;
  private expireTokenDateTime: Date | null = null;
  private currentBulkId: string | null = null;
  private deviceId: string | null = null;
  isDefaultEnc: boolean = false;
  constructor(
    companyId?: string,
    username?: string,
    password?: string,
    isDefault: boolean = false
  ) {
    this.companyId = companyId || "";
    this.username = username || "";
    this.password = password || "";
    this.isDefaultEnc = isDefault;
  }

  async start(): Promise<any> {
    let account = await this.checkAccount();
    return account;
  }
  async login(): Promise<
    | (IOTPGenerateResponse & {
        transactionToken: string;
        token: string;
        queryPath: string;
      })
    | undefined
  > {
    const { access_token } = await this.makeRequest(
      {
        url: "/prelogin/grant?grant_type=client_credentials",
        method: "POST",
        queryPath: "Auth:PreAuth",
      },
      true
    );

    this.token = access_token;
    this.token = access_token;
    const keyGen: IPreAuth = await this.makeRequest({
      url: "/auth/password/key/generation",
      method: "POST",
      queryPath: "Auth:KeyGenerate",
    });
    const authPayload: IAuth = {
      companyId: this.companyId,
      e2eeSid: keyGen.e2eeSid,
      encryptedPassword: new E2EE(
        keyGen.pubKey,
        keyGen.e2eeSid,
        keyGen.serverRandom,
        this.password
      ).encryptRSAOAEPSHA512(),
      userId: this.username,
    };

    const loginResponse: IAuthResponse = await this.makeRequest({
      url: "/auth/password/verification",
      method: "POST",
      data: authPayload,
      queryPath: "Auth:PasswordVerification",
    });
    const createOTP: IOTPGenerateResponse = await this.generateOTP(
      loginResponse.transactionToken
    );
    this.transactionToken = loginResponse.transactionToken;
    this.loginTokenUuid = createOTP.tokenUuid;
    let insertData: Partial<KTBankSchemaTypes> = {
      companyId: this.companyId,
      username: this.username,
      password: this.password,
      access_token: this.token,
      expiry_session: new Date(new Date().getTime() + 3600 * 1000),
      isMobile: false,
      pre_auth_web: {
        transactionToken: loginResponse.transactionToken,
        tokenUuid: createOTP.tokenUuid,
        expires: new Date(new Date().getTime() + 180 * 1000),
      },
    };

    let findData = await KTBankSchema.findOne({
      $and: [
        { username: insertData.username },
        { companyId: insertData.companyId },
      ],
    }).exec();

    let account;
    if (!findData) {
      account = await new KTBankSchema(insertData).save();
    } else {
      account = await findData.updateOne(insertData).exec();
    }
    Logger("Auth:CreateOtp", account);
    return {
      ...createOTP,
      transactionToken: this.transactionToken,
      token: this.token,
      queryPath: "KBANK:Auth:Login",
    };
  }
  async verifyOtp(
    otp: string
  ): Promise<IOTPGrantResponse & { expireDate: Date; queryPath: string }> {
    const account = await KTBankSchema.findOne()
      .or([
        {
          account_ref_id: this.accountRefId,
        },
        {
          $and: [{ username: this.username }, { companyId: this.username }],
        },
      ])
      .exec();
    this.loginTokenUuid = account?.pre_auth_web.tokenUuid!;
    this.transactionToken = account?.pre_auth_web.transactionToken!;
    this.token = account?.access_token!;

    // throw new KTBankError("Avoid SMS Hook", "AUTH:StartOtp", 400);
    const otpSubmit = await this.makeRequest({
      url: "/auth/otp/verification",
      method: "POST",
      data: {
        otp,
        tokenUuid: this.loginTokenUuid,
        transactionToken: this.transactionToken,
      } as IOTPVerify,
      queryPath: "Auth:OTPVerify",
    });

    const submitPasswordGrant: IOTPGrantResponse = await this.makeRequest({
      url: "/password/grant?grant_type=client_credentials",
      method: "POST",
      data: {
        transactionToken: this.transactionToken,
      } as IOTPGrant,
      queryPath: "Auth:OTP:Grant",
    });
    this.token = submitPasswordGrant.access_token;
    this.expireTokenDateTime = new Date(
      new Date().getTime() + submitPasswordGrant.expires_in * 1000
    );
    const eligibleAccounts: AccountDetails[] = await this.getEligibleAccounts();
    if (!(eligibleAccounts.length > 0)) {
      throw new KTBankError(
        "Not Have Eligible Account for TRANSFER_BULK",
        "Auth:GetEligibleAccount()",
        400
      );
    }

    console.log(
      "eligibleAccounts[0].accountRefId",
      eligibleAccounts[0].accountRefId
    );

    this.accountRefId = eligibleAccounts[0].accountRefId;
    const accountNo = await this.getAccountNumber();
    let accountNewData: Partial<KTBankSchemaTypes> = {
      companyId: this.companyId,
      username: this.username,
      password: this.password,
      account_no: String(accountNo),
      account_name: eligibleAccounts[0].accountName,
      account_ref_id: eligibleAccounts[0].accountRefId,
      account_balance: String(eligibleAccounts[0].availableBalance),
      last_update: new Date(),
      access_token: this.token,
      expiry_session: this.expireTokenDateTime,
    };

    let accountSchema = await KTBankSchema.findOne({})
      .or([
        {
          account_ref_id: this.accountRefId,
        },
        {
          $and: [{ username: this.username }, { companyId: this.username }],
        },
      ])
      .exec();

    if (!accountSchema) {
      await new KTBankSchema(accountNewData).save();
    } else {
      accountSchema.updateOne(accountNewData).exec();
    }

    this.accountRefId = eligibleAccounts[0].accountRefId;
    return {
      ...submitPasswordGrant,
      expireDate: this.expireTokenDateTime,
      queryPath: "KBANK:Auth:VerifyOTP",
    };
  }
  //Get Eligible Account for BULK_TRANSFER
  private async getEligibleAccounts() {
    const accountsList: AccountDetails[] = await this.makeRequest({
      url: "/account/source-of-funds?service=TRANSFER",
      method: "GET",
      queryPath: "Account:GetEligibleAccounts",
    }).then((res) => res.accounts);
    return accountsList;
  }
  async getAccountNumber(): Promise<string | number> {
    Logger("GetAccountNumber:Start", {});
    const tmpBulkId = await this.createBulk();
    Logger("GetAccountNumber:CreateBulk", tmpBulkId);
    const bulkDetail = await this.getTransferDetail(tmpBulkId);
    Logger("GetAccountNumber:GetBulkDetail", bulkDetail);
    Logger(
      "GetAccountNumber:DeleteBulk",
      await this.deleteBulkDraft(tmpBulkId)
    );
    return bulkDetail.accountNo;
  }
  async setManualToken(
    cid: string,
    uid: string,
    pw: string,
    token: string
  ): Promise<// { token: string; accountRefId: string }
  any> {
    const account = await KTBankSchema.findOne({
      $and: [{ companyId: cid }, { username: uid }],
    }).exec();

    console.log(account);
    this.companyId = cid;
    this.username = uid;
    this.password = pw;
    await account?.updateOne({ access_token: token });
    console.log("account?.account_ref_id!", account?.account_ref_id!);
    this.accountRefId = account?.account_ref_id!;
    this.token = token;
    console.log("this.accountRefId", this.accountRefId);
    const eligibleAccounts: AccountDetails[] = await this.getEligibleAccounts();
    if (!(eligibleAccounts.length > 0)) {
      throw new KTBankError("Not Have Eligible Account for TRANSFER_BULK");
    }

    let insert: Partial<KTBankSchemaTypes> = {
      companyId: this.companyId,
      username: this.username,
      password: this.password,
      account_no: String(await this.getAccountNumber()),
      account_name: eligibleAccounts[0].accountName,
      account_ref_id: eligibleAccounts[0].accountRefId,
      account_balance: String(eligibleAccounts[0].availableBalance),
      last_update: new Date(),
      access_token: this.token,
      expiry_session: this.expireTokenDateTime!,
    };
    if (!account) {
      await new KTBankSchema(insert).save();
    } else {
      await account!.updateOne(insert).exec();
    }
    this.accountRefId = eligibleAccounts[0].accountRefId;
    return { token: this.token, accountRefId: this.accountRefId };
  }
  async createBulk(): Promise<string> {
    let todayParsed = new Date().toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const { bulkOrderId } = await this.makeRequest({
      url: "/bulk/bulk",
      method: "POST",
      data: {
        payerAccountRefId: this.accountRefId,
        processingType: "ONLINE",
        service: "TRANSFER",
        valueDate: todayParsed,
        isRecurring: false,
      } as IBulk,
      queryPath: "TRANSFER:CreateBulk",
    });
    return bulkOrderId;
  }
  async submitBulk(recipientList: IRecipient[]) {
    const bulkOrderId = await this.createBulk();
    Logger(
      "TRANSFER:SubmitBulk:Completed",
      bulkOrderId + `Token: ${this.token}`
    );
    this.currentBulkId = bulkOrderId;
    let bulkItems: IBulkItem[] = [];
    for (let r of recipientList) {
      const { nameTh, id, isFound } = await this.verifyPayee(r);
      if (!isFound) continue;
      bulkItems.push({
        payeeNameEn: r.Recipient_bank_name,
        bankCode: r.Recipient_bank,
        payeeNo: r.Recipient_bank_acc,
        payeeNickname: "",
        payeeNameTh: nameTh,
        isSaveAsBeneficiary: false,
        valid: isFound,
        bulkItemId: "",
      } as IBulkItem);
    }
    bulkItems = await this.addBulkItem(bulkItems);
    Logger("TRANSFER:AddBulkItem:Completed", bulkItems);
    for (let [i, r] of bulkItems.entries()) {
      const transferFee: PayeeFeeResponse = await this.getTransferFee(
        Number(recipientList[i].Transfer_amount),
        r.bulkItemId!
      );
      Logger(`TRANSFER:getTransferFee:${r.payeeNo}`, {});
      let putDetails: IPUTRequest = {
        note: "",
        regionRetailFee: transferFee.regionRetailFee!,
        isWithholdingTaxEnabled: false,
        botRetailFeeAmt: transferFee.botRetailFeeAmt!,
        comCompleteAmt: transferFee.comCompleteAmt!,
        transactionFee: transferFee.totalPayerFee!,
        botInCompleteFeeAmt: transferFee.botInCompleteFeeAmt!,
        notificationFee: transferFee.notificationFee!,
        feeCode: transferFee.payerFeeCode!,
        notOnUsRetailFeeAmt: transferFee.notOnUsRetailFeeAmt!,
        comInCompleteAmt: transferFee.comCompleteAmt!,
        totalFee: transferFee.totalPayerFee!,
        regionComFee: transferFee.regionComFee!,
        feeChargeTo: "OUR",
        retailFeeAmt: transferFee.retailFeeAmt!,
        amount: recipientList[i].Transfer_amount,
        subService: transferFee.subService?.value!,
      };
      Logger(`TRANSFER:putTransferAmount`, putDetails);
      await this.putTransferAmount(putDetails, r.bulkItemId!);
    }
    // return bulkItems;
    // return await this.makeRequest({
    //   url: `/bulk/bulk/${this.currentBulkId}/pre-advice`,
    //   method:"GET",
    //   queryPath:"TRANSFER:PreAdvice"
    // })
    return await this.getTransferDetail(this.currentBulkId);
  }
  async submitBulkTransfer(): Promise<
    | (MFAParams & { bulkOrderId: string; mfaRefId: string })
    | any
    | BulkDetailExtended
    | string
  > {
    const respSubmitBulk = await this.makeRequest({
      url: `/bulk/bulk/${this.currentBulkId}/pre-confirmation`,
      method: "POST",
      data: {},
      queryPath: "Transfer:SubmitBulkTransfer",
    });
    let generateSubmitBulkMFA: MFAParams = await this.makeRequest({
      url: "/auth/mfa/challenge",
      method: "POST",
      data: {
        mfaRefId: respSubmitBulk.mfaRefId,
        mfaMethod: !this.deviceId ? "OTP_SMS" : "PIN",
      },
      queryPath: "TRANSFER:GenerateMFA",
    }).then((data) => data.params);

    const accountDB = await KTBankSchema.findOne()
      .or([
        {
          account_ref_id: this.accountRefId,
        },
        {
          $and: [{ username: this.username }, { companyId: this.username }],
        },
      ])
      .exec();
    let transferData = await this.getTransferDetail(this.currentBulkId!);
    //PUSH DRAFT
    await accountDB?.updateOne({
      $push: {
        history: { ...transferData, mfaRefId: respSubmitBulk.mfaRefId },
      },
    });
    if (this.deviceId) {
      return await this.verifyMFABulkTransfer(
        ame2eea.encryptPinForAM(
          generateSubmitBulkMFA.e2eeSid,
          generateSubmitBulkMFA.pubKey,
          generateSubmitBulkMFA.serverRandom,
          this.password,
          "SHA-256"
        ),
        respSubmitBulk.mfaRefId
      );
    }
    return {
      ...generateSubmitBulkMFA,
      bulkOrderId: this.currentBulkId,
      mfaRefId: respSubmitBulk.mfaRefId,
    };
  }
  async verifyMFABulkTransfer(
    mfaPassphrase: string,
    mfaRefId: string
  ): Promise<BulkDetailExtended> {
    const mfaResponse: number = await this.makeRequest({
      url: "/auth/mfa/authentication",
      method: "POST",
      data: {
        mfaRefId,
        mfaPassphrase,
      },
      queryPath: "TRANSFER:VerifyMFABulkTransfer",
    });
    if (!this.currentBulkId) {
      const getAccountTmp = await KTBankSchema.findOne(
        { "history.mfaRefId": mfaRefId },
        { "history.$": 1 }
      ).exec();
      this.currentBulkId = getAccountTmp?.history[0].bulkId;
    }
    //it will be confirm comment if not will transfer;
    await this.makeRequest({
      url: `/bulk/bulk/${this.currentBulkId}/confirmation`,
      method: "POST",
      queryPath: `TRANSFER:ConfirmTransfer:${this.currentBulkId}`,
    });
    //UPDATE DRAFT
    let bulkExtendedDetails: BulkDetailExtended = await this.getTransferDetail(
      this.currentBulkId!
    );
    const accountDB = await KTBankSchema.findOneAndUpdate(
      {
        "history.bulkId": this.currentBulkId,
      },
      { $set: { "history.$": bulkExtendedDetails } }
    ).exec();
    return bulkExtendedDetails;
  }
  async getTransferDetail(bulkId: string): Promise<BulkDetailExtended> {
    const bulkDetail = await this.makeRequest({
      url: `/bulk/bulk/${bulkId}`,
      method: "GET",
      queryPath: "TRANSFER:GetTransferDetail",
    });

    const bulkItemDetails: BulkItemDetails[] = await this.makeRequest({
      url: `/bulk/bulk/${bulkId}/items`,
      method: "GET",
      queryPath: `TRANSFER:GetBulkItems:${bulkId}`,
    }).then((d) => d.content);

    return {
      ...bulkDetail,
      bulkId,
      items: bulkItemDetails,
    };
  }
  async preAuthMobile(): Promise<PreAuthMobileResponse> {
    const preAuth = await this.makeRequest(
      {
        url: `/prelogin/grant?grant_type=client_credentials`,
        method: "POST",
        data: {},
        queryPath: `Mobile:PreAuth`,
      },
      true
    );
    return preAuth;
  }
  //Use this function while user has logged on mobile and setup PIN before (NOT AN BIOMETRIC!)
  async loginPIN(
    deviceId: string,
    pin: string
  ): Promise<IPINGrantResponse & { queryPath: string }> {
    this.deviceId = deviceId;
    const preAuth = await this.preAuthMobile();
    this.companyId = preAuth.profile.companyId;
    this.username = preAuth.profile.userId;
    this.token = preAuth.access_token;
    this.password = pin;

    const genKey: IPreAuth = await this.makeRequest({
      url: `/auth/pin/key/generation`,
      method: "POST",
      data: {},
      queryPath: `Mobile:GenerateKey`,
    });

    let authPayload = {
      encryptedPassword: ame2eea.encryptPinForAM(
        genKey.e2eeSid,
        genKey.pubKey,
        genKey.serverRandom,
        pin,
        "SHA-256"
      ),
      e2eeSid: genKey.e2eeSid,
    };

    const auth: IPINGrantResponse = await this.makeRequest({
      url: `/pin/grant?grant_type=client_credentials`,
      method: "POST",
      data: authPayload,
      queryPath: `Auth:GrantPIN`,
    });
    this.token = auth.access_token;
    this.expireTokenDateTime = new Date(
      new Date().getTime() + auth.expires_in * 1000
    );
    const eligibleAccounts: AccountDetails[] = await this.getEligibleAccounts();
    if (!(eligibleAccounts.length > 0)) {
      throw new KTBankError(
        "Not Have Eligible Transfer Account",
        `Mobile:GetEligibleTransferAccount`,
        400
      );
    }

    // this.accountRefId = eligibleAccounts[0].accountRefId;
    const account = await KTBankSchema.findOne()
      .or([
        {
          account_ref_id: this.accountRefId,
        },
        {
          $and: [{ username: this.username }, { companyId: this.username }],
        },
      ])
      .exec();

    let insert: Partial<KTBankSchemaTypes> = {
      companyId: this.companyId,
      username: this.username,
      password: this.password,
      account_no: String(await this.getAccountNumber()),
      account_name: eligibleAccounts[0].accountName,
      account_ref_id: eligibleAccounts[0].accountRefId,
      account_balance: String(eligibleAccounts[0].availableBalance),
      last_update: new Date(),
      access_token: this.token,
      expiry_session: this.expireTokenDateTime,
      isMobile: true,
      deviceId: deviceId,
    };
    if (!account) {
      await new KTBankSchema(insert).save();
    } else {
      await account.updateOne(insert).exec();
    }
    return { ...auth, queryPath: "KBANK:Auth:VerifyOTP" };
  }
  async deleteBulkDraft(bulkId: string): Promise<any> {
    const deleteBulk = await this.makeRequest({
      url: `/instructions/deletion`,
      method: "POST",
      data: {
        deletionDetails: [
          {
            orderId: bulkId,
            service: "",
          },
        ],
      },
      queryPath: `TRANSFER:DeleteBulk:${bulkId}`,
    });
    // Logger("KBANK:AUTH:DeleteBulk", deleteBulk);
    return deleteBulk;
  }
  async checkAccount(): Promise<KTBankSchemaTypes | null> {
    const accountDb: KTBankSchemaTypes | null = await KTBankSchema.findOne({
      username: this.username,
      companyId: this.companyId,
    }).exec();
    if (accountDb?.isMobile && accountDb.deviceId) {
      this.deviceId = accountDb.deviceId;
    }
    return accountDb;
  }
  async scrapeDevice(): Promise<MobileDeviceType[] | null> {
    const {
      devices,
      preference,
    }: { devices: MobileDeviceType[]; preference: ProfilePreferenceType } =
      await this.makeRequest({
        url: `/profile/user/profile`,
        method: "GET",
        queryPath: `Mobile:GetDevices`,
      });

    if (!(preference.verificationMobileType === "PIN" && devices[0])) {
      return null;
    }
    return devices;
  }
  async getToken() {
    return this.token;
  }
  private async makeRequest(
    request: MakeRequest,
    isBasicAuth: boolean = false
  ) {
    const { url, method, data, queryPath } = request;
    const authHeader =
      isBasicAuth == true
        ? `Basic YWRtaW46cGFzc3dvcmQ=`
        : `Bearer ${this.token}`;

    let defaultHeader = this.deviceId
      ? {
          ...config.defaultHeaderMobile,
          "X-Device-ID": this.deviceId,
        }
      : config.defaultHeader;
    const resp = await axios
      .request({
        url: `${config.ktb_api_base_link}${url}`,
        method,
        headers: {
          ...defaultHeader,
          Authorization: authHeader,
        },
        data: JSON.stringify(data),
      })
      .then((d) => {
        return d.data;
      })
      .catch(async (e) => {
        // console.log(e);
        if (this.currentBulkId) {
          // await this.deleteBulkDraft(this.currentBulkId);
        }
        throw new KTBankError(e.response.data, queryPath, e.response.status);
      });
    Logger(queryPath, resp);
    return resp;
  }
  private async generateOTP(txToken: string): Promise<IOTPGenerateResponse> {
    return await this.makeRequest({
      url: `/auth/otp/generation`,
      method: "POST",
      data: {
        deliveryMethod: "OTP_SMS",
        userId: this.username,
        companyId: this.companyId,
        transactionToken: txToken,
      } as IOTPGenerate,
      queryPath: `Auth:PasswordVerification`,
    });
  }
  private async verifyPayee(recipient: IRecipient): Promise<PayeeLookupType> {
    // Logger(`TRANSFER:VerifyPayee:`, recipient);
    const data: PayeeLookupType = await this.makeRequest({
      url: `/account/payee-funds/external?bankCode=${recipient.Recipient_bank}&id=${recipient.Recipient_bank_acc}&fromAccountRefId=${this.accountRefId}`,
      method: "GET",
      queryPath: `TRANSFER:VerifyPayee:${recipient.Recipient_bank_acc}`,
    });
    if (!data.isFound) {
      throw new KTBankError(
        `The recipient account ${recipient.Recipient_bank_acc} was not found.`
      );
    }
    return data;
  }
  private async addBulkItem(recipient: IBulkItem[]): Promise<IBulkItem[]> {
    Logger("TRANSFER:AddBulkItem:Start", recipient);
    const payeeList = await this.makeRequest({
      url: `/bulk/bulk/${this.currentBulkId}/items`,
      method: "POST",
      data: { payees: recipient },
      queryPath: "TRANSFER:AddBulkItem",
    }).then((d) => d.payees);

    return payeeList;
  }
  private async getTransferFee(
    amount: number,
    bulkItemId: string
  ): Promise<PayeeFeeResponse> {
    const getTransferFee = await this.makeRequest({
      url: `/bulk/bulk/${this.currentBulkId}/items/${bulkItemId}/service`,
      method: "POST",
      data: { amount },
      queryPath: "TRANSFER:GetTransferFee",
    });
    return getTransferFee.subServices[0];
  }
  private async putTransferAmount(
    putAmountData: IPUTRequest,
    bulkItemId: string
  ): Promise<IPUTResponse> {
    const putTransferAmount: IPUTResponse = await this.makeRequest({
      url: `/bulk//bulk/${this.currentBulkId}/items/${bulkItemId}`,
      method: "PUT",
      data: putAmountData,
      queryPath: `TRANSFER:PutTransferAmount:${bulkItemId}`,
    });
    return putTransferAmount;
  }
}
