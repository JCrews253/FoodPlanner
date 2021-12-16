import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import gql from "graphql-tag";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GraphqlRequestClient } from "../clients/GraphqlRequestClient";
import AddImage from "../components/buttons/AddImage";
import { RecipeTimeInput, useNewRecipeMutation } from "../gql";

gql`
  mutation NewRecipe($inputs: RecipeInput!) {
    newRecipe(recipe: $inputs)
  }
`;

const AddRecipe = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [steps, setSteps] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [cookTime, setCookTime] = useState<RecipeTimeInput>({
    name: "Cook Time",
    time: "",
  });
  const [prepTime, setPrepTime] = useState<RecipeTimeInput>({
    name: "Prep Time",
    time: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const { isLoading, mutate: newRecipeMutation } = useNewRecipeMutation(
    GraphqlRequestClient(),
    { onSuccess: () => history.push("/") }
  );

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          New Recipe
        </Typography>
        <Box sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                autoFocus
                label="Recipe Name"
                onChange={(e) => setName(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                onChange={(e) => setDescription(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <AddImage
                image={image}
                setImage={(newImage) => setImage(newImage)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                label="Steps"
                value={steps}
                onChange={(e) => setSteps(e.currentTarget.value)}
                placeholder="Put each step on a new line."
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                multiline
                label="Ingredients"
                placeholder="Put each ingredient on a new line."
                value={ingredients}
                onChange={(e) => setIngredients(e.currentTarget.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prep Time"
                placeholder="E.g. 1h 10m"
                onChange={(e) =>
                  setPrepTime({
                    name: "Prep Time",
                    time: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
                label="Cook Time"
                placeholder="E.g. 4h 30m"
                onChange={(e) =>
                  setCookTime({
                    name: "Cook Time",
                    time: e.currentTarget.value,
                  })
                }
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Tags"
                placeholder="Italian, Pizza"
                onChange={(e) => setTags(e.currentTarget.value.split(","))}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={
              isLoading ||
              name === "" ||
              steps === "" ||
              ingredients === "" ||
              cookTime.time === ""
            }
            onClick={() => {
              newRecipeMutation({
                inputs: {
                  name: name,
                  description: description,
                  steps: steps.split(/\r?\n/),
                  ingredients: ingredients.split(/\r?\n/),
                  times: [prepTime, cookTime],
                  photo: image,
                  tags: tags,
                },
              });
            }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddRecipe;
