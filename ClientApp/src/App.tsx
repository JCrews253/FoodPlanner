import React from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import NewRecipe from "./pages/NewRecipe";
import SignUp from "./pages/SignUp";
import { AuthStatus } from "./state/state";

const App = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <Layout>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/newrecipe" component={NewRecipe} />
      <Route exact path="/" component={loggedIn ? Home : Login} />
    </Layout>
  );
};

export default App;
