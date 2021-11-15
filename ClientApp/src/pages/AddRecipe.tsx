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
import { useRecoilValue } from "recoil";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import {
  RecipeIngredientInput,
  RecipeTimeInput,
  useNewRecipeMutation,
} from "../gql";
import { AuthTokens } from "../state/state";

gql`
  mutation NewRecipe($inputs: RecipeInput!) {
    newRecipe(recipe: $inputs)
  }
`;

const AddRecipe = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [photoUrl, setPhotoUrl] = useState(
    "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg"
  );
  const [steps, setSteps] = useState([""]);
  const [ingredients, setIngredients] = useState<RecipeIngredientInput[]>([]);
  const [cookTime, setCookTime] = useState<RecipeTimeInput>({
    name: "Cook Time",
    time: "",
  });
  const [prepTime, setPrepTime] = useState<RecipeTimeInput>({
    name: "Prep Time",
    time: "",
  });
  const [tags, setTags] = useState<string[] | undefined>();
  const accessToken = useRecoilValue(AuthTokens.access);
  const { mutate: newRecipeMutation } = useNewRecipeMutation(
    graphqlRequestClient(accessToken)
  );

  const ConvertToBase64 = async (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log("photo success");
      setPhotoUrl(reader.result as string);
    };
    reader.onerror = () => console.log("photo upload error");
  };

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
              <input
                type="file"
                onChange={(e) => {
                  var files = e.currentTarget.files;
                  if (files && files.length > 0) {
                    var file = files[0];
                    ConvertToBase64(file);
                  }
                }}
              />
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
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, i) => {
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
                        value={ingredient.ingredient}
                        onChange={(e) => {
                          let newIngredients = [...ingredients];
                          newIngredients[i] = {
                            amount: 1.0,
                            ingredient: e.currentTarget.value,
                            unit: "test",
                          };
                          setIngredients(newIngredients);
                        }}
                        key={`ingredient-${i}-input`}
                      />
                    </Grid>
                  );
                })
              ) : (
                <Grid
                  item
                  xs={12}
                  sx={{
                    mb: 2,
                  }}
                  key={`ingredient-1-grid`}
                >
                  <TextField
                    required
                    fullWidth
                    label={`Ingredient 1`}
                    onChange={(e) => {
                      let newIngredients = [
                        ...ingredients,
                        {
                          amount: 1,
                          ingredient: e.currentTarget.value,
                          unit: "test",
                        },
                      ];
                      // newIngredients[i] = e.currentTarget.value;
                      setIngredients(newIngredients);
                    }}
                    key={`ingredient-1-input`}
                  />
                </Grid>
              )}
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  sx={{ mb: 2 }}
                  onClick={() => {
                    setIngredients((old) => [
                      ...old,
                      {
                        amount: 1,
                        ingredient: "",
                        unit: "test",
                      },
                    ]);
                  }}
                >
                  Add Ingredient
                </Button>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                required
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
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => {
              newRecipeMutation({
                inputs: {
                  name: name,
                  description: description,
                  steps: steps,
                  ingredients: ingredients,
                  times: [prepTime, cookTime],
                  photo: photoUrl,
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
