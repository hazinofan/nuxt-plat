import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  vite: {
    build: {
      rollupOptions: {
        output: {
          compact: true,
        },
      },
    },
  },
  runtimeConfig: {
    public: {
      ENGINE_URL: process.env.NUXT_PUBLIC_BACKEND_URL,
    },
  },
  nitro: {
    preset: 'netlify-edge', 
    compressPublicAssets: true,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: "fr",
      },
      title: "Platinium IPTV",
      link: [
        { rel: 'icon', href: '/assets/favicon.png' },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Inria+Sans:ital,wght@0,300;0,400;0,700;1,300;1,400;1,700&display=swap",
        }
      ]
    }
  },
  css: ['~/assets/css/main.css', 'primeicons/primeicons.css'],
  devtools: { enabled: true },
  modules: [
    '@primevue/nuxt-module',
    '@pinia/nuxt',
    '@nuxt/image'
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
    "@modules": "./core/modules"
  }
})