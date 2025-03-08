<script setup>
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

const user = ref(null);
const toast = useToast();

const op = ref();
const members = ref([
  {
    name: "Amy Elsner",
    image: "amyelsner.png",
    email: "support@platinium-iptv.com",
    role: "Email Support",
  },
  {
    name: "Bernardo Dominic",
    image: "bernardodominic.png",
    email: "+1 (276) 300-1517",
    role: "Whatsapp Support",
  },
]);

const toggle = (event) => {
  op.value.toggle(event);
};

const copyRefferal = (code) => {
  if (!code) return; // Ensure the code is valid before copying

  navigator.clipboard
    .writeText(code)
    .then(() => {
      toast.add({
        severity: "success",
        summary: "Succès",
        detail: "Votre code de parrainage a été copié avec succès !",
        life: 3000,
      });
    })
    .catch((err) => {
      console.error("Erreur lors de la copie :", err);
    });
};

const fetchUser = () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  try {
    const userData = jwtDecode(token);
    console.log(userData);
    user.value = userData;
  } catch (error) {
    console.error("Invalid token", error);
  }
};

onMounted(() => {
  fetchUser();
});
</script>

<template>
  <NuxtLayout name="user">
    <Toast />
    <!-- Header Section -->
    <div class="text-center mb-8">
      <h1
        class="md:text-4xl text-xl mt-5 font-bold text-purple-700 font-oswald flex justify-center items-center"
      >
        Découvrez
        <span class="text-gray-800 font-oswald ml-2">Nos Avantages</span>
      </h1>
      <p class="text-lg font-oswald text-gray-600 mt-2 px-3">
        Profitez de notre programme exclusif pour obtenir des réductions et des
        cadeaux 🎁
      </p>
    </div>

    <div class="card max-w-full p-4 sm:p-6">
      <Stepper value="1" class="w-full">
        <StepItem value="1">
          <Step>👥 Parrainage & Réductions</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-auto min-h-[20rem]">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium p-4 text-center"
              >
                <div>
                  <h2
                    class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2"
                  >
                    <i class="pi pi-users text-xl sm:text-2xl md:text-3xl"></i>
                    Parrainage & Réductions
                  </h2>
                  <p class="text-gray-600 text-sm sm:text-base md:text-lg mt-6">
                    Chaque utilisateur dispose d’un
                    <strong>code de parrainage</strong> dans son tableau de
                    bord. Un nouveau client peut l’utiliser en contactant notre
                    support au
                    <span class="text-purple-600 font-bold"
                      >+1 (256) 856-965</span
                    >
                    pour obtenir une <strong>remise spéciale</strong> sur son
                    abonnement IPTV !
                  </p>
                </div>
              </div>
            </div>
            <div class="py-6 md:text-left text-center">
              <Button label="Next" @click="activateCallback('2')" />
            </div>
          </StepPanel>
        </StepItem>

        <StepItem value="2">
          <Step>🏆 PLATINIUM Milestones</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-auto min-h-[20rem]">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium p-4 md:text-left text-center"
              >
                <div class="max-w-full">
                  <h2
                    class="text-lg sm:text-2xl md:text-3xl font-semibold mb-2"
                  >
                    <i class="pi pi-trophy text-lg sm:text-2xl md:text-3xl"></i>
                    PLATINIUM Milestones
                  </h2>

                  <!-- Responsive Stepper -->
                  <div class="card flex justify-center">
                    <Stepper value="1" class="w-full max-w-full sm:max-w-[90%]">
                      <StepList class="flex flex-wrap justify-center">
                        <StepItem value="1">
                          <Step class="text-sm sm:text-base md:text-lg"
                            >Abonnement SINGLE gratuit</Step
                          >
                        </StepItem>

                        <StepItem value="2">
                          <Step class="text-sm sm:text-base md:text-lg"
                            >Réduction 50%</Step
                          >
                        </StepItem>

                        <StepItem value="3">
                          <Step class="text-sm sm:text-base md:text-lg"
                            >Abonnement Double Gratuit</Step
                          >
                        </StepItem>
                      </StepList>
                    </Stepper>
                  </div>

                  <p class="text-gray-600 text-sm sm:text-base md:text-lg mt-6">
                    Plus vous achetez d’abonnements IPTV, plus vous progressez
                    dans notre programme
                    <strong>PLATINIUM Milestones</strong>. À chaque palier
                    atteint, vous recevez des
                    <strong
                      >cadeaux exclusifs, réductions et abonnements
                      gratuits</strong
                    >
                    en récompense de votre fidélité !
                  </p>
                </div>
              </div>
            </div>

            <!-- Responsive Buttons -->
            <div
              class="flex flex-wrap md:justify-left justify-center py-6 gap-2 mt-5"
            >
              <Button
                label="Back"
                severity="secondary"
                @click="activateCallback('1')"
                class="text-sm sm:text-base"
              />
              <Button
                label="Next"
                @click="activateCallback('3')"
                class="text-sm sm:text-base"
              />
            </div>
          </StepPanel>
        </StepItem>

        <StepItem value="3">
          <Step>Super Promos Mensuelles</Step>
          <StepPanel v-slot="{ activateCallback }">
            <div class="flex flex-col h-auto min-h-[20rem]">
              <div
                class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center content-center font-medium items-center p-4"
              >
                <div>
                  <h2
                    class="text-xl sm:text-2xl md:text-3xl font-semibold mb-2"
                  >
                    <i
                      class="pi pi-shopping-cart text-xl sm:text-2xl md:text-3xl"
                    ></i>
                    Super Promos Mensuelles
                  </h2>
                  <p class="text-gray-600 text-sm sm:text-base md:text-lg mt-6">
                    Chaque mois, profitez de
                    <strong>promotions exceptionnelles</strong> sur les
                    <span class="uppercase text-purple-400 font-bold"
                      >double abonnements</span
                    >
                    dans la section
                    <a
                      href="/produits"
                      class="text-purple-500 hover:text-purple-700 font-bold justify-self-center flex flex-row items-center gap-2"
                    >
                      Produits
                      <i
                        class="pi pi-arrow-right"
                        style="color: slateblue"
                      ></i> </a
                    >. Achetez-en un et obtenez une offre spéciale sur le
                    deuxième !
                  </p>
                </div>
              </div>
            </div>
            <div class="py-6 md:text-left text-center">
              <Button
                label="Back"
                severity="secondary"
                @click="activateCallback('2')"
              />
            </div>
          </StepPanel>
        </StepItem>
      </Stepper>
    </div>

    <div class="card flex justify-center mt-10 sm:mt-20">
      <Button
        type="button"
        icon="pi pi-share-alt"
        label="VOTRE CODE PARRAINAGE"
        @click="toggle"
        class="text-sm sm:text-base"
      />

      <Popover ref="op">
        <div class="flex flex-col gap-4 w-full sm:w-[25rem] p-4">
          <div>
            <span class="font-medium block mb-2 text-sm sm:text-base"
              >Votre code Refferal</span
            >
            <InputGroup>
              <InputText
                :value="'platinium-' + user.username"
                readonly
                class="w-full sm:w-[25rem] text-sm sm:text-base"
              ></InputText>
              <InputGroupAddon>
                <i
                  class="pi pi-copy cursor-pointer bg-white"
                  @click="copyRefferal('platinium-' + user.username)"
                ></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <span class="font-medium block mb-2 text-sm sm:text-base"
              >Équipe Du Support</span
            >
            <ul class="list-none p-0 m-0 flex flex-col gap-3 sm:gap-4">
              <li
                v-for="member in members"
                :key="member.name"
                class="flex flex-wrap items-center gap-2"
              >
                <img
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`"
                  class="w-8 sm:w-10"
                />
                <div class="text-sm sm:text-base">
                  <span class="font-medium">{{ member.name }}</span>
                  <div
                    class="text-xs sm:text-sm text-surface-500 dark:text-surface-400"
                  >
                    {{ member.email }}
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-xs sm:text-sm"
                >
                  <span>{{ member.role }}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </Popover>
    </div>
  </NuxtLayout>
</template>

<style scoped>
/* Removing background */
.Stepper {
  background: transparent !important;
  border: none;
}

/* Custom styling */
.p-4 {
  background: none !important;
}

a {
  text-decoration: none;
}

:deep(.p-steppanel) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
}
</style>
  