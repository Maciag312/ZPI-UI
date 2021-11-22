import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { TwoFactorAuth } from "./authorization/views/2fa/TwoFactorAuth";
import AllowPage from "./authorization/views/allow/AllowPage";
import SignInPage from "./authorization/views/signin/SignInPage";
import { AUTH, SIGN_IN, TWO_FACTOR_AUTH } from "./routes";

const App = () => {
  return (
    <Box className="AppWrapper">
      <Box className="App">
        <ChakraProvider>
          <Router>
            <Switch>
              <Route exact path={AUTH}>
                <AllowPage />
              </Route>
              <Route exact path={SIGN_IN}>
                <SignInPage />
              </Route>
              <Route exact path={TWO_FACTOR_AUTH}>
                <TwoFactorAuth />
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
};

export default App;
