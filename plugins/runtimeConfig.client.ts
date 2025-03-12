export default defineNuxtPlugin((nuxtApp) => {
    const config = useRuntimeConfig();
    return {
      provide: {
        engineUrl: config.public.ENGINE_URL,
      },
    };
  });
  