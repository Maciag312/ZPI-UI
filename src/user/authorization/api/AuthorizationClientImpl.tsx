import axios, { AxiosResponse } from "axios";
import { API } from "../../../Routes";
import Creds from "../Creds";
import { AuthorizationClient } from "./AuthorizationClient";
import { host } from "./AuthorizationServerConfig";
import URICreator from "./URICreator";

class AuthorizationClientImpl implements AuthorizationClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  signIn(
    creds: Creds,
    client_id: string,
    redirect_uri: string,
    state: string,
    response_type: string,
    scope?: string
  ): Promise<AxiosResponse<any>> {
    return axios.post(
      URICreator.signInURI(
        this.host,
        client_id,
        redirect_uri,
        state,
        response_type,
        scope
      ),
      creds
    );
  }

  signUp(creds: Creds): Promise<AxiosResponse<any>> {
    return axios.post(this.host + API.SIGN_UP, creds);
  }

  allow(code: String): Response {
    throw new Error("Method not implemented.");
  }
}

let authorizationClientInstance = new AuthorizationClientImpl(host);

export default authorizationClientInstance;
