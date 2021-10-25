import { useToast } from "@chakra-ui/react";
import React from "react";
import { URLSearchParams } from "url";
import { AUTH } from "../../../routes";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";
import { host } from "../../api/AuthorizationServerConfig";
import { ClientData } from "../../api/types";
import Creds from "../../common/types";

export const useSignIn = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const handleSubmit = (creds: Creds) => {
    authorizationClientInstance
      .signIn(creds, getClientDataFromParams())
      .then((res) => {
        if (res.status === 200) {
          window.location.href = host + AUTH + "?ticket=" + res.data.ticket;
        }
      })
      .catch((error) => {
        console.log(error);
        showLoggingInFailure();
      });
  };

  const getClientDataFromParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const client_id = queryParams.get("client_id") as string;
    const redirect_uri = queryParams.get("redirect_uri") as string;
    const response_type = queryParams.get("response_type") as string;
    const scope = queryParams.get("scope") as string | undefined;
    const state = queryParams.get("state") as string;
    return {
      client_id,
      redirect_uri,
      state,
      response_type,
      scope,
    } as ClientData;
  };

  const showLoggingInFailure = () => {
    toastIdRef.current = toast({
      description: "Wrong username or password!",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};
