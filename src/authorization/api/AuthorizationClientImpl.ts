import axios, { AxiosResponse } from "axios";
import { API } from "../../routes";
import Creds, { TwoFactorAuthRequest } from "../common/types";
import Consent from "../views/allow/Consent";
import { Audit } from "./audit.types";
import { AuthorizationClient } from "./AuthorizationClient";
import { host } from "./AuthorizationServerConfig";
import { fetchAudit } from "./FetchAudit";
import { AuthorizationRequestDTO, ClientData } from "./types";
import URICreator from "./URICreator";

class AuthorizationClientImpl implements AuthorizationClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  sendQrCode(email: string): Promise<AxiosResponse<any>> {
    return axios.post(this.host + API.OTP, { email });
  }

  audit(): Promise<Audit> {
    return fetchAudit();
  }

  signIn(user: Creds, clientData: ClientData): Promise<AxiosResponse<any>> {
    return this.audit().then((audit) =>
      axios.post(URICreator.signInURI(this.host, clientData), {
        user,
        audit,
      } as AuthorizationRequestDTO)
    );
  }

  consent(consent: Consent): Promise<AxiosResponse<any>> {
    return axios.post(URICreator.consentURI(this.host), consent);
  }

  twoFactorAuth(code: TwoFactorAuthRequest): Promise<AxiosResponse<any>> {
    return axios.post(this.host + API.TWO_FACTOR_AUTH, code);
  }
}

let authorizationClientInstance = new AuthorizationClientImpl(host);

export default authorizationClientInstance;
