<script setup>
import { ref, onMounted, computed } from "vue";
import { useHead } from "#app"; // Nuxt 3 composable for head management
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/products.css";
import { useToast } from "primevue/usetoast";
import InputSwitch from "primevue/inputswitch";
import Toast from "primevue/toast";
import Steps from "~/components/steps.vue";
import Movies from "~/components/movies.vue";
import Navbar from "~/components/navbar.vue";
import Footer from "~/components/footer.vue";
import { getProducts } from "~/core/services/products.services";

const products = ref([]);
const loading = ref(false);
const selectedType = ref(true);
const toast = useToast();

onMounted(() => {
  AOS.init();
  fetchProducts();
});

async function fetchProducts() {
  loading.value = true;
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error(error, "error fetching products");
  } finally {
    loading.value = false;
  }
}

// Computed property to filter products based on type
const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    selectedType.value
      ? product.display === "Double"
      : product.display === "Single"
  );
});

const addToCart = (product) => {
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
    detail: `${product.name} has been added to the cart!`,
    life: 3000,
  });
};

// ✅ Define meta tags dynamically using useHead()
useHead({
  title: "Abonnements IPTV Premium - Haute Qualité & Stabilité",
  meta: [
    {
      name: "description",
      content:
        "Découvrez nos abonnements IPTV premium avec plus de 22 500 chaînes, 50 000 films et séries en VOD, sans buffering et en 4K, FHD et HD. Profitez d'une expérience fluide et stable sur tous vos appareils.",
    },
    {
      name: "keywords",
      content:
        "IPTV, abonnement IPTV, IPTV premium, chaînes TV en ligne, VOD, films et séries, IPTV stable, IPTV France, IPTV 4K",
    },
    { name: "author", content: "Platinium IPTV" },
    { name: "robots", content: "index, follow" },

    // Open Graph / Facebook
    {
      property: "og:title",
      content: "Abonnements IPTV Premium - Haute Qualité & Stabilité",
    },
    {
      property: "og:description",
      content:
        "Explorez nos offres IPTV premium avec plus de 22 500 chaînes et 50 000 films et séries en VOD. Streaming fluide, sans buffering, en 4K et FHD sur tous vos appareils.",
    },
    {
      property: "og:image",
      content: "https://platinium-iptv.com/images/iptv-banner.jpg",
    },
    {
      property: "og:url",
      content: "https://platinium-iptv.com/abonnements-iptv",
    },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Abonnements IPTV Premium - Haute Qualité & Stabilité",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez nos abonnements IPTV premium avec plus de 22 500 chaînes et 50 000 films et séries en VOD, sans buffering et en 4K, FHD et HD.",
    },
    {
      name: "twitter:image",
      content: "https://platinium-iptv.com/images/iptv-banner.jpg",
    },
  ],
  link: [
    { rel: "canonical", href: "https://platinium-iptv.com/abonnements-iptv" },
  ],
});
</script>


<template>
  <div>
    <Navbar />
    <div class="header relative">
      <div class="bg-black absolute inset-0 opacity-50"></div>
      <div class="three">
        <h1>Nos Abonnements IPTV</h1>
      </div>
    </div>

    <section class="content" data-aos="fade-down" data-aos-delay="400">
      <h2>Nos Abonnements IPTV</h2>
      <p>
        Explorez nos offres d'abonnement IPTV avec une large sélection de
        chaînes françaises et internationales. Profitez d'une expérience de
        visionnage fluide et de haute qualité.
      </p>
    </section>

    <!-- Toggle Switch for Switching Between "Single" and "Double" -->
    <div class="toggle-container">
      <label class="switch-label">Single</label>
      <InputSwitch v-model="selectedType" />
      <label class="switch-label"
        >Double
        <span class="font-semibold text-red-500">
          ( Promos du Mois )</span
        ></label
      >
    </div>

    <!-- Toast Component for Notifications -->
    <Toast />

    <div class="container" data-aos="fade-down" data-aos-delay="400">
      <div
        v-for="product in filteredProducts"
        :key="product.id"
        class="product-card"
      >
        <NuxtLink :to="`/produits/${product.slug}`">
          <img :src="product.photos" :alt="`${product.name} abonnement IPTV`" />
        </NuxtLink>
        <div class="product-info">
          <h3>{{ product.name }}</h3>
          <div class="flex gap-2 justify-center">
            <p class="price">{{ product.price }}€</p>
            <p class="text-lg line-through text-red-600 font-semibold">
              {{ product.price_before }}€
            </p>
          </div>
          <div class="gap-3" style="text-align: -webkit-center">
            <button class="cartBtn" @click="addToCart(product)">
              Add to Cart
            </button>
            <NuxtLink :to="`/produits/${product.slug}`">
              <button class="btn_details mt-3">View Details</button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>

    <Steps />
    <div class="movies-wrapper">
      <Movies :speed="20" />
    </div>
    <div class="footer-spacing"></div>
    <Footer />
  </div>
</template>

<style scoped>
.footer-spacing {
  margin-top: 50px;
}

.toggle-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.switch-label {
  font-size: 1rem;
  font-weight: 500;
}
</style>
