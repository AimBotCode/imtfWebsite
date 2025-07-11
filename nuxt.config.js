import serverMiddleware from "./server/middlewares/api";

export default {
  serverMiddleware,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "imtftrade",
    htmlAttrs: {
      lang: "en",
    },
    meta: [
      { charset: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    script: [],
    bodyAttrs: {
      "data-layout": "horizontal",
    },
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    "~/assets/css/bootstrap.css",
    "~/assets/css/icons.css",
    "~/assets/css/app.css",
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~/plugins/chart.js", mode: "client" },
    { src: "~/plugins/doughnut.js", mode: "client" },
    "~/plugins/utils.js",
    "~/plugins/xhr.js",
    "~/plugins/imtf.js",
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    "@nuxtjs/eslint-module",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    "nuxt-highcharts",
    ["cookie-universal-nuxt", { alias: "cookies" }],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    proxy: true,
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    extend(config, ctx) {
      config.node = {
        fs: "empty",
        child_process: "empty",
      };
    },
  },

  publicRuntimeConfig: {
    baseURL: "",
    env: process.env.NODE_ENV,
    API_URL: process.env.API_URL,
  },
  privateRuntimeConfig: {},

  router: {
    middleware: ["auth"],
  },
};
