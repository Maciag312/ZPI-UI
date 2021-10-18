import { useToast } from "@chakra-ui/react";
import React from "react";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";

export const useConsent = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const queryParams = new URLSearchParams(window.location.search);
  const ticket = queryParams.get("ticket") as string;

  const handleSubmit = (state: string) => {
    authorizationClientInstance
      .consent({ state: state, ticket: ticket })
      .then((res) => {
        if (res.status === 200) {
          console.log("consent successfully");
          window.location.href = res.data;
        }
      })
      .catch((error) => {
        console.log(error);
        showConsentFailure();
      });
  };

  const showConsentFailure = () => {
    toastIdRef.current = toast({
      description: "Consent has failed.",
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};
