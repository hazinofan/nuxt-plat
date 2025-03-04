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

  // ✅ Add a company logo
  const companyName = "Ma Boutique";
  const logoUrl = "/assets/logo.png"; // Change this to your logo path
  doc.addImage(logoUrl, "PNG", 150, 10, 40, 20); // X, Y, Width, Height

  // ✅ Invoice Title
  doc.setFontSize(18);
  doc.setTextColor(40, 40, 40);
  doc.text("FACTURE", 20, 20);

  // ✅ Invoice Details
  doc.setFontSize(12);
  doc.text(`ID Commande: ${order.id}`, 20, 40);
  doc.text(`Client: ${order.clientName || "Non spécifié"}`, 20, 50);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 60);

  // ✅ Order Items Table
  const productList =
    Array.isArray(order.products) && order.products.length
      ? order.products.map((product, index) => [
          index + 1,
          product.products || "Produit inconnu",
        ])
      : [["-", "Non spécifié", "-", "-", "-"]];

  autoTable(doc, {
    startY: 70,
    head: [["#", "Produit", "Quantité", "Prix Unitaire", "Total"]],
    body: productList,
    theme: "grid",
    styles: { fontSize: 10, cellPadding: 4 },
    headStyles: { fillColor: [0, 122, 255], textColor: 255, fontSize: 12 },
  });

  // ✅ Payment Details
  doc.setFontSize(12);
  doc.text(`Prix Total: ${order.total_price} €`, 20, doc.lastAutoTable.finalY + 10);
  doc.text(
    `Statut de paiement: ${order.paid ? " Payé" : " En attente"}`,
    20,
    doc.lastAutoTable.finalY + 20
  );

  // ✅ Footer / Signature
  doc.text("Merci pour votre achat !", 20, doc.lastAutoTable.finalY + 40);
  doc.text("Signature du vendeur", 20, doc.lastAutoTable.finalY + 60);
  doc.line(20, doc.lastAutoTable.finalY + 65, 80, doc.lastAutoTable.finalY + 65); 

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
