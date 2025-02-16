<template>
  <nav>
    <!-- Horizontal Navbar -->
    <ul class="horizontal-navbar">
      <li v-for="(item, index) in navItems" :key="index">
        <NuxtLink
          v-if="item.to"
          :to="item.to"
          class="icon_home"
          :class="{ active: route.path === item.to }"
        >
          <i :class="`pi ${item.icon} text-2xl`"></i>
          <span>{{ item.label }}</span>
        </NuxtLink>
        <button v-else @click="item.onClick" class="icon_home">
          <i :class="`pi ${item.icon} text-2xl`"></i>
          <span>{{ item.label }}</span>
        </button>
      </li>
    </ul>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" :class="{ open: isCartOpen }">
      <img
        src="/assets/logo2.png"
        alt="Platinium IPTV Logo"
        width="200"
        class="ml-16"
      />
      <div class="cart-header">
        <h3>Votre Panier</h3>
        <button @click="toggleCart">
          <i class="pi pi-times text-red-600 font-bold text-xl"></i>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="cart-items">
        <template v-if="cartItems && cartItems.length > 0">
          <div v-for="item in cartItems" :key="item.id" class="cart-item">
            <p>{{ item.name }}</p>
            <p class="font-semibold text-green-600">
              {{ item.price }}€ x {{ item.quantity }}
            </p>
          </div>
        </template>
        <p v-else>Panier Vide</p>
      </div>

      <!-- Cart Total -->
      <div class="cart-total">
        <p class="text-lg font-semibold text-green-700">
          Total: {{ totalPrice }}€
        </p>
      </div>

      <!-- Cart Actions -->
      <div class="flex gap-3">
        <button @click="clearCart" class="cart-clear-btn">
          Vider le Panier
        </button>
        <NuxtLink
          to="/checkout"
          class="cart-checkout-btn"
          @click="toggleCart"
          :disabled="!cartItems || cartItems.length === 0"
        >
          Procéder au Paiement
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import "../assets/css/navbar.scss";

// ✅ Manually Define PrimeVue Icons
const PrimeIcons = {
  HOME: "pi pi-home",
  SHOPPING_BAG: "pi pi-shopping-bag",
  DESKTOP: "pi pi-desktop",
  FILE: "pi pi-file",
  SHOPPING_CART: "pi pi-shopping-cart",
  SIGN_IN: "pi pi-sign-in",
};

// Nuxt Hooks
const route = useRoute();

// States
const isCartOpen = ref(false);
const cartItems = ref([]); // ✅ Ensuring it's always initialized
const currentLang = ref("fr");

// Toggle the cart
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// Fetch cart items from localStorage
const fetchCartItems = () => {
  const storedCart = localStorage.getItem("cartItems");
  cartItems.value = storedCart ? JSON.parse(storedCart) : [];
};

// Calculate total price
const totalPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Clear cart
const clearCart = () => {
  localStorage.removeItem("cartItems");
  cartItems.value = [];
};

// Watch for localStorage changes
onMounted(() => {
  fetchCartItems();
  window.addEventListener("storage", fetchCartItems);
});

watchEffect(() => {
  if (isCartOpen.value) {
    fetchCartItems();
  }
});

// Navigation items with PrimeVue icons
const navItems = [
  { to: "/", icon: PrimeIcons.HOME, label: "Accueil" },
  { to: "/produits", icon: PrimeIcons.SHOPPING_BAG, label: "Produits" },
  { to: "/test-gratuit", icon: PrimeIcons.DESKTOP, label: "Test Gratuit" },
  { to: "/blogs", icon: PrimeIcons.FILE, label: "Blogs" },
  { icon: PrimeIcons.SHOPPING_CART, onClick: toggleCart },
  { to: "/login", icon: PrimeIcons.SIGN_IN, label: "Login" },
];
</script>

<style scoped>
/* Ensure PrimeVue icons have correct styles */
.pi {
  font-size: 1.5rem;
}
</style>
