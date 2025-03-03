
<script setup>
import { ref, computed, onMounted, watchEffect } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useToast } from "primevue/usetoast";
import { jwtDecode } from "jwt-decode";
import "../assets/css/navbar.scss";

// ✅ Define Icons
const PrimeIcons = {
  HOME: "pi pi-home",
  SHOPPING_BAG: "pi pi-shopping-bag",
  DESKTOP: "pi pi-desktop",
  FILE: "pi pi-file",
  SHOPPING_CART: "pi pi-shopping-cart",
  SIGN_IN: "pi pi-sign-in",
};

// ✅ Nuxt Hooks
const route = useRoute();
const router = useRouter();
const toast = useToast();

// ✅ States
const isCartOpen = ref(false);
const isUserMenuOpen = ref(false);
const user = ref(null);
const cartItems = ref([]);

// ✅ Fetch User from Token
const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    user.value = jwtDecode(token);
    console.log("User Data:", user.value);
  } catch (error) {
    console.error("Invalid token", error);
  }
};

// ✅ Computed Navigation Items
const navItems = computed(() => [
  { to: "/", icon: PrimeIcons.HOME, label: "Accueil" },
  { to: "/produits", icon: PrimeIcons.SHOPPING_BAG, label: "Produits" },
  { to: "/test-gratuit", icon: PrimeIcons.DESKTOP, label: "Test Gratuit" },
  { to: "/blogs", icon: PrimeIcons.FILE, label: "Blogs" },
  { icon: PrimeIcons.SHOPPING_CART, onClick: toggleCart, label: "Panier" },
  user.value
    ? {
        user: true,
        username: user.value.username,
        avatar: user.value.avatar || "/default-avatar.jpg",
      }
    : { to: "/login", icon: PrimeIcons.SIGN_IN, label: "Login" },
]);

// ✅ Logout Function
const logout = () => {
  localStorage.removeItem("token");
  user.value = null;
  toast.add({
    severity: "success",
    summary: "Déconnexion réussie",
    detail: "Vous êtes maintenant déconnecté.",
    life: 3000,
  });
  router.push("/");
};

// ✅ Toggle User Menu
const toggleUserMenu = () => {
  isUserMenuOpen.value = !isUserMenuOpen.value;
};

// ✅ Fetch cart items
const fetchCartItems = () => {
  const storedCart = localStorage.getItem("cartItems");
  cartItems.value = storedCart ? JSON.parse(storedCart) : [];
};

// ✅ Remove item from cart
const removeFromCart = (id) => {
  cartItems.value = cartItems.value.filter((item) => item.id !== id);
  localStorage.setItem("cartItems", JSON.stringify(cartItems.value));
};

// ✅ Calculate total price
const totalPrice = computed(() => cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0));

// ✅ Clear cart
const clearCart = () => {
  localStorage.removeItem("cartItems");
  cartItems.value = [];
};

// ✅ Toggle Cart
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// ✅ Fetch data on mount
onMounted(() => {
  fetchUser();
  fetchCartItems();
});
</script>



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
          <i v-if="item.icon" :class="`pi ${item.icon} text-2xl`"></i>
          <span v-if="item.label">{{ item.label }}</span>
        </NuxtLink>

        <!-- User Avatar (if logged in) -->
        <div v-else-if="item.user" class="user-profile relative">
          <button @click="toggleUserMenu" class="flex items-center space-x-2">
            <Avatar :image="item.avatar" class="avatar" size="large" shape="circle" />
            <span class="text-white font-semibold text-sm">{{ item.username }}</span>
            <i class="pi pi-chevron-up text-white text-xs"></i>
          </button>

          <!-- Dropdown Menu (Opens Upwards) -->
          <Transition name="fade">
            <ul v-if="isUserMenuOpen" class="user-dropdown">
              <li>
                <NuxtLink to="/dashboard" class="dropdown-item">
                  <i class="pi pi-user"></i> Mon Profil
                </NuxtLink>
              </li>
              <li @click="logout" class="dropdown-item logout">
                <i class="pi pi-sign-out"></i> Déconnexion
              </li>
            </ul>
          </Transition>
        </div>

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
      <NuxtImg src="/assets/logo2.png" format="webp" alt="Platinium IPTV Logo" />
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
            <div class="flex items-center space-x-4">
              <img :src="item.photos" class="w-16 h-16 object-cover rounded-md border" alt="Product Image" />
            </div>
            <div>
              <p class="text-lg font-semibold text-center">{{ item.name }}</p>
              <div class="flex items-center space-x-4 justify-self-center">
                <p class="text-green-600 font-semibold">
                  {{ item.price }}€ x {{ item.quantity }}
                </p>
                <button @click="removeFromCart(item.id)" class="p-2 text-red-600 hover:text-red-800 transition" title="Remove Item">
                  🗑️
                </button>
              </div>
            </div>
          </div>

          <div class="text-right mt-4">
            <p class="text-lg font-bold">Total: {{ totalPrice }}€</p>
          </div>

          <div class="flex gap-3">
            <Button label="Vider le Panier" class="p-button-outlined p-button-danger mt-8" @click="clearCart" />
            <Button
              label="Procéder au Paiement"
              class="p-button-outlined p-button-success mt-8"
              :disabled="!cartItems || cartItems.length === 0"
              @click="$router.push('/checkout'); toggleCart();"
            />
          </div>
        </template>

        <p v-else class="text-center text-gray-500 py-4"> 🛒 Votre panier est vide </p>
      </div>
    </div>
  </nav>
</template>



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
/* Navbar Styling */
.horizontal-navbar {
  display: flex;
  align-items: center;
  background-color: #0a0f37;
  padding: 10px;
  border-radius: 8px;
}

/* Icon Styling */
.icon_home {
  padding: 10px;
}

/* User Profile Button */
.user-profile {
  display: flex;
  align-items: center;
  position: relative;
}

/* Smaller Avatar to Fit Better */
.avatar {
  width: 36px !important;
  height: 36px !important;
  border: 2px solid white;
}

/* Dropdown Menu */
.user-dropdown {
  position: absolute;
  bottom: 50px;
  right: 0;
  background: white;
  border-radius: 6px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  padding: 8px;
  z-index: 100;
  min-width: 140px;
  list-style: none;
}

/* Dropdown Items */
.dropdown-item {
  display: flex;
  align-items: center;
  padding: 8px;
  font-size: 13px;
  color: black;
  transition: background 0.2s;
  cursor: pointer;
}

.dropdown-item i {
  margin-right: 6px;
}

.dropdown-item:hover {
  background: #f1f1f1;
  border-radius: 4px;
}

/* Logout Button */
.logout {
  color: red;
  font-weight: bold;
}

/* Fade Transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
