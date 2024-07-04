interface IMFARequest {
  mfaRefId: string;
  mfaMethod: string;
}

interface MFAParams {
  tokenUuid: string;
  pubKeyIndex?: string | null;
  pubKey?: string | null;
  e2eeSid?: string | null;
  serverRandom?: string | null;
  oaepHashAlgo?: string | null;
  deliveryContact: string;
  otpRefNo: string;
}
interface IMFAResponse {
  params: MFAParams;
}

interface IMFAConfirm {
  mfaRefId: string;
  mfaPassphrase: string;
}


export {
  IMFARequest,
  IMFAResponse,
  IMFAConfirm,
  MFAParams,
  KTBankSchema
}