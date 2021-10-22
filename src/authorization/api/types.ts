export interface ClientData {
  client_id: string;
  redirect_uri: string;
  state: string;
  response_type: string;
  scope?: string;
}
