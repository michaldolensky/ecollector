import type { ApolloClientOptions } from '@apollo/client/core';
import { createHttpLink, InMemoryCache } from '@apollo/client/core';

export /* async */ function getClientOptions(
  // /* {app, router, ...} */ options?: Partial<BootFileParams<unknown>>,
) {
  return <ApolloClientOptions<unknown>>Object.assign(
    // General options.
    <ApolloClientOptions<unknown>>{
      link: createHttpLink({
        uri:
          process.env.GRAPHQL_URI
          || 'http://localhost:3000/api/graphql',
      }),

      cache: new InMemoryCache(),
    },

    // Specific Quasar mode options.
    process.env.MODE === 'spa'
      ? {
        //
      }
      : {},
    process.env.MODE === 'ssr'
      ? {
        //
      }
      : {},

    // dev/prod options.
    process.env.DEV
      ? {
        //
      }
      : {},
    process.env.PROD
      ? {
        //
      }
      : {},

    // For ssr mode, when on server.
    process.env.MODE === 'ssr' && process.env.SERVER
      ? {
        ssrMode: true,
      }
      : {},
    // For ssr mode, when on client.
    process.env.MODE === 'ssr' && process.env.CLIENT
      ? {
        ssrForceFetchDelay: 100,
      }
      : {},
  );
}
