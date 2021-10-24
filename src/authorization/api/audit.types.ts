export interface Audit {
  ipInfo: IpInfo;
  deviceInfo: DeviceInfo;
}

export interface IpInfo {
  city: string;
  continentCode: string;
  continentName: string;
  countryCode: string;
  countryName: string;
  ipAddress: string;
  stateProv: string;
}

export interface DeviceInfo {
  fingerprint: string;
  userAgent: string;
  browser: string;
  engine: string;
  engineVersion: string;
  OS: string;
  OSVersion: string;
  device: string;
  deviceType: string;
  deviceVendor: string;
  CPU: string;
  screenPrint: string;
  colorDepth: string;
  currentResolution: string;
  availableResolution: string;
  deviceXDPI: string;
  deviceYDPI: string;
  mimeTypes: string;
  isFont: boolean;
  fonts: string;
  isLocalStorage: boolean;
  isSessionStorage: boolean;
  isCookie: boolean;
  timeZone: string;
  language: string;
  systemLanguage: string;
  isCanvas: boolean;
  canvasPrint: string;
}
