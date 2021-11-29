import { Box, Button, ListItem, UnorderedList } from "@chakra-ui/react";
import React from "react";
import "./../../style.css";
import { useConsent } from "./AllowPage.helpers";

export default function AllowPage() {
  const queryParams = new URLSearchParams(window.location.search);

  const scopes = queryParams
    .getAll("scope")
    .map((s) => s.split(" "))
    .flatMap((s) => s);

  const consent = useConsent();

  const onSubmit = () => {
    consent("init");
  };

  return (
    <Box className="AllowPageBox" rounded="lg">
      <Box className="AllowPageBoxContent">
        Client wants to have access to
        {scopes.map((scope) => (
          <UnorderedList key={scope}>
            <ListItem>{scope}</ListItem>
          </UnorderedList>
        ))}
        <Button onClick={onSubmit} colorScheme="blue">
          Allow
        </Button>
      </Box>
    </Box>
  );
}
