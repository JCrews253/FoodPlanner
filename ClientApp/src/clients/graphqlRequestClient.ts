import { GraphQLClient } from "graphql-request";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { AuthTokens } from "../state/state";

var GqlClient: GraphQLClient = new GraphQLClient(
  process.env.NODE_ENV === "development"
    ? "https://localhost:44360/graphql"
    : "https://foodplanner20211113152303.azurewebsites.net/graphql"
);

export const GraphqlRequestClient = () => {
  const accessToken = useRecoilValue(AuthTokens.access);
  useEffect(() => {
    GqlClient.setHeader("authorization", `Bearer ${accessToken}`);
  }, [accessToken]);

  return GqlClient;
};
