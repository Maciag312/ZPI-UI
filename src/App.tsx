import React from 'react';
import './App.css';
import AllowPage from './user/authorization/AllowPage';
import SignUpPage from './user/authorization/SignUpPage';
import SignInPage from './user/authorization/SignInPage';
import { ChakraProvider } from "@chakra-ui/react"
import {Switch, BrowserRouter as Router, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ChakraProvider>
          <Router>
            <Switch>
              <Route exact path="/auth">
                  <AllowPage></AllowPage>
              </Route>
              <Route exact path="/signin">
                  <SignInPage></SignInPage>
              </Route>
              <Route exact path="/signup">
                  <SignUpPage></SignUpPage>
              </Route>
            </Switch>
          </Router>
        </ChakraProvider>
      </header>
    </div>
  );
}

export default App;
