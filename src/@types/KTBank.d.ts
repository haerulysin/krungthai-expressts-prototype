import { BulkItemDetails } from "./KTBank.transfer";

interface AccountDetails {
  accountRefId: string;
  accountName: string;
  account: string;
  accountNo: string;
  accountType: string;
  accountDescription: string;
  availableBalance: number;
  ledgerBalance: number;
  productCode?: string;
  loanLimit?: number;
  loanOutstandingBalance?: number;
  currency: string;
  isPrimaryAccount: boolean | null;
  status: string;
  subProductCode?: string | null | unknown;
  loanTypeDescription?: string | null | unknown;
  isLoanCommitmentAccount?: string | boolean | null | unknown;
}
interface AccountSummary {
  // accounts: AccountDetails[];
  accountName: string;
  accountNumber: string | number;
  accountBalance: number;
  accountRefId?: string;
}
interface ProfileMobile {
  userId: string;
  role: string;
  isQrActive: boolean;
  verificationWebsiteType: string;
  isBiometricEnabled: boolean;
  isTncRequired: boolean;
  isAutoSaveImage: boolean;
  verificationMobileType: string;
  isDisclaimerRequired: boolean;
  parentCompanyId: string;
  defaultView: null;
  language: string;
  isActive: boolean;
  corporateRefId: string;
  companyId: string;
  userRefId: string;
  parentCorporateRefId: string;
}
interface PreAuthMobileResponse {
  profile: ProfileMobile;
  access_token: string;
}
interface IPreAuthWeb {
  transactionToken: string;
  tokenUuid: string;
  expires?: Date;
}
type KTBankSchemaTypes = {
  companyId: string;
  username: string;
  password: string;
  account_no: string;
  account_name: string;
  account_ref_id: string;
  account_balance: string;
  account_balance: string;
  last_update: Date;
  deviceId?: string;
  deviceName?: string;
  access_token: string;
  expiry_session: Date;
  isMobile: boolean;
  history:BulkDetail[];
  pre_auth_web: IPreAuthWeb;
};

type ILoginFormMobile = {
  deviceId?: string;
  pin?: string;
};

type ILoginFormWeb = {
  companyId?: string;
  username?: string;
  password?: string;
};

interface MakeRequest {
  url: string;
  method: "GET" | "POST" | "PUT";
  data?: object;
  queryPath: string;
}

export {
  MakeRequest,
  ILoginFormMobile,
  ILoginFormWeb,
  IPreAuthWeb,
  AccountDetails,
  AccountSummary,
  KTBankSchemaTypes,
  PreAuthMobileResponse,
  ProfileMobile,
};
export * from "./KTBank.login";
export * from "./KTBank.mfa";
export * from "./KTBank.payee";
export * from "./KTBank.transfer";
export * from "./KTBank.profile";
