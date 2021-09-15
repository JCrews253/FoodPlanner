import { GraphQLClient } from "graphql-request";
import { AuthTokenAccess } from "../state/state";

const requestHeaders = {
  authorization: `Bearer ${AuthTokenAccess}`,
};

const graphqlRequestClient = new GraphQLClient(
  "https://localhost:44360/graphql",
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
