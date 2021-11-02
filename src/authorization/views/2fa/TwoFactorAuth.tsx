import { Box, PinInput, PinInputField, Text } from "@chakra-ui/react";
import React, { useEffect, useRef, useState } from "react";
import { TwoFactorAuthRequest } from "../../common/types";
import "./style.css";
import { useTwoFactorAuth } from "./TwoFactorAuth.helpers";

export const TwoFactorAuth = () => {
  const { handleSubmit, isSuccess, repeatRequest } = useTwoFactorAuth();
  const [isInputLocked, setIsInputLocked] = useState(false);
  const [code, setCode] = useState("");
  const pinInput = useRef<any>();

  const onSubmit = (code: string) => {
    handleSubmit({ ticket: retrieveTicket(), code } as TwoFactorAuthRequest);
    setIsInputLocked(true);
    setCode("");
  };

  const retrieveTicket = () => {
    const queryParams = new URLSearchParams(window.location.search);
    return queryParams.get("ticket") as string;
  };

  const pinFocus = () => {
    if (pinInput.current !== undefined) {
      pinInput.current.focus();
    }
  };

  useEffect(() => {
    if (!isSuccess) {
      repeatRequest();
      setIsInputLocked(false);
      pinFocus();
    }
  }, [isSuccess, repeatRequest]);

  useEffect(() => {
    pinFocus();
  }, []);

  return (
    <Box className="TwoFactorAuthBox" rounded="lg" paddingBottom={8}>
      <Box>
        <Text paddingTop={8} paddingBottom={8}>
          Please provide one time code that was sent to your email.
        </Text>
        <PinInput
          otp
          onComplete={onSubmit}
          isDisabled={isInputLocked}
          onChange={setCode}
          value={code}
        >
          <PinInputField ref={pinInput} />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
          <PinInputField />
        </PinInput>
      </Box>
    </Box>
  );
};
