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
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
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

interface RecipeRouterParams {
  recipeId: string;
}

const Recipe = () => {
  const { recipeId } = useParams<RecipeRouterParams>();
  const { data } = useGetRecipeQuery(GraphqlRequestClient(), {
    recipeId: recipeId ?? "",
  });

  const { isAuthenticated } = useAuth0();
  const { data: savedRecipes, refetch } = useSavedRecipeIdsQuery(
    GraphqlRequestClient(),
    undefined,
    {
      enabled: isAuthenticated,
    }
  );
  const { mutate } = useSaveRecipeMutation(GraphqlRequestClient(), {
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
        <img
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
              <IconButton onClick={() => mutate({ recipeId: recipeId })}>
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
