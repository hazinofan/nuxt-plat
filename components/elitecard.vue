<template>
    <div>
      <div class="" data-aos="zoom-in" data-aos-delay="400">
        <div class="relative pt-8">
          <div class="absolute inset-0 h-1/2"></div>
          <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
              <!-- Left Side: Text Content -->
              <div class="flex-1 bg-white dark:bg-gray-900 px-6 py-8 lg:p-12">
                <h3 class="text-2xl font-extrabold text-gray-900 dark:text-white sm:text-3xl">
                    Offre exclusive : PLATINIUM PACK - Meilleure expérience IPTV
                </h3>
                <p class="mt-6 text-base text-gray-500 dark:text-gray-300">
                    Le pack Platinum inclut toutes les chaînes des packs Premium et Standard, avec une durée de 14 mois plus 1 mois offert, soit un total de 15 mois. Ce service IPTV vous offre un support plus rapide et la possibilité de personnaliser votre liste de chaînes pour une expérience Smart IPTV sur-mesure. 
                </p>
                <div class="mt-8">
                  <div class="flex items-center">
                    <h4 class="flex-shrink-0 pr-4 bg-white dark:bg-gray-900 text-sm tracking-wider font-semibold uppercase text-rose-600">
                        Ce qui est inclus
                    </h4>
                    <div class="flex-1 border-t-2 border-gray-200 dark:border-gray-600"></div>
                  </div>
                  <ul class="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5">
                    <li class="flex items-start lg:col-span-1">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <p class="ml-3 text-sm text-gray-700 dark:text-gray-300">Accès aux fonctionnalités premium</p>
                    </li>
                    <li class="flex items-start lg:col-span-1">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <p class="ml-3 text-sm text-gray-700 dark:text-gray-300">15 mois D'IPTV PLATINIUM</p>
                    </li>
                    <li class="flex items-start lg:col-span-1">
                      <div class="flex-shrink-0">
                        <svg class="h-5 w-5 text-green-400 dark:text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
                        </svg>
                      </div>
                      <p class="ml-3 text-sm text-gray-700 dark:text-gray-300">Personnaliser votre liste de chaînes</p>
                    </li>
                  </ul>
                </div>
              </div>
  
              <!-- Right Side: Pricing & Order Button -->
              <div class="py-8 px-6 text-center bg-gray-50 dark:bg-gray-900 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                <p class="text-lg leading-6 font-medium text-gray-900 dark:text-white">Offre à durée limitée</p>
                <div class="mt-3">
                  <span class="font-mono text-xl md:text-lg font-medium text-gray-400 dark:text-gray-400">€</span>
                  <span class="h1 line-through text-gray-600 dark:text-gray-400">120</span>
                  <span class="text-red-600 text-sm">Promotion Spéciale</span>
                </div>
                <div class="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900 dark:text-white">
                  <span>90€</span>
                  <span class="ml-3 text-xl font-medium text-gray-500 dark:text-gray-400">EUR</span>
                </div>
                <div class="mt-6">
                  <NuxtLink to="/produits/abonnement-iptv-platinium-15-mois" class="btn_elite inline-block py-2 px-4 bg-purple-600 text-white font-semibold rounded pt-3 hover:bg-purple-700 focus:ring-2 focus:ring-purple-500">
                    Commander
                  </NuxtLink>
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from "vue";
  import AOS from "aos";
  import "aos/dist/aos.css";
  
  // ✅ AOS Animation Init
  onMounted(() => {
    AOS.init();
  });
  </script>
  
  <style scoped>
  /* ✅ Style for Elite Card */
  .btn_elite {
    transition: all 0.3s ease-in-out;
  }
  .btn_elite:hover {
    transform: scale(1.05);
  }
  </style>
  