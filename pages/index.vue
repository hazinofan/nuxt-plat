<template>
  <div>
    <!-- Move Navbar outside the hero section -->
    <Navbar />

    <div
      data-aos="fade-down"
      data-aos-delay="400"
      class="relative h-screen w-full flex flex-col items-center justify-center bg-cover bg-center"
      style="
        background-image: url('/assets/bg.webp');
        background-size: cover;
        background-position: center;
      "
    >
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black bg-opacity-65"></div>

      <!-- Content -->
      <div class="relative z-10 text-center text-white px-6 max-w-7xl">
        <!-- Logo -->
        <div class="mb-6 justify-items-center">
          <NuxtImg src="/assets/logo2.png" class="w-72 " format="webp" alt="Platinium IPTV Logo"/>
        </div>

        <!-- Main Title -->
        <h1 class="text-3xl md:text-5xl font-bold">
          Découvrez PLATINIUM IPTV - Votre Abonnement IPTV Idéal pour IPTV Smarters et Smart IPTV
        </h1>

        <!-- Subtitle -->
        <p class="mt-10 text-lg md:text-xl opacity-80 text-white">
          Profitez de vos chaînes préférées en direct avec PLATINIUM IPTV.
          Compatible avec IPTV Smarters Pro et Smart IPTV, notre service vous
          offre une interface simple et une expérience de streaming de qualité.
        </p>

        <!-- Buttons -->
        <div class="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <NuxtLink
            to="/produits"
            class="btn flex items-center justify-center gap-2 text-white"
            aria-label="Commander votre abonnement IPTV"
          >
            <i class="pi pi-cart-arrow-down" style="font-size: 1rem"></i>
            Commandez votre Abonnement IPTV
          </NuxtLink>

          <NuxtLink
            to="/test-gratuit"
            class="btn flex items-center justify-center gap-2 text-white"
            aria-label="Essai gratuit IPTV"
          >
            <i class="pi pi-desktop" style="font-size: 1rem"></i>
            Essai Gratuit IPTV
          </NuxtLink>
        </div>
      </div>
    </div>

    <!-- Components -->
    <Caroussel :speed="20" />
    <Integration />
    <Herosection />
    <Movies :speed="25" />
    <pricing-cards />
    <Elitecard />
    <Steps />
    <Faq />
    <Footer />
  </div>
</template>


<script setup>
import { NuxtLink } from '#components';
import { useHead } from '#imports'; 
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

// ✅ Add meta tags using useHead
useHead({
  title: "PLATINIUM IPTV - Meilleur Fournisseur IPTV en France en 2024",
  meta: [
    {
      name: "description",
      content:
        "Découvrez PLATINIUM IPTV, votre fournisseur d'abonnement IPTV de haute qualité. Compatible avec IPTV Smarters Pro, Smart IPTV, et plus encore. Profitez du meilleur service IPTV dès aujourd'hui.",
    },
    {
      name: "keywords",
      content:
        "PLATINIUM IPTV, iptv smarters pro, abonnement iptv, iptv smarters, smart iptv",
    },
    { name: "author", content: "PLATINIUM IPTV" },
    { name: "robots", content: "index, follow" },
    { property: "og:title", content: "PLATINIUM IPTV - Meilleur Fournisseur IPTV en France en 2024" },
    {
      property: "og:description",
      content:
        "Découvrez PLATINIUM IPTV, votre fournisseur d'abonnement IPTV de haute qualité. Compatible avec IPTV Smarters Pro, Smart IPTV, et plus encore.",
    },
    { property: "og:image", content: "/assets/logo2.png" }, 
    { property: "og:url", content: "https://www.platinium-iptv.com" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" }, 
    { name: "twitter:title", content: "PLATINIUM IPTV - Meilleur Fournisseur IPTV en France en 2024" },
    {
      name: "twitter:description",
      content:
        "Découvrez PLATINIUM IPTV, votre fournisseur d'abonnement IPTV de haute qualité. Compatible avec IPTV Smarters Pro, Smart IPTV, et plus encore.",
    },
    { name: "twitter:image", content: "/assets/logo2.png" },
  ],
  link: [
    { rel: "icon", href: "/images/favicon.png" }, 
    { rel: "canonical", href: "https://www.platinium-iptv.com" },
  ],
});
</script>

