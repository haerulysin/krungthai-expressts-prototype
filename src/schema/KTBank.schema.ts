import { Schema, model } from "mongoose";
import { IPreAuth, IPreAuthWeb, KTBankSchemaTypes } from "../@types/KTBank";
const BulkItemDetails: Schema = new Schema({
  bulkOrderId: {
    type: "String",
  },
  bulkItemId: {
    type: "String",
  },
  orderId: {
    type: "Date",
  },
  subService: {
    type: "String",
  },
  instructionRefNo: {
    type: "Mixed",
  },
  bulkItemStatus: {
    type: "String",
  },
  payerAccountNo: {
    type: "Mixed",
  },
  payerAccountName: {
    type: "Mixed",
  },
  itemValueDate: {
    type: "Mixed",
  },
  payeeAccountNo: {
    type: "String",
  },
  payeeAccountName: {
    type: "String",
  },
  payeeBankName: {
    type: "String",
  },
  payeeBankCode: {
    type: "String",
  },
  payeeBankLogoUrl: {
    type: "Mixed",
  },
  netTransferAmount: {
    type: "Number",
  },
  isWithholdingTaxEnabled: {
    type: "Boolean",
  },
  isCompleted: {
    type: "Boolean",
  },
  isSavedAsBeneficiary: {
    type: "Boolean",
  },
  isPromptpay: {
    type: "Boolean",
  },
  errorTooltips: {
    type: "Array",
  },
  legacyErrorMessage: {
    type: "Mixed",
  },
  payeeNickname: {
    type: "String",
  },
  payeeAccountNameTh: {
    type: "String",
  },
});
const BulkDetailSchema: Schema = new Schema({
  bulkId: {
    type:String,
    require:true
  },
  mfaRefId:{
    type:String,
  },
  fileName: {
    type: "Mixed",
  },
  processingType: {
    value: {
      type: "String",
    },
    label: {
      type: "String",
    },
  },
  transactionType: {
    value: {
      type: "String",
    },
    label: {
      type: "String",
    },
  },
  valueDate: {
    type: "Date",
  },
  recordUploaded: {
    type: "Mixed",
  },
  recordRemoved: {
    type: "Mixed",
  },
  totalRecord: {
    type: "Number",
  },
  uploadedAmount: {
    type: "Mixed",
  },
  removedAmount: {
    type: "Mixed",
  },
  totalAmount: {
    type: "Number",
  },
  totalTransactionFee: {
    type: "Number",
  },
  totalNotificationFee: {
    type: "Number",
  },
  totalFee: {
    type: "Number",
  },
  grandTotalAmount: {
    type: "Number",
  },
  createdDateTime: {
    type: "Date",
  },
  lastSavedDateTime: {
    type: "Date",
  },
  packageRefNo: {
    type: "String",
  },
  submittedDateTime: {
    type: "Date",
  },
  accountRefId: {
    type: "String",
  },
  accountNo: {
    type: "String",
  },
  accountName: {
    type: "String",
  },
  availableBalance: {
    type: "Number",
  },
  currency: {
    type: "String",
  },
  totalErrorItem: {
    type: "Number",
  },
  bulkStatus: {
    type: "String",
  },
  payrollType: {
    value: {
      type: "Mixed",
    },
    label: {
      type: "Mixed",
    },
  },
  recurringEndDate: {
    type: "Mixed",
  },
  noOfOccurrence: {
    type: "Mixed",
  },
  frequency: {
    type: "Mixed",
  },
  lagacyStatus: {
    statusCode: {
      type: "Mixed",
    },
    statusDescription: {
      type: "Mixed",
    },
  },
  totalUnsuccessfulItem: {
    type: "Mixed",
  },
  items: {
    type: [BulkItemDetails],
    require: true,
  },
});

const PreAuthWebSchema: Schema<IPreAuthWeb> = new Schema({
  tokenUuid: {
    type: String,
  },
  transactionToken: {
    type: String,
  },
  expires:{
    type:Date,
  }
});
const KTBankSchema: Schema = new Schema({
  companyId: {
    type: String,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    require: true,
  },
  account_no: {
    type: String,
    require: true,
    default: 0,
  },
  account_name: {
    type: String,
    require: true,
  },
  account_ref_id: {
    type: String,
    require: true,
  },
  account_balance: {
    type: Number,
    require: true,
    default: 0,
  },
  last_update: {
    type: Date,
    require: true,
    default: Date.now,
  },
  deviceId: {
    type: String,
  },
  deviceName: { type: String },
  access_token: {
    type: String,
    require: true,
  },
  expiry_session: {
    type: Date,
    require: true,
  },
  isMobile: {
    type: Boolean,
    default: false,
    require: true,
  },
  history: {
    type: [BulkDetailSchema],
    require: true,
  },
  pre_auth_web: PreAuthWebSchema,
});
export default model<KTBankSchemaTypes>("KTBank", KTBankSchema, "KTBank");