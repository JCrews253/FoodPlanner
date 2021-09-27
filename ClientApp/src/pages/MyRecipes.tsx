import { Box } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeCard from "../components/RecipeCard";
import { useMyRecipesQuery } from "../gql";

gql`
  query MyRecipes {
    myRecipes {
      name
      photo
      description
    }
  }
`;

const MyRecipes = () => {
  const { data, isLoading } = useMyRecipesQuery(graphqlRequestClient);
  console.log({ data });
  return (
    <Box
      id="box"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* <LoadingIndicator /> */}
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        data?.myRecipes.map((r) => {
          return (
            <RecipeCard
              name={r?.name ?? "name"}
              description={r?.description ?? "description"}
              photo={
                r?.photo ??
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
            />
          );
        })
      )}
    </Box>
  );
};

export default MyRecipes;
