<script setup>
import { ref, onMounted } from "vue";
import { jwtDecode } from "jwt-decode";
import environement from "~/core/environement";

const coupons = ref([]);
const ENGINE = environement.ENGINE_URL;
const userId = ref(null);
const toast = useToast();

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
  if (!token) return;

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
  } catch (error) {
    console.error("Invalid token", error);
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
  fetchUser();
  await fetchCoupons();
});
</script>


<template>
  <NuxtLayout name="user">
    <Toast />
    <div class="p-6">
      <h1 class="text-3xl font-bold mb-4 font-oswald">🎟️ Mes Coupons</h1>

      <div
        v-if="coupons.length > 0"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 mt-20 gap-4"
      >
        <div
          v-for="coupon in coupons"
          :key="coupon.id"
          class="bg-purple-200 p-4 rounded-lg shadow-md flex justify-between items-center"
        >
          <div>
            <h2 class="text-xl font-roboto font-semibold">{{ coupon.code }}</h2>
            <p class="text-gray-600 font-roboto">
              Réduction :
              <span class="font-medium font-roboto"
                >{{ coupon.discount }}%</span
              >
            </p>
            <p class="text-sm mt-4 font-roboto text-red-500">
              Expire le : {{ formatDate(coupon.expiry_date) }}
            </p>
          </div>
          <button
            @click="copyCoupon(coupon.code)"
            class="px-10 py-2 rounded-tl-3xl font-oswald rounded-br-3xl items-center rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all flex justify-center"
          >
            Copier
          </button>
        </div>
      </div>

      <p v-else class="text-gray-600">
        Aucun coupon disponible pour le moment.
      </p>
    </div>
    
    <Stepper value="1" class="basis-[50rem] mt-44">
      <StepList>
        <Step value="1">PLAT-GIFT 1</Step>
        <Step value="2">PLAT-GIFT 2</Step>
        <Step value="3">PLAT-GIFT 3</Step>
        <Step value="4">PLAT-GIFT 4</Step>
      </StepList>
    </Stepper>
  </NuxtLayout>
</template>

  