import { ApolloClient, ApolloLink, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";
import { DefaultApolloClient } from "@vue/apollo-composable";
import { createUploadLink } from "apollo-upload-client";
import { boot } from "quasar/wrappers";
import { localStorageTokenKey } from "src/stores/auth";

const httpLink = createUploadLink({
  uri: process.env.GRAPHQL_URL,
});
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(localStorageTokenKey);
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink as unknown as ApolloLink),
  cache: new InMemoryCache({
    addTypename: false,
  }),
  connectToDevTools: process.env.NODE_ENV === "development",
});

export default boot(({ app }) => {
  app.provide(DefaultApolloClient, apolloClient);
});
