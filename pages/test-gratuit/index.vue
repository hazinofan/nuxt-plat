<template>
  <div class="">
    <Navbar />
    <h1 class="text-3xl justify-self-center pt-10 font-semibold">
      Formulaire à remplir pour bénéficier de l'essai IPTV gratuit de 2 heures :
    </h1>
    <div
      class="min-h-screen flex items-center justify-center bg-gradient-to-br"
    >
      <div
        class="flex w-full max-w-5xl bg-white shadow-lg rounded-xl overflow-hidden"
      >
        <!-- Left Panel -->
        <div
          class="w-1/2 bg-gradient-to-br from-gray-900 to-black text-white p-10 flex flex-col justify-center"
        >
          <h1 class="text-2xl font-semibold text-purple-400 text-center">
            Formulaire à remplir pour bénéficier de l'essai IPTV gratuit de 2
            heures :
          </h1>

          <ul class="mt-5 space-y-3 text-gray-300">
            <li>
              <strong class="text-white text-xl"
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
            <h2 class="text-2xl font-semibold text-red-500">
              Informations Utiles :
            </h2>
            <p class="text-gray-300 mt-2 text-lg">
              <strong class="text-white">L'adresse MAC :</strong> une série
              unique de chiffres et de lettres (Exemple : 1b:10:c8:d2:84:e4) qui
              identifie votre appareil Smart IPTV TV.
            </p>
          </div>

          <div class="mt-6">
            <h2 class="text-2xl font-semibold text-red-500">Remarque :</h2>
            <ul class="mt-2 text-gray-300 space-y-2">
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
            <p class="text-gray-300 mt-2">
              📞 N'hésitez pas à nous contacter pour toute information
              complémentaire. Nos équipes sont disponibles 7 jours sur 7, 24
              heures sur 24.
            </p>
          </div>
        </div>

        <!-- Right Panel (Form) -->
        <div class="w-1/2 bg-white p-10 flex flex-col justify-center">
          <h2 class="text-2xl font-bold">Créer un compte</h2>

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
                v-model="form.country"
                :options="countries"
                placeholder="Pays: *"
                class="w-full p-dropdown"
                filter
                required
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
              <InputText
                id="phone"
                v-model="form.phone"
                class="w-full p-inputtext border rounded-lg"
                required
              />
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
              <label class="">OPTION ADULT :</label>
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

            <!-- Submit Button (Disabled until Checkbox is checked) -->
            <button
              class="px-10 w-full py-2 rounded-tl-3xl rounded-br-3xl rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-red-500 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all"
              aria-label="Ajouter un produit"
            >
              Ajouter un Produit
            </button>
          </form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script setup>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Dropdown from "primevue/dropdown";
import Textarea from "primevue/textarea";
import RadioButton from "primevue/radiobutton";
import Checkbox from "primevue/checkbox";

const role = ref("merchant");
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

const countries = ref([
  "France",
  "Belgique",
  "Canada",
  "États-Unis",
  "Maroc",
  "Algérie",
  "Tunisie",
  "Suisse",
  "Allemagne",
  "Royaume-Uni",
  "Espagne",
  "Italie",
  "Portugal",
  "Pays-Bas",
  "Suède",
  "Norvège",
  "Danemark",
  "Finlande",
  "Grèce",
  "Turquie",
  "Russie",
  "Japon",
  "Chine",
  "Corée du Sud",
  "Inde",
  "Brésil",
  "Mexique",
  "Argentine",
  "Australie",
  "Nouvelle-Zélande",
  "Afrique du Sud",
  "Égypte",
  "Arabie Saoudite",
  "Émirats Arabes Unis",
  "Qatar",
  "Liban",
]);

const submitForm = () => {
  form.value.submitted = true;
  console.log("✅ Form Data Submitted:", form.value);
};
</script>
