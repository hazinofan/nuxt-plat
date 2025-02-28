<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import axios from "axios";
import { useToast } from "primevue/usetoast";
import environement from "~/core/environement";

// Form Data
const form = ref({
  fullName: "",
  email: "",
  phone: "",
  country: "",
  macAddress: "",
  message: "",
  optionAdult: "",
  submitted: false,
});

const loading = ref(false);
const ENGINE_URL = environement.ENGINE_URL;

// Country List with Phone Codes
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

const selectedCountry = ref(null);
const phoneCode = ref("");
const toast = useToast();

// Update Phone Code when Country Changes
const updatePhoneCode = () => {
  const country = countries.value.find((c) => c.name === selectedCountry.value);
  phoneCode.value = country ? country.code : "";
};

// Submit Form
const submitForm = async () => {
  loading.value = true;
  try {
    // Send email to ADMIN
    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: ["support@platinium-iptv.com"],
      subject: "Nouvelle Demande de Test IPTV",
      html: `
        <h1>Nouvelle Demande de Test</h1>
        <p><strong>Nom :</strong> ${form.value.fullName}</p>
        <p><strong>Email :</strong> ${form.value.email}</p>
        <p><strong>Téléphone :</strong> ${phoneCode.value} ${
        form.value.phone
      }</p>
        <p><strong>Pays :</strong> ${selectedCountry.value}</p>
        <p><strong>Adresse MAC :</strong> ${
          form.value.macAddress || "Non fournie"
        }</p>
        <p><strong>Message :</strong> ${form.value.message}</p>
        <p><strong>Option Adult :</strong> ${form.value.optionAdult}</p>
      `,
      text: `Nouvelle demande de test IPTV:\nNom: ${form.value.fullName}\nEmail: ${form.value.email}\nTéléphone: ${phoneCode.value} ${form.value.phone}\nPays: ${selectedCountry.value}\nMessage: ${form.value.message}`,
    });

    // Send confirmation email to USER
    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: [form.value.email],
      subject: "Votre demande d'essai IPTV a été reçue ✅",
      html: `
    <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
      <h1 style="color: #D32F2F;">Bonjour ${form.value.fullName},</h1>
      <p style="font-size: 16px;">
        Nous avons bien reçu votre demande d'essai IPTV de 2 heures. Nos équipes vous contacteront bientôt avec vos identifiants de connexion.
      </p>
      <p style="font-size: 16px;">
        Merci de vérifier votre boîte mail, y compris les spams.
      </p>
      <hr style="border: 1px solid #ccc; margin: 20px 0;">
      <table style="width: 100%; text-align: left;">
        <tr>
          <td>
            <img src="https://iili.io/32HFA74.png" alt="Platinium IPTV Logo" width="150">
          </td>
          <td style="padding-left: 15px;">
            <p style="font-size: 14px; margin: 0;">
              <strong>Laurien Bureaux</strong><br>
              Directeur du Support Client<br>
              <a href="mailto:support@platinium-iptv.com" style="color: #D32F2F; text-decoration: none;">support@platinium-iptv.com</a><br>
              📞 <a href="tel:+1 (276) 300-1517" style="color: #D32F2F; text-decoration: none;">+1 (276) 300-1517</a>
            </p>
          </td>
        </tr>
      </table>
      <p style="font-size: 12px; color: #777;">
        Cet e-mail est généré automatiquement, merci de ne pas y répondre.
      </p>
    </div>
  `,
      text: `Bonjour ${form.value.fullName},\nNous avons bien reçu votre demande d'essai IPTV.\nMerci de vérifier votre boîte mail.\nPlatinium IPTV Team\n\nSupport:\nAmine ZEGGANI - Directeur du Support Client\nEmail: support@platinium-iptv.com\nTéléphone: +123 456 7890`,
    });

    console.log("✅ Emails Sent Successfully");
    toast.add({
      severity: "success",
      summary: "Demande Envoyée",
      detail: "Votre demande du test gratuit a été envoyée avec succès",
      life: 3000,
    });
  } catch (error) {
    console.error("❌ Erreur d'envoi:", error);
    toast.add({
      severity: "error",
      summary: "Erreur d'envoie",
      detail: "Votre demande du test gratuit a été Rejetée",
      life: 3000,
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div>
    <Navbar />
    <h1 class="text-3xl text-center pt-10 font-semibold mb-10 px-4 font-oswald">
      Formulaire à remplir pour bénéficier de l'essai IPTV gratuit de 2 heures :
    </h1>

    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br px-4"
    >
      <div
        class="flex flex-col md:flex-row w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden mb-24"
      >
        <!-- Left Panel -->
        <div
          class="w-full md:w-1/2 bg-gradient-to-br from-gray-900 to-black text-white p-10 flex flex-col justify-center"
        >
          <h1 class="text-2xl font-semibold text-purple-400 text-center">
            Formulaire à remplir pour bénéficier de l'essai IPTV gratuit de 2
            heures :
          </h1>

          <ul class="mt-5 space-y-3 text-gray-300 text-sm md:text-base">
            <li>
              <strong class="text-white text-lg"
                >Procédure d'Activation :</strong
              >
            </li>
            <li>
              1️ - Remplissez le formulaire de test de l'abonnement IPTV
              gratuit.
            </li>
            <li>2️ - Cliquez sur envoyer.</li>
            <li>
              3️ - Les informations d'activation nécessaires (identifiants et
              lien m3u) vous seront envoyées dès qu'elles seront générées.
              (Vérifiez votre email après l'envoi).
            </li>
          </ul>

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-red-500">
              Informations Utiles :
            </h2>
            <p class="text-gray-300 mt-2 text-sm md:text-lg">
              <strong class="text-white">L'adresse MAC :</strong> une série
              unique de chiffres et de lettres (Exemple : 1b:10:c8:d2:84:e4) qui
              identifie votre appareil Smart IPTV TV.
            </p>
          </div>

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-red-500">Remarque :</h2>
            <ul class="mt-2 text-gray-300 space-y-2 text-sm md:text-base">
              <li>
                ⚠️ Les comptes de démonstration seront suspendus pendant les
                grands événements sportifs.
              </li>
              <li>
                📩 Toute demande envoyée pendant la suspension des tests sera
                retardée.
              </li>
              <li>
                ❌ Les formulaires mal remplis ou avec des informations
                manquantes ne seront pas traités.
              </li>
            </ul>
          </div>

          <div class="mt-6">
            <h2 class="text-xl font-semibold text-purple-500">
              Informations de Contact :
            </h2>
            <p class="text-gray-300 mt-2 text-sm md:text-base">
              📞 N'hésitez pas à nous contacter pour toute information
              complémentaire. Nos équipes sont disponibles 7 jours sur 7, 24
              heures sur 24.
            </p>
          </div>
        </div>

        <!-- Right Panel (Form) -->
        <div
          class="w-full md:w-1/2 bg-white p-6 md:p-10 flex flex-col justify-center"
        >
          <img
            src="/assets/logo2.png"
            alt="Platinium IPTV"
            class="w-36 md:w-52 mb-6 md:mb-10 mx-auto"
          />
          <h2 class="text-2xl font-bold text-center md:text-left">
            Formulaire du Test :
          </h2>

          <!-- Form -->
          <form @submit.prevent="submitForm" class="mt-6 space-y-6">
            <div class="p-float-label">
              <label for="fullName">Nom Complet: *</label>
              <InputText
                id="fullName"
                v-model="form.fullName"
                class="w-full p-inputtext border rounded-lg"
                required
              />
            </div>

            <div class="p-float-label">
              <label for="country">Pays: *</label>
              <Dropdown
                id="country"
                v-model="selectedCountry"
                :options="countries.map((c) => c.name)"
                placeholder="Sélectionnez un pays"
                class="w-full p-dropdown"
                filter
                required
                @change="updatePhoneCode"
              />
            </div>

            <div class="p-float-label">
              <label for="email">Email: *</label>
              <InputText
                id="email"
                v-model="form.email"
                class="w-full p-inputtext border rounded-lg"
                required
              />
            </div>

            <div class="p-float-label">
              <label for="phone">Numéro de téléphone: *</label>
              <div class="flex flex-row gap-5 items-center">
                <span class="mr-2 text-xl">{{ phoneCode }}</span>
                <InputText
                  id="phone"
                  v-model="form.phone"
                  class="w-full p-inputtext border rounded-lg"
                  required
                />
              </div>
            </div>

            <div class="p-float-label">
              <label for="macAddress"
                >Adresse MAC de votre appareil [MAG]:</label
              >
              <InputText
                id="macAddress"
                v-model="form.macAddress"
                class="w-full p-inputtext border rounded-lg"
              />
            </div>

            <div class="p-float-label">
              <label for="message">Votre Message: *</label>
              <Textarea
                id="message"
                v-model="form.message"
                class="w-full p-textarea border rounded-lg"
                rows="3"
                required
              />
            </div>

            <!-- Option Adult -->
            <div class="flex items-center space-x-3">
              <label class="text-sm md:text-base">OPTION ADULT :</label>
              <RadioButton
                v-model="form.optionAdult"
                inputId="yes"
                name="optionAdult"
                value="Oui"
              />
              <label for="yes" class="ml-2">Oui</label>
              <RadioButton
                v-model="form.optionAdult"
                inputId="no"
                name="optionAdult"
                value="Non"
              />
              <label for="no" class="ml-2">Non</label>
            </div>

            <!-- Submit Button -->
            <!-- Submit Button -->
            <button
              class="px-10 w-full py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-red-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all flex justify-center items-center"
              :disabled="loading"
              aria-label="Envoyer le formulaire"
            >
              <span v-if="loading" class="flex items-center">
                <svg
                  class="animate-spin h-5 w-5 mr-2 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    class="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    stroke-width="4"
                  ></circle>
                  <path
                    class="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 108 8h-4l3 3 3-3h-4a8 8 0 01-8 8z"
                  ></path>
                </svg>
                Envoi en cours...
              </span>
              <span v-else>Ajouter un Produit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>




