<template>
  <div class="">
    <!-- <Anouncement /> -->
    <div
      class="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style="
        background-image: url('/assets/bg.jpg');
        background-size: cover;
        background-position: center;
      "
    >
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-65"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-6 max-w-7xl">
        <!-- Logo -->
        <div class="mb-6">
          <img
            src="/assets/logo2.png"
            alt="Platinium IPTV Logo"
            class="mx-auto w-80"
          />
        </div>

        <!-- Main Title -->
        <h1 class="text-3xl md:text-5xl font-extrabold">
          Découvrez PLATINIUM IPTV - Votre Abonnement IPTV Idéal pour IPTV
          Smarters et Smart IPTV
        </h1>

        <!-- Subtitle -->
        <p class="mt-10 text-lg md:text-xl opacity-80 text-white">
          Profitez de vos chaînes préférées en direct avec PLATINIUM IPTV.
          Compatible avec IPTV Smarters Pro et Smart IPTV, notre service vous
          offre une interface simple et une expérience de streaming de qualité.
        </p>

        <!-- Buttons -->
        <div class="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <button
            className="btn flex items-center justify-center gap-2 text-white"
          >
            <i class="pi pi-cart-arrow-down" style="font-size: 1rem"></i>
            Commandez votre Abonnement IPTV
          </button>
          <button
            className="btn flex items-center justify-center gap-2 text-white"
          >
            <i class="pi pi-desktop" style="font-size: 1rem"></i>
            Essai Gratuit IPTV
          </button>
        </div>
      </div>
      <Navbar />
    </div>
    <!-- Components -->
    <Caroussel :speed="20"/>
    <Integration />
    <Herosection />
    <Movies :speed="25"/>
    <pricing-cards />
    <Elitecard />
    <Steps />
    <Faq />
    <Footer />
  </div>
</template>

<script setup>
import Anouncement from "~/components/anouncement.vue";
import Caroussel from "~/components/Caroussel.vue";
import Elitecard from "~/components/elitecard.vue";
import Faq from "~/components/faq.vue";
import Footer from "~/components/footer.vue";
import Herosection from "~/components/Herosection.vue";
import Integration from "~/components/integration.vue";
import Movies from "~/components/movies.vue";
import Navbar from "~/components/navbar.vue";
import Steps from "~/components/steps.vue";


</script>
