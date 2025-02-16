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
      "/assets/movie1.jpg",
      "/assets/movie2.jpg",
      "/assets/movie3.jpg",
      "/assets/movie4.png",
      "/assets/movie5.png",
      "/assets/movie7.png",
      "/assets/movie8.png",
      "/assets/movie9.png",
      "/assets/movie10.png",
      "/assets/movie11.png",
      "/assets/movie12.png",
      "/assets/movie13.png",
      "/assets/movie14.png",
    ],
  },
  speed: {
    type: Number,
    default: 10, 
  },
});

// ✅ Precompute alt texts using a computed property
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

<style scoped>
.marquee {
  width: 100vw;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.marquee__content {
  flex-shrink: 0;
  display: flex;
  justify-content: flex-start;
  min-width: 100%;
  animation: scroll linear infinite;
  align-items: center;
}

.marquee__item {
  height: 350px; /* Adjusted height */
  width: 250px; /* Fixed width for all images */
  object-fit: cover; /* Ensures uniform size without distortion */
  margin: 0; /* No gaps between images */
  padding: 0;
}

@keyframes scroll {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
