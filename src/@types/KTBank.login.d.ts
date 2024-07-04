interface IPreAuth {
  pubKeyIndex: string;
  e2eeSid: string;
  serverRandom: string;
  // oaepHashAlgo:string;
  pubKey: string;
}
interface IAuth {
  companyId: string;
  e2eeSid: string;
  encryptedPassword: string;
  userId: string;
}

interface IAuthResponse {
  userId: string;
  parentRole: string;
  parentCorporateRefId: string;
  role: string;
  parentCompanyId: string;
  isFirstMobileDevice?: boolean;
  isDisclaimerRequired: boolean;
  transactionToken: string;
  otpContact: string;
  companyId: string;
  otpMethod: string;
  isTncRequired?: boolean;
  mfaType: string;
}

type OTP_TYPE = "OTP_SMS" | "OTP_EMAIL";
interface IOTPGenerate {
  deliveryMethod: OTP_TYPE;
  userId: string;
  companyId: string;
  transactionToken: string;
}

interface IOTPGenerateResponse {
  tokenUuid: string;
  deliveryMethod: string;
  deliveryContact: string;
  otpRefNo: string;
}

interface IOTPVerify {
  otp: string;
  tokenUuid: string;
  transactionToken: string;
}

interface IOTPGrant {
  transactionToken: string;
}

interface IOTPGrantResponse {
  scope?: string;
  token_type: string;
  expires_in: number;
  access_token: string;
}

interface IPINGrantResponse extends IOTPGrantResponse {
  refresh_token:string;
  refresh_token_expires_in:number;
}

export {
  IAuth,
  IPreAuth,
  IAuthResponse,
  IOTPGenerate,
  OTP_TYPE,
  IOTPGenerateResponse,
  IOTPVerify,
  IOTPGrant,
  IOTPGrantResponse,
  IPINGrantResponse
};
