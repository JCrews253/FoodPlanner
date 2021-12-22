import { Box } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import { GraphqlClient } from "../clients/GraphqlClient";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeCard from "../components/RecipeCard";
import { useMyRecipesQuery } from "../gql";

gql`
  query MyRecipes {
    myRecipes {
      recipeId
      name
      photos
      description
    }
  }
`;

const MyRecipes = () => {
  const { data, isLoading, refetch } = useMyRecipesQuery(GraphqlClient());
  return (
    <Box
      id="box"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        height: "100%",
      }}
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        data?.myRecipes.map((r) => {
          return (
            <RecipeCard
              id={r.recipeId}
              name={r.name}
              photo={
                r.photos.length > 0
                  ? r.photos[0]
                  : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
              saved
              onSave={refetch}
            />
          );
        })
      )}
    </Box>
  );
};

export default MyRecipes;
