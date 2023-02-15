// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
      gaMeasurementId: process.env.GA_MEASUREMENT_ID,
    },
  },
  ssr: false,
  typescript: {
    shim: false,
  },
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/robots", "@nuxtjs/sitemap"],
  plugins: ['~/plugins/vue-gtag.client.ts'],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    useStylesheet: false,
  },
  app: {
    head: {
      title: 'Lương Tháng',
      link: [{rel: 'icon', type: 'image/png', href: "favicon.png"}]
    }
  }
});
