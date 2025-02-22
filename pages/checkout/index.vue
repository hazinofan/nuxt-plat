<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter } from "vue-router";
import Navbar from "~/components/navbar.vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Footer from "~/components/footer.vue";

const router = useRouter();
const cartItems = ref([]);
const totalPrice = ref(0);
const selectedCountry = ref(null);
const phoneCode = ref("");

const countries = ref([
  { name: "France", code: "+33" },
  { name: "Belgique", code: "+32" },
  { name: "Canada", code: "+1" },
  { name: "États-Unis", code: "+1" },
  { name: "Mexique", code: "+52" },
  { name: "Allemagne", code: "+49" },
  { name: "Espagne", code: "+34" },
  { name: "Italie", code: "+39" },
  { name: "Royaume-Uni", code: "+44" },
  { name: "Suisse", code: "+41" },
  { name: "Pays-Bas", code: "+31" },
  { name: "Suède", code: "+46" },
  { name: "Norvège", code: "+47" },
  { name: "Danemark", code: "+45" },
  { name: "Portugal", code: "+351" },
  { name: "Finlande", code: "+358" },
  { name: "Grèce", code: "+30" },
  { name: "Autriche", code: "+43" },
]);

onMounted(() => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    cartItems.value = storedItems ? JSON.parse(storedItems) : [];
    totalPrice.value = cartItems.value.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    cartItems.value = [];
  }
});

const updatePhoneCode = () => {
  const country = countries.value.find(
    (c) => c.name === selectedCountry.value?.name
  );
  phoneCode.value = country ? country.code : "";
};

const handleOrderSubmit = (event) => {
  event.preventDefault();

  const customerInfo = {
    name: event.target.full_name.value,
    email: event.target.email.value,
    country: selectedCountry.value.name,
    phone: phoneCode.value + " " + event.target.phone.value,
    message: event.target.additional_message.value,
  };

  localStorage.setItem("customerInfo", JSON.stringify(customerInfo));
  router.push("/thank-you");
};
</script>

<template>
  <div
    class="relative mx-auto w-full bg-cover bg-center"
    :style="{ backgroundImage: `url('/assets/bgg.jpg')` }"
  >
    <Navbar />
    <div class="absolute inset-0 bg-black opacity-15 z-0"></div>
    <div class="grid min-h-screen grid-cols-10 relative z-10">
      <div
        class="col-span-full pb-6 px-4 sm:pb-12 lg:col-span-6 lg:pb-24 mt-20"
      >
        <div class="mx-auto w-full max-w-lg">
          <h1 class="text-2xl font-medium font-oswald text-black sm:text-3xl">
            Paiement Sécurisé
            <span class="mt-2 block h-1 w-10 bg-purple-600 sm:w-20"></span>
          </h1>
          <img
            src="/assets/logo2.png"
            alt="platinium iptv logo"
            width="200"
            class="mt-10"
          />
          <form
            class="mt-10 flex flex-col space-y-4"
            @submit="handleOrderSubmit"
          >
            <label for="name" class="text-md font-semibold"
              >Nom Complet : *</label
            >
            <InputText
              id="name"
              name="full_name"
              required
              class="w-full bg-white/55"
            />

            <label for="email" class="text-md font-semibold">Email : *</label>
            <InputText
              id="email"
              name="email"
              type="email"
              required
              class="w-full"
            />

            <label for="country" class="text-md font-semibold">Pays: *</label>
            <Dropdown
              id="country"
              v-model="selectedCountry"
              :options="countries"
              optionLabel="name"
              placeholder="Sélectionnez un pays"
              class="w-full"
              @change="updatePhoneCode"
            />

            <label for="phone" class="text-md font-semibold"
              >Téléphone : *</label
            >
            <div class="flex items-center">
              <span class="mr-2 text-xl">{{ phoneCode }}</span>
              <InputText id="phone" name="phone" class="w-full" />
            </div>

            <label for="message" class="text-md font-semibold"
              >Informations supplémentaires :</label
            >
            <Textarea
              id="message"
              name="additional_message"
              rows="4"
              class="w-full"
            />
            <div
              class="bg-card text-card-foreground"
              :style="{
                fontFamily: 'Oswald, sans-serif',
                justifyContent: 'center',
              }"
            >
              <h1 class="text-2xl font-bold mb-4">
                Paiement
              </h1>
              <div
                class="bg-white-200 border-white border-2 p-4 rounded shadow-md"
              >
                <h2 class="font-semibold mb-2">Facture à régler par PayPal ou carte de crédit</h2>
                <p class="text-muted-foreground text-black text-xl">
                  Merci d'avoir choisi Platinium IPTV , votre commande est en attente de paiement. Vous recevrez une facture par email à régler par PayPal ou par carte de crédit.
                </p>
              </div>
              <p class="mt-4 text-sm text-muted-foreground">
                  Vos données personnelles seront utilisées pour traiter votre commande, soutenir votre expérience sur ce site et à d'autres fins décrites dans notre
                <a href="#" class="text-primary underline ml-1"
                  >Politique de confidentialité</a
                >.
              </p>
            </div>

            <button
            class="px-10 py-3 rounded-tl-3xl font-oswald rounded-br-3xl items-center rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
            aria-label="Ajouter un produit"
          >
            <i class="pi pi-credit-card text-lg mr-2" ></i>
            Passer La commande 
          </button>
          </form>
        </div>
      </div>

      <div
        class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24"
      >
        <div>
          <img
            src="/assets/movie.jpg"
            alt="Paiement Sécurisé"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800/85 to-black opacity-95"
          ></div>
        </div>
        <div class="relative pt-20">
          <h2 class="text-4xl font-oswald mb-10 font-bold text-white">Résumé de la commande</h2>
          <ul class="space-y-5 mt-4">
            <li v-if="cartItems.length === 0" class="text-white">
              Votre panier est vide.
            </li>
            <li
              v-for="(item, index) in cartItems"
              :key="index"
              class="flex justify-between items-center text-lg text-white"
            >
              <img :src="item.photos" alt="Produit" width="120" />
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ item.price }}€</span>
            </li>
          </ul>
          <div class="my-5 h-0.5 w-full bg-gray-600"></div>
          <p class="flex justify-between text-2xl font-bold text-white">
            <span>Total :</span>
            <span>{{ totalPrice }}€</span>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
