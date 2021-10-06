import { GraphQLClient } from "graphql-request";

const graphqlRequestClient = (token: string) =>
  new GraphQLClient("https://localhost:44360/graphql", {
    headers: {
      authorization: `Bearer ${token}`,
    },
  });

export default graphqlRequestClient;
