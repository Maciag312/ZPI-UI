import { Button, Box } from "@chakra-ui/react"
import "./style.css"


export default function AllowPage() {

    const queryParams = new URLSearchParams(window.location.search);

    const signInToken = queryParams.get('sign_in_token')
    const client = queryParams.get('client')
    const accesses = queryParams.getAll('accesses')

    const onSubmit = () => {
        
    }
    
    return (
        <Box className="AllowPageBox" rounded="lg">
            <Box className="AllowPageBoxContent">
                {client} wants to have access to 
                <br></br>
                {accesses.map(a => <Box key={a}> - {a} <br></br></Box>)}
                <br></br>
                <Button onSubmit={onSubmit} colorScheme="blue">Allow</Button>    
            </Box>
        </Box>
    );
}