import { AxiosResponse } from "axios";
import Creds from "../../common/types";
import Consent from "../views/allow/Consent";

export interface AuthorizationClient {
  signIn(
    creds: Creds,
    client_id: string,
    redirect_uri: string,
    state: string,
    response_type: string,
    scope?: string
  ): Promise<AxiosResponse<any>>;
  signUp(creds: Creds): Promise<AxiosResponse<any>>;
  consent(consent: Consent): Promise<AxiosResponse<any>>;
}
