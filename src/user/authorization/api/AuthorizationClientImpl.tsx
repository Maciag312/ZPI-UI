
import axios, { AxiosResponse } from "axios";
import Creds from "../Creds";
import { AuthorizationClient } from "./AuthorizationClient";
import { host } from "./AuthorizationServerConfig";

class AuthorizationClientImpl implements AuthorizationClient {

    host: string;

    constructor(host: string) {
        this.host = host
    }

    signIn(creds: Creds): Promise<AxiosResponse<any>> {
        return axios.post(this.host + "/api/user/signin", creds);
    }

    signUp(creds: Creds) : Promise<AxiosResponse<any>> {
        return axios.post(this.host + "/api/user/signup", creds)
    }

    allow(code: String): Response {
        throw new Error("Method not implemented.");
    }
}
let authorizationClientInstance = new AuthorizationClientImpl(host)

export default authorizationClientInstance