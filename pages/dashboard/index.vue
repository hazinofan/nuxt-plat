<script setup>
import { ref, onMounted } from "vue";
import Chart from "primevue/chart";
import Fieldset from "primevue/fieldset";

const chartData = ref(null);
const chartOptions = ref(null);

const setChartData = () => {
  const documentStyle = getComputedStyle(document.documentElement);

  return {
    labels: ["January", "February", "March", "April", "May", "June", "July"],
    datasets: [
      {
        label: "Nombre de commandes par mois ",
        data: [2, 4, 5, 1, 8, 10, 40],
        fill: false,
        borderColor:
          documentStyle.getPropertyValue("--p-cyan-500") || "#06b6d4",
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

onMounted(() => {
  chartData.value = setChartData();
  chartOptions.value = setChartOptions();
});
</script>

<template>
  <NuxtLayout name="user">
    <div class="p-4 space-y-4">
      <h1 class="text-4xl font-oswald font-semibold">Tableau de Bord :</h1>

      <!-- Counter Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
        <!-- Commandes Card -->
        <div
          class="flex items-center justify-between bg-black/75 text-white p-4 rounded-lg shadow-lg"
        >
          <div class="flex items-center">
            <i class="pi pi-receipt text-3xl mr-3"></i>
            <h2 class="text-xl font-semibold">Nombre Total des Commandes</h2>
          </div>
          <h2 class="text-3xl font-semibold">0</h2>
        </div>

        <!-- Cadeaux Card -->
        <div
          class="flex items-center justify-between bg-purple-500/75 text-white p-4 rounded-lg shadow-lg"
        >
          <div class="flex items-center">
            <i class="pi pi-gift text-3xl mr-3"></i>
            <h2 class="text-xl font-semibold">Nombre total des Cadeaux</h2>
          </div>
          <h2 class="text-3xl font-semibold">0</h2>
        </div>
      </div>

      <!-- Chart Section -->
      <div class="card p-4 bg-white">
        <Chart
          v-if="chartData"
          type="line"
          :data="chartData"
          :options="chartOptions"
          class="h-[25rem]"
        />
      </div>

      <Fieldset legend="Nouveauté" class="mb-16">
        <p class="m-0 text-black font-roboto">
          Nous sommes ravis d'annoncer l'ajout de **cadeaux gratuits** pour
          chaque abonnement acheté sur notre site web ! Profitez désormais
          d'offres exclusives et recevez des cadeaux surprises à chaque
          souscription.
          <br /><br />
          De plus, pour la première fois, nous avons mis en place **les cadeaux
          de parrainage (Referral Gifts)**. Référez vos amis et obtenez des
          récompenses spéciales pour chaque nouvel abonnement effectué via votre
          lien de parrainage.
          <br /><br />
          🎉 Ne manquez pas ces nouvelles opportunités et commencez à accumuler
          vos cadeaux dès aujourd'hui !
        </p>
      </Fieldset>

      <div class="justify-self-center mt-16">
        <span class="font-roboto justify-center">
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
