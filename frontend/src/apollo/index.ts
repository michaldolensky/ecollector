import type { ApolloClientOptions } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';
import { localStorageTokenKey } from 'src/module/useAuth';

const token = localStorage.getItem(localStorageTokenKey) ?? '';

export const getClientOptions = () => <ApolloClientOptions<unknown>>Object.assign(
  <ApolloClientOptions<unknown>>{
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
  },
);
