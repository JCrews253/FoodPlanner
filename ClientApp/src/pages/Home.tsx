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

  useEffect(() => {
    refetch();
  }, [isAuthenticated]);

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
                id={r.id}
                name={r.name}
                photo={
                  r.photo ??
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                }
                onSave={refetch}
                saved={myRecipes?.myRecipes.some((m) => m.id === r.id) ?? false}
              />
            );
          })}
    </Box>
  );
};

export default Home;
