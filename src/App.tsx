import React from "react";
import AllowPage from "./user/authorization/page/AllowPage";
import SignUpPage from "./user/authorization/page/SignUpPage";
import SignInPage from "./user/authorization/page/SignInPage";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { AUTH, SIGN_IN, SIGN_UP } from "./Routes";

function App() {
  return (
    <Box className="AppWrapper">
      <Box className="App">
        <ChakraProvider>
          <Router>
            <Switch>
              <Route exact path={AUTH}>
                <AllowPage></AllowPage>
              </Route>
              <Route exact path={SIGN_IN}>
                <SignInPage></SignInPage>
              </Route>
              <Route exact path={SIGN_UP}>
                <SignUpPage></SignUpPage>
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

export default App;
