import type { ApolloClientOptions } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';

export const getClientOptions = () => <ApolloClientOptions<unknown>>Object.assign(
  <ApolloClientOptions<unknown>>{
    link: createHttpLink({
      credentials: 'include',
      uri:
        process.env.GRAPHQL_URI
        || 'http://localhost:3000/api/graphql',
    }),
    cache: new InMemoryCache(),
    connectToDevTools: process.env.NODE_ENV === 'development',
  },
);
