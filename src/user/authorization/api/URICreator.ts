import { API } from "../../../Routes";

class URICreator {
  signInURI = (
    host: string,
    client_id: string,
    redirect_uri: string,
    state: string,
    response_type: string,
    scope?: string
  ) => {
    return (
      host +
      API.SIGN_IN +
      "?client_id=" +
      client_id +
      "&redirect_uri=" +
      redirect_uri +
      "&state=" +
      state +
      "&response_type=" +
      response_type +
      this.resolveOptionalScopeParam(scope)
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
