import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useToast,
} from "@chakra-ui/react";
import queryString from "query-string";
import React, { useEffect } from "react";
import { IoIosArrowBack } from "react-icons/io";
import QrReader from "react-qr-reader";
import "../../style.css";
import { useSendQrCode, useSignIn } from "./SignInPage.helpers";

export default function SignInPage() {
  const [show, setShow] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [step, setStep] = React.useState("1");
  const [password, setPassword] = React.useState("");
  const [qrCodeEnable, setQrCodeEnable] = React.useState(false);
  let qrCodeFeature = true;
  const toast = useToast();
  const toastIdRef = React.useRef();
  const signIn = useSignIn();
  const sendQrCode = useSendQrCode();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleClick = () => {
    if (step === "1") {
      setStep("2");
    } else if (step === "2") {
      signIn({ email: email, password: password });
    }
  };

  const handleScan = (data: string | null) => {
    if (data !== null) {
      setPassword(data);
      handleClick();
    }
  };

  const onKeyClick = (e: React.KeyboardEvent<any>) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const generateQrCode = () => {
    setQrCodeEnable(true);
    sendQrCode(email);
  };

  const goBack = () => {
    setQrCodeEnable(false);
    setStep("1");
  };

  useEffect(() => {
    const parsed = queryString.parse(window.location.search);
    const error = parsed.error;
    const error_description = parsed.error_description;

    if (error !== undefined) {
      toastIdRef.current = toast({
        description: "Client configuration error",
        status: "error",
      }) as undefined;

      console.log(error, error_description);
    }
  }, [toast]);

  return (
    <Box className="AuthorizationPageBox" rounded="lg">
      {step === "2" ? (
        <Button
          onClick={goBack}
          size="lg"
          float="left"
          leftIcon={<IoIosArrowBack />}
        />
      ) : (
        <></>
      )}
      <Box className="AuthorizationPageBoxContent">
        <Heading as="h3" size="lg" className="AuthorizationPageHeading">
          Sign in {step === "2" ? "to" : ""}
        </Heading>
        <Text>{step === "2" ? email : ""}</Text>

        {step === "1" ? (
          <FormControl onKeyUp={onKeyClick} isRequired mt={6}>
            <FormLabel textAlign="left" mb="8px">
              {" "}
              Email
            </FormLabel>
            <Input
              className="Center"
              pr="4.5rem"
              bgColor="white"
              onChange={(event) => setEmail(event.currentTarget.value)}
            />
          </FormControl>
        ) : (
          <></>
        )}

        {step === "2" ? (
          <>
            <FormControl onKeyUp={onKeyClick} isRequired mt={6}>
              <FormLabel textAlign="left" mb="8px">
                {" "}
                Password
              </FormLabel>
              <InputGroup className="Center" size="md">
                <Input
                  value={password}
                  pr="4.5rem"
                  type={show ? "text" : "password"}
                  bgColor="white"
                  onChange={(event) => setPassword(event.currentTarget.value)}
                />

                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleShowPassword}>
                    {show ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            {qrCodeFeature ? (
              <>
                {qrCodeEnable === true ? (
                  <>
                    <Center>
                      <QrReader
                        delay={25}
                        style={{ height: 200, width: 200 }}
                        onError={(er) => console.log(er)}
                        onScan={handleScan}
                      />
                    </Center>
                  </>
                ) : (
                  <Text
                    onClick={generateQrCode}
                    cursor="pointer"
                    fontWeight="semibold"
                    color="SkyBlue"
                  >
                    Or send password in qr code and scan it here
                  </Text>
                )}
              </>
            ) : (
              <></>
            )}
          </>
        ) : (
          <></>
        )}
        <Button
          onClick={handleClick}
          colorScheme="green"
          marginTop={4}
          marginBottom={4}
          onKeyDown={onKeyClick}
          size="sm"
        >
          {step === "1" ? "Next" : "Sign in"}
        </Button>
      </Box>
    </Box>
  );
}
