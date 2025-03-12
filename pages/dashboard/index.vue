<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import Fieldset from "primevue/fieldset";
import environement from "~/core/environement";
import AOS from "aos";

const chartData = ref(null);
const chartOptions = ref(null);
const userId = ref(null);
const coupons = ref([]);
const orders = ref([]);
const ENGINE = environement.ENGINE_URL;
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore();

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

const fetchData = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !userId.value) return;

    const response = await fetch(`${ENGINE}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des données");
    }

    const data = await response.json();
    coupons.value = data.coupons || [];
    orders.value = data.orders || [];

    processChartData(); // Update chart after fetching orders
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
  }
};

const processChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  // Initialize an array for 12 months (all set to 0)
  const ordersPerMonth = Array(12).fill(0);

  orders.value.forEach((order) => {
    if (order.created_at) {
      // ✅ Fix: Use `created_at` instead of `date`
      const parsedDate = new Date(order.created_at); // Convert to Date Object

      if (!isNaN(parsedDate.getTime())) {
        const monthIndex = parsedDate.getMonth(); // Get month (0 = Jan, 11 = Dec)
        ordersPerMonth[monthIndex]++;
      } else {
        console.warn("Invalid date format:", order.created_at); 
      }
    } else {
      console.warn("Order missing created_at:", order);
    }
  });


  chartData.value = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Nombre de commandes par mois",
        data: ordersPerMonth,
        fill: false,
        borderColor:
          documentStyle.getPropertyValue("--p-cyan-500") || "#06b6d4",
        backgroundColor:
          documentStyle.getPropertyValue("--p-cyan-300") || "#22d3ee",
        tension: 0.4,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color") || "#333";
  const textColorSecondary =
    documentStyle.getPropertyValue("--p-text-muted-color") || "#6b7280";
  const surfaceBorder =
    documentStyle.getPropertyValue("--p-content-border-color") || "#e5e7eb";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: textColor,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
      y: {
        ticks: {
          color: textColorSecondary,
        },
        grid: {
          color: surfaceBorder,
        },
      },
    },
  };
};

onMounted(async () => {
  AOS.init();
  await fetchUser();
  await fetchData();
  chartOptions.value = setChartOptions();
});
</script>


<template>
  <NuxtLayout name="user">
    <!-- 🚨 Show Custom Unauthorized Message -->
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
      class="p-4 sm:p-6 lg:p-8 space-y-4"
      data-aos="fade-down"
      data-aos-delay="400"
      v-else
    >
      <h1 class="text-3xl sm:text-4xl font-oswald font-semibold">
        Tableau de Bord :
      </h1>

      <!-- Counter Section -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4">
        <!-- Commandes Card -->
        <div
          class="flex items-center justify-between bg-black/75 text-white p-4 sm:p-6 rounded-lg shadow-lg"
        >
          <div class="flex items-center">
            <i class="pi pi-receipt text-2xl sm:text-3xl mr-3"></i>
            <h2 class="text-lg sm:text-xl text-white font-roboto font-semibold">
              Nombre Total des Commandes
            </h2>
          </div>
          <h2 class="text-2xl sm:text-3xl text-white font-roboto font-semibold">
            {{ orders.length }}
          </h2>
        </div>

        <!-- Cadeaux Card -->
        <div
          class="flex items-center justify-between bg-purple-500/75 text-white p-4 sm:p-6 rounded-lg shadow-lg"
        >
          <div class="flex items-center">
            <i class="pi pi-gift text-2xl sm:text-3xl mr-3"></i>
            <h2 class="text-lg sm:text-xl text-white font-roboto font-semibold">
              Nombre total des Coupons
            </h2>
          </div>
          <h2 class="text-2xl sm:text-3xl text-white font-roboto font-semibold">
            {{ coupons.length }}
          </h2>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="card p-4 sm:p-6 bg-white rounded-lg shadow-lg">
        <Chart
          v-if="chartData"
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="h-[18rem] sm:h-[25rem]"
        />
      </div>

      <Fieldset legend="Nouveauté" class="mb-8 sm:mb-16">
        <p class="m-0 text-black font-roboto text-sm sm:text-base">
          Nous sommes ravis d'annoncer l'ajout de
          <strong>cadeaux gratuits</strong>
          pour chaque abonnement acheté sur notre site web ! Profitez désormais
          d'offres exclusives et recevez des cadeaux surprises à chaque
          souscription.
          <br /><br />
          De plus, pour la première fois, nous avons mis en place
          <strong>les cadeaux de parrainage (Referral Gifts)</strong>. Référez
          vos amis et obtenez des récompenses spéciales pour chaque nouvel
          abonnement effectué via votre lien de parrainage. <br /><br />
          🎉 Ne manquez pas ces nouvelles opportunités et commencez à accumuler
          vos cadeaux dès aujourd'hui !
        </p>
      </Fieldset>

      <div class="justify-self-center mt-8 sm:mt-16 text-center">
        <span class="font-roboto text-sm sm:text-base">
          Pour toute question ou assistance, consultez notre
          <NuxtLink
            to="/support"
            class="text-blue-500 hover:underline font-medium"
          >
            page d'aide et contact </NuxtLink
          >.
        </span>
      </div>
    </div>
  </NuxtLayout>
</template>

<style>
</style>
