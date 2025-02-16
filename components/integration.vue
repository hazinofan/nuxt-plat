<template>
  <section class="steps" data-aos="fade-down" data-aos-delay="400">
    <h1>Rendre l'intégration de votre abonnement IPTV plus facile</h1>
    <p>
      Avant de pouvoir profiter de votre Abonnement IPTV, suivez simplement
      trois étapes simples.
    </p>

    <div class="row">
      <div class="steps-col">
        <!-- ✅ Changed <h3> to <h2> -->
        <h2 class="flex gap-3 items-center" style="place-content: center">
          <i class="pi pi-desktop text-xl"></i> Passer une commande
        </h2>
        <p>
          Accédez à notre service premium IPTV Smarters en seulement quelques
          clics, vous offrant une expérience immédiate et de qualité
          exceptionnelle.
        </p>
      </div>

      <div class="steps-col">
        <!-- ✅ Changed <h3> to <h2> -->
        <h2 class="flex gap-3 items-center" style="place-content: center">
          <i class="pi pi-download text-xl"></i> Installation
        </h2>
        <p>
          Pour optimiser votre expérience avec votre abonnement IPTV,
          téléchargez simplement l'application Smart IPTV appropriée pour votre
          appareil depuis la boutique en ligne de votre choix.
        </p>
      </div>

      <div class="steps-col">
        <!-- ✅ Changed <h3> to <h2> -->
        <h2 class="flex gap-3 items-center" style="place-content: center">
          <i class="pi pi-face-smile text-xl"></i> AMUSEZ-VOUS
        </h2>
        <p>
          Explorez un vaste catalogue de milliers de chaînes et de vidéos, et
          plongez dans une expérience TV plus diversifiée et de meilleure
          qualité dès maintenant avec notre service d'abonnement IPTV.
        </p>
      </div>
    </div>
  </section>
</template>

  
  <script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

onMounted(() => {
  AOS.init();
});
</script>
  
  <style scoped>
/* Keep your existing styles from the original component */
</style>
  