import {
  Box,
  Button,
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
import "../../style.css";
import { useSignIn } from "./SignInPage.helpers";

export default function SignInPage() {
  const [show, setShow] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const toast = useToast();
  const toastIdRef = React.useRef();
  const signIn = useSignIn();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const handleSubmit = () => {
    signIn({ email: username, password: password });
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
      <Box className="AuthorizationPageBoxContent">
        <Heading as="h3" size="lg" className="AuthorizationPageHeading">
          Sign in
        </Heading>
        <FormControl isRequired mt={6}>
          <FormLabel textAlign="left" mb="8px">
            {" "}
            Username or email
          </FormLabel>
          <Input
            className="Center"
            pr="4.5rem"
            bgColor="white"
            onChange={(event) => setUsername(event.currentTarget.value)}
          />
        </FormControl>

        <FormControl isRequired mt={6}>
          <FormLabel textAlign="left" mb="8px">
            {" "}
            Password
          </FormLabel>
          <InputGroup className="Center" size="md">
            <Input
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
        <Button
          onClick={handleSubmit}
          colorScheme="green"
          marginTop="20px"
          size="sm"
        >
          Sign in
        </Button>
      </Box>
      {/* <Link to={SIGN_UP}>or sign up</Link> */}
      <Text fontSize="1xl" className="AuthorizationServerLogo">
        auth server logo
      </Text>
    </Box>
  );
}
