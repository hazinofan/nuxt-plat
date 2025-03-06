<script setup>
import { jwtDecode } from "jwt-decode";
import { ref, onMounted } from "vue";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Auto-table for structured tables
import environement from "~/core/environement";

const userId = ref(null);
const orders = ref([]);
const ENGINE = environement.ENGINE_URL;

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
    console.log(userId.value);
  } catch (error) {
    console.error("Invalid token", error);
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
  const lastProductY = 100 + (order.products.length * 8) + 10;
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
  doc.text("Merci pour votre achat chez Platinium IPTV !", 20, lastProductY + 30);
  doc.text("Signature du vendeur", 20, lastProductY + 50);
  doc.line(20, lastProductY + 55, 80, lastProductY + 55); // Draw signature line

  // ✅ Save or Open PDF
  const pdfBlob = doc.output("blob");
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, "_blank");
};


onMounted(async () => {
  await fetchUser();
  fetchOrders();
});
</script>

<template>
  <NuxtLayout name="user">
    <div class="p-4 space-y-4">
      <h1 class="text-4xl font-oswald font-semibold">
        Votre historique de commandes :
      </h1>
    </div>

    <DataTable :value="orders" stripedRows tableStyle="min-width: 50rem">
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
  </NuxtLayout>
</template>
