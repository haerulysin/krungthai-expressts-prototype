interface IBulk {
  payerAccountRefId: string; //accountRefId
  processingType: string; //"ONLINE",
  service: string; //"TRANSFER",
  valueDate: string; //"2024-07-01",
  isRecurring: boolean;
}

interface IBulkResponse {
  bulkOrderId: string;
}

interface PayeeLookupType {
  nameEn: string | null | unknown;
  nameTh: string;
  id: string;
  isFound: boolean | null;
}

interface IBulkItem {
  payeeNameEn: string;
  payeeNameTh: string;
  payeeNickname: string;
  bankCode: string;
  payeeNo: string;
  isSaveAsBeneficiary: boolean;
  bulkItemId?: string;
  valid?: boolean;
}

interface IBulkItemResponse extends IBulkItem {
  beneficiaryId: string | null | unknown;
  accountRefId: string | null | unknown;
  isNewPromptpay: boolean | null;
  index: string | null | unknown;
}

interface IBulkPreConfirmResponse extends IBulkResponse {
  mfaRefId: string;
}

type TypeDefinition = {
  value: string;
  label: string;
};
type LagacyStatus = {
  statusCode: null;
  statusDescription: null;
};
interface BulkDetail {
  fileName: null | string | unknown;
  bulkId?: string | null;
  mfaRefId: string | null | undefined;
  processingType: TypeDefinition;
  transactionType: TypeDefinition;
  valueDate: Date;
  recordUploaded: null | string | Date;
  recordRemoved: null | string | Date;
  totalRecord: number;
  uploadedAmount: null | string | Date;
  removedAmount: null | string | Date;
  totalAmount: number;
  totalTransactionFee: number;
  totalNotificationFee: number;
  totalFee: number;
  grandTotalAmount: number;
  createdDateTime: Date;
  lastSavedDateTime: Date;
  packageRefNo: string;
  submittedDateTime: Date;
  accountRefId: string;
  accountNo: string;
  accountName: string;
  availableBalance: number;
  currency: string;
  totalErrorItem: number;
  bulkStatus: string;
  payrollType: TypeDefinition;
  recurringEndDate: null | string | Date;
  noOfOccurrence: null | string | number | Date;
  frequency: null | string | Date;
  lagacyStatus: LagacyStatus;
  totalUnsuccessfulItem: null | number;
  items: BulkItemDetails[];
}

interface BulkItemDetails {
  bulkOrderId: string;
  bulkItemId: string;
  orderId: string;
  subService: string;
  instructionRefNo: string | number | null;
  bulkItemStatus: string;
  payerAccountNo: string | number | null;
  payerAccountName: string | null;
  itemValueDate: string | number | null;
  payeeAccountNo: string;
  payeeAccountName: string;
  payeeBankName: string;
  payeeBankCode: string;
  payeeBankLogoUrl: string | null;
  netTransferAmount: number;
  isWithholdingTaxEnabled: boolean;
  isCompleted: boolean;
  isSavedAsBeneficiary: boolean;
  isPromptpay: boolean;
  errorTooltips: any[];
  legacyErrorMessage: string | null | unknown;
  payeeNickname: string;
  payeeAccountNameTh: string;
}

interface BulkDetailExtended extends BulkDetail {
  items: BulkItemDetails[];
}
export {
  IBulk,
  IBulkResponse,
  PayeeLookupType,
  IBulkItem,
  IBulkItemResponse,
  IBulkPreConfirmResponse,
  BulkDetail,
  BulkItemDetails,
  BulkDetailExtended,
};
