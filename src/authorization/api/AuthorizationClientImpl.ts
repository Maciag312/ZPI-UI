import axios, { AxiosResponse } from "axios";
import Creds from "../../common/types";
import { API } from "../../routes";
import Consent from "../views/allow/Consent";
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

  consent(consent: Consent): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.consentURI(this.host), consent);
  }
}

let authorizationClientInstance = new AuthorizationClientImpl(host);

export default authorizationClientInstance;
