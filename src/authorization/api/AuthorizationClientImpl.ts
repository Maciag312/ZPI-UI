import axios, { AxiosResponse } from "axios";
import { API } from "../../routes";
import Creds from "../common/types";
import Consent from "../views/allow/Consent";
import { AuthorizationClient } from "./AuthorizationClient";
import { host } from "./AuthorizationServerConfig";
import { ClientData } from "./types";
import URICreator from "./URICreator";

class AuthorizationClientImpl implements AuthorizationClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  signIn(creds: Creds, clientData: ClientData): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.signInURI(this.host, clientData), creds);
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
