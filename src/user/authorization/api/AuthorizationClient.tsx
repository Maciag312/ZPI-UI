import { AxiosResponse } from "axios";
import Creds from "../Creds";

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
  allow(code: String): Response;
}
