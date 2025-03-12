<script setup>
import { ref, computed, onMounted, watchEffect, onUnmounted } from "vue";
import { useHead } from "#imports";
import AOS from "aos";
import "aos/dist/aos.css";
import "../../assets/css/products.css";
import { useToast } from "primevue/usetoast";
import { getProducts } from "~/core/services/products.services";
import { ProgressSpinner } from "primevue";

const products = ref([]);
const loading = ref(false);
const selectedType = ref(true);
const toast = useToast();
const cartItems = ref([]);
const isCartOpen = ref(false);

// ✅ Fetch Products
async function fetchProducts() {
  loading.value = true;
  try {
    const response = await getProducts();
    products.value = response;
  } catch (error) {
    console.error("Error fetching products:", error);
  } finally {
    loading.value = false;
  }
}

// ✅ Fetch Cart Items (Client-Side Only)
const fetchCartItems = () => {
  if (process.client) {
    const storedCart = localStorage.getItem("cartItems");
    cartItems.value = storedCart ? JSON.parse(storedCart) : [];
  }
};

// ✅ Add Product to Cart (Client-Side Only)
const addToCart = (product) => {
  if (!process.client) return;

  const storedCart = localStorage.getItem("cartItems");
  const cart = storedCart ? JSON.parse(storedCart) : [];

  const existingItem = cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem("cartItems", JSON.stringify(cart));
  window.dispatchEvent(new Event("storage"));

  toast.add({
    severity: "success",
    summary: "Success",
    detail: `${product.name} has been added to the cart!`,
    life: 3000,
  });

  fetchCartItems();
};

// ✅ Computed Property for Total Price
const totalPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

// ✅ Clear Cart (Client-Side Only)
const clearCart = () => {
  if (!process.client) return;

  localStorage.removeItem("cartItems");
  cartItems.value = [];
};

// ✅ Watch for Local Storage Changes
watchEffect(() => {
  if (isCartOpen.value && process.client) {
    fetchCartItems();
  }
});

// ✅ Cleanup Storage Event Listener
onUnmounted(() => {
  if (process.client) {
    window.removeEventListener("storage", fetchCartItems);
  }
});

// ✅ Fetch Data on Mount (Only Client-Side)
onMounted(() => {
  if (process.client) {
    AOS.init();
    fetchProducts();
    fetchCartItems();
    window.addEventListener("storage", fetchCartItems);
  }
});

const filteredProducts = computed(() => {
  return products.value.filter((product) =>
    selectedType.value
      ? product.display === "Double"
      : product.display === "Single"
  );
});

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
    <NuxtLayout name="support">
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
        <div
          class="card flex flex-wrap gap-4 button-display"
          style="float: inline-end; padding-right: 100px"
        >
          <Button
            type="button"
            class="mt-6"
            label="Votre Panier"
            icon="pi pi-shopping-cart"
            :badge="cartItems.length"
            @click="openCart"
            :style="{
              background: '#a65286',
              border: '1px solid #a65286',
              color: 'white',
            }"
          />
        </div>
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
      <div class="fixed inset-0 flex justify-center items-center bg-opacity-50">
        <ProgressSpinner v-if="loading" />
      </div>

      <div class="container" data-aos="fade-down" data-aos-delay="400">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="product-card"
        >
          <NuxtLink :to="`/produits/${product.slug}`">
            <img
              :src="product.photos"
              :alt="`${product.name} abonnement IPTV`"
            />
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
              <NuxtLink
                class="justify-center"
                :to="`/produits/${product.slug}`"
              >
                <button class="btn_details mt-3">Plus de Details</button>
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
    </NuxtLayout>
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
