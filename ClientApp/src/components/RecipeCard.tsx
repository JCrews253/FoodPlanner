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
import { Link } from "react-router-dom";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import { useSaveRecipeMutation } from "../gql";
import LoadingIndicator from "./LoadingIndicator";

gql`
  mutation SaveRecipe($recipeId: String!) {
    saveRecipe(recipeId: $recipeId)
  }
`;

interface RecipeCardProps {
  id: string;
  name: string;
  photo: string;
  saved: boolean;
  onSave?: () => void;
}

const RecipeCard = ({ id, name, photo, saved, onSave }: RecipeCardProps) => {
  const { isLoading, mutate } = useSaveRecipeMutation<Error>(
    GraphqlRequestClient(),
    {
      onSuccess: () => {
        onSave && onSave();
      },
      onError: (error) => {
        console.log({ error });
      },
    }
  );
  return (
    <Card
      sx={{
        maxWidth: 500,
        margin: 2,
        overflow: "unset",
        width: "100%",
        height: "fit-content",
      }}
      id="card"
    >
      <CardActionArea component={Link} to={`/recipe/${id}`}>
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
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button
          size="small"
          onClick={() => mutate({ recipeId: id })}
          disabled={isLoading}
          sx={{ minHeight: "30px" }}
        >
          {isLoading ? (
            <LoadingIndicator size={25} />
          ) : saved ? (
            "Unsave"
          ) : (
            "Save"
          )}
        </Button>
        {/* <Button size="small">Add to Calendar</Button> */}
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
