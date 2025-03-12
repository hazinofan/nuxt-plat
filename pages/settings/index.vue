<script setup>
import { jwtDecode } from "jwt-decode";
import { updateUserInfo } from "~/core/services/platUsers.auth.service";

const loading = ref(false);
const showPreview = ref(false);
const user = ref({});
const toast = useToast();
const visible = ref(false);
const authStore = useAuthStore();
const router = useRouter();

definePageMeta({
  middleware: "auth",
});

const countries = ref([
  { name: "France", code: "+33" },
  { name: "Belgique", code: "+32" },
  { name: "Canada", code: "+1" },
  { name: "États-Unis", code: "+1" },
  { name: "Maroc", code: "+212" },
  { name: "Algérie", code: "+213" },
  { name: "Tunisie", code: "+216" },
  { name: "Suisse", code: "+41" },
  { name: "Allemagne", code: "+49" },
  { name: "Royaume-Uni", code: "+44" },
  { name: "Espagne", code: "+34" },
  { name: "Italie", code: "+39" },
  { name: "Portugal", code: "+351" },
  { name: "Pays-Bas", code: "+31" },
  { name: "Suède", code: "+46" },
  { name: "Norvège", code: "+47" },
  { name: "Danemark", code: "+45" },
  { name: "Finlande", code: "+358" },
  { name: "Grèce", code: "+30" },
  { name: "Turquie", code: "+90" },
  { name: "Russie", code: "+7" },
  { name: "Japon", code: "+81" },
  { name: "Chine", code: "+86" },
  { name: "Corée du Sud", code: "+82" },
  { name: "Inde", code: "+91" },
  { name: "Brésil", code: "+55" },
  { name: "Mexique", code: "+52" },
  { name: "Argentine", code: "+54" },
  { name: "Australie", code: "+61" },
  { name: "Nouvelle-Zélande", code: "+64" },
  { name: "Afrique du Sud", code: "+27" },
  { name: "Égypte", code: "+20" },
  { name: "Arabie Saoudite", code: "+966" },
  { name: "Émirats Arabes Unis", code: "+971" },
  { name: "Qatar", code: "+974" },
  { name: "Liban", code: "+961" },
]);

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    authStore.isAuthenticated = false; // ✅ Mark user as unauthenticated
    return;
  }

  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      return;
    }

    const userData = jwtDecode(token);
    user.value = { ...userData };
  } catch (error) {
    console.error("❌ Invalid token", error);
    authStore.isAuthenticated = false;
  }
};

const updateUser = async () => {
  try {
    loading.value = true;

    // Prepare updated user data
    const updatedData = {
      full_name: user.value.full_name,
      email: user.value.email,
      phone_number: user.value.phone_number,
      country: user.value.country,
    };

    const response = await updateUserInfo(user.value.id, updatedData);

    user.value = { ...user.value, ...response.user };
    localStorage.setItem("user", JSON.stringify(response.user));

    toast.add({
      severity: "success",
      summary: "Success",
      detail: "Profil mis à jour avec succès !",
    });
    visible.value = false;

    if (response.access_token) {
      localStorage.setItem("token", response.access_token);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour", error);
    alert("Une erreur est survenue lors de la mise à jour du profil.");
  } finally {
    loading.value = false;
  }
};

const passwords = ref({
  current: "",
  new: "",
  confirm: "",
});

const changePassword = () => {
  if (passwords.value.new !== passwords.value.confirm) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }
  alert("Mot de passe modifié avec succès !");
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <NuxtLayout name="user">
    <!-- 🚨 Show Custom Unauthorized Message -->
    <div
      v-if="!authStore.isAuthenticated"
      data-aos="fade-down"
      data-aos-delay="400"
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
    <div class="p-4 sm:p-6 lg:p-8" v-else>
      <Toast />

      <div class="flex flex-col sm:flex-row justify-between items-center">
        <img src="/assets/logo.png" alt="Platinium Logo" class="w-28 sm:w-36" />
        <Chip
          :label="user.username"
          image="/assets/avatar.jpg"
          class="custom-chip mt-4 sm:mt-0"
        />
      </div>

      <h1
        class="flex items-center text-lg sm:text-2xl md:text-4xl font-roboto mt-6 sm:mt-16"
      >
        <span class="w-3 h-3 mr-2 bg-green-500 rounded-full"></span>
        Profile Actif
      </h1>
      <p class="text-gray-700 text-sm sm:text-base font-roboto mt-3">
        Vous pouvez placer des commandes, écrire des commentaires et utiliser
        vos cadeaux
      </p>

      <div class="flex flex-col sm:flex-row gap-6 mt-10">
        <!-- ✅ Left Section (Profile & Inputs) -->
        <div class="w-full sm:w-1/2">
          <div class="flex flex-col">
            <div class="md:flex grid place-items-center flex-row gap-6">
              <!-- Avatar -->
              <Avatar
                image="/assets/avatar.jpg"
                class="border-4 border-gray-300"
                size="xlarge"
                shape="circle"
              />

              <!-- Buttons -->
              <div class="flex flex-col gap-3">
                <!-- Change Profile Picture Button
                <button
                  class="inline-flex items-center px-6 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-sm font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
                >
                  Changer La photo de profile
                </button> -->

                <!-- View Profile Picture Button -->
                <Button
                  label="Voir la photo"
                  icon="pi pi-eye"
                  class="p-button-outlined p-button-secondary"
                  @click="showPreview = true"
                />
              </div>
            </div>

            <!-- PrimeVue Dialog (Preview Profile Picture) -->
            <Dialog
              v-model:visible="showPreview"
              header="Photo de Profil"
              :modal="true"
              :closable="true"
              class="w-full sm:w-[50%] md:w-[25rem]"
            >
              <div class="flex justify-center">
                <img
                  src="/assets/avatar.jpg"
                  alt="Profile Preview"
                  class="rounded-lg w-full object-cover"
                />
              </div>
            </Dialog>
          </div>

          <!-- ✅ User Information -->
          <div class="p-4 sm:p-6">
            <h2 class="text-lg sm:text-2xl font-semibold mb-4 mt-3 font-oswald">
              VOS INFORMATIONS
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="flex flex-col gap-2">
                <label class="font-medium">Username</label>
                <InputText
                  v-model="user.username"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium">Nom Complet</label>
                <InputText
                  v-model="user.full_name"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium">Email</label>
                <InputText
                  v-model="user.email"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium">Phone Number</label>
                <InputText
                  v-model="user.phone_number"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <div class="flex flex-col gap-2">
                <label class="font-medium">Country</label>
                <InputText
                  v-model="user.country"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>
            </div>

            <Button
              label="Modifier"
              icon="pi pi-pencil"
              class="mt-10 w-full sm:w-auto"
              @click="visible = true"
            />

            <!-- ✅ Edit Profile Dialog -->
            <Dialog
              v-model:visible="visible"
              modal
              maximizable
              :draggable="false"
              header="Modifier Vos Informations"
              :style="{ width: '100%', maxWidth: '55rem' }"
            >
              <template #header>
                <div class="flex items-center gap-2">
                  <Avatar :image="user.avatar" shape="circle" />
                  <span class="font-bold">{{ user.username }}</span>
                </div>
              </template>

              <span class="text-surface-500 block mb-8 font-oswald">
                Mettez à jour vos informations personnelles.
              </span>

              <div class="flex flex-col gap-4">
                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <label class="font-semibold w-36">Nom Complet</label>
                  <InputText
                    v-model="user.full_name"
                    class="w-full sm:flex-auto"
                  />
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <label class="font-semibold w-36">Email</label>
                  <InputText v-model="user.email" class="w-full sm:flex-auto" />
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <label class="font-semibold w-36">Téléphone</label>
                  <InputText
                    v-model="user.phone_number"
                    class="w-full sm:flex-auto"
                  />
                </div>

                <div class="flex flex-col sm:flex-row items-center gap-4">
                  <label class="font-semibold w-36">Pays</label>
                  <Select
                    v-model="user.country"
                    :options="countries"
                    optionLabel="name"
                    optionValue="name"
                    filter
                    showClear
                    placeholder="Choisissez votre pays"
                    class="w-full sm:flex-auto"
                  />
                </div>
              </div>

              <template #footer>
                <Button
                  label="Annuler"
                  severity="danger"
                  @click="visible = false"
                  autofocus
                />
                <Button
                  label="Sauvegarder"
                  outlined
                  severity="success"
                  @click="updateUser"
                  :loading="loading"
                />
              </template>
            </Dialog>
          </div>
        </div>

        <!-- ✅ Right Section (Change Password)
        <div class="w-full sm:w-1/2">
          <h2 class="text-lg sm:text-2xl font-semibold font-oswald">Changer le mot de passe</h2>

          <div class="mt-4">
            <Button
              label="Changer le mot de passe"
              icon="pi pi-key"
              class="p-button-primary w-full sm:w-auto"
              @click="showPasswordFields = !showPasswordFields"
            />
          </div>

          <Transition name="fade">
            <div v-if="showPasswordFields" class="mt-4">
              <div class="flex flex-col gap-2">
                <label>Mot de passe actuel</label>
                <Password v-model="passwords.current" :toggleMask="true" class="w-full" />
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div class="flex flex-col gap-2">
                  <label>Nouveau mot de passe</label>
                  <Password v-model="passwords.new" :toggleMask="true" class="w-full" />
                </div>
                <div class="flex flex-col gap-2">
                  <label>Confirmer le mot de passe</label>
                  <Password v-model="passwords.confirm" :toggleMask="true" class="w-full" />
                </div>
              </div>
            </div>
          </Transition>
        </div> -->
      </div>
    </div>
  </NuxtLayout>
</template>

  


<style scoped>
/* ✅ Apply Custom Background */
:deep(.custom-chip.p-chip) {
  background-color: #fdb8ffa2 !important; /* Orange */
  color: rgb(0, 0, 0) !important;
}

/* ✅ Change Label Color */
:deep(.custom-chip .p-chip-label) {
  color: rgb(0, 0, 0) !important;
}

/* ✅ Change Image Border (Optional) */
:deep(.custom-chip .p-chip-image) {
  border-radius: 50%;
  border: 2px solid white;
}

/* ✅ PrimeVue Fade Animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

  