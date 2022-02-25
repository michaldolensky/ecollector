declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: string;
    VUE_ROUTER_MODE: "hash" | "history" | "abstract" | undefined;
    VUE_ROUTER_BASE: string | undefined;
    DEV: string;
    GRAPHQL_URL: string;
    SERVER_URL: string;
    SERVER_URL_API: string;
    MODE: string;
  }
}
