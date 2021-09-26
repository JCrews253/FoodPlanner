import { GraphQLClient } from "graphql-request";
import { GetCookie } from "../state/CookieJar";

const requestHeaders = {
  authorization: `Bearer ${GetCookie("authenticationAccessToken")}`,
};

const graphqlRequestClient = new GraphQLClient(
  "https://localhost:44360/graphql",
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
