import { GraphQLClient } from "graphql-request";
import { useRecoilValue } from "recoil";
import { AuthTokens } from "../state/state";

export const GraphqlRequestClient = () => {
  const accessToken = useRecoilValue(AuthTokens.access);

  return new GraphQLClient(
    process.env.NODE_ENV === "development"
      ? "https://localhost:44360/graphql"
      : "https://foodplanner20211113152303.azurewebsites.net/graphql",
    {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    }
  );
};
