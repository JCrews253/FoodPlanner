import { GraphQLClient } from "graphql-request";

const requestHeaders = {
  authorization: "Bearer TOKEN",
};

const graphqlRequestClient = new GraphQLClient(
  "https://localhost:44360/graphql",
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
