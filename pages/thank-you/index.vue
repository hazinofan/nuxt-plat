<script setup>
import { ref, onMounted, computed } from "vue";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useToast } from "primevue/usetoast";

// Variables d'état
const cartItems = ref([]);
const orderNumber = Math.floor(Math.random() * (1000 - 500 + 1)) + 500;
const customerInfo = ref({ name: "", email: "", phone: "", country: "" });
const router = useRouter()
const toast = useToast() 

// Récupérer les données depuis le Local Storage
onMounted(() => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    cartItems.value = storedItems ? JSON.parse(storedItems) : [];

    const storedCustomerInfo = localStorage.getItem("customerInfo");
    customerInfo.value = storedCustomerInfo
      ? JSON.parse(storedCustomerInfo)
      : {};
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des données du Local Storage :",
      error
    );
  }
});

// Calculer le prix total
const totalPrice = computed(() =>
  cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0)
);

// Fonction pour vider le panier
const clearCart = () => {
  localStorage.removeItem("cartItems");
  cartItems.value = [];
};

const downloadAsImage = async () => {
  const element = document.getElementById("thank-you-page");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/jpeg");

  const link = document.createElement("a");
  link.href = imgData;
  link.download = `commande_${orderNumber}.jpg`;
  link.click();
};

// Fonction pour télécharger en PDF
const downloadAsPDF = async () => {
  const element = document.getElementById("thank-you-page");
  if (!element) return;

  const canvas = await html2canvas(element, { scale: 2 });
  const imgData = canvas.toDataURL("image/jpeg");

  const pdf = new jsPDF("p", "mm", "a4");
  const imgWidth = 210;
  const imgHeight = (canvas.height * imgWidth) / canvas.width;
  pdf.addImage(imgData, "JPEG", 0, 0, imgWidth, imgHeight);
  pdf.save(`commande_${orderNumber}.pdf`);
};

function redirect() {
  try {
    clearCart()
    router.push("/");
    toast.add({
      severity: "success",
      summary: "Commande traité",
      detail: "Votre Commande sera finalisée par mail ou whatsapp !",
      life: 8000,
    });
  } catch (error) {
    console.log(error, 'error')
  }
}
</script>

<template>
  <div class="max-w-7xl mx-auto p-8 bg-white shadow-lg rounded-lg my-14">
    <Toast />
    <div id="thank-you-page">
      <!-- En-tête -->
      <div
        class="flex flex-col lg:flex-row lg:justify-between lg:items-center lg:mb-16 text-center"
      >
        <img
          src="/assets/logo.png"
          alt="Logo"
          class="w-56 mb-4 lg:mb-0 lg:w-64 lg:ml-24"
        />
        <h1 class="text-3xl lg:text-4xl font-oswald font-bold text-gray-800">
          Détails de la Commande
        </h1>
      </div>

      <p class="text-2xl text-gray-600 mb-10">
        Numéro de commande : {{ orderNumber }} <br />
        Merci pour votre achat !
      </p>

      <!-- Informations sur la commande -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Informations sur la commande
          </h2>
          <ul class="text-gray-700">
            <li class="mb-2 font-medium">Résumé</li>
            <li class="mb-2">
              <span class="font-semibold">Statut :</span>
              <span class="text-green-600 font-semibold text-lg">Succès</span>
            </li>
            <li class="mb-2">
              <span class="font-semibold">Statut du paiement :</span> En attente
            </li>
            <li class="mb-2">
              <span class="font-semibold">Méthode de paiement :</span> PayPal /
              Carte de débit
            </li>
          </ul>
        </div>

        <!-- Informations sur le client -->
        <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Informations du client
          </h2>
          <ul class="text-gray-700">
            <li class="mb-2">
              <span class="font-semibold text-lg">Nom :</span>
              {{ customerInfo.name }}
            </li>
            <li class="mb-2">
              <span class="font-semibold text-lg">Email :</span>
              {{ customerInfo.email }}
            </li>
            <li class="mb-2">
              <span class="font-semibold text-lg">Téléphone :</span>
              {{ customerInfo.phone }}
            </li>
            <li class="mb-2">
              <span class="font-semibold text-lg">Pays :</span>
              {{ customerInfo.country }}
            </li>
          </ul>
        </div>

        <!-- Informations de support -->
        <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">
            Support Client
          </h2>
          <ul class="text-gray-700">
            <li class="mb-2 flex items-center text-xl gap-5 font-medium">
              <i class="pi pi-whatsapp" style="font-size: 1rem"></i> Support
              WhatsApp : +44 4753 930081
            </li>
            <li class="mb-2 flex items-center text-xl gap-5 font-medium">
              <i class="pi pi-envelope" style="font-size: 1rem"></i> Support
              Email : support@platinium-iptv.com
            </li>
          </ul>
        </div>
      </div>

      <!-- Articles du panier -->
      <div v-if="cartItems.length > 0" class="mt-8">
        <h2 class="text-xl font-semibold text-gray-800 mb-4">
          Produits commandés
        </h2>
        <ul>
          <li
            v-for="(item, index) in cartItems"
            :key="index"
            class="text-gray-700 mb-2"
          >
            - {{ item.name }} x{{ item.quantity }}
          </li>
        </ul>
      </div>
      <p v-else class="text-lg text-red-500 mt-8">Votre panier est vide.</p>

      <h1 class=" mb-16 font-semibold text-3xl text-purple-600">
        Prix Total : {{ totalPrice }}€
      </h1>
      <div class="mb-16">
        INVOICE PLATINIUM-IPTV FOR ORDERS
      </div>
      
    </div>
      <!-- Informations IPTV -->
      <div class="mt-12 p-8 bg-purple-200 rounded-lg">
        <h2 class="text-2xl font-semibold text-gray-800 mb-4">
          Accédez à votre IPTV
        </h2>
        <p class="text-gray-700 mb-4">
          Vos informations d'activation et méthode de paiement seront envoyées
          par email sous peu.
        </p>
        <p class="text-gray-700 mb-4">
          Veuillez vérifier votre boîte de réception ( ou bien un message de
          notre support whatsapp ) pour vos identifiants.
        </p>
        <p class="text-gray-700 font-medium">
          Profitez de votre abonnement IPTV !
        </p>
      </div>

    <div class="text-center mt-10 space-x-4">
      <button
        @click="downloadAsImage"
        class="px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-sky-500 to-blue-900 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
      >
        Télécharger en JPG
      </button>

      <button
        @click="downloadAsPDF"
        class="px-10 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-red-500 to-red-800 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
      >
        Télécharger en PDF
      </button>
    </div>

    <!-- Bouton Retour Accueil -->
    <div class="text-center mt-14">
      <button
        @click="redirect"
        class="px-10 py-2 rounded-tl-3xl justify-self-center rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-purple-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
        style="width: 35%"
      >
        Retour à l'accueil
      </button>
    </div>
  </div>
</template>
