import { useToast } from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import React from "react";
import { AUTH, TWO_FACTOR_AUTH } from "../../../routes";
import authorizationClientInstance from "../../api/AuthorizationClientImpl";
import { host } from "../../api/AuthorizationServerConfig";
import { ClientData } from "../../api/types";
import Creds, { TicketType } from "../../common/types";
import { RedirectType } from "./SignInPage.types";

export const useSignIn = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();

  const handleSubmit = (creds: Creds) => {
    authorizationClientInstance
      .signIn(creds, getClientDataFromParams())
      .then((res) => {
        switch (redirectType(res)) {
          case RedirectType.CONSENT:
            window.location.href = host + AUTH + "?ticket=" + res.data.ticket;
            break;
          case RedirectType.TWO_FACTOR_AUTH:
            window.location.href =
              host + TWO_FACTOR_AUTH + "?ticket=" + res.data.ticket;
            break;

          default:
            break;
        }
      })
      .catch((error) => {
        if (
          error === undefined ||
          error === null ||
          !error.hasOwnProperty("response") ||
          error.response === undefined
        ) {
          showLoggingInFailure("Login error");
          return;
        }

        switch (error.response.status) {
          case 400:
            showLoggingInFailure("Incorrect username or password");
            break;
          case 429:
            var delay = new Date(error.response.data.error_description);
            showLoggingInFailure(
              `Too many attempts, wait till: ${delay.toLocaleTimeString()}`
            );
            break;
          default:
            showLoggingInFailure("Cannot connect to service");
        }
      });
  };

  const ticketType = (type: string) => {
    if (type === "TICKET") return TicketType.TICKET;
    if (type === "TICKET_2FA") return TicketType.TICKET_2FA;

    return TicketType.UNRECOGNIZED;
  };

  const redirectType = (res: AxiosResponse<any>) => {
    if (res.status === 200) {
      switch (ticketType(res.data.ticket_type)) {
        case TicketType.TICKET:
          return RedirectType.CONSENT;
        case TicketType.TICKET_2FA:
          return RedirectType.TWO_FACTOR_AUTH;
        default:
          return RedirectType.ERROR;
      }
    }

    return RedirectType.ERROR;
  };

  const getClientDataFromParams = () => {
    const queryParams = new URLSearchParams(window.location.search);
    const client_id = queryParams.get("client_id") as string;
    const redirect_uri = queryParams.get("redirect_uri") as string;
    const response_type = queryParams.get("response_type") as string;
    const scope = queryParams.get("scope") as string | undefined;
    const state = queryParams.get("state") as string;
    return {
      client_id,
      redirect_uri,
      state,
      response_type,
      scope,
    } as ClientData;
  };

  const showLoggingInFailure = (message: string) => {
    toastIdRef.current = toast({
      description: message,
      status: "error",
    }) as undefined;
  };

  return handleSubmit;
};

export const useSendQrCode = () => {
  const toast = useToast();
  const toastIdRef = React.useRef();
  const sendQrCode = (email: string) => {
    authorizationClientInstance
      .sendQrCode(email)
      .then((res) => {
        if (res.status === 200) {
          showSendQrSuccess(email);
        }
      })
      .catch((er) => {
        showSendQrFailure();
      });
  };

  const showSendQrFailure = () => {
    toastIdRef.current = toast({
      description: "QR cannot be send",
      status: "error",
    }) as undefined;
  };

  const showSendQrSuccess = (email: string) => {
    toastIdRef.current = toast({
      description: "QR send to " + email,
      status: "success",
    }) as undefined;
  };

  return sendQrCode;
};
