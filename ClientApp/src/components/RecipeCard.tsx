import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React from "react";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useGetRecipeCardInfoQuery } from "../gql";

interface RecipeCardProps {
  name: string;
  photo?: string;
  description: string;
}

const RecipeCard = ({ name, photo, description }: RecipeCardProps) => {
  return (
    <Card
      sx={{ maxWidth: 500, margin: 2, overflow: "unset", width: "100%" }}
      id="card"
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={photo ?? ""}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Save</Button>
        <Button size="small">Add to Calendar</Button>
      </CardActions>
    </Card>
  );
};

export default RecipeCard;
