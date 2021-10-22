class Api {
  private API_ENDPOINT = "/api";
  private USERS_ENDPOINT = this.API_ENDPOINT + "/users";
  SIGN_IN = this.API_ENDPOINT + "/authenticate";
  SIGN_UP = this.USERS_ENDPOINT + "/signup";
  CONSENT = this.API_ENDPOINT + "/consent";
}

export const AUTH = "/allow";
export const SIGN_IN = "/signin";
export const SIGN_UP = "/signup";

export const API = new Api();
