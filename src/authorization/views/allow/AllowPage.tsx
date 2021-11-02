import { Box, Button } from "@chakra-ui/react";
import React from "react";
import "./../../style.css";
import { useConsent } from "./AllowPage.helpers";

export default function AllowPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const client = queryParams.get("client");
  const accesses = queryParams.getAll("accesses");

  const consent = useConsent();

  const onSubmit = () => {
    consent("init");
  };

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
        <Button onClick={onSubmit} colorScheme="blue">
          Allow
        </Button>
      </Box>
    </Box>
  );
}
