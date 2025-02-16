<template>
    <div data-aos="fade-right" data-aos-delay="400">
      <section class="max-w-5xl mx-auto py-10 sm:py-20">
        <div class="flex items-center justify-center flex-col gap-y-2 py-5">
          <h2 class="text-2xl md:text-3xl lg:text-4xl font-bold">{{ faq.title }}</h2>
          <p class="text-lg font-medium text-slate-700/70">{{ faq.subtitle }}</p>
        </div>
        <div class="w-full px-7 md:px-10 xl:px-2 py-4">
          <div class="mx-auto w-full max-w-5xl border border-slate-400/20 rounded-lg bg-white">
            <div v-for="(faqItem, index) in faqs" :key="index" class="border-b border-[#0A071B]/10">
              <button
                class="question-btn flex w-full items-start gap-x-5 justify-between rounded-lg text-left text-lg font-bold text-slate-800 focus:outline-none p-5"
                @click="toggleAnswer(index)"
              >
                <span>{{ faqItem.question }}</span>
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 24 24"
                  class="mt-1.5 md:mt-0 flex-shrink-0 h-5 w-5 text-[#5B5675]"
                  :class="{ 'rotate-180': openQuestion === index }"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M16.293 9.293 12 13.586 7.707 9.293l-1.414 1.414L12 16.414l5.707-5.707z"></path>
                </svg>
              </button>
              <div
                class="answer pt-2 pb-5 px-5 text-sm lg:text-base text-[#343E3A] font-medium"
                v-show="openQuestion === index"
              >
                {{ faqItem.answer }}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import AOS from 'aos';
  import 'aos/dist/aos.css';
  
  onMounted(() => {
    AOS.init();
  });
  
  const openQuestion = ref(null);
  
  const toggleAnswer = (index) => {
    openQuestion.value = openQuestion.value === index ? null : index;
  };
  
  const faq = {
    title: "Foire Aux Questions",
    subtitle: "Questions liées à nos services IPTV",
  };
  
  const faqs = [
    { question: "Comment passer une commande ?", answer: "Vous pouvez passer une commande en vous rendant sur notre site web, en choisissant votre abonnement et en suivant les instructions de paiement." },
    { question: "Que comprend notre forfait ?", answer: "Lorsque vous vous inscrivez à PLATINIUM IPTV, vous recevez des identifiants de connexion au serveur IPTV ainsi que des instructions détaillées pour le configurer sur votre appareil." },
    { question: "Mes informations personnelles sont-elles sécurisées ?", answer: "Nous sommes engagés à protéger votre vie privée et votre sécurité. Nos mesures de sécurité robustes garantissent la protection de vos informations personnelles et de paiement. Consultez notre politique de confidentialité pour plus de détails." },
    { question: "Comment accéder aux chaînes FR ?", answer: "Pour utiliser FR CHANNELS, vous avez besoin d'une connexion Internet fiable et d'un appareil compatible (boîtier décodeur, smart TV, ordinateur ou mobile). Après avoir souscrit à un forfait, vous pouvez profiter de vos chaînes et émissions préférées." },
    { question: "Quels modes de paiement sont acceptés ?", answer: "PLATINIUM IPTV accepte plusieurs méthodes de paiement, y compris les cartes de crédit, PayPal et les cryptomonnaies comme le Bitcoin." },
    { question: "Quelle est la politique de remboursement ?", answer: "PLATINIUM IPTV offre une garantie de remboursement de 7 jours. Si vous n'êtes pas satisfait du service, vous pouvez demander un remboursement dans les 7 jours suivant votre abonnement." },
    { question: "Comment obtenir un essai gratuit ?", answer: "Pour essayer notre service IPTV gratuitement, remplissez simplement le formulaire sur notre page Essai Gratuit. Vous recevrez vos codes d'accès dans les 5 à 10 minutes !" },
    { question: "Puis-je annuler mon abonnement à tout moment ?", answer: "Oui, vous avez la liberté d'annuler votre abonnement à tout moment." },
  ];
  </script>
  
  <style>
  .rotate-180 {
    transform: rotate(180deg);
    transition: transform 0.3s ease;
  }
  </style>
  