export default interface Creds {
  login: string;
  password: string;
}

export interface TwoFactorAuthResponse {
  code: string;
}
