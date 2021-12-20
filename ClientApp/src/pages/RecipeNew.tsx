import { Box, Typography } from "@mui/material";
import { useParams } from "react-router";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import TimeDisplay from "../components/TimeDisplay";
import { useGetRecipeQuery } from "../gql";

interface RecipeRouterParams {
  recipeId: string;
}

const RecipeNew = () => {
  const { recipeId } = useParams<RecipeRouterParams>();
  const { data, isLoading } = useGetRecipeQuery(GraphqlRequestClient(), {
    recipeId: recipeId ?? "",
  });
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        maxWidth: 1920,
        width: "100%",
      }}
    >
      <img
        style={{
          width: "100%",
          maxWidth: "1920px",
          height: "200px",
          objectFit: "cover",
        }}
        src={
          data?.recipe?.photo ??
          "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        }
        alt="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          padding: "20px",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700 }}>
          {data?.recipe?.name}
        </Typography>
        <TimeDisplay times={data?.recipe?.times ?? []} />
      </Box>
    </Box>
  );
};

export default RecipeNew;
