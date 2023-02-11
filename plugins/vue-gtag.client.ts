import VueGtag, { trackRouter } from 'vue-gtag-next'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: process.env.GA_MEASUREMENT_ID,
    }
  })
  trackRouter(useRouter())
})
