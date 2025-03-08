<script setup>
import { ref, onMounted } from "vue";
import Navbar from "~/components/navbar.vue";
import Footer from "~/components/footer.vue";
import LoadingSpinner from "~/components/LoadingSpinner.vue";
import { getAllBlogs } from "~/core/services/blogs.services";

const blogs = ref([]);
const loading = ref(true);
const error = ref(null);

// Function to fetch blogs
const fetchBlogs = async () => {
  try {
    const response = await getAllBlogs();
    blogs.value = response;
  } catch (err) {
    error.value = "Failed to fetch blogs. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// Trim title function
const trimTitle = (title, maxLength = 50) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

const trimTitleSlug = (title, maxLength = 25) => {
  return title.length > maxLength
    ? title.substring(0, maxLength) + "..."
    : title;
};

useHead({
  title: "Blog Platinium IPTV - Actualités, Astuces et Tendances IPTV",
  meta: [
    {
      name: "description",
      content:
        "Découvrez les dernières actualités, tendances et conseils sur l'IPTV. Suivez Platinium IPTV pour des analyses approfondies et une expérience de streaming améliorée.",
    },
    {
      name: "keywords",
      content:
        "IPTV, blog IPTV, tendances IPTV, streaming, chaînes TV en ligne, IPTV France, IPTV premium, VOD",
    },
    { name: "author", content: "Platinium IPTV" },
    { name: "robots", content: "index, follow" },

    // Open Graph / Facebook
    {
      property: "og:title",
      content: "Blog Platinium IPTV - Actualités, Astuces et Tendances IPTV",
    },
    {
      property: "og:description",
      content:
        "Restez informé sur l'actualité IPTV, les tendances du streaming et les conseils pour une meilleure expérience. Explorez nos articles exclusifs.",
    },
    {
      property: "og:image",
      content: "https://platinium-iptv.com/images/blog-banner.jpg",
    },
    {
      property: "og:url",
      content: "https://platinium-iptv.com/blog",
    },
    { property: "og:type", content: "article" },

    // Twitter Card
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "Blog Platinium IPTV - Actualités, Astuces et Tendances IPTV",
    },
    {
      name: "twitter:description",
      content:
        "Découvrez les dernières actualités et tendances IPTV. Conseils, analyses et astuces pour une meilleure expérience de streaming.",
    },
    {
      name: "twitter:image",
      content: "https://platinium-iptv.com/images/blog-banner.jpg",
    },
  ],
  link: [
    { rel: "canonical", href: "https://platinium-iptv.com/blog" },
    // Preconnect to API and CDNs
    { rel: "preconnect", href: "https://your-api.com" },
    {
      rel: "preconnect",
      href: "https://cdn.example.com",
      crossorigin: "anonymous",
    },

    // Preconnect to Google Fonts (if used)
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },

    // DNS Prefetch for Fallback
    { rel: "dns-prefetch", href: "https://your-api.com" },
    { rel: "dns-prefetch", href: "https://cdn.example.com" },
    { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  ],
});

// Fetch blogs when the component is mounted
onMounted(fetchBlogs);
</script>

<template>
  <NuxtLayout name="support">
    <section class="bg-white dark:bg-gray-900">
      <Navbar />
      <!-- Title Section -->
      <div class="text-center py-10">
        <h1
          class="text-4xl font-bold text-black dark:text-white mb-4 font-oswald"
        >
          PLATINIUM BLOGS
        </h1>
        <p class="text-lg text-gray-600 dark:text-gray-400">
          Explore, discover, and find inspiration through these exciting
          journeys.
        </p>
      </div>

      <!-- Loading and Error Handling -->
      <div
        v-if="loading"
        class="text-center text-lg font-semibold text-gray-600 dark:text-gray-400"
      >
        <LoadingSpinner />
      </div>
      <div v-else-if="error" class="text-center text-red-500 font-medium">
        {{ error }}
      </div>

      <!-- Content Section -->
      <div
        v-else
        class="px-8 py-10 mx-auto lg:max-w-screen-xl sm:max-w-xl md:max-w-full sm:px-12 md:px-16 lg:py-20 sm:py-16"
      >
        <div
          class="grid gap-x-8 gap-y-12 sm:gap-y-16 md:grid-cols-2 lg:grid-cols-3"
        >
          <!-- Loop through blogs -->
          <div v-for="blog in blogs" :key="blog.slug" class="relative">
            <router-link
              :to="`/blogs/${blog.slug}`"
              class="block overflow-hidden group rounded-xl shadow-lg"
            >
              <nuxt-img
                :src="blog.coverImage || 'https://via.placeholder.com/1080'"
                :alt="blog.title"
                preload
                format="webp"
                quality="80"
                width="800"
                height="450"
                class="object-cover w-full h-56 transition-all duration-300 ease-out sm:h-64 group-hover:scale-110"
              />
            </router-link>
            <div class="relative mt-5">
              <div
                class="flex flex-row gap-5 items-center mb-5 justify-between"
              >
                <span class="text-gray-500"> PLATINIUM IPTV </span>
                <p
                  class="uppercase text-xs font-semibold mb-2.5 text-purple-800"
                >
                  {{ new Date(blog.createdAt).toLocaleDateString() }}
                </p>
              </div>
              <router-link
                :to="`/blogs/${blog.slug}`"
                class="block mb-3 hover:underline"
              >
                <h2
                  class="text-2xl font-bold leading-5 text-black dark:text-white transition-colors duration-200 hover:text-purple-700 dark:hover:text-purple-400"
                >
                  {{ trimTitle(blog.title) }}
                </h2>
              </router-link>
              <p
                class="mb-4 text-gray-700 dark:text-gray-300"
                v-html="blog.body"
              ></p>
              <router-link
                :to="`/blogs/${blog.slug}`"
                class="font-medium hover:underline text-purple-600 dark:text-purple-400 gap-2"
              >
                Lire plus sur "{{ trimTitleSlug(blog.title) }}"
                <i class="pi pi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </section>
  </NuxtLayout>
</template>
