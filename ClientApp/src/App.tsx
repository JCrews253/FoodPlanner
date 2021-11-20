import React, { useEffect } from "react";
import { Route } from "react-router";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import AddRecipe from "./pages/AddRecipe";
import Recipe from "./pages/Recipe";
import MyRecipes from "./pages/MyRecipes";
import LoginNew from "./pages/LoginNew";
import Profile from "./pages/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import { useSetRecoilState } from "recoil";
import { AuthTokens } from "./state/state";

const App = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const setAccessToken = useSetRecoilState(AuthTokens.access);
  useEffect(() => {
    const getUserMetadata = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          audience: "https://dev-r1o3z-ez.us.auth0.com/api/v2/",
          scope: "read:current_user",
        });
        setAccessToken(accessToken);
      } catch {
        console.log("failed to get token");
      }
    };

    if (isAuthenticated) {
      getUserMetadata();
    }
  }, [getAccessTokenSilently, isAuthenticated, setAccessToken]);

  return (
    <Layout>
      <Route path="/login" component={LoginNew} />
      <Route path="/addrecipe" component={AddRecipe} />
      <Route path="/myrecipes" component={MyRecipes} />
      <Route path="/profile" component={Profile} />
      <Route path="/recipe/:recipeId" component={Recipe} />
      <Route path="/home" component={Home} />
      <Route exact path="/" component={Home} />
    </Layout>
  );
};

export default App;
