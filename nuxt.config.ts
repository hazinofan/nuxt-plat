import Aura from '@primevue/themes/aura';

export default defineNuxtConfig({
  ssr: false,
  site: { 
    url: 'https://platinium-iptv.com', 
    name: 'PLATINIUM IPTV' 
    }, 
   
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
      siteUrl: 'https://platinium-iptv.com', // ✅ Correctly defined site URL
    },
  },
  nitro: {
    prerender: {
      routes: ['/produits', '/', '/test-gratuit', '/blogs', '/login'], // Add important SEO pages here
    },
    preset: 'static',
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
    '@nuxt/image',
    'nuxt-simple-sitemap',
  ],
  sitemap: {
    exclude: ['/dashboard/**'],
    dynamicUrlsApiEndpoint: '/api/sitemap-dynamic',
  },
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
    "@services": "./coreservices",
    "@stores": "./stores",
    "@modules": "./core/modules"
  }
});

