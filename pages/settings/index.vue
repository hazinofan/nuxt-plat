<script setup>
import { jwtDecode } from "jwt-decode";
import { updateUserInfo } from "~/core/services/platUsers.auth.service";

const loading = ref(false);
const showPreview = ref(false);
const user = ref({});
const toast = useToast();
const visible = ref(false);

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
  if (!token) return;

  try {
    // ✅ First, check localStorage for updated user data
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      user.value = JSON.parse(storedUser);
      console.log("🔹 User loaded from localStorage:", user.value);
      return;
    }

    // ✅ If no updated user data, decode the token
    const userData = jwtDecode(token);
    user.value = { ...userData };
    console.log("🔹 User loaded from token:", user.value);
  } catch (error) {
    console.error("❌ Invalid token", error);
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

    console.log("✅ User updated:", response);

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
  console.log("Password changed successfully:", passwords.value);
  alert("Mot de passe modifié avec succès !");
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <NuxtLayout name="user">
    <div class="pl-20">
      <Toast />
      <div class="flex flex-row justify-between items-center">
        <img src="/assets/logo.png" alt="Platinium Logo" />
        <Chip
          :label="user.username"
          image="/assets/avatar.jpg"
          class="custom-chip mr-16"
        />
      </div>

      <h1 class="flex items-center text-4xl font-roboto mt-16">
        <span
          class="w-3 h-3 mr-2 bg-green-500 rounded-full text-xl inline-block"
        ></span>
        Profile Actif
      </h1>
      <p class="text-gray-700 font-roboto mt-3">
        Vous pouvez placer des commandes, écrire des commentaires et utiliser
        vos cadeaux
      </p>
      <div class="flex gap-10 mt-10">
        <!-- Left Section (Profile & Inputs) -->
        <div class="w-1/2">
          <div class="flex flex-col">
            <!-- Profile Section -->
            <div class="flex flex-row gap-6">
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
              class="w-96"
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

          <!-- User Information -->
          <div class="p-6">
            <h2 class="text-2xl font-semibold mb-4 mt-3 font-oswald">
              VOS INFORMATIONS
            </h2>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <!-- Username -->
              <div class="flex flex-col gap-2">
                <label for="username" class="font-medium">Username</label>
                <InputText
                  id="username"
                  v-model="user.username"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <!-- Full Name -->
              <div class="flex flex-col gap-2">
                <label for="fullname" class="font-medium">Nom Complet :</label>
                <InputText
                  id="fullname"
                  v-model="user.full_name"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <!-- Email -->
              <div class="flex flex-col gap-2">
                <label for="email" class="font-medium">Email</label>
                <InputText
                  id="email"
                  type="email"
                  v-model="user.email"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <!-- Phone Number -->
              <div class="flex flex-col gap-2">
                <label for="phone" class="font-medium">Phone Number</label>
                <InputText
                  id="phone"
                  type="tel"
                  v-model="user.phone_number"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>

              <!-- Country -->
              <div class="flex flex-col gap-2">
                <label for="country" class="font-medium">Country</label>
                <InputText
                  id="country"
                  v-model="user.country"
                  disabled
                  class="w-full p-2 border rounded-lg"
                />
              </div>
            </div>
            <Button
              label="Modifier"
              icon="pi pi-pencil"
              class="mt-10"
              @click="visible = true"
            />
            <Dialog
              v-model:visible="visible"
              modal
              maximizable
              :draggable="false"
              header="Modifier Vos Informations"
              :style="{ width: '55rem' }"
            >
              <template #header>
                <div class="inline-flex items-center justify-center gap-2">
                  <Avatar :image="user.avatar" shape="circle" />
                  <span class="font-bold whitespace-nowrap">{{
                    user.username
                  }}</span>
                </div>
              </template>

              <span
                class="text-surface-500 dark:text-surface-400 block mb-8 font-oswald"
              >
                Mettez à jour vos informations personnelles.
              </span>

              <!-- ✅ Username -->
              <div class="flex items-center gap-4 mb-4">
                <label for="username" class="font-semibold w-36 font-roboto"
                  >Nom d'utilisateur</label
                >
                <InputText
                  id="username"
                  v-model="user.username"
                  class="flex-auto"
                  autocomplete="off"
                  disabled
                />
              </div>

              <!-- ✅ Full Name -->
              <div class="flex items-center gap-4 mb-4">
                <label for="fullname" class="font-semibold w-36 font-roboto"
                  >Nom Complet</label
                >
                <InputText
                  id="fullname"
                  v-model="user.full_name"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>

              <!-- ✅ Email -->
              <div class="flex items-center gap-4 mb-2">
                <label for="email" class="font-semibold w-36 font-roboto"
                  >Email</label
                >
                <InputText
                  id="email"
                  v-model="user.email"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>

              <!-- ✅ Phone Number -->
              <div class="flex items-center gap-4 mb-2">
                <label for="phone" class="font-semibold w-36 font-roboto"
                  >Téléphone</label
                >
                <InputText
                  id="phone"
                  v-model="user.phone_number"
                  class="flex-auto"
                  autocomplete="off"
                />
              </div>

              <!-- ✅ Country -->
              <div class="flex items-center gap-4 mb-2 mt-10">
                <label for="country" class="font-semibold w-36 font-roboto"
                  >Pays</label
                >
                <Select
                  v-model="user.country"
                  :options="countries"
                  optionLabel="name"
                  optionValue="name"
                  filter
                  showClear
                  placeholder="Choisissez votre pays"
                  class="w-full "
                />
              </div>
              <!-- ✅ Footer Actions -->
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

        <!-- Right Section (HERE)
        <div class="w-1/2">
          <h2>CHANGER LE MOT DE PASSE ?</h2>

          
          <div class="mt-4">
            <Button
              label="Changer le mot de passe"
              icon="pi pi-key"
              class="p-button-primary"
              @click="showPasswordFields = !showPasswordFields"
            />
          </div>

          
          <Transition name="fade">
            <div v-if="showPasswordFields" class="mt-4">
              <div class="flex flex-col gap-2">
                <label for="current-password">Mot de passe actuel</label>
                <Password
                  v-model="passwords.current"
                  :toggleMask="true"
                  class="w-full"
                />
              </div>

              
              <div class="grid grid-cols-2 gap-4 mt-2">
                <div class="flex flex-col gap-2">
                  <label for="new-password">Nouveau mot de passe</label>
                  <Password
                    v-model="passwords.new"
                    :toggleMask="true"
                    class="w-full"
                  />
                </div>

                <div class="flex flex-col gap-2">
                  <label for="confirm-password"
                    >Confirmer le nouveau mot de passe</label
                  >
                  <Password
                    v-model="passwords.confirm"
                    :toggleMask="true"
                    class="w-full"
                  />
                </div>
              </div>

              
              <div class="mt-4">
                <button
                  class="inline-flex items-center w-full mt-5 justify-center font-roboto px-6 py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-red-800 to-purple-500 text-white text-sm shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
                >
                  Changer La photo de profile
                </button>
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

  