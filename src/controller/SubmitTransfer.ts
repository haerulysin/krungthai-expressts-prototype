import { ILoginFormWeb, IRecipient } from "../@types/KTBank";
import KTBankSchema from "../schema/KTBank.schema";
import { KTBank } from "./KTBank";

export default async function SubmitTransfer(
  reqForm: ILoginFormWeb & { recipient?: IRecipient[]; otp?: string }
) {
  const kt = new KTBank(reqForm.companyId, reqForm.username, reqForm.password);
  let account = await kt.checkAccount();
  if (!account || !reqForm.otp) {
    return await kt.login();
  }

  if (account?.isMobile) {
    console.log("Start:WithPin", {
      deviceId: account.deviceId,
      pin: account.password,
    });
  }

  if (!account.isMobile) {
    // let verifyOtp = kt.verifyOtp(reqForm.otp!);
    await kt.setManualToken(
      reqForm.companyId!,
      reqForm.username!,
      reqForm.password!,
      "UZLgPxKWLBhTzceVltRlecVMzSfXcD6B"
    );
    let submitBulk = await BulkTransferAutomation(kt, reqForm.recipient!);
    return submitBulk;
  }
  return account;
}

export async function SubmiTransferWebConfirmation(
  reqForm: ILoginFormWeb & { otp: string; mfaRefId: string }
) {
  const kt = new KTBank(reqForm.companyId, reqForm.username, reqForm.password);
  let setManual = await kt.setManualToken(
    reqForm.companyId!,
    reqForm.username!,
    reqForm.password!,
    "UZLgPxKWLBhTzceVltRlecVMzSfXcD6B"
  );
  let submitTransfer = await kt.verifyMFABulkTransfer(
    reqForm.otp,
    reqForm.mfaRefId
  );
  return submitTransfer;
}

export async function SubmitTransferMobile(
  reqForm: ILoginFormWeb & {
    deviceId: string;
    pin: string;
    recipient: IRecipient[];
  }
) {
  const kt = new KTBank(reqForm.companyId, reqForm.username, reqForm.password);
  const loginPIN = await kt.loginPIN(reqForm.deviceId, reqForm.pin);
  const submitTransfer = await BulkTransferAutomation(kt, reqForm.recipient);
  return submitTransfer;
}

export async function BulkTransferAutomation(
  kt: KTBank,
  recipient: IRecipient[]
) {
  let submitBulk = await kt.submitBulk(recipient);
  let confirmBulk = await kt.submitBulkTransfer();
  return confirmBulk;
}

export async function SubmitLoginOTP(
  reqForm: ILoginFormWeb & { otp: string; mfaRefId: string }
) {
  const kt = new KTBank(reqForm.companyId, reqForm.username, reqForm.password);
  return await kt.verifyOtp(reqForm.otp);
}
