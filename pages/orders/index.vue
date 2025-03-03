<script setup>

</script>

<template>
  <NuxtLayout name="user">
    <div class="p-4 space-y-4">
      <h1 class="text-4xl font-oswald font-semibold">
        Votre historique de commandes :
      </h1>
    </div>
    <DataTable :value="products" stripedRows tableStyle="min-width: 50rem">
      <Column field="id" header="ID de Commande"></Column>
      <Column field="name" header="Produits"></Column>
      <Column field="total_price" header="Prix"></Column>
      <Column field="invoice" header="Facture"></Column>
      <Column field="paid" header="Payé"></Column>
    </DataTable>
  </NuxtLayout>
</template>



<style scoped>
</style>