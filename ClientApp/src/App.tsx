import React from "react";
import { Route } from "react-router";
import { useRecoilValue } from "recoil";
import { Home } from "./components/Home";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import SignUp from "./pages/SignUp";
import { AuthStatus } from "./state/state";
import MyRecipes from "./pages/MyRecipes";

const App = () => {
  const loggedIn = useRecoilValue(AuthStatus.loggedIn);

  return (
    <Layout>
      <Route path="/login" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/addrecipe" component={AddRecipe} />
      <Route path="/myrecipes" component={MyRecipes} />
      <Route path="/recipe/:recipeId" component={Recipe} />
      <Route exact path="/" component={loggedIn ? Home : Login} />
    </Layout>
  );
};

export default App;
