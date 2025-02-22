<template>
  <nav>
    <Toast />
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
        <button
          v-else
          @click="item.onClick"
          class="icon_home relative"
          :aria-label="item.label || 'Bouton de navigation'"
        >
          <i :class="`pi ${item.icon} text-2xl`"></i>
          <span v-if="item.label" class="sr-only">{{ item.label }}</span>

          <span
            v-if="
              item.icon === PrimeIcons.SHOPPING_CART && cartItems.length > 0
            "
            class="cart-badge"
          >
            {{ cartItems.length }}
          </span>
        </button>
      </li>
    </ul>

    <!-- Cart Sidebar -->
    <div class="cart-sidebar" :class="{ open: isCartOpen }">
      <NuxtImg
        src="/assets/logo2.png"
        format="webp"
        alt="Platinium IPTV Logo"
      />
      <div class="cart-header">
        <h2 class="text-white">Votre Panier</h2>
        <button @click="toggleCart" aria-label="Fermer le panier">
          <i class="pi pi-times text-red-600 font-bold text-xl"></i>
        </button>
      </div>

      <!-- Cart Items -->
      <div class="cart-items p-4 bg-white rounded-lg">
        <template v-if="cartItems.length > 0">
          <div
            v-for="item in cartItems"
            :key="item.id"
            class="cart-item flex items-center justify-between border-b py-3"
          >
            <!-- Left Side: Image & Info -->
            <div class="flex items-center space-x-4">
              <img
                :src="item.photos"
                class="w-16 h-16 object-cover rounded-md border"
                alt="Product Image"
              />
            </div>

            <div class="">
              <div>
                <p class="text-lg font-semibold text-center">{{ item.name }}</p>
              </div>
              <!-- Right Side: Price & Remove Button -->
              <div class="flex items-center space-x-4 justify-self-center">
                <p class="text-green-600 font-semibold">
                  {{ item.price }}€ x {{ item.quantity }}
                </p>
                <button
                  @click="removeFromCart(item.id)"
                  class="p-2 text-red-600 hover:text-red-800 transition"
                  title="Remove Item"
                >
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <!-- Total Price -->
          <div class="text-right mt-4">
            <p class="text-lg font-bold">Total: {{ totalPrice }}€</p>
          </div>
          <!-- Cart Actions -->
          <div class="flex gap-3">
            <Button
              label="Vider le Panier"
              class="p-button-outlined p-button-danger mt-8"
              @click="clearCart"
            />

            <Button
              label="Procéder au Paiement"
              class="p-button-outlined p-button-success mt-8"
              :disabled="!cartItems || cartItems.length === 0"
              @click="
                $router.push('/checkout');
                toggleCart();
              "
            />
          </div>
        </template>

        <!-- Empty Cart Message -->
        <p v-else class="text-center text-gray-500 py-4">
          🛒 Votre panier est vide
        </p>
      </div>

      <!-- Cart Total -->
      <div class="cart-total">
        <p class="text-lg font-semibold text-green-700 text-center">
          Total: {{ totalPrice }}€
        </p>
      </div>
    </div>
  </nav>
</template>


<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute } from "vue-router";
import "../assets/css/navbar.scss";
import { Toast } from "primevue";

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
const toast = useToast();

// Toggle the cart
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// Fetch cart items from localStorage
const fetchCartItems = () => {
  const storedCart = localStorage.getItem("cartItems");
  cartItems.value = storedCart ? JSON.parse(storedCart) : [];
};

const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
  toast.add({
    severity: "success",
    summary: "Success",
    detail: `Produit Supprimé Avec succès!`,
    life: 3000,
  });
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

// Navigation items with PrimeVue iconsa
const navItems = [
  { to: "/", icon: PrimeIcons.HOME, label: "Accueil" },
  { to: "/produits", icon: PrimeIcons.SHOPPING_BAG, label: "Produits" },
  { to: "/test-gratuit", icon: PrimeIcons.DESKTOP, label: "Test Gratuit" },
  { to: "/blogs", icon: PrimeIcons.FILE, label: "Blogs" },
  { icon: PrimeIcons.SHOPPING_CART, onClick: toggleCart, label: "Panier" },
  { to: "/login", icon: PrimeIcons.SIGN_IN, label: "Login" },
];
</script>

<style scoped>
/* Ensure PrimeVue icons have correct styles */
.pi {
  font-size: 1.5rem;
}
.icon_home .pi-shopping-cart {
  color: white !important;
}

/* 🔴 Cart Badge - Small Red Notification Circle */
.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background-color: red;
  color: white;
  font-size: 0.7rem;
  font-weight: bold;
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style>
