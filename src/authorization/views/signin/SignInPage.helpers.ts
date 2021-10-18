import { useToast } from "@chakra-ui/react";
import React from "react";
import Creds from "../../../common/types";
import { AUTH } from "../../../routes";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";

export const useSignIn = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const queryParams = new URLSearchParams(window.location.search);

  const client_id = queryParams.get("client_id") as string;
  const redirect_uri = queryParams.get("redirect_uri") as string;
  const response_type = queryParams.get("response_type") as string;
  const scope = queryParams.get("scope") as string | undefined;
  const state = queryParams.get("state") as string;

  const handleSubmit = (creds: Creds) => {
    authorizationClientInstance
      .signIn(creds, client_id, redirect_uri, state, response_type, scope)
      .then((res) => {
        if (res.status === 200) {
          console.log("signed in successfully");
          window.location.href =
            "http://localhost:8080" + AUTH + "?ticket=" + res.data.ticket;
        }
      })
      .catch((error) => {
        console.log(error);
        showLoggingInFailure();
      });
  };

  const showLoggingInFailure = () => {
    toastIdRef.current = toast({
      description: "Wrong username or password!",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};
