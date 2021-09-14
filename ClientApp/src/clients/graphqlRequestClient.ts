import { GraphQLClient } from "graphql-request";
import { useRecoilState } from "recoil";
import { AuthTokens } from "../state/state";

const token = useRecoilState(AuthTokens.access);

const requestHeaders = {
  authorization: `Bearer ${token}`,
};

const graphqlRequestClient = new GraphQLClient(
  "https://localhost:44360/graphql",
  {
    headers: requestHeaders,
  }
);

export default graphqlRequestClient;
