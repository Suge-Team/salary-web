const metaDescription = "Thống kê lương ngành IT, công nghệ thông tin ở các công ty tại Việt Nam";

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
  modules: ["@nuxtjs/google-fonts", "@nuxtjs/robots", "@funken-studio/sitemap-nuxt-3"],
  plugins: ["~/plugins/vue-gtag.client.ts"],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    useStylesheet: false,
  },
  app: {
    head: {
      title: "Lương Tháng",
      link: [{ rel: "icon", type: "image/png", href: "favicon.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: metaDescription,
        },
        { property: "og:title", content: "Lương Tháng" },
        { property: "og:image", content: "/meta_image.jpg" },
        {
          property: "og:description",
          content: metaDescription,
        },
        { property: "twitter:title", content: "Lương Tháng" },
        { property: "twitter:image", content: "/meta_image.jpg" },
        { property: "twitter:card", content: "summary_large_image" },
        {
          property: "twitter:description",
          content: metaDescription,
        },
      ],
    },
  },
});
