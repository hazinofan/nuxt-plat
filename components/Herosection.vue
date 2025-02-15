<script setup>
import { ref, onMounted, watch } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

// Element reference & visibility tracking
const statsRef = ref(null);
const isVisible = ref(false);

// Counters (Start at 0)
const membersCount = ref(0);
const clientsCount = ref(0);
const teamCount = ref(0);
const experienceCount = ref(0);

// Start AOS & Intersection Observer
onMounted(() => {
  AOS.init();
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true;
      }
    },
    { threshold: 0.5 }
  );
  if (statsRef.value) observer.observe(statsRef.value);
});

// Animate counters when `isVisible` is true
watch(isVisible, (newVal) => {
  if (newVal) {
    animateCounter(membersCount, 7200);
    animateCounter(clientsCount, 9000);
    animateCounter(teamCount, 35);
    animateCounter(experienceCount, 10);
  }
});

// Function to animate counter
function animateCounter(counterRef, target) {
  let count = 0;
  const duration = 1000; // Animation time in ms
  const stepTime = Math.abs(Math.floor(duration / target));

  const timer = setInterval(() => {
    count += 5;
    counterRef.value = count;
    if (count >= target) {
      clearInterval(timer);
    }
  }, stepTime);
}
</script>

<template>
  <section class="hero" data-aos="fade-down" data-aos-delay="400">
    <div class="hero-content">
      <div class="hero-text">
        <h1>Offre exclusive : PLATINIUM PACK - Meilleure expérience IPTV</h1>
        <p>
          Le pack Platinum inclut toutes les chaînes des packs Premium et Standard,
          avec une durée de 14 mois plus 1 mois offert, soit un total de 15 mois.
          Ce service IPTV vous offre un support plus rapide et la possibilité de personnaliser
          votre liste de chaînes pour une expérience Smart IPTV sur-mesure.
        </p>
        <NuxtLink to="/produits/abonnement-iptv-premium-12-mois" class="discover-btn">
          Découvrir l'Offre
        </NuxtLink>
      </div>
      <div class="hero-image">
        <img src="/assets/product.png" alt="IPTV Box" />
      </div>
    </div>

    <!-- Statistics Section -->
    <div class="stats" ref="statsRef">
      <div class="stat-item">
        <h2>{{ membersCount }}+</h2>
        <p>Membres Actifs</p>
      </div>
      <div class="stat-item">
        <h2>{{ clientsCount }}+</h2>
        <p>Clients Satisfaits</p>
      </div>
      <div class="stat-item">
        <h2>{{ teamCount }}+</h2>
        <p>Équipe Professionnelle</p>
      </div>
      <div class="stat-item">
        <h2>{{ experienceCount }}+</h2>
        <p>Années d'Expérience</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
/* Keep your existing styles */
</style>
