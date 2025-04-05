// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  css: ["@/assets/css/main.css"],
  devtools: { enabled: true },
  compatibilityDate: "2025-04-05",
});