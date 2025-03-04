<script setup>
import { ref } from "vue";
import { jwtDecode } from "jwt-decode";

const user = ref(null);
const toast = useToast()

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
        class="text-4xl font-bold text-purple-700 font-oswald flex justify-center items-center"
      >
        Découvrez
        <span class="text-gray-800 font-oswald ml-2">Nos Avantages</span>
      </h1>
      <p class="text-lg font-oswald text-gray-600 mt-2">
        Profitez de notre programme exclusif pour obtenir des réductions et des
        cadeaux 🎁
      </p>
    </div>

      <div class="card">
        <Stepper value="1">
          <StepItem value="1">
            <Step>👥 Parrainage & Réductions</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div
                  class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium p-4 text-center"
                >
                  <div>
                    <h2 class="text-3xl font-semibold mb-2">
                      <i class="pi pi-users text-3xl"></i> Parrainage &
                      Réductions
                    </h2>
                    <p class="text-gray-600 text-xl mt-10">
                      Chaque utilisateur dispose d’un
                      <strong>code de parrainage</strong> dans son tableau de
                      bord. Un nouveau client peut l’utiliser en contactant
                      notre support au
                      <span class="text-purple-600 font-bold"
                        >+1 (256) 856-965</span
                      >
                      pour obtenir une <strong>remise spéciale</strong>
                      sur son abonnement IPTV !
                    </p>
                  </div>
                </div>
              </div>
              <div class="py-6">
                <Button label="Next" @click="activateCallback('2')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="2">
            <Step>🏆 PLATINIUM Milestones</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div
                  class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium p-4 text-center"
                >
                  <div>
                    <h2 class="text-3xl font-semibold mb-2">
                      <i class="pi pi-trophy text-3xl"></i> PLATINIUM Milestones
                    </h2>
                    <div class="card flex justify-center">
                      <Stepper value="1" class="">
                        <StepList>
                          <!-- Step 1: Design -->
                          <StepItem value="1">
                            <Step>Abonnement SINGLE gratuit</Step>
                          </StepItem>

                          <!-- Step 2: Development -->
                          <StepItem value="2">
                            <Step> Réduction 50% </Step>
                          </StepItem>

                          <!-- Step 3: QA -->
                          <StepItem value="3">
                            <Step>Abonnement Double Gratuit</Step>
                          </StepItem>
                        </StepList>
                      </Stepper>
                    </div>
                    <p class="text-gray-600 text-xl mt-10">
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
              <div class="flex py-6 gap-2 mt-5">
                <Button
                  label="Back"
                  severity="secondary"
                  @click="activateCallback('1')"
                />
                <Button label="Next" @click="activateCallback('3')" />
              </div>
            </StepPanel>
          </StepItem>
          <StepItem value="3">
            <Step>Super Promos Mensuelles</Step>
            <StepPanel v-slot="{ activateCallback }">
              <div class="flex flex-col h-48">
                <div
                  class="border-2 border-dashed border-surface-200 dark:border-surface-700 rounded bg-surface-50 dark:bg-surface-950 flex-auto flex justify-center items-center font-medium p-4 text-center"
                >
                  <div>
                    <h2 class="font-semibold text-3xl mb-2">
                      <i class="pi pi-shopping-cart text-3xl"></i> Super Promos
                      Mensuelles
                    </h2>
                    <p class="text-gray-600 text-xl mt-10">
                      Chaque mois, profitez de
                      <strong>promotions exceptionnelles</strong> sur les
                      <span class="uppercase text-purple-400 font-bold"
                        >double abonnements</span
                      >
                      dans la section
                      <a
                        href="/produits"
                        class="text-purple-500 hover:text-purple-700 font-bold hover:underline"
                        >Produits</a
                      >. Achetez-en un et obtenez une offre spéciale sur le
                      deuxième !
                    </p>
                  </div>
                </div>
              </div>
              <div class="py-6">
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

    <div class="card flex justify-center mt-20">
      <Button
        type="button"
        icon="pi pi-share-alt"
        label="VOTRE CODE PARRAINAGE"
        @click="toggle"
      />

      <Popover ref="op">
        <div class="flex flex-col gap-4 w-[25rem]">
          <div>
            <span class="font-medium block mb-2">Votre code Refferal</span>
            <InputGroup>
              <InputText
                :value="'platinium-' + user.username"
                readonly
                class="w-[25rem]"
              ></InputText>
              <InputGroupAddon>
                <i
                  class="pi pi-copy cursor-pointer bg-white "
                  @click="copyRefferal('platinium-' + user.username)"
                ></i>
              </InputGroupAddon>
            </InputGroup>
          </div>

          <div>
            <span class="font-medium block mb-2">Equipe Du Support</span>
            <ul class="list-none p-0 m-0 flex flex-col gap-4">
              <li
                v-for="member in members"
                :key="member.name"
                class="flex items-center gap-2"
              >
                <img
                  :src="`https://primefaces.org/cdn/primevue/images/avatar/${member.image}`"
                  style="width: 32px"
                />
                <div>
                  <span class="font-medium">{{ member.name }}</span>
                  <div class="text-sm text-surface-500 dark:text-surface-400">
                    {{ member.email }}
                  </div>
                </div>
                <div
                  class="flex items-center gap-2 text-surface-500 dark:text-surface-400 ml-auto text-sm"
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
  