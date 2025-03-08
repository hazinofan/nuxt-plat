<script setup>
import { ref } from 'vue';
import { useToast } from 'primevue/usetoast';
import { useRouter } from 'vue-router';

const toast = useToast();
const router = useRouter();

const items = ref([
    {
        label: 'WhatsApp Support',
        icon: 'pi pi-whatsapp',
        command: () => {
            window.open('https://wa.me/212665078502', '_blank'); // Replace with your WhatsApp number
        }
    },
    {
        label: 'Online Support',
        icon: 'pi pi-exclamation-circle',
        command: () => {
            router.push('/support');
        }
    }
]);

</script>

<template>
    <div class="relative w-full h-full">
      <slot />
  
      <!-- Floating Support Buttons -->
      <div class="fixed bottom-5 right-5 z-50">
        <SpeedDial
          :model="items"
          direction="up"
          :buttonProps="{ severity: 'help', rounded: true }"
          :tooltipOptions="{ position: 'left' }"
        />
      </div>
  
      
    </div>
  </template>
  

