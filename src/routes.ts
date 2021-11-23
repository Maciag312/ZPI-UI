class Api {
  private API_ENDPOINT = "/api";
  SIGN_IN = this.API_ENDPOINT + "/authenticate";
  CONSENT = this.API_ENDPOINT + "/consent";
  TWO_FACTOR_AUTH = this.API_ENDPOINT + "/2fa";
  OTP = this.API_ENDPOINT + "/otp/generate";
}

export const AUTH = "/allow";
export const SIGN_IN = "/signin";
export const TWO_FACTOR_AUTH = "/2fa";

export const API = new Api();
