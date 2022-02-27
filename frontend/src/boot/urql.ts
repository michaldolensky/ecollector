import { devtoolsExchange } from "@urql/devtools";
import { multipartFetchExchange } from "@urql/exchange-multipart-fetch";
import urql, { createClient, defaultExchanges } from "@urql/vue";
import { boot } from "quasar/wrappers";

import { localStorageTokenKey } from "src/stores/auth";

const getToken = () => {
  return localStorage.getItem(localStorageTokenKey);
};

const client = createClient({
  url: process.env.GRAPHQL_URL,
  exchanges: [devtoolsExchange, multipartFetchExchange, ...defaultExchanges],
  fetchOptions: () => {
    const token = getToken();
    return {
      headers: { authorization: token ? `Bearer ${token}` : "" },
    };
  },
});

export default boot(({ app }) => {
  app.use(urql, client);
});
