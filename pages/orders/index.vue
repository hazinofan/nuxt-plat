<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted } from "vue";
import jsPDF from "jspdf";
import AOS from "aos";
import environement from "~/core/environement";

const userId = ref(null);
const orders = ref([]);
const ENGINE = environement.ENGINE_URL;
definePageMeta({
  middleware: "auth",
});

const authStore = useAuthStore(); 

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    authStore.isAuthenticated = false;
    return;
  }

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
    console.log(userId.value);
  } catch (error) {
    console.error("Invalid token", error);
    authStore.isAuthenticated = false;
  }
};

const fetchOrders = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token || !userId.value) return;

    const response = await fetch(`${ENGINE}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Erreur de récupération des commandes");
    }

    const data = await response.json();
    orders.value = data.orders || [];
    console.log(orders.value, "value");
  } catch (error) {
    console.error("Erreur lors de la récupération des commandes", error);
  }
};

const generateInvoice = (order) => {
  const doc = new jsPDF();

  // ✅ Company Logo & Name
  const companyName = "PLATINIUM IPTV";
  const logoUrl = "/assets/logo.png"; // Update with your actual logo path
  doc.addImage(logoUrl, "PNG", 140, 10, 50, 20); // X, Y, Width, Height

  doc.setFontSize(22);
  doc.setTextColor(40, 40, 40);
  doc.text(companyName, 20, 20);

  // ✅ Invoice Title
  doc.setFontSize(16);
  doc.setTextColor(50, 50, 50);
  doc.text("FACTURE D'ACHAT", 20, 40);

  // ✅ Order Details Section
  doc.setFontSize(12);
  doc.text(`ID Commande: ${order.id}`, 20, 55);
  doc.text(`Client: ${order.clientName || "Non spécifié"}`, 20, 65);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 75);

  // ✅ Display Product List Without Table
  doc.setFontSize(14);
  doc.setTextColor(0, 122, 255);
  doc.text("Produits commandés:", 20, 90);
  doc.setTextColor(0);

  if (Array.isArray(order.products) && order.products.length) {
    order.products.forEach((product, index) => {
      doc.text(`• ${product}`, 25, 100 + index * 8); // Bullet points
    });
  } else {
    doc.text("Aucun produit disponible", 25, 100);
  }

  // ✅ Order Total & Payment Status
  const lastProductY = 100 + order.products.length * 8 + 10;
  doc.setFontSize(12);
  doc.text(`Prix Total: ${order.total_price} €`, 20, lastProductY);
  doc.text(
    `Statut de paiement: ${order.paid ? "✅ Payé" : "⚠️ En attente"}`,
    20,
    lastProductY + 10
  );

  // ✅ Footer / Signature
  doc.setFontSize(10);
  doc.setTextColor(100);
  doc.text(
    "Merci pour votre achat chez Platinium IPTV !",
    20,
    lastProductY + 30
  );
  doc.text("Signature du vendeur", 20, lastProductY + 50);
  doc.line(20, lastProductY + 55, 80, lastProductY + 55); // Draw signature line

  // ✅ Save or Open PDF
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};

onMounted(async () => {
  AOS.init();
  await fetchUser();
  fetchOrders();
});
</script>

<template>
  <NuxtLayout name="user">
    <!-- 🚨 Show Custom Unauthorized Message -->
    <div
      v-if="!authStore.isAuthenticated"
      class="flex items-center justify-center min-h-screen px-4"
    >
      <div
        class="bg-white shadow-lg rounded-lg p-6 text-center max-w-lg w-full sm:w-3/4 lg:w-1/2 xl:w-1/3"
      >
        <h2
          class="text-xl sm:text-2xl flex flex-row gap-2 items-center justify-center font-semibold text-red-500"
        >
          <i class="pi pi-ban text-3xl sm:text-4xl"></i> Accès Refusé
        </h2>
        <p class="text-gray-700 mt-2 text-sm sm:text-base">
          Vous devez être connecté pour accéder à cette page.
        </p>
        <button
          class="mt-4 w-full sm:w-auto px-6 py-3 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 transition"
          @click="router.push('/login')"
        >
          Aller à la page de connexion
        </button>
      </div>
    </div>

    <div
      class="p-4 sm:p-6 lg:p-8 space-y-4"
      data-aos="fade-down"
      data-aos-delay="400"
      v-else
    >
      <h1 class="text-2xl sm:text-3xl md:text-4xl font-oswald font-semibold">
        Votre historique de commandes :
      </h1>

      <!-- ✅ Show message if no orders -->
      <div
        v-if="orders.length === 0"
        class="text-center text-gray-600 p-6 sm:p-8"
      >
        <p class="text-lg sm:text-xl font-semibold">Aucune commande trouvée.</p>
        <p class="text-gray-500 text-sm sm:text-base">
          Vous n'avez pas encore passé de commande.
        </p>
        <NuxtLink
          to="/produits"
          class="text-purple-500 font-semibold font-roboto hover:underline"
        >
          Explorer les produits →
        </NuxtLink>
      </div>

      <!-- ✅ Make Table Responsive -->
      <div v-else class="overflow-x-auto">
        <DataTable
          :value="orders"
          stripedRows
          tableStyle="min-width: 40rem sm:min-w-[50rem]"
          :emptyMessage="'Aucune commande disponible'"
        >
          <!-- ID -->
          <Column field="id" header="ID de Commande"></Column>

          <!-- Produits -->
          <Column field="products" header="Produits"></Column>

          <!-- Prix -->
          <Column field="total_price" header="Prix">
            <template #body="slotProps">
              {{ slotProps.data.total_price }} €
            </template>
          </Column>

          <!-- Facture (Télécharger Button) -->
          <Column field="invoice" header="Facture">
            <template #body="slotProps">
              <Button
                icon="pi pi-download"
                label="Télécharger"
                class="p-button-sm p-button-primary"
                @click="generateInvoice(slotProps.data)"
              />
            </template>
          </Column>

          <!-- Payé (Tag) -->
          <Column field="paid" header="Payé">
            <template #body="slotProps">
              <Tag
                :severity="slotProps.data.paid ? 'success' : 'warn'"
                :value="slotProps.data.paid ? 'Payé' : 'En attente'"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </div>
  </NuxtLayout>
</template>


