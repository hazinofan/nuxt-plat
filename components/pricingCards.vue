<script setup>
import { ref, computed, onMounted } from "vue";
import { getProducts } from "~/core/services/products.services";
import InputSwitch from "primevue/inputswitch";

// State
const isDouble = ref(false);
const products = ref([]);

// Fetch products from API
async function fetchProducts() {
  try {
    const response = await getProducts();
    products.value = response; // Store fetched products
  } catch (error) {
    console.error("Error fetching products:", error);
  }
}

// Compute displayed plans based on toggle switch
const displayedPlans = computed(() => {
  return products.value
    .filter(
      (product) => product.display === (isDouble.value ? "Double" : "Single")
    )
    .slice(0, 3); // Limit to 3 products
});

// Fetch products when component mounts
onMounted(fetchProducts);
</script>

<template>
  <section class="py-24">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-12 text-center">
        <!-- ✅ Correct use of <h2> -->
        <h2 class="font-manrope text-5xl font-bold text-gray-900 mb-4">
          Les Abonnements les plus populaires
        </h2>
        <p class="text-gray-800 leading-6 mb-9">
          basé sur les 100 dernières commandes
        </p>

        <!-- PrimeVue InputSwitch -->
        <div class="flex justify-center items-center gap-4">
          <span class="text-lg font-medium text-gray-700">Single</span>
          <InputSwitch v-model="isDouble" aria-label="Activer le mode double" />
          <span class="text-lg font-medium text-gray-700">Double</span>
        </div>
      </div>

      <!-- Pricing Grid -->
      <div
        v-if="displayedPlans.length"
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <div
          v-for="(plan, index) in displayedPlans"
          :key="index"
          class="flex flex-col justify-between bg-white shadow-lg rounded-2xl p-8 transition-transform duration-300 hover:scale-105"
          :class="{ 'border-2 border-purple-500': plan.popular }"
        >
          <!-- Popular Badge -->
          <div
            v-if="plan.popular"
            class="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-violet-600 text-white text-xs px-3 py-1 rounded-full"
          >
            Most Popular
          </div>

          <h2 class="font-manrope text-2xl font-bold mb-4 text-gray-900">
            {{ plan.name }}
          </h2>

          <div class="mb-6">
            <span class="text-4xl font-bold text-purple-600 tracking-tight"
              >€{{ plan.price }}</span
            >
            <span
              class="text-xl text-gray-500 line-through ml-2"
              v-if="plan.price_before"
              >€{{ plan.price_before }}</span
            >
          </div>

          <!-- Features List -->
          <ul class="mb-6 space-y-4 text-gray-600">
            <li
              v-for="(feature, idx) in plan.features.slice(0, 5)"
              :key="idx"
              class="flex items-center space-x-3"
            >
              <i class="pi pi-check-circle text-purple-500 text-lg"></i>
              <span>{{ feature }}</span>
            </li>
          </ul>

          <!-- Purchase Button -->
          <button
            class="px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-red-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
            aria-label="Ajouter un produit"
          >
            Ajouter un Produit
          </button>
        </div>
      </div>

      <!-- Loading State -->
      <div v-else class="text-center text-gray-500">Loading plans...</div>
    </div>
  </section>
</template>

  
  <style scoped>
/* Custom hover & transition effects */
</style>
  