<script setup>
import { onMounted } from "vue";
import AOS from "aos";
import "aos/dist/aos.css";

const events = ref([
  {
    status: "Commandez",
    date: "15/10/2020 10:30",
    icon: "pi pi-shopping-cart",
    color: "#9C27B0",
  },
  {
    status: "Payez votre Commande",
    date: "15/10/2020 14:00",
    icon: "pi pi-cog",
    color: "#673AB7",
  },
  {
    status: "Commande taraité",
    date: "15/10/2020 16:15",
    icon: "pi pi-shopping-cart",
    color: "#FF9800",
  },
  {
    status: "Bénéficiez de votre Cadeau",
    date: "16/10/2020 10:00",
    icon: "pi pi-check",
    color: "#607D8B",
  },
]);

// ✅ AOS Animation Init
onMounted(() => {
  AOS.init();
});
</script>
<template>
  <div class="relative grid md:grid-cols-2 gap-8 p-8 mt-36" data-aos="fade-down" data-aos-delay="500">
    <!-- ✅ Background Text -->
    <span
      class="absolute inset-0 md:flex ml-56 hidden items-center text-gray-500 text-[6rem] md:text-[8rem] font-bold uppercase opacity-10 pointer-events-none"
    >
      PLATINIUM <br> SERVICE
    </span>

    <!-- ✅ Left Section: Timeline -->
    <div class="relative z-10 card p-6 justify-center justify-items-center">
      <h2 class="text-3xl font-oswald font-bold text-gray-800 mb-4">
        Votre Parcours PLATINIUM
      </h2>
      <Timeline :value="events" align="alternate" class="w-full mt-10 md:w-80">
        <template #content="slotProps">
          {{ slotProps.item.status }}
        </template>
      </Timeline>

      <NuxtLink to="/login">
        <button
              class="px-10 mt-24 py-1 rounded-tl-3xl font-oswald rounded-br-3xl items-center rounded-tr-sm rounded-bl-sm hover:rounded-lg bg-gradient-to-r from-blue-800 to-purple-500 text-white text-lg shadow-lg hover:opacity-90 hover:shadow-xl transition-all flex justify-center"
              :disabled="loading"
              aria-label="Passer la commande"
            > Créer un Compte</button>
</NuxtLink>

    </div>

    <!-- ✅ Right Section: Call-to-Action -->
    <div class="relative z-10 flex flex-col items-center text-center text-black p-6">
      <h1 class="text-2xl font-bold font-oswald">
        Bénéficiez de Cadeaux en Créant un Compte PLATINIUM
      </h1>
      <p class="text-gray-700 mt-4 font-roboto italic">
        En créant un compte PLATINIUM, vous accédez à un univers d'avantages
        exclusifs : offres spéciales, accès anticipé aux nouveautés et bien plus
        encore. Rejoignez notre communauté grandissante et profitez d'une
        expérience unique adaptée à vos besoins !
      </p>
      <img
        src="/assets/login.webp"
        alt="Login Platinium Users"
        class="my-4 rounded-lg"
      />
      <div class="flex flex-row items-center gap-3">
        <AvatarGroup>
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <Avatar
            image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png"
            shape="circle"
          />
          <Avatar label="+150" shape="circle" />
        </AvatarGroup>
        <p class="text-lg opacity-90 font-roboto text-gray-800">
          Rejoignez la communauté PLATINIUM
        </p>
      </div>
    </div>
  </div>
</template>

  

  
  <style scoped>
/* ✅ Style for Elite Card */
.btn_elite {
  transition: all 0.3s ease-in-out;
}
.btn_elite:hover {
  transform: scale(1.05);
}
</style>
  