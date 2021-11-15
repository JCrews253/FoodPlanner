import { Box } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeCard from "../components/RecipeCard";
import { useAllRecipesQuery, useSavedRecipeIdsQuery } from "../gql";
import { GraphQLClient } from "graphql-request";
import { useRecoilValue } from "recoil";
import { AuthTokens } from "../state/state";

gql`
  query AllRecipes {
    recipes {
      id
      name
      photo
      description
    }
  }

  query savedRecipeIds {
    myRecipes {
      id
    }
  }
`;

const Home = () => {
  const accessToken = useRecoilValue(AuthTokens.access);
  const { data: myRecipes, refetch } = useSavedRecipeIdsQuery(
    graphqlRequestClient(accessToken)
  );
  const { data, isLoading } = useAllRecipesQuery(
    graphqlRequestClient(accessToken)
  );

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
              id={r.id}
              name={r.name}
              description={r.description}
              photo={
                r.photo ??
                "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
              }
              onSave={refetch}
              saved={myRecipes?.myRecipes.some((m) => m.id === r.id) ?? false}
            />
          );
        })
      )}
    </Box>
  );
};

export default Home;
