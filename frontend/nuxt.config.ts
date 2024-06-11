export default defineNuxtConfig({
  modules: ['@pinia/nuxt'],

  runtimeConfig: {
    public: {
      api: 'http://localhost:8080/api',
    },
  },

  experimental: {
    asyncContext: true,
  },

  css: ['~/assets/scss/main.scss'],

  ssr: false,
})
