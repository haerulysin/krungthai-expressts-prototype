interface ProfilePreferenceType {
  language: string;
  isWebAccessible: boolean;
  isMobileAccessible: boolean;
  isQrActive: boolean;
  isQuickAccessActive: boolean;
  isAutoSaveImage: boolean;
  verificationWebsiteType: string;
  verificationMobileType: string;
  channelToSendId: string;
  channelToSendPassword: string;
  qrLimit: number;
  globalQrLimit: number;
}
interface MobileDeviceType {
  deviceId: string;
  userRefId: string;
  deviceName: string;
  isActive: boolean;
  isPrimary: boolean;
  createdDate: Date;
  lastConnectedDate: Date;
}

export { ProfilePreferenceType, MobileDeviceType };
