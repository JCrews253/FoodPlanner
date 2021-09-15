import React, { useState } from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import SignIn from "./pages/SignIn";
import { AuthStatus } from "./state/state";

const App = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <Layout>
      <Route path="/" render={() => (loggedIn ? <Home /> : <SignIn />)} />
      <Route path="/signin" component={SignIn} />
      <Route path="/counter" render={() => <Counter />} />
      <Route path="/fetch-data" render={() => <FetchData />} />
    </Layout>
  );
};

export default App;
