import gql from "graphql-tag";
import { useGetRecipesQuery } from "../gql";
import React from "react";

gql`
  query GetRecipes {
    GetRecipes {
      id
      name
      description
    }
  }
`;

const Test = () => {
  const recipes = useGetRecipesQuery();
  return <h1>test component</h1>;
};

export default Test;
