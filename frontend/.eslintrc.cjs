/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");
module.exports = {
  ignorePatterns: ["/src/stories/example/*.**", "**/*.operations.ts"],
  root: true,

  extends: [
    "plugin:vue/vue3-recommended",
    "eslint:recommended",

    "@vue/eslint-config-typescript/recommended",

    "@vue/eslint-config-prettier",
    "plugin:@intlify/vue-i18n/recommended",
  ],

  globals: {
    ga: "readonly", // Google Analytics
    cordova: "readonly",
    __statics: "readonly",
    __QUASAR_SSR__: "readonly",
    __QUASAR_SSR_SERVER__: "readonly",
    __QUASAR_SSR_CLIENT__: "readonly",
    __QUASAR_SSR_PWA__: "readonly",
    process: "readonly",
    Capacitor: "readonly",
    chrome: "readonly",
  },
  env: {
    browser: true,
    "vue/setup-compiler-macros": true,
  },
  // add your custom rules here
  rules: {
    "prefer-promise-reject-errors": "off",
    //i18n
    "@intlify/vue-i18n/no-unused-keys": "warn",
    "@intlify/vue-i18n/no-missing-keys-in-other-locales": "warn",

    // allow debugger during development only
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",

    "vue/component-tags-order": [
      "error",
      {
        order: ["script", "template", "style"],
      },
    ],
  },
  overrides: [
    {
      files: ["./src/pages/Error-401.vue", "./src/pages/Error-404.vue"],
      rules: {
        "@intlify/vue-i18n/no-raw-text": "off",
      },
    },
    {
      files: ["./src/modules/catalog/pages/CatalogItemDetail.vue"],
      rules: {
        "vue/no-v-html": "off",
      },
    },
  ],
  settings: {
    "vue-i18n": {
      localeDir: "./src/i18n/*.json",
    },
  },
};
