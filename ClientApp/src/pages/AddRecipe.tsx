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
import { useHistory } from "react-router";

gql`
  mutation NewRecipe($inputs: RecipeInput!) {
    newRecipe(recipe: $inputs)
  }
`;

const AddRecipe = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState([""]);
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
        <Box component="form" onSubmit={() => {}} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField required fullWidth label="Recipe Name" />
            </Grid>
            <Grid item xs={12}>
              <TextField fullWidth label="Description" />
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ mb: 1, textDecoration: "underline" }}
                >
                  Steps:
                </Typography>
              </Grid>
              {steps.map((step, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mb: 2,
                    }}
                    key={`step-${i}-grid`}
                  >
                    <TextField
                      required={i === 0}
                      fullWidth
                      label={`Step ${i + 1}`}
                      value={step}
                      onChange={(e) => {
                        let newSteps = [...steps];
                        newSteps[i] = e.currentTarget.value;
                        setSteps(newSteps);
                      }}
                      key={`step-${i}-input`}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={() => setSteps((oldSteps) => [...oldSteps, ""])}
                >
                  Add Step
                </Button>
              </Grid>
            </Grid>
            <Grid item container xs={12}>
              <Grid item xs={12}>
                <Typography
                  component="h3"
                  variant="body1"
                  sx={{ mb: 1, textDecoration: "underline" }}
                >
                  Ingredients:
                </Typography>
              </Grid>
              {ingredients.map((ingredient, i) => {
                return (
                  <Grid
                    item
                    xs={12}
                    sx={{
                      mb: 2,
                    }}
                    key={`ingredient-${i}-grid`}
                  >
                    <TextField
                      required={i === 0}
                      fullWidth
                      label={`Ingredient ${i + 1}`}
                      value={ingredient}
                      onChange={(e) => {
                        let newIngredients = [...ingredients];
                        newIngredients[i] = e.currentTarget.value;
                        setIngredients(newIngredients);
                      }}
                      key={`ingredient-${i}-input`}
                    />
                  </Grid>
                );
              })}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={() => setIngredients((old) => [...old, ""])}
                >
                  Add Ingredient
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Prep Time"
                placeholder="E.g. 1h 10m"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cook Time"
                placeholder="E.g. 4h 30m"
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onSubmit={(e) => e.preventDefault()}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default AddRecipe;
