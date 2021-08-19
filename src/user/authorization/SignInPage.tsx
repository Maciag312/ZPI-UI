import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react"
import React from "react";
import "./style.css"
import Creds from "./Creds"
import authorizationClientInstance from "./api/AuthorizationClientImpl";
import { Link } from "react-router-dom";

export default function SignInPage() {
    const [show, setShow] = React.useState(false)
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")
    const toast = useToast()
    const toastIdRef = React.useRef()


    const handleClick = () => {
        setShow(!show)
    }

    const handleSubmit = () => {
        let creds: Creds
        creds = {username: username, password: password}
    
        authorizationClientInstance.signIn(creds).then(
            res => {
                console.log(res)
                if(res.status === 200) {
                    window.location.href = res.data
                }
            }

        ).catch(error => {
            console.log(error)
            showLoggingInFailure()
        });
      
    }

    const showLoggingIn = () => {
        toastIdRef.current = toast({description: "Signed in successfully!", status: "success"}) as any
    }

    const showLoggingInFailure = () => {
        toastIdRef.current = toast({description: "Wrong username or password!", status: "error"}) as any
    }
    
    return (
            <Box className="AuthorizationPageBox" rounded="lg">
                <Box className="AuthorizationPageBoxContent">
                    
                    <Heading as="h3" size="lg" paddingTop="20px" marginBottom="5px">Sign in</Heading>
                    <Text fontSize="2xl" marginBottom="25px" className="Logo">service logo</Text>
                        <FormControl isRequired mt={6}>
                            <FormLabel textAlign="left" mb="8px"> Username or email</FormLabel>
                                <Input
                                    className="Center"
                                    pr="4.5rem"
                                    bgColor="white"
                                    onChange={event => setUsername(event.currentTarget.value)}
                                />
                        </FormControl>

                        <FormControl isRequired mt={6}>
                            <FormLabel textAlign="left" mb="8px"> Password</FormLabel>
                            <InputGroup className="Center" size="md" > 
                                <Input
                                    pr="4.5rem"
                                    type={show ? "text" : "password"}
                                    bgColor="white"
                                    onChange={event => setPassword(event.currentTarget.value)}
                                />
                        
                                <InputRightElement width="4.5rem">
                                    <Button h="1.75rem" size="sm" onClick={handleClick}>
                                    {show ? "Hide" : "Show"}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Button  onClick={handleSubmit} colorScheme="green" marginTop="20px" size="sm">Sign in</Button>
                </Box>
                <Link to="/signup" >or sign up</Link>
                <Text fontSize="1xl" align="right" marginRight="10px" paddingBottom="5px" className="Logo">service logo</Text>
            </Box>
    );
}