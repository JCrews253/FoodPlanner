import { GraphQLClient } from "graphql-request";

const graphqlRequestClient = (token: string) =>
  new GraphQLClient(
    process.env.NODE_ENV === "development"
      ? "https://localhost:44360/graphql"
      : "https://foodplanner20211113152303.azurewebsites.net/graphql",
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

export default graphqlRequestClient;
