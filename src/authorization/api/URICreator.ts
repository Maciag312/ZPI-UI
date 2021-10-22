import { API } from "../../routes";
import { ClientData } from "./types";

class URICreator {
  consentURI(host: string): string {
    return host + API.CONSENT;
  }

  signInURI = (host: string, clientData: ClientData) => {
    return (
      host +
      API.SIGN_IN +
      "?client_id=" +
      clientData.client_id +
      "&redirect_uri=" +
      clientData.redirect_uri +
      "&state=" +
      clientData.state +
      "&response_type=" +
      clientData.response_type +
      this.resolveOptionalScopeParam(clientData.scope)
    );
  };

  resolveOptionalScopeParam = (scope?: string) => {
    if (scope === undefined || scope === null || scope === "") {
      return "";
    }
    return "&scope=" + scope;
  };
}

export default new URICreator();
