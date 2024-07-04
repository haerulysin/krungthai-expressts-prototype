interface PayeeFeeResponse {
  payerFeeCode?: string;
  totalPayerFee?: number;
  payerTransactionFee?: number;
  payeeFeeCode?: string;
  totalPayeeFee?: number;
  payeeTransactionFee?: number;
  notificationFee?: number;
  transferLimit?: number;
  regionComFee?: string;
  regionRetailFee?: string;
  comCompleteAmt?: number;
  comInCompleteAmt?: number;
  retailFeeAmt?: number;
  notOnUsRetailFeeAmt?: number;
  botCompleteFeeAmt?: number;
  botInCompleteFeeAmt?: number;
  botRetailFeeAmt?: number;
  subService?: {
    value?: string;
    label?: string;
  };
}
export interface IPUTRequest {
  note: string;
  regionRetailFee: string;
  isWithholdingTaxEnabled: boolean;
  botRetailFeeAmt: number;
  comCompleteAmt: number;
  transactionFee: number;
  botInCompleteFeeAmt: number;
  notificationFee: number;
  feeCode: string;
  notOnUsRetailFeeAmt: number;
  comInCompleteAmt: number;
  totalFee: number;
  regionComFee: string;
  feeChargeTo: string;
  retailFeeAmt: number;
  amount: string;
  subService: string;
}

interface IPUTResponse {
  amount: number;
  botCompleteFeeAmt: number;
  botInCompleteFeeAmt: number;
  botRetailFeeAmt: number;
  comCompleteAmt: number;
  comInCompleteAmt: number;
  notOnUsRetailFeeAmt: number;
  notificationFee: number;
  payeeFeeCode: string;
  payeeTransactionFee: number;
  payerFeeCode: string;
  feeCode: string;
  payerTransactionFee: number;
  regionComFee: string;
  regionRetailFee: string;
  retailFeeAmt: number;
  totalPayeeFee: number;
  totalPayerFee: number;
  transferLimit: number;
  subService: string;
  transactionFee: number;
  totalFee: number;
  feeChargeTo: string;
  note: null;
  payeeBranchCode: null;
  isWithholdingTaxEnabled: boolean;
  whtPayeeName: null;
  whtTaxId: null;
  whtAddress: null;
  whtProvinceCode: null;
  whtDistrictCode: null;
  whtSubDistrictCode: null;
  whtPostcode: null;
  whtCertificateNo: null;
  whtSequence: null;
  whtForm: null;
  whtPayType: null;
  invoices: any[];
  notificationEmailAddress: null;
  notificationSmsMobileNo: null;
}

interface IRecipient {
  Recipient_bank: string;
  Recipient_bank_name: string;
  Recipient_bank_acc: string;
  Transfer_amount: string;
}
export { PayeeFeeResponse, IPUTResponse, IRecipient, IPUTRequest };
