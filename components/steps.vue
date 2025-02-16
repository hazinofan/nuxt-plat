<template>
  <section
    class="pt-40 overflow-hidden"
    data-aos="fade-right"
    data-aos-delay="400"
  >
    <div class="container px-4 mx-auto">
      <div class="max-w-5xl mx-auto">
        <div class="flex flex-wrap items-center -mx-5">
          <!-- Left Side: Image -->
          <div class="w-full lg:w-1/2 px-5 mb-20 lg:mb-0">
            <div class="max-w-lg">
              <span class="font-bold text-purple-600 text-2xl"
                >3 Étapes Faciles pour Commencer avec PLATINIUM IPTV</span
              >
              <NuxtImg src="/assets/steps.png" format="webp" alt="Étapes d'utilisation"/>
            </div>
          </div>

          <!-- Right Side: Steps -->
          <div class="w-full lg:w-1/2 px-5">
            <ul>
              <li
                class="flex pb-10 mb-8 border-b border-gray-200 dark:border-gray-700 ml-6"
              >
                <div class="mr-8">
                  <span
                    class="flex justify-center items-center w-14 h-14 bg-purple-900 text-lg font-bold rounded-full text-white"
                  >
                    <i class="pi pi-user-plus text-2xl"></i>
                  </span>
                </div>
                <div class="max-w-xs">
                  <div class="mb-2 text-xl font-bold text-orange-800">
                    Choisissez votre abonnement
                  </div>
                  <p class="text-lg text-gray-500 dark:text-black">
                    Choisissez votre formule d'abonnement IPTV Smarters et
                    téléchargez notre application sur votre appareil pour une
                    expérience Smart IPTV améliorée.
                  </p>
                </div>
              </li>

              <li
                class="flex pb-10 mb-8 border-b border-gray-200 dark:border-gray-700"
              >
                <div class="mr-8">
                  <span
                    class="flex justify-center items-center w-14 h-14 bg-purple-900 text-lg font-bold rounded-full text-white"
                  >
                    <i class="pi pi-credit-card text-2xl"></i>
                  </span>
                </div>
                <div class="max-w-xs">
                  <div class="mb-2 text-xl font-bold text-orange-800">
                    Effectuer le paiement sécurisé
                  </div>
                  <p class="text-lg text-gray-500 dark:text-black">
                    Procédez via votre carte bancaire ou votre compte PayPal.
                    Attendez quelques minutes et recevez votre abonnement par
                    email.
                  </p>
                </div>
              </li>

              <li
                class="flex pb-10 border-b border-gray-200 dark:border-gray-700"
              >
                <div class="mr-8">
                  <span
                    class="flex justify-center items-center w-14 h-14 bg-purple-900 text-lg font-bold rounded-full text-white"
                  >
                    <i class="pi pi-face-smile text-2xl"></i>
                  </span>
                </div>
                <div class="max-w-xs">
                  <div class="mb-2 text-xl font-bold text-orange-800">
                    Profitez d'un accès instantané
                  </div>
                  <p class="text-lg text-gray-500 dark:text-black">
                    Connectez-vous avec les informations d'identification de
                    votre compte et accédez instantanément à des milliers de
                    chaînes du monde entier.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
  
  <script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

// ✅ Initialize AOS for animations
onMounted(() => {
  AOS.init();
});
</script>
  
  <style scoped>
</style>
  