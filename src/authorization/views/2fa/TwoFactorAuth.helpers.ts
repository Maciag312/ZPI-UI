import { useToast } from "@chakra-ui/toast";
import React, { useState } from "react";
import { AUTH } from "../../../routes";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";
import { host } from "../../api/AuthorizationServerConfig";
import { TwoFactorAuthResponse } from "../../common/types";

export const useTwoFactorAuth = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const [isSuccess, setIsSuccess] = useState(true);

  const handleSubmit = (code: string) => {
    authorizationClientInstance
      .twoFactorAuth({ code } as TwoFactorAuthResponse)
      .then((res) => {
        if (res.status === 200) {
          if (res.data.ticket !== null) {
            window.location.href = `${host}${AUTH}?ticket=${res.data.ticket}`;
          }
        }
      })
      .catch((error) => {
        setIsSuccess(false);
        console.log(error);
        showTwoFactorFailure();
      });
  };

  const showTwoFactorFailure = () => {
    toastIdRef.current = toast({
      description: "Please try again.",
      status: "error",
    }) as undefined;
  };

  const repeatRequest = () => {
    console.log("Repeating 2fa request");
  };

  return { handleSubmit, isSuccess, repeatRequest };
};
