class api {
  private API_ENDPOINT = "/api";
  private USERS_ENDPOINT = this.API_ENDPOINT + "/users";
  SIGN_IN = this.USERS_ENDPOINT + "/signin";
  SIGN_UP = this.USERS_ENDPOINT + "/signup";
}

export const AUTH = "/auth";
export const SIGN_IN = "/signin";
export const SIGN_UP = "/signup";

export const API = new api();
