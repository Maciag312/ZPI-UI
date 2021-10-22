import { Box, ChakraProvider } from "@chakra-ui/react";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AllowPage from "./authorization/views/allow/AllowPage";
import SignInPage from "./authorization/views/signin/SignInPage";
import SignUpPage from "./authorization/views/signup/SignUpPage";
import { AUTH, SIGN_IN, SIGN_UP } from "./routes";

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
              <Route exact path={SIGN_UP}>
                <SignUpPage />
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
};

export default App;
