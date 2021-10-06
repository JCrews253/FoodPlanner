import React from "react";
import gql from "graphql-tag";
import { useParams } from "react-router";
import graphqlRequestClient from "../clients/graphqlRequestClient";
import { useGetRecipeQuery } from "../gql";
import { Box, Container, Grid, Typography } from "@mui/material";
import LoadingIndicator from "../components/LoadingIndicator";
import InvalidUrl from "../components/InvalidUrl";
import { useRecoilValue } from "recoil";
import { AuthTokens } from "../state/state";

gql`
  query GetRecipe($recipeId: String!) {
    recipe(recipeId: $recipeId) {
      name
      photo
      description
      times {
        name
        time
      }
      ingredients {
        amount
        ingredient
        unit
      }
      steps
      tags
    }
  }
`;

interface RecipeRouterParams {
  recipeId: string;
}

const Recipe = () => {
  const accessToken = useRecoilValue(AuthTokens.access);
  const { recipeId } = useParams<RecipeRouterParams>();
  const { data, isLoading } = useGetRecipeQuery(
    graphqlRequestClient(accessToken),
    {
      recipeId: recipeId,
    }
  );
  console.log({ data });
  return (
    <>
      {isLoading ? (
        <LoadingIndicator />
      ) : data?.recipe === null ? (
        <InvalidUrl />
      ) : (
        <Box id="my-box" sx={{ width: "100%" }}>
          <Container
            sx={{
              marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              maxWidth: "680px !important",
            }}
          >
            <Typography
              sx={{
                alignSelf: "left",
                width: "100%",
                pb: 2,
              }}
              variant="h4"
            >
              {data?.recipe?.name}
            </Typography>
            <Box>
              <img
                style={{ maxWidth: "100%", maxHeight: "100%" }}
                src={
                  data?.recipe?.photo ??
                  "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                }
              />
            </Box>
            <Typography
              sx={{
                alignSelf: "left",
                width: "100%",
                pb: 2,
                pt: 1,
              }}
              variant="body1"
            >
              {data?.recipe?.description}
            </Typography>
            <Grid
              container
              sx={{
                justifyContent: "center",
                "&:last-child": {
                  border: "solid 3px red",
                },
              }}
              rowSpacing={0}
              columnSpacing={0}
            >
              {data?.recipe?.times.map((r, idx) => {
                return (
                  <Grid item>
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        borderLeft: idx === 0 ? "solid 1px grey" : "none",
                        borderRight: "solid 1px grey",
                        padding: 1,
                      }}
                    >
                      <Typography variant="body1">{r.name}:</Typography>
                      <Typography variant="body1">{r.time}</Typography>
                    </Box>
                  </Grid>
                );
              })}
            </Grid>
            <Typography
              sx={{
                alignSelf: "left",
                width: "100%",
                pt: 2,
              }}
              variant="h6"
            >
              Ingredients:
            </Typography>
            {data?.recipe?.ingredients.map((i, idx) => {
              return (
                <Typography
                  sx={{
                    alignSelf: "left",
                    width: "100%",
                    pt: 1,
                    pl: 3,
                  }}
                  variant="body1"
                >{`${idx + 1}) ${i.amount} ${i?.unit} ${
                  i.ingredient
                }`}</Typography>
              );
            })}
            <Typography
              sx={{
                alignSelf: "left",
                width: "100%",
                pt: 2,
              }}
              variant="h6"
            >
              Steps:
            </Typography>
            {data?.recipe?.steps.map((s, idx) => {
              return (
                <Typography
                  sx={{
                    alignSelf: "left",
                    width: "100%",
                    pt: 1,
                    pl: 3,
                  }}
                  variant="body1"
                >{`${idx + 1}) ${s}`}</Typography>
              );
            })}
            <Box
              sx={{
                display: "flex",
                width: "100%",
                alignItems: "center",
                pt: 4,
                pb: 4,
              }}
            >
              <Typography variant="h6">Tags:</Typography>
              {data?.recipe?.tags.map((t, idx) => {
                return (
                  <Box
                    sx={{
                      border: "solid 1px black",
                      borderRadius: "30px",
                      ml: 2,
                      pt: 0.5,
                      pb: 0.5,
                      pl: 2,
                      pr: 2,
                    }}
                  >
                    <Typography variant="body1">{t}</Typography>
                  </Box>
                );
              })}
            </Box>
          </Container>
        </Box>
      )}
    </>
  );
};

export default Recipe;
