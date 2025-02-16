import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  app:{
    head:{
      title:"Platinium IPTV",
      link: [
        { rel: 'icon', href: '/images/favicon.png' },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
        }
      ]
    }
  },
  compatibilityDate: '2024-04-03',
  css: ['~/assets/css/main.css','primeicons/primeicons.css'],
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt'
  ],
  primevue: {
      options: {
          theme: {
              preset: Aura
          }
      }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  alias: {
    "@core": "./core",
    "@types": "./core/types",
    "@services": "./core/services",
    "@stores": "./stores",
    "@modules":"./core/modules"
  }
})