import {
  ApolloClient, createHttpLink, InMemoryCache,
} from '@apollo/client/core';
import { DefaultApolloClient } from '@vue/apollo-composable';
import { boot } from 'quasar/wrappers';
import { localStorageTokenKey } from 'src/stores/auth';

const token = localStorage.getItem(localStorageTokenKey) ?? '';

export default boot(
  ({ app }) => {
    const apolloClient = new ApolloClient({
      link: createHttpLink({
        credentials: 'include',
        headers: {
          authorization: `Bearer ${token}`,
        },
        uri:
          process.env.GRAPHQL_URI
          || 'http://localhost:3000/api/graphql',
      }),
      cache: new InMemoryCache({
        addTypename: false,
      }),
      connectToDevTools: process.env.NODE_ENV === 'development',
    });

    app.provide(DefaultApolloClient, apolloClient);
  },
);
