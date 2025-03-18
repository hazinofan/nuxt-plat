import environement from "~/core/environement";

export default defineEventHandler(async () => {
  try {
    const apiUrl = environement.ENGINE_URL;

    // Function to format dates correctly
    const formatDate = (date: string | Date) => {
      return new Date(date).toISOString(); // Converts to YYYY-MM-DDThh:mm:ssZ format
    };

    // Fetch blogs dynamically
    const blogsResponse = await fetch(`${apiUrl}/blogs`).catch(() => null);
    const blogs = blogsResponse && blogsResponse.ok ? await blogsResponse.json() : [];

    // Fetch products dynamically
    const productsResponse = await fetch(`${apiUrl}/products`).catch(() => null);
    const products = productsResponse && productsResponse.ok ? await productsResponse.json() : [];

    // Convert blogs to sitemap format
    const blogRoutes = blogs.map((blog: any) => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt ? formatDate(blog.updatedAt) : formatDate(new Date()), // ✅ Ensure valid date
      images: blog.coverImage ? [{ loc: blog.coverImage }] : [], // ✅ Include images correctly
    }));

    // Convert products to sitemap format
    const productRoutes = products.map((product: any) => ({
      loc: `/products/${product.slug}`,
      lastmod: product.updatedAt ? formatDate(product.updatedAt) : formatDate(new Date()), // ✅ Ensure valid date
      images: Array.isArray(product.photos)
        ? product.photos.map((photo: string) => ({ loc: photo })) // ✅ Properly handle multiple images
        : product.photos ? [{ loc: product.photos }] : [], // ✅ Single image fallback
    }));

    return [...blogRoutes, ...productRoutes];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
});
