<script setup>
import Breadcrumb from "primevue/breadcrumb"; 
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Navbar from "~/components/navbar.vue";
import { getProductBySlug } from "~/core/services/products.services"; // ✅ Use slug-based API

const route = useRoute();
const activeTab = ref("details");
const product = ref(null);
const loading = ref(true);
const errorMessage = ref(null);
const value = ref("0"); 

onMounted(async () => {
  try {
    console.log("Route parameters:", route.params); // Debugging

    const productSlug = route.params.slug;
    console.log("Extracted slug:", productSlug); // Check if slug exists

    if (!productSlug || typeof productSlug !== "string") {
      throw new Error("Invalid slug received from route params");
    }

    product.value = await getProductBySlug(productSlug);
  } catch (error) {
    console.error("Erreur lors du chargement du produit:", error);
    errorMessage.value = "Produit non trouvé.";
  } finally {
    loading.value = false;
  }
});

// Function to add items to the cart in localStorage
const addToCart = (product) => {
  if (!product) return;

  const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
  const existingItem = cartItems.find((item) => item.id === product.id);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cartItems.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cartItems));
  window.dispatchEvent(new Event("storage"));
};
</script>


<template>
  <div class="w-full min-h-screen p-10 bg-gray-100">
    <Toast />
    <Navbar />
    <h1 class="text-5xl font-oswald text-center pt-10 mb-5 font-bold">
      Détails du produit
    </h1>
    <NuxtLink to="/produits" style="justify-content: flex-start">
      <button
        className="bg-white text-center w-48 rounded-2xl h-14 relative text-black text-xl font-semibold group"
        type="button"
      >
        <div
          className="bg-purple-400 rounded-xl h-12 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[184px] z-10 duration-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Retourner</p>
      </button>
    </NuxtLink>

    <!-- Loading State -->
    <p v-if="loading" class="text-center text-gray-500 text-xl mt-10">
      Chargement...
    </p>

    <!-- Error Message -->
    <p v-if="errorMessage" class="text-center text-red-500 text-2xl mt-10">
      {{ errorMessage }}
    </p>

    <!-- Product Card -->
    <div
      v-if="product && !loading"
      class="m-2 group px-10 py-5 bg-black/10 rounded-lg flex flex-col items-center justify-center gap-2 relative after:absolute after:h-full after:bg-[#05043e] z-20 shadow-lg after:-z-20 after:w-full after:inset-0 after:rounded-lg transition-all duration-300 hover:transition-all hover:duration-300 after:transition-all after:duration-500 after:hover:transition-all after:hover:duration-500 overflow-hidden cursor-pointer after:-translate-y-full after:hover:translate-y-0"
    >
      <img
        :src="product.photos || '/path/to/placeholder.png'"
        alt="Produit IPTV iptv smarters pro"
        class="w-[330px]"
      />
      <p
        class="cardtxt font-semibold font-oswald text-black tracking-wider text-center group-hover:text-white text-3xl pb-3"
        style="justify-content: center"
      >
        {{ product.name }}
      </p>
      <p
        class="blueberry font-semibold text-center text-black md:text-lg group-hover:text-purple-300 md:pt-10 pb-4 md:px-36"
      >
        {{ product.description }}
      </p>
      <div
        class="ordernow flex flex-row justify-center gap-16 mt-10 items-center w-full"
      >
        <div class="flex flex-row gap-2 text-red-500 items-end">
          <span class="text-lg line-through font-semibold">{{
            product.price_before
          }}</span>
          <p
            class="ordernow-text text-green-700 text-3xl font-semibold group-hover:text-white"
          >
            {{ product.price }} €
          </p>
        </div>
        <button
          class="px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-900 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
          aria-label="Ajouter un produit"
          @click="addToCart(product)"
        >
          Ajouter un Produit
        </button>
      </div>
    </div>

    <!-- Tabs Content -->
    <div class="card mt-16">
      <div class="flex mb-2 gap-2 justify-end">
        <Button
          @click="value = '0'"
          rounded
          label="Details"
          class="w-20 h-8 p-0"
          :outlined="value !== '0'"
        />
        <Button
          @click="value = '1'"
          rounded
          label="Politique de Remboursement"
          class="w-68 h-8 p-0"
          :outlined="value !== '1'"
        />
        <!-- <Button @click="value = '2'" rounded label="3" class="w-8 h-8 p-0" :outlined="value !== '2'" /> -->
      </div>

      <Tabs v-model:value="value">
        <TabList>
          <Tab value="0">Details</Tab>
          <Tab value="1">Politique de Remboursement</Tab>
          <!-- <Tab value="2">Reviews</Tab> -->
        </TabList>
        <TabPanels>
          <TabPanel value="0">
            <div v-if="activeTab === 'details' && product && !loading">
              <h3 class="text-2xl font-semibold text-center">
                {{ product.name }}
              </h3>
              <div class="flex flex-row gap-10">
                <img :src="product.photos" alt="platinium IPTV Product" />
                <ul class="mt-5 space-y-2 text-lg text-gray-800">
                  <li
                    v-for="(feature, index) in product.features"
                    :key="index"
                    class="flex items-center"
                  >
                    <span class="text-purple-600 mr-2">✔</span>
                    {{ feature }}
                  </li>
                </ul>
              </div>
            </div>
          </TabPanel>
          <TabPanel value="1">
            <div class="px-56">
              <h2 class="text-3xl font-bold text-purple-700 text-center">
                Politique de Remboursement
              </h2>
              <p class="text-gray-700 mt-4">
                Chez Platinum IPTV, nous nous engageons à fournir à nos clients
                une expérience de streaming exceptionnelle. Si, pour une raison
                quelconque, vous n'êtes pas entièrement satisfait de votre
                abonnement, nous avons mis en place une politique de
                remboursement claire :
              </p>

              <h3 class="text-2xl font-semibold text-purple-600 mt-6">
                Droit de Rétractation :
              </h3>
              <p class="text-gray-700 mt-2">
                Vous avez le droit de vous rétracter de votre abonnement dans un
                délai de 14 jours à compter de la date d'achat. Pour exercer ce
                droit, veuillez nous contacter par email à
                <a
                  href="mailto:support@platinumiptv.com"
                  class="text-purple-600 underline"
                  >support@platinumiptv.com</a
                >.
              </p>

              <h3 class="text-2xl font-semibold text-purple-600 mt-6">
                Conditions de Remboursement :
              </h3>
              <ol class="list-decimal list-inside mt-4 text-gray-800 space-y-3">
                <li>
                  La demande doit être effectuée dans les 14 jours suivant
                  l'achat.
                </li>
                <li>
                  Vous devez fournir la preuve d'achat (reçu ou confirmation de
                  commande).
                </li>
              </ol>

              <h3 class="text-2xl font-semibold text-purple-600 mt-6">
                Traitement des Remboursements :
              </h3>
              <p class="text-gray-700 mt-2">
                Une fois votre demande reçue, nous l'examinerons et vous
                informerons de son approbation ou de son rejet. Si elle est
                approuvée, un crédit sera automatiquement appliqué à votre
                méthode de paiement d'origine dans un délai de 7 jours.
              </p>

              <h3 class="text-2xl font-semibold text-purple-600 mt-6">
                Exceptions :
              </h3>
              <p class="text-gray-700 mt-2">
                Les abonnements qui ont été utilisés après la période de 14
                jours ne sont pas éligibles au remboursement.
              </p>

              <h3 class="text-2xl font-semibold text-purple-600 mt-6">
                Assistance :
              </h3>
              <p class="text-gray-700 mt-2">
                Si vous avez des questions ou des préoccupations concernant
                notre politique de remboursement, n'hésitez pas à nous contacter
                à
                <a
                  href="mailto:support@platinumiptv.com"
                  class="text-blue-600 underline"
                  >support@platinumiptv.com</a
                >.
              </p>
            </div>
          </TabPanel>
          <!-- <TabPanel value="2">
          </TabPanel> -->
        </TabPanels>
      </Tabs>
    </div>
  </div>
</template>

<style scoped>
/* Matches the React card hover effect */
.group:hover .ordernow-text {
  color: white;
}

.cartBtn2 {
  transition: all 0.3s ease-in-out;
}
.cartBtn2:hover {
  background-color: #6b46c1; /* hover:bg-purple-600 */
}
</style>