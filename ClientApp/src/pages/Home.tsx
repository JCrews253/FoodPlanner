import { useAuth0 } from "@auth0/auth0-react";
import { Box } from "@mui/material";
import gql from "graphql-tag";
import { useEffect } from "react";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import RecipeCard from "../components/RecipeCard";
import RecipeCardSkeleton from "../components/Skeletons/RecipeCardSkeleton";
import { useAllRecipesQuery, useSavedRecipeIdsQuery } from "../gql";

gql`
  query AllRecipes {
    recipes {
      recipeId
      name
      photos
      description
    }
  }

  query savedRecipeIds {
    myRecipes {
      recipeId
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

  useEffect(() => {
    refetch();
  }, [isAuthenticated, refetch]);

  return (
    <Box
      id="box"
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
      }}
    >
      {isLoading
        ? new Array(19).fill("").map(() => {
            return <RecipeCardSkeleton />;
          })
        : data?.recipes.map((r) => {
            return (
              <RecipeCard
                id={r.recipeId}
                name={r.name}
                photo={
                  r.photos.length > 0
                    ? r.photos[0]
                    : "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                }
                onSave={refetch}
                saved={
                  myRecipes?.myRecipes.some((m) => m.recipeId === r.recipeId) ??
                  false
                }
              />
            );
          })}
    </Box>
  );
};

export default Home;
