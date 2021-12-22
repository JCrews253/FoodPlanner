import {
  Box,
  Chip,
  Divider,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useParams } from "react-router";
import { GraphqlClient } from "../clients/GraphqlClient";
import {
  useGetRecipeQuery,
  useSavedRecipeIdsQuery,
  useSaveRecipeMutation,
} from "../gql";
import SaveIcon from "@mui/icons-material/BookmarkBorder";
import SavedIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import TimeIcon from "@mui/icons-material/AccessTime";
import { useAuth0 } from "@auth0/auth0-react";
import ImageStack from "../components/ImageStack";

interface RecipeRouterParams {
  recipeId: string;
}

const Recipe = () => {
  const { recipeId } = useParams<RecipeRouterParams>();
  const { data } = useGetRecipeQuery(GraphqlClient(), {
    recipeId: recipeId ?? "",
  });

  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const { data: savedRecipes, refetch } = useSavedRecipeIdsQuery(
    GraphqlClient(),
    undefined,
    {
      enabled: isAuthenticated,
    }
  );
  const { mutate } = useSaveRecipeMutation(GraphqlClient(), {
    onSuccess: () => {
      refetch();
    },
  });

  const recipeSaved =
    savedRecipes?.myRecipes.some((r) => r.recipeId === recipeId) ?? false;

  return (
    <Paper
      sx={{
        maxWidth: "960px",
        width: "100%",
        height: "fit-content",
        margin: (theme) => theme.spacing(4),
        borderRadius: (theme) => theme.spacing(2),
        padding: (theme) => theme.spacing(5),
      }}
    >
      <Box display="flex">
        {/* <img
          style={{
            width: "100%",
            maxWidth: "320px",
            maxHeight: "220px",
            objectFit: "cover",
            borderRadius: "16px",
          }}
          src={
            data?.recipe?.photo ??
            "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
          }
          alt="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
        /> */}
        <ImageStack
          images={[
            "https://images.everydayhealth.com/images/diet-nutrition/34da4c4e-82c3-47d7-953d-121945eada1e00-giveitup-unhealthyfood.jpg?w=1110",
            "https://static01.nyt.com/images/2021/01/26/well/well-foods-microbiome/well-foods-microbiome-superJumbo.jpg",
            "https://images.squarespace-cdn.com/content/v1/53b839afe4b07ea978436183/1608506169128-S6KYNEV61LEP5MS1UIH4/traditional-food-around-the-world-Travlinmad.jpg?format=1000w",
            "https://ychef.files.bbci.co.uk/1600x900/p04tx3m6.webp",
          ]}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            paddingLeft: (theme) => theme.spacing(5),
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "start",
              height: "fit-content",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
              }}
            >
              {data?.recipe?.name}
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "nowrap" }}>
              <IconButton>
                <EditIcon />
              </IconButton>
              <IconButton
                color="primary"
                onClick={() => {
                  if (isAuthenticated) {
                    mutate({ recipeId: recipeId });
                  } else {
                    loginWithRedirect();
                  }
                }}
              >
                {recipeSaved ? <SavedIcon /> : <SaveIcon />}
              </IconButton>
            </Box>
          </Box>
          <Box display="flex" sx={{ width: "max-content" }}>
            <TimeIcon sx={{ color: (theme) => theme.palette.text.secondary }} />
            {data?.recipe?.times.map((time) => (
              <Box
                sx={{
                  display: "flex",

                  padding: (theme) => `0px ${theme.spacing(1)}`,
                }}
              >
                <Typography
                  sx={{
                    paddingRight: (theme) => theme.spacing(0.25),
                    color: (theme) => theme.palette.text.secondary,
                  }}
                >
                  {time.name}:
                </Typography>
                <Typography>{time.time}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Divider
        sx={{
          marginTop: (theme) => theme.spacing(5),
          marginBottom: (theme) => theme.spacing(2),
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        Ingredients
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {data?.recipe?.ingredients.map((ingredient) => {
          return (
            <Box sx={{ padding: (theme) => theme.spacing(1) }}>
              {ingredient}
            </Box>
          );
        })}
      </Box>
      <Divider
        sx={{
          marginTop: (theme) => theme.spacing(2),
          marginBottom: (theme) => theme.spacing(2),
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: 600,
        }}
      >
        Steps
      </Typography>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        {data?.recipe?.steps.map((step, idx) => {
          return (
            <Box sx={{ padding: (theme) => theme.spacing(1) }}>
              <Typography color="gray">Step {idx + 1}</Typography>
              <Typography>{step}</Typography>
            </Box>
          );
        })}
      </Box>
      {data?.recipe?.tags && data.recipe.tags.length > 0 && (
        <>
          <Divider
            sx={{
              marginTop: (theme) => theme.spacing(2),
              marginBottom: (theme) => theme.spacing(2),
            }}
          />
          <Stack direction="row" spacing={1}>
            <Typography
              variant="h6"
              sx={{ paddingRight: (theme) => theme.spacing(1) }}
            >
              Tags:
            </Typography>
            {data.recipe.tags.map((tag) => (
              <Chip label={tag} />
            ))}
          </Stack>
        </>
      )}
    </Paper>
  );
};

export default Recipe;
