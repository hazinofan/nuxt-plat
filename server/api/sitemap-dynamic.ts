import environement from "~/core/environement";

export default defineEventHandler(async () => {
  try {
    const apiUrl = environement.ENGINE_URL;

    // Function to format dates correctly
    const formatDate = (date: string | Date | null) => {
      if (!date) return new Date().toISOString().split("T")[0]; // Fallback to today's date if null
      return new Date(date).toISOString(); // Full ISO format
    };

    // Manually defined static pages with lastmod
    const staticRoutes = [
      { loc: "/", lastmod: formatDate(null) },
      { loc: "/blogs", lastmod: formatDate(null) },
      { loc: "/checkout", lastmod: formatDate(null) },
      { loc: "/gifts", lastmod: formatDate(null) },
      { loc: "/login", lastmod: formatDate(null) },
      { loc: "/orders", lastmod: formatDate(null) },
      { loc: "/produits", lastmod: formatDate(null) },
      { loc: "/referrals", lastmod: formatDate(null) },
      { loc: "/settings", lastmod: formatDate(null) },
      { loc: "/support", lastmod: formatDate(null) },
      { loc: "/test-gratuit", lastmod: formatDate(null) },
      { loc: "/thank-you", lastmod: formatDate(null) }
    ];

    // Fetch blogs dynamically
    const blogsResponse = await fetch(`${apiUrl}/blogs`).catch(() => null);
    const blogs = blogsResponse && blogsResponse.ok ? await blogsResponse.json() : [];

    // Fetch products dynamically
    const productsResponse = await fetch(`${apiUrl}/products`).catch(() => null);
    const products = productsResponse && productsResponse.ok ? await productsResponse.json() : [];

    // Convert blogs to sitemap format
    const blogRoutes = blogs.map((blog: any) => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt ? formatDate(blog.updatedAt) : formatDate(null),
      images: blog.coverImage ? [{ loc: blog.coverImage }] : [],
    }));

    // Convert products to sitemap format
    const productRoutes = products.map((product: any) => ({
      loc: `/products/${product.slug}`,
      lastmod: product.updatedAt ? formatDate(product.updatedAt) : formatDate(null),
      images: Array.isArray(product.photos)
        ? product.photos.map((photo: string) => ({ loc: photo }))
        : product.photos ? [{ loc: product.photos }] : [],
    }));

    return [...staticRoutes, ...blogRoutes, ...productRoutes];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
});
