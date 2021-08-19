import { AxiosResponse } from "axios";
import Creds from "../Creds";

export interface AuthorizationClient {
    signIn(creds: Creds): Promise<AxiosResponse<any>> 
    signUp(creds: Creds): Promise<AxiosResponse<any>>
    allow(code: String): Response
}

