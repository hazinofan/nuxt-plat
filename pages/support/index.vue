<script setup>
import { jwtDecode } from "jwt-decode";
import AOS from "aos";
import environement from "~/core/environement";
import { useRouter } from "vue-router";

definePageMeta({
  middleware: "auth", // ✅ Use the new middleware
});

const authStore = useAuthStore(); // ✅ Access authentication state
const router = useRouter();
const showModal = ref(false);
const toast = useToast();
const loading = ref(false);
const userId = ref(null);
const tickets = ref([]);
const ENGINE = environement.ENGINE_URL;

const formData = ref({
  message: "",
  subject: "",
});

// Fetch User Info
const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    authStore.isAuthenticated = false;
    return;
  }

  try {
    const userData = jwtDecode(token);
    userId.value = userData.id;
  } catch (error) {
    console.error("Invalid token", error);
    authStore.isAuthenticated = false; 
  }
};

// Fetch Tickets
const fetchTickets = async () => {
  if (!authStore.isAuthenticated) return;
  const token = localStorage.getItem("token");
  loading.value = true;
  try {
    const response = await fetch(`${ENGINE}/users/${userId.value}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await response.json();
    tickets.value = data.ticket;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  AOS.init();
  fetchUser();
  fetchTickets();
});
</script>

<template>
  <NuxtLayout name="user">
    <div class="" data-aos="fade-down" data-aos-delay="400">
      <Toast />

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

      <!-- ✅ Show Tickets Section if Authenticated -->
      <div v-else>
        <!-- Header Section -->
        <div
          class="flex flex-col sm:flex-row justify-between items-center px-6 sm:px-16 pt-6 gap-4"
        >
          <h1 class="text-lg sm:text-2xl md:text-3xl font-oswald">
            Ajouter un ticket de Support
          </h1>
          <Button
            label="Ajouter un Ticket"
            icon="pi pi-plus"
            class="w-full sm:w-auto"
            @click="showModal = true"
          />
        </div>

        <!-- Modal for Creating a Ticket -->
        <Dialog
          v-model:visible="showModal"
          :draggable="false"
          modal
          header="Nouveau Ticket"
          :style="{ width: '100%', maxWidth: '500px' }"
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

            <div class="flex flex-col sm:flex-row justify-end gap-2">
              <Button
                label="Annuler"
                icon="pi pi-times"
                class="p-button-text w-full sm:w-auto"
                @click="showModal = false"
              />
              <Button
                label="Envoyer"
                icon="pi pi-check"
                class="p-button-primary w-full sm:w-auto"
                @click="createNewTicket"
              />
            </div>
          </div>
        </Dialog>

        <!-- Tickets List -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 px-6 sm:px-16 mt-4">
          <Card
            v-for="ticket in tickets"
            :key="ticket.id"
            class="font-oswald shadow-md"
          >
            <template #title>{{ ticket.subject }}</template>
            <template #content>
              <p class="font-roboto text-gray-700 text-sm sm:text-base">
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
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
