import { useToast } from "@chakra-ui/react";
import React from "react";
import Creds from "../../../common/types";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";

export const useSignUp = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const handleSubmit = (creds: Creds) => {
    authorizationClientInstance
      .signUp(creds)
      .then((res) => {
        console.log(res);
        if (res.status === 201) {
          showCreatedAccount();
        }
      })
      .catch((error) => {
        console.log(error);
        showSigningUpFailure();
      });
  };

  const showCreatedAccount = () => {
    toastIdRef.current = toast({
      description: "Created account successfully!",
      status: "success",
    }) as undefined;
  };

  const showSigningUpFailure = () => {
    toastIdRef.current = toast({
      description: "Error!",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};
