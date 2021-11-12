import React from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import SignUp from "./pages/SignUp";
import { AuthStatus } from "./state/state";
import MyRecipes from "./pages/MyRecipes";
import LoginNew from "./pages/LoginNew";
import Profile from "./pages/Profile";
import { useAuth0 } from "@auth0/auth0-react";

const App = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);
  const { user, isAuthenticated, isLoading } = useAuth0();
  console.log({ user });
  console.log({ isAuthenticated });
  console.log({ isLoading });
  return (
    <Layout>
      <Route path="/login" component={LoginNew} />
      <Route path="/signup" component={SignUp} />
      <Route path="/addrecipe" component={AddRecipe} />
      <Route path="/myrecipes" component={MyRecipes} />
      <Route path="/profile" component={Profile} />
      <Route path="/recipe/:recipeId" component={Recipe} />

      <Route exact path="/" component={isAuthenticated ? Profile : LoginNew} />
    </Layout>
  );
};

export default App;
