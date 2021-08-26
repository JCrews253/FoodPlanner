import gql from "graphql-tag";
import { useUsersQuery } from "../gql";
import React from "react";

gql`
  query Users($id: ID!) {
    user(id: $id) {
      ... on User {
        id
      }
    }
  }
`;

const Test = () => {
  const users = useUsersQuery({
    variables: {
      id: "",
    },
  });
  return <h1>test component</h1>;
};

export default Test;
