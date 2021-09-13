import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

const baseUrl = document.getElementsByTagName("base")[0].getAttribute("href");
const rootElement = document.getElementById("root");

const apolloClient = new ApolloClient({
  uri: "https://localhost:44360/graphql",
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={apolloClient}>
    <BrowserRouter basename={baseUrl}>
      <App />
    </BrowserRouter>
  </ApolloProvider>,
  rootElement
);

registerServiceWorker();
