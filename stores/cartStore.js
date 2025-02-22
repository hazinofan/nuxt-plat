import { defineStore } from "pinia";
import { ref } from "vue";

export const useCartStore = defineStore("cart", () => {
  const isCartOpen = ref(false); // Cart open state
  const cartItems = ref([]); // Cart items

  const toggleCart = () => {
    isCartOpen.value = !isCartOpen.value;
  };

  return { isCartOpen, toggleCart, cartItems };
});
