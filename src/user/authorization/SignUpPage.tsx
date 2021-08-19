import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, Text, useToast } from "@chakra-ui/react";
import { Heading } from "@chakra-ui/react"
import React from "react";
import "./style.css"
import Creds from "./Creds"
import authorizationClientInstance from "./api/AuthorizationClientImpl";
import { Link } from "react-router-dom";


export default function SignUpPage() {
    const [show, setShow] = React.useState(false)
    const toast = useToast()
    const toastIdRef = React.useRef()

    const handleClick = () => setShow(!show)
  
    const [username, setUsername] = React.useState("")
    const [password, setPassword] = React.useState("")

    const handleSubmit = () => {
        let creds: Creds
        creds = {username: username, password: password}
    
        authorizationClientInstance.signUp(creds).then(
            res => {
                console.log(res)
                if(res.status === 201) {
                    showCreatedAccount()
                }
            }

        ).catch(error => {
            console.log(error)
            showSigningUpFailure()
        });
    }

    const showCreatedAccount = () => {
        toastIdRef.current = toast({description: "Created account successfully!", status: "success"}) as any
    }

    const showSigningUpFailure = () => {
        toastIdRef.current = toast({description: "Error!", status: "error"}) as any
    }
  
    return (
        <>
            <Box className="AuthorizationPageBox" rounded="lg">
                <Box className="AuthorizationPageBoxContent">
                    <Heading as="h3" size="lg" paddingTop="20px" marginBottom="5px">Sign up</Heading>
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
                        <Button  onClick={handleSubmit} colorScheme="green" marginTop="20px" size="sm">Sign up</Button>
                </Box>
                <Link to="/signin" >or sign in</Link>
                <Text fontSize="1xl" align="right" marginRight="10px" paddingBottom="5px" className="Logo">service logo</Text>
            </Box>
            </>
    );
}
