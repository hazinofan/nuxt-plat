<script setup>
import Breadcrumb from "primevue/breadcrumb";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Footer from "~/components/footer.vue";
import Navbar from "~/components/navbar.vue";
import { getProductBySlug } from "~/core/services/products.services"; // ✅ Use slug-based API

const route = useRoute();
const activeTab = ref("details");
const product = ref(null);
const loading = ref(true);
const errorMessage = ref(null);
const value = ref("0");
const toast = useToast();

onMounted(async () => {
  try {
    const productSlug = route.params.slug;

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

  toast.add({
    severity: "success",
    summary: "Success",
    detail: "Produit Ajouté avec Succès !",
    life: 6000,
  });
};

useHead(() => ({
  title: product.value
    ? `${product.value.name} - Abonnement IPTV ${product.value.duration} | Meilleur Prix`
    : "Abonnement IPTV - Meilleur Service & Qualité",
  meta: [
    {
      name: "description",
      content: product.value
        ? `Découvrez l'abonnement IPTV ${product.value.name} avec ${product.value.channels} chaînes TV et ${product.value.vod} films et séries en qualité ${product.value.quality}. Profitez d'un service IPTV stable et fiable.`
        : "Obtenez le meilleur abonnement IPTV avec accès illimité aux chaînes TV et VOD en 4K, FHD et HD.",
    },
    {
      name: "keywords",
      content: product.value
        ? `Abonnement IPTV ${product.value.name}, IPTV ${product.value.duration}, IPTV ${product.value.quality}, IPTV stable, Meilleur IPTV, IPTV France, IPTV Android, IPTV Smart TV, IPTV fiable`
        : "Abonnement IPTV, IPTV premium, IPTV 4K, IPTV stable, Meilleur IPTV, IPTV fiable, IPTV France",
    },
    { name: "author", content: "Platinium IPTV" },
    { name: "robots", content: "index, follow" },

    // Open Graph / Facebook
    {
      property: "og:title",
      content: product.value
        ? `${product.value.name} - Abonnement IPTV ${product.value.duration}`
        : "Abonnement IPTV Premium",
    },
    {
      property: "og:description",
      content: product.value
        ? `Découvrez l'abonnement IPTV ${product.value.name} avec plus de ${product.value.channels} chaînes TV et ${product.value.vod} films et séries en VOD.`
        : "Profitez de l'IPTV premium avec accès illimité aux chaînes TV et VOD en 4K et FHD.",
    },
    {
      property: "og:image",
      content: product.value
        ? product.value.image
        : "https://platinium-iptv.com/images/default-product.jpg",
    },
    {
      property: "og:url",
      content: `https://platinium-iptv.com/produits/${route.params.slug}`,
    },
    { property: "og:type", content: "product" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: product.value
        ? `${product.value.name} - Abonnement IPTV ${product.value.duration}`
        : "Abonnement IPTV Premium",
    },
    {
      name: "twitter:description",
      content: product.value
        ? `Accédez à plus de ${product.value.channels} chaînes et ${product.value.vod} films en VOD avec l'abonnement IPTV ${product.value.name}.`
        : "Essayez notre service IPTV premium avec plus de 22 500 chaînes et 50 000 films et séries VOD.",
    },
    {
      name: "twitter:image",
      content: product.value
        ? product.value.image
        : "https://platinium-iptv.com/images/default-product.jpg",
    },
  ],
  link: [
    {
      rel: "canonical",
      href: `https://platinium-iptv.com/produits/${route.params.slug}`,
    },
  ],
}));
</script>


<template>
    <NuxtLayout name="support">
  <div class="">
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
          <TabList class="flex flex-wrap justify-center gap-4 md:gap-6">
            <Tab value="0" class="px-4 py-2 text-lg md:text-xl font-semibold"
              >Détails</Tab
            >
            <Tab value="1" class="px-4 py-2 text-lg md:text-xl font-semibold"
              >Politique de Remboursement</Tab
            >
          </TabList>

          <TabPanels>
            <!-- ✅ PRODUCT DETAILS SECTION -->
            <TabPanel value="0">
              <div v-if="activeTab === 'details' && product && !loading">
                <h3 class="text-2xl font-semibold text-center mt-4 md:mt-6">
                  {{ product.name }}
                </h3>
                <div
                  class="flex flex-col md:flex-row items-center gap-6 md:gap-10 px-4 md:px-10"
                >
                  <img
                    :src="product.photos"
                    alt="platinium IPTV Product"
                    class="w-full md:w-1/3 rounded-lg shadow-lg"
                  />
                  <ul class="space-y-2 text-lg text-gray-800">
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

            <!-- ✅ REFUND POLICY SECTION -->
            <TabPanel value="1">
              <div class="px-4 md:px-10 lg:px-20 xl:px-56">
                <h2
                  class="text-2xl md:text-3xl font-bold text-purple-700 text-center"
                >
                  Politique de Remboursement
                </h2>
                <p class="text-gray-700 mt-4 text-sm md:text-lg">
                  Chez Platinium IPTV, nous nous engageons à fournir à nos
                  clients une expérience de streaming exceptionnelle. Si, pour
                  une raison quelconque, vous n'êtes pas entièrement satisfait
                  de votre abonnement, nous avons mis en place une politique de
                  remboursement claire :
                </p>

                <h3
                  class="text-xl md:text-2xl font-semibold text-purple-600 mt-6"
                >
                  Droit de Rétractation :
                </h3>
                <p class="text-gray-700 mt-2 text-sm md:text-lg">
                  Vous avez le droit de vous rétracter de votre abonnement dans
                  un délai de <strong>14 jours</strong>. Contactez-nous à
                  <a
                    href="mailto:support@platiniumiptv.com"
                    class="text-purple-600 underline"
                  >
                    support@platiniumiptv.com </a
                  >.
                </p>

                <h3
                  class="text-xl md:text-2xl font-semibold text-purple-600 mt-6"
                >
                  Conditions de Remboursement :
                </h3>
                <ol
                  class="list-decimal list-inside mt-4 text-gray-800 space-y-3 text-sm md:text-lg"
                >
                  <li>
                    La demande doit être effectuée dans les 14 jours suivant
                    l'achat.
                  </li>
                  <li>Une preuve d'achat doit être fournie.</li>
                </ol>

                <h3
                  class="text-xl md:text-2xl font-semibold text-purple-600 mt-6"
                >
                  Traitement des Remboursements :
                </h3>
                <p class="text-gray-700 mt-2 text-sm md:text-lg">
                  Une fois votre demande reçue, nous l'examinerons et vous
                  informerons de son approbation ou de son rejet. Si elle est
                  approuvée, un remboursement sera effectué sous 7 jours.
                </p>

                <h3
                  class="text-xl md:text-2xl font-semibold text-purple-600 mt-6"
                >
                  Assistance :
                </h3>
                <p class="text-gray-700 mt-2 text-sm md:text-lg">
                  Pour toute question, contactez-nous à
                  <a
                    href="mailto:support@platiniumiptv.com"
                    class="text-blue-600 underline"
                  >
                    support@platiniumiptv.com </a
                  >.
                </p>
              </div>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </div>
    </div>
    <Footer />
  </div>
</NuxtLayout>
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