<template>
  <div v-if="isFontSizeSet" class="marquee">
    <div class="marquee__content" :style="{ animationDuration: animationSpeed }">
      <NuxtImg
        v-for="(image, index) in images"
        :key="index"
        :src="image"
        class="marquee__item"
        :alt="imageAlts[index]" 
        format="webp"
        loading="lazy"
      />
    </div>
    <div class="marquee__content" :style="{ animationDuration: animationSpeed }">
      <NuxtImg
        v-for="(image, index) in images"
        :key="index + 1000"
        :src="image"
        class="marquee__item"
        :alt="imageAlts[index]" 
        format="webp"
        loading="lazy"
      />
    </div>
  </div>
</template>



<script setup>
import { computed, watchEffect, onMounted, ref } from 'vue';

const props = defineProps({
  fontSize: {
    type: String,
    default: '16px',
  },
  images: {
    type: Array,
    default: () => [
      "/assets/bein.webp",
      "/assets/espn.webp",
      "/assets/netflix.webp",
      "/assets/tbs.webp",
      "/assets/sky.webp",
      "/assets/hgtv.webp",
      "/assets/cn.webp",
      "/assets/NBC_logo_2022.svg",
    ],
  },
  speed: {
    type: Number,
    default: 10, 
  },
});

// ✅ Create a computed property for `alt` texts
const imageAlts = computed(() => {
  return props.images.map((image) => {
    return image
      .split('/').pop() // Extract file name
      .split('.')[0] // Remove file extension
      .replace(/_/g, ' ') // Replace underscores with spaces
      .replace(/-/g, ' ') // Replace dashes with spaces
      .toUpperCase(); // Convert to uppercase
  });
});

const animationSpeed = computed(() => `${props.speed}s`);
const isFontSizeSet = ref(false);

onMounted(() => {
  watchEffect(() => {
    document.documentElement.style.setProperty('--baseFontSize', props.fontSize);
    isFontSizeSet.value = true;
  });
});
</script>


<style scoped>
.marquee {
  width: 100vw;
  overflow: hidden;
  display: flex;
  gap: var(--gap);
  --gap: 2rem;
  padding: 10px 0;
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  min-width: 100%;
  gap: var(--gap);
  animation: scroll linear infinite;
  margin-top: 20px;
}

.marquee__item {
  max-height: 60px;
  margin-right: 20px;
  transition: transform 0.2s ease-in-out;
  padding: 6px;
}

.marquee__item:hover {
  transform: scale(1.1);
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(calc(-100% - var(--gap)));
  }
}
</style>
