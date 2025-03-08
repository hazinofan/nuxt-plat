<script setup>
import AOS from "aos";
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import environement from "~/core/environement";

const coupons = ref([]);
const ENGINE = environement.ENGINE_URL;
const userId = ref(null);
const toast = useToast();
const visible = ref(false);
const authStore = useAuthStore();

definePageMeta({
  middleware: "auth",
});

const fetchCoupons = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !userId.value) return;

    const response = await fetch(`${ENGINE}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des coupons");
    }

    const data = await response.json();
    coupons.value = data.coupons;
    console.log(coupons.value.expiry, "coupons ");
  } catch (error) {
    console.error("Erreur lors de la récupération des coupons", error);
  }
};

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    authStore.isAuthenticated = false;
    return;
  }

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
  } catch (error) {
    console.error("Invalid token", error);
    authStore.isAuthenticated = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return "Date inconnue";
  return new Intl.DateTimeFormat("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(dateString));
};

const copyCoupon = (code) => {
  navigator.clipboard.writeText(code);
  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Votre Coupon a été Copié avec Succès.",
    life: 3000,
  });
};

onMounted(async () => {
  AOS.init();
  fetchUser();
  await fetchCoupons();
});
</script>


<template>
  <NuxtLayout name="user">
    <Toast />
    <div
      v-if="!authStore.isAuthenticated"
      class="flex items-center justify-center min-h-screen px-4"
    >
      <div
        class="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg w-full sm:w-3/4 lg:w-1/2 xl:w-1/3"
      >
        <h2
          class="text-xl sm:text-2xl flex flex-row gap-2 items-center justify-center font-semibold text-red-500"
        >
          <i class="pi pi-ban text-3xl sm:text-4xl"></i> Accès Refusé
        </h2>
        <p class="text-gray-700 mt-2 text-sm sm:text-base">
          Vous devez être connecté pour accéder à cette page.
        </p>
        <button
          class="mt-4 w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          @click="router.push('/login')"
        >
          Aller à la page de connexion
        </button>
      </div>
    </div>
    <div
      class="p-4 sm:p-6 lg:p-8"
      data-aos="fade-down"
      data-aos-delay="400"
      v-else
    >
      <h1 class="text-2xl sm:text-3xl font-bold mb-4 font-oswald">
        🎟️ Mes Coupons
      </h1>

      <!-- Coupons Section -->
      <div
        v-if="coupons.length > 0"
        class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10 sm:mt-20"
      >
        <div
          v-for="coupon in coupons"
          :key="coupon.id"
          class="bg-purple-200 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div class="justify-self-center">
            <h2 class="text-lg sm:text-xl font-roboto font-semibold">
              {{ coupon.code }}
            </h2>
            <p class="text-gray-600 font-roboto">
              Réduction :
              <span class="font-medium font-roboto"
                >{{ coupon.discount }}%</span
              >
            </p>
            <p class="text-sm sm:text-base mt-4 font-roboto text-red-500">
              Expire le : {{ formatDate(coupon.expiry_date) }}
            </p>
          </div>
          <button
            @click="copyCoupon(coupon.code)"
            class="px-6 sm:px-10 py-2 rounded-tl-3xl font-oswald rounded-br-3xl items-center rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-sm sm:text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all flex justify-center"
          >
            Copier
          </button>
        </div>
      </div>

      <p v-else class="text-gray-600 text-sm sm:text-base text-center">
        Aucun coupon disponible pour le moment.
      </p>
    </div>

    <!-- Stepper Section -->
    <Stepper value="1" class="max-w-full sm:basis-[50rem] mt-8">
      <StepList>
        <Step value="1">PLAT-GIFT 1</Step>
        <Step value="2">PLAT-GIFT 2</Step>
        <Step value="3">PLAT-GIFT 3</Step>
        <Step value="4">PLAT-GIFT 4</Step>
        <Step value="5">PLAT-GIFT 5</Step>
      </StepList>
    </Stepper>

    <!-- Drawer Section -->
    <div class="card flex justify-center">
      <Drawer
        v-model:visible="visible"
        header="Récompenses Disponibles"
        class="max-w-full"
      >
        <ul class="list-disc pl-5 text-sm sm:text-base">
          <span class="font-roboto text-sm sm:text-base font-semibold"
            >PLATINIUM CADEAU 1 :</span
          >
          <li class="mt-2 mb-8 text-lg sm:text-xl font-oswald">
            Abonnement 1 mois gratuit
          </li>

          <span class="font-roboto text-sm sm:text-base font-semibold"
            >PLATINIUM CADEAU 2 :</span
          >
          <li class="mt-2 mb-8 text-lg sm:text-xl font-oswald">
            Réduction 35% sur tous les abonnements
          </li>

          <span class="font-roboto text-sm sm:text-base font-semibold"
            >PLATINIUM CADEAU 3 :</span
          >
          <li class="mt-2 mb-8 text-lg sm:text-xl font-oswald">
            Abonnement 3 mois gratuit
          </li>

          <span class="font-roboto text-sm sm:text-base font-semibold"
            >PLATINIUM CADEAU 4 :</span
          >
          <li class="mt-2 mb-8 text-lg sm:text-xl font-oswald">
            Abonnement 6 mois gratuit + 2 connexions
          </li>

          <span class="font-roboto text-sm sm:text-base font-semibold"
            >PLATINIUM CADEAU 5 :</span
          >
          <li class="mt-2 mb-8 text-lg sm:text-xl font-oswald">
            Abonnement double 12 mois + 3 mois
          </li>
        </ul>
      </Drawer>
      <Button
        icon="pi pi-arrow-right"
        label="Voir les Récompenses Disponibles Pour moi"
        class="mt-5 text-sm sm:text-base md:w-auto w-1/2"
        @click="visible = true"
      />
    </div>
  </NuxtLayout>
</template>


  