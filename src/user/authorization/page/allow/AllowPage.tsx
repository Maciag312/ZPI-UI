import { Button, Box } from "@chakra-ui/react";
import "./../../style.css";

export default function AllowPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const client = queryParams.get("client");
  const accesses = queryParams.getAll("accesses");

  const onSubmit = () => {};

  return (
    <Box className="AllowPageBox" rounded="lg">
      <Box className="AllowPageBoxContent">
        {client} wants to have access to
        {accesses.map((access) => (
          <Box key={access}>
            {" "}
            - {access} <br></br>
          </Box>
        ))}
        <Button onSubmit={onSubmit} colorScheme="blue">
          Allow
        </Button>
      </Box>
    </Box>
  );
}
