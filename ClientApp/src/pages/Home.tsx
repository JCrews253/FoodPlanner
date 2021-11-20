import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import LoadingIndicator from "../components/LoadingIndicator";
import RecipeCard from "../components/RecipeCard";
import { useAllRecipesQuery, useSavedRecipeIdsQuery } from "../gql";

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
  const { isAuthenticated } = useAuth0();
  const { data: myRecipes, refetch } = useSavedRecipeIdsQuery(
    GraphqlRequestClient(),
    undefined,
    {
      enabled: isAuthenticated,
    }
  );
  const { data, isLoading } = useAllRecipesQuery(GraphqlRequestClient());

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
