<script setup>
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "#imports";
import { getBlogBySlug } from "~/core/services/blogs.services";
import Navbar from "~/components/navbar.vue";
import AOS from "aos";
import { NuxtLink } from "#components";

const route = useRoute();
const slug = route.params.slug;
const blog = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch blog by slug
const fetchBlog = async () => {
  try {
    const response = await getBlogBySlug(slug);
    blog.value = response;
  } catch (err) {
    error.value = "Failed to fetch the blog post. Please try again later.";
  } finally {
    loading.value = false;
  }
};

// ✅ Computed Meta Tags (Ensures `useHead` Waits for Data)
const pageTitle = computed(() => blog.value?.title || "Blog - Platinium IPTV");
const pageDescription = computed(
  () =>
    blog.value?.excerpt ||
    "Découvrez les dernières actualités et tendances IPTV sur Platinium IPTV."
);
const pageAuthor = computed(() => blog.value?.author || "Platinium IPTV");
const pageImage = computed(
  () =>
    blog.value?.coverImage ||
    "https://platinium-iptv.com/images/default-thumbnail.jpg"
);
const pageUrl = computed(
  () => `https://platinium-iptv.com/blogs/${blog.value?.slug || slug}`
);

useHead(() => ({
  title: pageTitle.value,
  meta: [
    { name: "description", content: pageDescription.value },
    {
      name: "keywords",
      content:
        "IPTV, abonnement IPTV, blog IPTV, tendances IPTV, streaming, chaînes TV en ligne, IPTV premium, VOD",
    },
    { name: "author", content: pageAuthor.value },
    { name: "robots", content: "index, follow" },

    // Open Graph / Facebook Meta Tags
    { property: "og:title", content: pageTitle.value },
    { property: "og:description", content: pageDescription.value },
    { property: "og:image", content: pageImage.value },
    { property: "og:url", content: pageUrl.value },
    { property: "og:type", content: "article" },

    // Twitter Card Meta Tags
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: pageTitle.value },
    { name: "twitter:description", content: pageDescription.value },
    { name: "twitter:image", content: pageImage.value },
  ],
  link: [
    { rel: "canonical", href: pageUrl.value },
    { rel: "preconnect", href: "https://your-api.com" },
    {
      rel: "preconnect",
      href: "https://cdn.example.com",
      crossorigin: "anonymous",
    },
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },
    { rel: "dns-prefetch", href: "https://your-api.com" },
    { rel: "dns-prefetch", href: "https://cdn.example.com" },
    { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
  ],
}));

onMounted(() => {
  fetchBlog();
  AOS.init();
});
</script>


<template>
  <NuxtLayout name="support">
    <article
      class="max-w-4xl px-6 pb-24 mx-auto space-y-12 dark:bg-gray-100 dark:text-gray-900"
    >
      <Navbar />
      <div
        v-if="loading"
        class="text-center text-lg font-semibold text-gray-600 dark:text-gray-400"
      >
        Loading blog...
      </div>
      <div
        v-else-if="error"
        class="text-center text-red-500 font-medium"
        data-aos="fade-down"
        data-aos-delay="400"
      >
        {{ error }}
      </div>
      <div v-else>
        <NuxtLink
          to="/blogs"
          class="relative inline-flex items-center justify-center px-8 py-2.5 overflow-hidden tracking-tighter text-white bg-gray-800 rounded-md group"
        >
          <span
            class="absolute w-0 h-0 transition-all duration-500 ease-out bg-orange-600 rounded-full group-hover:w-56 group-hover:h-56"
          ></span>
          <span class="absolute bottom-0 left-0 h-full -ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-auto h-full opacity-100 object-stretch"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M0 .3c67 2.1 134.1 4.3 186.3 37 52.2 32.7 89.6 95.8 112.8 150.6 23.2 54.8 32.3 101.4 61.2 149.9 28.9 48.4 77.7 98.8 126.4 149.2H0V.3z"
              ></path>
            </svg>
          </span>
          <span class="absolute top-0 right-0 w-12 h-full -mr-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="object-cover w-full h-full"
              viewBox="0 0 487 487"
            >
              <path
                fill-opacity=".1"
                fill-rule="nonzero"
                fill="#FFF"
                d="M487 486.7c-66.1-3.6-132.3-7.3-186.3-37s-95.9-85.3-126.2-137.2c-30.4-51.8-49.3-99.9-76.5-151.4C70.9 109.6 35.6 54.8.3 0H487v486.7z"
              ></path>
            </svg>
          </span>
          <span
            class="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-200"
          ></span>
          <span class="relative text-base font-semibold">Retourner a la page des blogs</span>
        </NuxtLink>

        <div class="w-full mx-auto space-y-4 text-center">
          <img :src="blog.coverImage" alt="blog.title" />
          <h1 class="text-4xl font-bold leading-tight md:text-5xl font-oswald">
            {{ blog.title }}
          </h1>
        </div>
        <Divider />
        <div
          class="blog-content dark:text-gray-800 font-roboto"
          v-html="blog.content"
        ></div>
        <Divider />
        <p class="justify-self-center text-2xl text-black mt-10">
          POUR LES MEILLEURS ABONNEMENTS IPTV EN 2025 VISITEZ
          <nuxt-link
            to="/produits"
            class="text-purple-500 underline hover:text-purple-900"
            style="justify-content: center"
          >
            ABONNEMENTS PLATINIUM-IPTV
          </nuxt-link>
        </p>
      </div>
    </article>
  </NuxtLayout>
</template>

<style>
/* Increase text size for better readability */
.blog-content {
  font-size: 1.3rem !important;
  line-height: 1.8 !important;
  color: #000 !important; /* Force black text */
}

/* Ensure headings are larger */
.blog-content h1 {
  font-size: 2.5rem;
  font-weight: bold;
}

.blog-content h2 {
  font-size: 2rem;
  font-weight: bold;
}

.blog-content h3 {
  font-size: 1.75rem;
  font-weight: bold;
}

/* Make paragraphs stand out */
.blog-content p {
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.blog-content ol {
  list-style-type: decimal !important;
  padding-left: 2rem !important;
  color: #000 !important;
}

/* Ensure bullet points are round dots */
.blog-content ul {
  list-style-type: disc !important;
  padding-left: 2rem !important;
  color: #000 !important;
}

/* Ensure list items inherit black color */
.blog-content li {
  font-size: 1.3rem !important;
  margin-bottom: 0.5rem !important;
  color: #000 !important;
}

/* Remove Quill's default numbering styles */
.blog-content ol,
.blog-content ul {
  list-style: revert !important; /* Resets to browser default */
  padding-left: 2rem !important;
}

/* Ensure black text everywhere */
.blog-content,
.blog-content p,
.blog-content li,
.blog-content ol,
.blog-content ul {
  font-size: 1.3rem !important;
  color: #000 !important;
  line-height: 1.8 !important;
}

/* Fix list item numbering */
.blog-content ol > li::marker {
  color: #000 !important;
  font-size: 1.3rem !important;
  font-weight: bold !important;
}

/* Reapply necessary styling */
.blog-content {
  font-family: inherit !important;
  font-size: 1.3rem !important;
  color: #000 !important;
  line-height: 1.8 !important;
}

/* Reset ordered list (numbered) and unordered list (bullets) */
.blog-content ol,
.blog-content ul {
  list-style: revert !important; /* Restores normal browser numbering */
  padding-left: 2rem !important;
}

/* Remove Quill's custom list numbering/bullet styling */
.blog-content li::before {
  content: none !important; /* Removes Quill's `::before` */
}

/* Ensure default numbering is black and correct */
.blog-content ol > li::marker,
.blog-content ul > li::marker {
  color: #000 !important; /* Ensure black text */
  font-size: 1.3rem !important;
  font-weight: bold !important;
}

.blog-content.dark\:text-gray-800 {
  place-items: flex-start;
}

.blog-content a {
  color: #6b46c1 !important;
  text-decoration: underline;
}

.blog-content a:hover {
  color: #4c2885 !important;
}

/* Dark Mode Fix */
.dark .blog-content a {
  color: #a78bfa !important;
}

.dark .blog-content a:hover {
  color: #d8b4fe !important;
}
</style>
