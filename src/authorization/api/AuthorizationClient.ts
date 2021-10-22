import { AxiosResponse } from "axios";
import Creds from "../common/types";
import Consent from "../views/allow/Consent";
import { ClientData } from "./types";

export interface AuthorizationClient {
  signIn(creds: Creds, clientData: ClientData): Promise<AxiosResponse<any>>;
  signUp(creds: Creds): Promise<AxiosResponse<any>>;
  consent(consent: Consent): Promise<AxiosResponse<any>>;
}
