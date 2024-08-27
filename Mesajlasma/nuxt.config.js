// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  pages: [
    { path: '/api/login', handler: '~/middleware/api/login.js' }
  ],

  modules: ['@pinia/nuxt']
}
  


)

