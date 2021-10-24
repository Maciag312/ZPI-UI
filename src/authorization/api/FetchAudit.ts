import axios from "axios";
//@ts-ignore
import { ClientJS } from "clientjs";
import { Audit, DeviceInfo, IpInfo } from "./audit.types";

export const fetchAudit = async () => {
  const client = new ClientJS();

  const ipInfo: IpInfo = await axios
    .get("https://api.db-ip.com/v2/free/self")
    .then((response) => response.data);

  const deviceInfo: DeviceInfo = {
    fingerprint: client.getFingerprint(),
    userAgent: client.getUserAgent(),
    browser: client.getBrowser(),
    engine: client.getEngine(),
    engineVersion: client.getEngineVersion(),
    OS: client.getOS(),
    OSVersion: client.getOSVersion(),
    device: client.getDevice(),
    deviceType: client.getDeviceType(),
    deviceVendor: client.getDeviceVendor(),
    CPU: client.getCPU(),
    screenPrint: client.getScreenPrint(),
    colorDepth: client.getColorDepth(),
    currentResolution: client.getCurrentResolution(),
    availableResolution: client.getAvailableResolution(),
    deviceXDPI: client.getDeviceXDPI(),
    deviceYDPI: client.getDeviceYDPI(),
    mimeTypes: client.getMimeTypes(),
    isFont: client.isFont(),
    fonts: client.getFonts(),
    isLocalStorage: client.isLocalStorage(),
    isSessionStorage: client.isSessionStorage(),
    isCookie: client.isCookie(),
    timeZone: client.getTimeZone(),
    language: client.getLanguage(),
    systemLanguage: client.getSystemLanguage(),
    isCanvas: client.isCanvas(),
    canvasPrint: client.getCanvasPrint(),
  };

  return {
    ipInfo,
    deviceInfo,
  } as Audit;
};
