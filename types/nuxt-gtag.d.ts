declare module 'nuxt/schema' {
    interface NuxtConfig {
      gtag?: {
        id?: string
        enabled?: boolean
        initMode?: 'auto' | 'manual'
        initCommands?: any[]
        config?: Record<string, any>
        tags?: (string | { id: string; config?: Record<string, any> })[]
      }
    }
  
    interface PublicRuntimeConfig {
      gtag?: {
        id?: string
      }
    }
  }
  
  export {}
  