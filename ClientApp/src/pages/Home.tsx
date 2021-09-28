import { Box } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeCard from "../components/RecipeCard";
import { useAllRecipesQuery, useMyRecipesQuery } from "../gql";

gql`
  query AllRecipes {
    recipes {
      id
      name
      photo
      description
    }
  }

  query savedRecipeIds{
    myRecipes{
      id
    }
  }
`;

const Home = () => {
  const { data, isLoading } = useAllRecipesQuery(graphqlRequestClient);
  const { data: myRecipes } = useMyRecipesQuery(graphqlRequestClient);
  return (
    <Box
      id="box"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        data?.recipes.map((r) => {
          return (
            <RecipeCard
              id={r?.id ?? ""}
              name={r?.name ?? "name"}
              description={r?.description ?? "description"}
              photo={
                r?.photo ??
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
              saved={myRecipes?.myRecipes.}
            />
          );
        })
      )}
    </Box>
  );
};

export default Home;
