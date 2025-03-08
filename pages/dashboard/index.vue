<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import Fieldset from "primevue/fieldset";
import environement from "~/core/environement";

const chartData = ref(null);
const chartOptions = ref(null);
const userId = ref(null);
const coupons = ref([]);
const orders = ref([]);
const ENGINE = environement.ENGINE_URL;

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

    console.log("Fetched Orders:", orders.value); // Debugging Step ✅

    processChartData(); // Update chart after fetching orders
  } catch (error) {
    console.error("Erreur lors de la récupération des données", error);
  }
};

// ✅ Process Orders to Count Orders per Month
const processChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  // Initialize an array for 12 months (all set to 0)
  const ordersPerMonth = Array(12).fill(0);

  orders.value.forEach(order => {
    if (order.created_at) { // ✅ Fix: Use `created_at` instead of `date`
      const parsedDate = new Date(order.created_at); // Convert to Date Object
      
      if (!isNaN(parsedDate.getTime())) {
        const monthIndex = parsedDate.getMonth(); // Get month (0 = Jan, 11 = Dec)
        ordersPerMonth[monthIndex]++;
      } else {
        console.warn("Invalid date format:", order.created_at); // Debugging
      }
    } else {
      console.warn("Order missing created_at:", order); // Debugging
    }
  });

  console.log("Updated Orders per Month:", ordersPerMonth); // Debugging

  chartData.value = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ],
    datasets: [
      {
        label: "Nombre de commandes par mois",
        data: ordersPerMonth,
        fill: false,
        borderColor: documentStyle.getPropertyValue("--p-cyan-500") || "#06b6d4",
        backgroundColor: documentStyle.getPropertyValue("--p-cyan-300") || "#22d3ee",
        tension: 0.4,
      },
    ],
  };
};

const setChartOptions = () => {
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue("--p-text-color") || "#333";
  const textColorSecondary = documentStyle.getPropertyValue("--p-text-muted-color") || "#6b7280";
  const surfaceBorder = documentStyle.getPropertyValue("--p-content-border-color") || "#e5e7eb";

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
  await fetchUser();
  await fetchData();
  chartOptions.value = setChartOptions();
});
</script>


<template>
  <NuxtLayout name="user">
    <div class="p-4 sm:p-6 lg:p-8 space-y-4">
      <h1 class="text-3xl sm:text-4xl font-oswald font-semibold">Tableau de Bord :</h1>

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
          Nous sommes ravis d'annoncer l'ajout de <strong>cadeaux gratuits</strong>
          pour chaque abonnement acheté sur notre site web ! Profitez désormais
          d'offres exclusives et recevez des cadeaux surprises à chaque souscription.
          <br /><br />
          De plus, pour la première fois, nous avons mis en place 
          <strong>les cadeaux de parrainage (Referral Gifts)</strong>.
          Référez vos amis et obtenez des récompenses spéciales pour chaque nouvel abonnement effectué via votre lien de parrainage.
          <br /><br />
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
