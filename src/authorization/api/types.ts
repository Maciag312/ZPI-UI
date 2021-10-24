import Creds from "../common/types";
import { Audit } from "./audit.types";

export interface ClientData {
  client_id: string;
  redirect_uri: string;
  state: string;
  response_type: string;
  scope?: string;
}

export interface AuthorizationRequestDTO {
  user: Creds;
  audit: Audit;
}
