import React from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import { AuthStatus } from "./state/state";

const App = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <Layout>
      <Route path="/signin" component={SignIn} />
      <Route path="/register" component={Register} />
      <Route path="/counter" render={() => <Counter />} />
      <Route path="/fetch-data" render={() => <FetchData />} />
      <Route exact path="/" render={() => (loggedIn ? <Home /> : <SignIn />)} />
    </Layout>
  );
};

export default App;
