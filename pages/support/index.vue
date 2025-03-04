<script setup>
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";
import { createTicket } from "~/core/services/tickets.service";
import { getUserProfile } from "~/core/services/platUsers.auth.service";
import environement from "~/core/environement";

const showModal = ref(false);
const toast = useToast()
const loading = ref(false);
const userId = ref(null);
const tickets = ref([])
const ENGINE = environement.ENGINE_URL

const formData = ref({
  message: "",
  subject: "",
});

// Create a new Ticket
const createNewTicket = async () => {
  if (!formData.value.subject || !formData.value.message) {
    alert("Veuillez remplir tous les champs !");
    return;
  }

  loading.value = true;
  try {
    const response = await createTicket(
      userId.value,
      formData.value.subject,
      formData.value.message  
    );
    console.log(response);

    showModal.value = false;
    formData.value.subject = "";
    formData.value.message = "";

    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Vous allez recevoir un Message du support Bientot",
    });

    fetchTickets()
  } catch (error) {
    console.error("Erreur lors de la création du ticket:", error);
  } finally {
    loading.value = false;
  }
};


const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
  } catch (error) {
    console.error("Invalid token", error);
  }
};

const fetchTickets = async() => {
  const token = localStorage.getItem('token')
  loading.value = true
  try {
    const response = await fetch(`${ENGINE}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json()
    tickets.value = data.ticket

    console.log(tickets.value, 'fetched tickets')
  } catch (error) {
    console.error(error)
  }
}

onMounted(() => {
  fetchUser();
  fetchTickets()
});
</script>

<template>
  <NuxtLayout name="user">
    <Toast />
    <div class="flex flex-row justify-between items-center px-16 pt-6">
      <h1 class="text-3xl font-oswald">Ajouter un ticket de Support</h1>
      <Button
        label="Ajouter un Ticket"
        icon="pi pi-plus"
        @click="showModal = true"
      />
    </div>

    <!-- Modal for Creating a Ticket -->
    <Dialog
      v-model:visible="showModal"
      :draggable="false"
      modal
      header="Nouveau Ticket"
      :style="{ width: '500px' }"
    >
      <div class="p-4 flex flex-col gap-4 font-roboto">
        <InputText
          v-model="formData.subject"
          placeholder="Sujet du ticket"
          class="w-full p-2 border rounded"
        />
        <Textarea
          v-model="formData.message"
          placeholder="Message"
          class="w-full p-2 border rounded"
          rows="4"
        />

        <div class="flex justify-end gap-2">
          <Button
            label="Annuler"
            icon="pi pi-times"
            class="p-button-text"
            @click="showModal = false"
          />
          <Button
            label="Envoyer"
            icon="pi pi-check"
            class="p-button-primary"
            @click="createNewTicket"
          />
        </div>
      </div>
    </Dialog>

    <Card v-for="ticket in tickets" :key="ticket.id" class="mt-4 font-oswald shadow-md">
        <template #title>{{ ticket.subject }}</template>
        
        <template #content>
          <p class="font-roboto text-gray-700">
            {{ ticket.message }}
          </p>
          <Tag 
            :icon="ticket.status === 'open' ? 'pi pi-clock' : 'pi pi-check'" 
            :severity="ticket.status === 'open' ? 'warning' : 'success'" 
            :value="ticket.status === 'open' ? 'En cours' : 'Clôturé'"
            class="mt-4"
          />
        </template>
      </Card>

  </NuxtLayout>
</template>



<style scoped>
</style>