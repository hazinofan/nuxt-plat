  <script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Navbar from "~/components/navbar.vue";
import Dropdown from "primevue/dropdown";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Footer from "~/components/footer.vue";
import { useToast } from "primevue/usetoast";
import environement from "~/core/environement";

const router = useRouter();
const cartItems = ref([]);
const totalPrice = ref(0);
const selectedCountry = ref(null);
const phoneCode = ref("");
const loading = ref(false);
const toast = useToast()
const ENGINE_URL = environement.ENGINE_URL

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

onMounted(() => {
  try {
    const storedItems = localStorage.getItem("cartItems");
    cartItems.value = storedItems ? JSON.parse(storedItems) : [];
    totalPrice.value = cartItems.value.reduce((total, item) => total + item.price * item.quantity, 0);
  } catch (error) {
    console.error("Erreur lors de la récupération du panier:", error);
    cartItems.value = [];
  }
});

const form = ref({
  fullName: "",
  email: "",
  phone: "",
  message: "",
});

const updatePhoneCode = () => {
  if (!selectedCountry.value) {
    phoneCode.value = "";
    return;
  }
  phoneCode.value = selectedCountry.value.code || "";
};

const handleOrderSubmit = async (event) => {
  event.preventDefault();
  loading.value = true;

  if (!selectedCountry.value || !selectedCountry.value.name) {
    alert("Veuillez sélectionner un pays avant de passer la commande.");
    loading.value = false;
    return;
  }

  const customerInfo = {
    name: form.value.fullName || "Nom inconnu",
    email: form.value.email || "Email inconnu",
    country: selectedCountry.value?.name || "Unknown",
    phone: phoneCode.value + " " + (form.value.phone || ""),
    message: form.value.message || "Aucun message fourni",
  };

  console.log("Form Data:", form.value);
  console.log("Country:", selectedCountry.value);
  console.log("Phone:", phoneCode.value);

  localStorage.setItem("customerInfo", JSON.stringify(customerInfo));

  const orderSummary = cartItems.value
    .map((item) => `<li>${item.name} (x${item.quantity}) - ${item.price}€</li>`)
    .join("");

  try {
    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: ["support@platinium-iptv.com"],
      subject: "Nouvelle Commande - Platinium IPTV",
      html: `
        <h1>Nouvelle Commande</h1>
        <p><strong>Nom :</strong> ${customerInfo.name}</p>
        <p><strong>Email :</strong> ${customerInfo.email}</p>
        <p><strong>Pays :</strong> ${customerInfo.country}</p>
        <p><strong>Téléphone :</strong> ${customerInfo.phone}</p>
        <p><strong>Message :</strong> ${customerInfo.message || "N/A"}</p>
        <h2>🛒 Détails de la commande :</h2>
        <ul>${orderSummary}</ul>
        <p><strong>Total :</strong> ${totalPrice.value}€</p>
      `,
    });

    await axios.post(`${ENGINE_URL}/mailer/send`, {
      recipients: [customerInfo.email],
      subject: "Confirmation de votre commande - Platinium IPTV",
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: auto;">
          <h1 style="color: #D32F2F;">Bonjour ${customerInfo.name},</h1>
          <p>Merci pour votre commande chez <strong>Platinium IPTV</strong> !</p>
          <p>Votre commande est en attente de paiement.</p>
          <p>Vous recevrez bientôt une facture à régler par PayPal ou carte de crédit.</p>
          <h2>🛒 Votre commande :</h2>
          <ul>${orderSummary}</ul>
          <p><strong>Total :</strong> ${totalPrice.value}€</p>
          <hr style="border: 1px solid #ccc; margin: 20px 0;">
          <table style="width: 100%; text-align: left;">
            <tr>
              <td>
                <img src="https://yourwebsite.com/logo.png" alt="Platinium IPTV Logo" width="150">
              </td>
              <td style="padding-left: 15px;">
                <p style="font-size: 14px; margin: 0;">
                  <strong>Marcel Bielsa</strong><br>
                  Directeur du Support Client et Commandes<br>
                  <a href="mailto:support@platinium-iptv.com" style="color: #D32F2F; text-decoration: none;">support@platinium-iptv.com</a><br>
                  📞 <a href="tel:+1234567890" style="color: #D32F2F; text-decoration: none;">+123 456 7890</a>
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

    console.log("✅ Emails Sent Successfully");
    toast.add({
      severity: "success",
      summary: "Commande Succès",
      detail: "Votre Commande a été envoyée avec succès !",
      life: 3000,
    });
    router.push("/thank-you");
  } catch (error) {
    console.error("❌ Erreur d'envoi:", error);
    toast.add({
      severity: "error",
      summary: "Erreur",
      detail: "❌ Une erreur est survenue, veuillez réessayer.",
      life: 3000,
    });
  } finally {
    loading.value = false; 
  }
};

</script>


  <template>
    <div
    class="relative mx-auto w-full bg-cover bg-center"
    :style="{ backgroundImage: `url('/assets/bgg.jpg')` }"
    >
    <Toast />
    <Navbar />
    <div class="absolute inset-0 bg-black opacity-15 z-0"></div>
    <div class="grid min-h-screen grid-cols-10 relative z-10">
      <div
        class="col-span-full pb-6 px-4 sm:pb-12 lg:col-span-6 lg:pb-24 mt-20"
      >
        <div class="mx-auto w-full max-w-lg">
          <h1 class="text-2xl font-medium font-oswald text-black sm:text-3xl">
            Paiement Sécurisé
            <span class="mt-2 block h-1 w-10 bg-purple-600 sm:w-20"></span>
          </h1>
          <img
            src="/assets/logo2.png"
            alt="platinium iptv logo"
            width="200"
            class="mt-10"
          />
          <form
            class="mt-10 flex flex-col space-y-4"
            @submit="handleOrderSubmit"
          >
            <label for="name" class="text-md font-semibold"
              >Nom Complet : *</label
            >
            <InputText
              v-model="form.fullName"
              id="name"
              name="full_name"
              required
              class="w-full bg-white/55"
            />

            <label for="email" class="text-md font-semibold">Email : *</label>
            <InputText
              v-model="form.email"
              id="email"
              name="email"
              type="email"
              required
              class="w-full"
            />

            <div class="p-float-label">
              <label for="country">Pays: *</label>
              <Dropdown
                id="country"
                v-model="selectedCountry"
                :options="countries"
                optionLabel="name"
                placeholder="Sélectionnez un pays"
                class="w-full p-dropdown"
                filter
                required
                @change="updatePhoneCode"
              />
            </div>

            <label for="phone" class="text-md font-semibold"
              >Téléphone : *</label
            >
            <div class="flex items-center">
              <span class="mr-2 text-xl">{{ phoneCode }}</span>
              <InputText id="phone" v-model="form.phone" name="phone" class="w-full" />
            </div>

            <label for="message" class="text-md font-semibold"
              >Informations supplémentaires :</label
            >
            <Textarea
              v-model="form.message"
              id="message"
              name="additional_message"
              rows="4"
              class="w-full"
            />
            <div
              class="bg-card text-card-foreground"
              :style="{
                fontFamily: 'Oswald, sans-serif',
                justifyContent: 'center',
              }"
            >
              <h1 class="text-2xl font-bold mb-4">Paiement</h1>
              <div
                class="bg-white-200 border-white border-2 p-4 rounded shadow-md"
              >
                <h2 class="font-semibold mb-2">
                  Facture à régler par PayPal ou carte de crédit
                </h2>
                <p class="text-muted-foreground text-black text-xl">
                  Merci d'avoir choisi Platinium IPTV , votre commande est en
                  attente de paiement. Vous recevrez une facture par email à
                  régler par PayPal ou par carte de crédit.
                </p>
              </div>
              <p class="mt-4 text-sm text-muted-foreground">
                Vos données personnelles seront utilisées pour traiter votre
                commande, soutenir votre expérience sur ce site et à d'autres
                fins décrites dans notre
                <a href="#" class="text-primary underline ml-1"
                  >Politique de confidentialité</a
                >.
              </p>
            </div>

            <button
              class="px-10 py-3 rounded-tl-3xl font-oswald rounded-br-3xl items-center rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg font-semibold shadow-lg hover:opacity-90 hover:shadow-xl transition-all flex justify-center"
              :disabled="loading"
              aria-label="Passer la commande"
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
              <span v-else>Passer La commande</span>
            </button>
          </form>
        </div>
      </div>

      <div
        class="relative col-span-full flex flex-col py-6 pl-8 pr-4 sm:py-12 lg:col-span-4 lg:py-24"
      >
        <div>
          <img
            src="/assets/movie.jpg"
            alt="Paiement Sécurisé"
            class="absolute inset-0 h-full w-full object-cover"
          />
          <div
            class="absolute inset-0 h-full w-full bg-gradient-to-t from-gray-800/85 to-black opacity-95"
          ></div>
        </div>
        <div class="relative pt-20">
          <h2 class="text-4xl font-oswald mb-10 font-bold text-white">
            Résumé de la commande
          </h2>
          <ul class="space-y-5 mt-4">
            <li v-if="cartItems.length === 0" class="text-white">
              Votre panier est vide.
            </li>
            <li
              v-for="(item, index) in cartItems"
              :key="index"
              class="flex justify-between items-center text-lg text-white"
            >
              <img :src="item.photos" alt="Produit" width="120" />
              <span>{{ item.name }} (x{{ item.quantity }})</span>
              <span>{{ item.price }}€</span>
            </li>
          </ul>
          <div class="my-5 h-0.5 w-full bg-gray-600"></div>
          <p class="flex justify-between text-2xl font-bold text-white">
            <span>Total :</span>
            <span>{{ totalPrice }}€</span>
          </p>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>
