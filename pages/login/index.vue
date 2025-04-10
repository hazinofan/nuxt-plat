<script setup>
import AOS from "aos";
import { ref } from "vue";
import { Divider } from "primevue";
import {
  loginUser,
  registerUser,
} from "~/core/services/platUsers.auth.service";
import { useToast } from "primevue/usetoast";
import environement from "~/core/environement";
import axios from "axios";

const rememberMe = ref(false);
const showRegister = ref(false);
const router = useRouter();
const toast = useToast();

// Registration form fields
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

const showPassword = ref(false);
const showConfirmPassword = ref(false);

const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

const toggleConfirmPassword = () => {
  showConfirmPassword.value = !showConfirmPassword.value;
};

const ENGINE_URL = environement.ENGINE_URL;
const confirmPassword = ref("");
const loadingData = ref(false);
const registerForm = ref({
  username: "",
  full_name: "",
  email: "",
  country: "",
  phone_number: "",
  password: "",
});

const passwordsMatch = computed(() => {
  return (
    registerForm.value.password &&
    confirmPassword.value &&
    registerForm.value.password === confirmPassword.value
  );
});

async function registrationForm() {
  loadingData.value = true;
  if (!passwordsMatch.value) {
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Les mots de passe ne correspondent pas.",
      life: 3000,
    });
    return;
  }

  try {
    // ✅ Register user first
    const response = await registerUser(registerForm.value);

    // ✅ Show success message
    toast.add({
      severity: "success",
      summary: "Succès",
      detail: "Inscription réussie ! Vous pouvez maintenant vous connecter.",
      life: 3000,
    });

    // ✅ Send emails only if registration succeeds
    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: ["support@platinium-iptv.com"],
      subject: "Nouvelle Inscription - Platinium IPTV",
      html: `
        <h1>Nouvelle Inscription</h1>
        <p><strong>Nom :</strong> ${registerForm.value.full_name}</p>
        <p><strong>Nom d'utilisateur :</strong> ${registerForm.value.username}</p>
        <p><strong>Email :</strong> ${registerForm.value.email}</p>
        <p><strong>Pays :</strong> ${registerForm.value.country}</p>
        <p><strong>Téléphone :</strong> ${registerForm.value.phone_number}</p>
        <h2>📌 Informations de l'utilisateur :</h2>
        <p>L'utilisateur vient de s'inscrire sur <strong>Platinium IPTV</strong>.</p>
        <p>Vérifiez son compte et activez-le si nécessaire.</p>
        <hr style="border: 1px solid #ccc; margin: 20px 0;">
        <p style="font-size: 12px; color: #777;">
          Cet e-mail est généré automatiquement, merci de ne pas y répondre.
        </p>
      `,
    });

    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: [registerForm.value.email],
      subject:
        "Bienvenue sur Platinium IPTV - Confirmation de votre inscription",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h1 style="color: #D32F2F;">Bienvenue ${registerForm.value.full_name},</h1>
          <p>Merci de vous être inscrit sur <strong>Platinium IPTV</strong> !</p>
          <p>Votre compte a bien été créé avec les informations suivantes :</p>
          <ul>
            <li><strong>Nom d'utilisateur :</strong> ${registerForm.value.username}</li>
            <li><strong>Email :</strong> ${registerForm.value.email}</li>
            <li><strong>Pays :</strong> ${registerForm.value.country}</li>
            <li><strong>Téléphone :</strong> ${registerForm.value.phone_number}</li>
          </ul>
          <p>Veuillez vérifier votre adresse e-mail et vous connecter à votre compte.</p>
          <p>Si vous avez des questions, notre support est disponible pour vous aider.</p>
          <hr style="border: 1px solid #ccc; margin: 20px 0;">
          <table style="width: 100%; text-align: left;">
            <tr>
              <td>
                <img src="https://i.imgur.com/PKDd5El.png" alt="Platinium IPTV Logo" width="150">
              </td>
              <td style="padding-left: 15px;">
                <p style="font-size: 14px; margin: 0;">
                  <strong>Support Platinium IPTV</strong><br>
                  Service Client<br>
                  <a href="mailto:support@platinium-iptv.com" style="color: #D32F2F; text-decoration: none; display:flex; flex-direction: row; gap: 5px"> 📩 support@platinium-iptv.com</a><br>
                  <img src="https://img.icons8.com/?size=100&id=16713&format=png&color=000000" alt="WhatsApp" width="24" style="vertical-align: middle; margin-right: 5px;">
                  <a href="tel:+212 68492 5665" style="color: #D32F2F; text-decoration: none;">+212 68492 5665</a>
                </p>
              </td>
            </tr>
          </table>
          <p style="font-size: 12px; color: #777;">
            Cet e-mail est généré automatiquement, merci de ne pas y répondre.
          </p>
        </div>
      `,
    });

    // ✅ Reload AFTER everything is completed
    setTimeout(() => {
      window.location.reload();
    }, 3000);
  } catch (error) {
    console.error("Registration failed:", error);

    let errorMessage = "Échec de l'inscription. Veuillez réessayer.";
    if (error.response?.data?.message) {
      errorMessage = error.response.data.message;
    }

    // ✅ Show error message only if registration fails
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: errorMessage,
      life: 3000,
    });
  } finally {
    loadingData.value = false;
  }
}

const loginForm = ref({
  email: "",
  password: "",
});

async function sendLogin() {
  loadingData.value = true;

  try {
    const response = await loginUser(
      loginForm.value.email,
      loginForm.value.password
    );

    if (response.access_token) {
      toast.add({
        severity: "success",
        summary: "Success",
        detail: "Connecté avec Succès !",
        life: 6000,
      });

      localStorage.setItem("token", response.access_token);
      router.push("/");
    } else {
      throw new Error("Invalid response from server");
    }
  } catch (error) {
    console.error("Login failed:", error.response?.data || error.message);

    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "Échec de la connexion. Vérifiez vos informations.",
      life: 3000,
    });
  } finally {
    loadingData.value = false;
  }
}

const toggleForm = () => {
  showRegister.value = !showRegister.value;
};

useHead({
  title: "Connexion - Accédez à votre compte IPTV | Platinium IPTV",
  meta: [
    {
      name: "description",
      content:
        "Connectez-vous à votre compte Platinium IPTV pour gérer votre abonnement. Accédez à des milliers de chaînes TV, films et séries en streaming de haute qualité.",
    },
    {
      name: "keywords",
      content:
        "Connexion IPTV, Se connecter IPTV, Accès compte IPTV, IPTV Premium, IPTV France, IPTV stable, Meilleur IPTV, IPTV 4K, IPTV Smart TV, IPTV fiable",
    },
    { name: "author", content: "Platinium IPTV" },
    { name: "robots", content: "index, follow" },

    // Open Graph / Facebook
    {
      property: "og:title",
      content: "Connexion - Accédez à votre compte IPTV | Platinium IPTV",
    },
    {
      property: "og:description",
      content:
        "Connectez-vous pour accéder à votre abonnement IPTV et profiter des meilleures chaînes TV et VOD en qualité 4K et FHD.",
    },
    {
      property: "og:image",
      content: "https://platinium-iptv.com/images/login-banner.jpg",
    },
    {
      property: "og:url",
      content: "https://platinium-iptv.com/login",
    },
    { property: "og:type", content: "website" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Connexion - Accédez à votre compte IPTV | Platinium IPTV",
    },
    {
      name: "twitter:description",
      content:
        "Identifiez-vous pour profiter de votre abonnement IPTV premium avec des milliers de chaînes et VOD sans coupure.",
    },
    {
      name: "twitter:image",
      content: "https://platinium-iptv.com/images/login-banner.jpg",
    },
  ],
  link: [{ rel: "canonical", href: "https://platinium-iptv.com/login" }],
});

onMounted(() => {
  AOS.init();
});
</script>

<template>
  <NuxtLayout name="support">
    <Navbar />
    <div
      class="flex h-screen w-screen overflow-hidden relative"
      data-aos="fade-down"
      data-aos-delay="400"
    >
      <Toast />
      <div
        class="flex flex-col md:flex-row w-full h-full shadow-lg p-6 md:p-8 relative transition-all duration-500"
      >
        <!-- Animated Section -->
        <div
          class="hidden md:flex w-1/2 h-full text-white p-6 md:p-10 flex-col justify-center text-center bg-cover bg-center rounded-2xl transition-transform duration-500"
          :style="{
            'background-image': showRegister
              ? 'url(/assets/Register.png)'
              : 'url(/assets/login.png)',
          }"
          :class="{
            'translate-x-0': !showRegister,
            'translate-x-full': showRegister,
          }"
        >
          <span
            class="absolute top-5 right-5 text-white text-sm md:text-base italic"
          >
            Plus de 1200+ platinium user
          </span>

          <p class="text-xl text-white md:text-3xl font-oswald font-semibold">
            Connectez-vous, explorez votre compte et gagnez des abonnements
            gratuits !
          </p>

          <div
            class="absolute bottom-5 flex flex-col md:flex-col gap-3 items-center"
            style="justify-self: anchor-center"
          >
            <p class="text-white text-lg md:text-2xl">
              Vous n'avez pas de compte ?
            </p>
            <button @click="toggleForm" class="login_btn">
              {{ showRegister ? "Se Connecter" : "Inscrivez Vous" }}
            </button>
          </div>
        </div>

        <!-- Login / Registration Form -->
        <div
          class="w-full md:w-1/2 h-full flex flex-col justify-center p-6 md:p-5 lg:p-24 transition-transform duration-500"
          :class="{
            'lg:translate-x-0': !showRegister,
            'lg:-translate-x-full': showRegister,
          }"
        >
          <div class="text-center">
            <img
              src="/assets/logo.png"
              class="mx-auto mb-4 md:mb-6 w-64 md:w-64"
              alt="Platinium IPTV Logo"
            />
            <h2 class="text-2xl md:text-3xl font-semibold">
              Bienvenue chez PLATINIUM
            </h2>
            <p class="text-gray-500 text-base md:text-lg mt-2">
              {{
                showRegister
                  ? "Créez votre compte gratuitement."
                  : "Inscrivez-vous et gagnez des abonnements gratuits chaque mois."
              }}
            </p>
          </div>

          <Divider />

          <!-- Login Form -->
          <form v-if="!showRegister" @submit.prevent="sendLogin">
            <FloatLabel variant="on" class="mt-6 md:mt-8">
              <InputText id="email" v-model="loginForm.email" class="w-full" />
              <label for="email">Email</label>
            </FloatLabel>

            <div class="relative w-full mt-5">
              <input
                :type="showPassword ? 'text' : 'password'"
                v-model="loginForm.password"
                placeholder="Entrez Votre Mot de Passe"
                class="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#9852a6]"
                aria-label="Entrez votre mot de passe"
              />
              <button
                type="button"
                @click="togglePassword"
                class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#9852a6]"
              >
                <i
                  :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                  class="text-xl"
                ></i>
              </button>
            </div>

            <div
              class="flex flex-col md:flex-row items-center justify-between my-4 text-sm md:text-base"
            >
              <div class="flex items-center gap-2">
                <Checkbox
                  inputId="rememberMe"
                  name="rememberMe"
                  v-model="rememberMe"
                />
                <label for="rememberMe"> Remember me </label>
              </div>
              <a
                href="#"
                class="text-purple-500 hover:text-purple-900 transition-colors font-semibold"
              >
                Mot de passe oublié ?
              </a>
            </div>

            <button
              type="submit"
              class="px-6 md:px-10 py-3 rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all w-full mt-10 md:mt-16"
            >
              {{ showRegister ? "S'inscrire" : "Login" }}
            </button>
          </form>

          <!-- Registration Form -->
          <form
            v-if="showRegister"
            @submit.prevent="registrationForm"
            class="p-6 md:p-8 w-full max-w-lg mx-auto"
          >
            <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">
              Créer un compte
            </h2>

            <!-- Username & Full Name -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FloatLabel variant="on">
                <InputText
                  id="username"
                  v-model="registerForm.username"
                  class="w-full"
                />
                <label for="username">Username</label>
              </FloatLabel>

              <FloatLabel variant="on">
                <InputText
                  id="fullName"
                  v-model="registerForm.full_name"
                  class="w-full"
                />
                <label for="fullName">Nom complet</label>
              </FloatLabel>
            </div>

            <!-- Email -->
            <FloatLabel variant="on" class="mt-4">
              <InputText
                id="email"
                v-model="registerForm.email"
                class="w-full"
              />
              <label for="email">Email</label>
            </FloatLabel>

            <!-- Country -->
            <Select
              v-model="registerForm.country"
              :options="countries"
              optionLabel="name"
              optionValue="name"
              filter
              showClear
              placeholder="Choisissez votre pays"
              class="w-full mt-4"
            />

            <!-- Phone Number -->
            <FloatLabel variant="on" class="mt-4">
              <InputText
                id="phone"
                v-model="registerForm.phone_number"
                class="w-full"
              />
              <label for="phone">Téléphone</label>
            </FloatLabel>

            <!-- Password & Confirm Password -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <!-- Password -->
              <div class="relative">
                <input
                  :type="showPassword ? 'text' : 'password'"
                  id="password"
                  v-model="registerForm.password"
                  class="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a65286]"
                  aria-label="Entrez votre mot de passe"
                />
                <label
                  for="password"
                  class="absolute left-3 top-0 text-gray-500 text-sm"
                >
                  Mot de passe
                </label>
                <button
                  type="button"
                  @click="togglePassword('password')"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#a65286]"
                >
                  <i
                    :class="showPassword ? 'pi pi-eye-slash' : 'pi pi-eye'"
                    class="text-xl"
                  ></i>
                </button>
              </div>

              <!-- Confirm Password -->
              <div class="relative">
                <input
                  :type="showConfirmPassword ? 'text' : 'password'"
                  id="confirmPassword"
                  v-model="confirmPassword"
                  class="w-full p-3 border rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#a65286]"
                  aria-label="Confirmez votre mot de passe"
                />
                <label
                  for="confirmPassword"
                  class="absolute left-3 top-0 text-gray-500 text-sm"
                >
                  Confirmer le mot de passe
                </label>
                <button
                  type="button"
                  @click="toggleConfirmPassword('confirmPassword')"
                  class="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-[#a65286]"
                >
                  <i
                    :class="
                      showConfirmPassword ? 'pi pi-eye-slash' : 'pi pi-eye'
                    "
                    class="text-xl"
                  ></i>
                </button>
              </div>
            </div>

            <!-- Password Match Warning -->
            <p v-if="!passwordsMatch" class="text-red-500 text-sm mt-2">
              ❌ Les mots de passe ne correspondent pas.
            </p>

            <!-- Submit Button -->
            <button
              type="submit"
              :disabled="!passwordsMatch"
              class="px-6 py-3 mt-6 rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              S'inscrire
            </button>
          </form>

          <p class="mt-4 text-center text-sm md:text-base">
            {{
              showRegister
                ? "Vous avez déjà un compte ?"
                : "Vous n'avez pas de compte ?"
            }}
            <span class="text-blue-600 cursor-pointer" @click="toggleForm">
              {{ showRegister ? "Connectez-vous" : "Rejoignez-nous !" }}
            </span>
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>


<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.5s ease-in-out;
}
.slide-enter-from {
  transform: translateX(100%);
}
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
