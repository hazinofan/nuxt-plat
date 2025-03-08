

export default defineNuxtRouteMiddleware((to, from) => {
  if (process.client) {
    const authStore = useAuthStore(); 
    const userToken = localStorage.getItem("token");

    if (!userToken) {
      authStore.isAuthenticated = false;
    } else {
      authStore.isAuthenticated = true; 
    }
  }
});
