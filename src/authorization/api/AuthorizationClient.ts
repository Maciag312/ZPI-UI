import { AxiosResponse } from "axios";
import Creds from "../common/types";
import Consent from "../views/allow/Consent";
import { Audit } from "./audit.types";
import { ClientData } from "./types";

export interface AuthorizationClient {
  audit(): Promise<Audit>;
  signIn(creds: Creds, clientData: ClientData): Promise<AxiosResponse<any>>;
  consent(consent: Consent): Promise<AxiosResponse<any>>;
  sendQrCode(email: string): Promise<AxiosResponse<any>>;
}
