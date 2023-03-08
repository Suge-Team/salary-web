const metaDescription = "Thống kê lương ngành IT, công nghệ thông tin ở các công ty FPT, Tiki, Viettel, Vin... với đa dạng vị trí, lĩnh vực và số năm kinh nghiệm";

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
  sitemap: {
    hostname: "https://luongthang.net",
    exclude: [
      "/admin",
      "/admin/**",
    ],
    routes: async () => {
      const res = await $fetch("https://server.luongthang.net/companies")
      return res.companies.map(company => `/companies/${company.slug}`)
    },
    defaults: {
      changefreq: "weekly",
      lastmod: new Date().toISOString(),
    },
  },
  robots: {
    rules: {
      UserAgent: "*",
      Disallow: "/admin",
    }
  },
  plugins: ["~/plugins/vue-gtag.client.ts"],
  googleFonts: {
    families: {
      Inter: [100, 200, 300, 400, 500, 600, 700, 800, 900],
    },
    useStylesheet: false,
  },
  app: {
    head: {
      title: "Lương Tháng - Lương IT tại Việt Nam",
      link: [{ rel: "icon", type: "image/png", href: "favicon.png" }],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: metaDescription,
        },
        { property: "og:title", content: "Lương Tháng - Lương IT tại Việt Nam" },
        { property: "og:image", content: "/meta_image.jpg" },
        {
          property: "og:description",
          content: metaDescription,
        },
        { property: "twitter:title", content: "Lương Tháng - Lương IT tại Việt Nam" },
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
