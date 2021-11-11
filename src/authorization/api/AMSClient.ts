import axios, { AxiosResponse } from "axios";

class AMSClient {
  host: string;

  constructor(host: string) {
    this.host = host;
  }

  sendQrCode(email: string): Promise<AxiosResponse<any>> {
    return axios.post(this.host + "/api/users/otp/generate", { email });
  }
}

let amsClient = new AMSClient("http://localhost:10000");

export default amsClient;
