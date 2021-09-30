import React from "react";
import AllowPage from "./user/authorization/page/allow/AllowPage";
import SignUpPage from "./user/authorization/page/signup/SignUpPage";
import SignInPage from "./user/authorization/page/signin/SignInPage";
import SignInDashboard from "./dashboard/signin/SignInDashboard";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import { DASHBOARD_SIGNIN, AUTH, SIGN_IN, SIGN_UP } from "./Routes";

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
              <Route path={DASHBOARD_SIGNIN}>
                <SignInDashboard></SignInDashboard>
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </Box>
    </Box>
  );
}

export default App;
