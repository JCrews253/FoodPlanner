import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useSaveRecipeMutation } from "../gql";

gql`
  mutation SaveRecipe($recipeId: String!) {
    saveRecipe(recipeId: $recipeId)
  }
`;

interface RecipeCardProps {
  id: string;
  name: string;
  photo?: string;
  description: string;
  saved?: boolean;
}

const RecipeCard = ({
  id,
  name,
  photo,
  description,
  saved,
}: RecipeCardProps) => {
  const { isLoading, mutate } = useSaveRecipeMutation<Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        console.log("save success");
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );
  return (
    <Card
      sx={{ maxWidth: 500, margin: 2, overflow: "unset", width: "100%" }}
      id="card"
    >
      <CardActionArea>
        <Box
          sx={{
            backgroundColor: "lightgrey",
            height: "250px",
            overflow: "hidden",
            display: "flex",
          }}
        >
          <CardMedia
            component="img"
            alt="green iguana"
            image={photo ?? ""}
            sx={{
              width: "100%",
              margin: "0 auto",
            }}
          />
        </Box>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={() => mutate({ recipeId: id })}>
          {saved ? "Unsave" : "Save"}
        </Button>
        <Button size="small">Add to Calendar</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;