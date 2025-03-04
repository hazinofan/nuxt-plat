<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import Avatar from "primevue/avatar";

const isExpanded = ref(true);
const user = ref(null);

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    user.value = jwtDecode(token);
  } catch (error) {
    console.error("Invalid token", error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <div class="">
    <!-- Main Content Area -->
    <main class="flex-1 p-6" :class="isExpanded ? 'ml-64' : 'ml-20'">
      <slot />
    </main>
    <aside
      class="h-screen border-r bg-purple-300/25 fixed left-0 top-0 transition-all duration-300 ease-in-out"
      :style="{ width: isExpanded ? '16rem' : '5rem' }"
    >
      <!-- Sidebar Header -->
      <div class="flex items-center justify-between p-5">
        <!-- Toggle Button -->
        <button
          class="text-gray-600 dark:text-gray-200"
          @click="isExpanded = !isExpanded"
        >
          <i class="pi pi-bars text-xl"></i>
        </button>
      </div>
      <div class="self-center justify-items-center">
        <Avatar
          :image="user?.avatar || '/assets/avatar.jpg'"
          class="mr-2"
          size="xlarge"
          shape="circle"
        />
        <p
          class="font-roboto text-gray-700 dark:text-gray-200 text-lg font-medium"
          :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
        >
          {{ user?.username || "Guest" }}
        </p>
        <p
          class="font-roboto text-gray-700 dark:text-gray-200 text-xs font-medium"
          :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
        >
          {{ user?.email || "Guest" }}
        </p>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-6 space-y-3 pl-3">
        <!-- Analytics Section -->
        <div class="space-y-3">
          <label
            v-if="isExpanded"
            class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400"
          >
            PLATINIUM SERVICES
          </label>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/dashboard"
          >
            <i class="pi pi-chart-line text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Dashboard
            </p>
          </NuxtLink>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/orders"
          >
            <i class="pi pi-receipt text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Commandes
            </p>
          </NuxtLink>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/gifts"
          >
            <i class="pi pi-gift text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Coupons & Cadeaux
            </p>
          </NuxtLink>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/refferals"
          >
            <i class="pi pi-paypal text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Refferals & Discounts
            </p>
          </NuxtLink>
        </div>

        <!-- Content Section -->
        <div class="space-y-3">
          <label
            v-if="isExpanded"
            class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400"
          >
            Compte & Services
          </label>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/settings"
          >
            <i class="pi pi-cog text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Paramètres
            </p>
          </NuxtLink>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/support"
          >
            <i class="pi pi-users text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Aide & Support
            </p>
          </NuxtLink>
        </div>

        <!-- Customization Section -->
        <div class="space-y-3">
          <label
            v-if="isExpanded"
            class="px-3 text-xs text-gray-500 uppercase dark:text-gray-400"
          >
            Déconnexion
          </label>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/"
          >
            <i class="pi pi-home text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-gray-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Page D'accueil
            </p>
          </NuxtLink>

          <NuxtLink
            class="flex items-center px-3 py-2 text-gray-700 rounded-lg transition-all duration-300 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            :class="isExpanded ? 'justify-start' : 'justify-center'"
            to="/dashboard"
          >
            <i class="pi pi-sign-out text-red-600 text-lg"></i>
            <p
              class="ml-5 text-base font-roboto text-red-600"
              :class="isExpanded ? 'w-auto block' : 'w-0 hidden'"
            >
              Déconnexion
            </p>
          </NuxtLink>
        </div>
      </nav>
    </aside>
  </div>
</template>
