export default interface Creds {
  login: string;
  password: string;
}

export interface TwoFactorAuthRequest {
  ticket: string;
  code: string;
}

export enum TicketType {
  TICKET,
  TICKET_2FA,
  UNRECOGNIZED,
}
