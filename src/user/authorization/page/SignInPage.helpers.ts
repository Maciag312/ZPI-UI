import { useToast } from "@chakra-ui/react";
import React from "react";
import authorizationClientInstance from "../api/AuthorizationClientImpl";
import Creds from "../Creds";

export const useSignIn = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const handleSubmit = (creds: Creds) => {
    authorizationClientInstance
      .signIn(creds)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          window.location.href = res.data;
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
