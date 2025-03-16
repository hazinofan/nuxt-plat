import environement from "~/core/environement";

export default defineEventHandler(async () => {
  try {
    const apiUrl = environement.ENGINE_URL;

    // Fetch dynamic blogs
    const blogsResponse = await fetch(`${apiUrl}/blogs`);
    const blogs = await blogsResponse.json();

    // Fetch dynamic products
    const productsResponse = await fetch(`${apiUrl}/products`);
    const products = await productsResponse.json();

    // Get current date in the correct format
    const formatDate = (date: string | Date) => {
      return new Date(date).toISOString(); // ✅ Converts to valid format
    };

    // Convert blogs to sitemap format
    const blogRoutes = blogs.map((blog: any) => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: blog.updatedAt ? formatDate(blog.updatedAt) : formatDate(new Date()), // ✅ Ensure valid date
      images: blog.coverImage ? [{ loc: blog.coverImage }] : [], // Include blog images if available
    }));

    // Convert products to sitemap format
    const productRoutes = products.map((product: any) => ({
      loc: `/products/${product.slug}`,
      lastmod: product.updatedAt ? formatDate(product.updatedAt) : formatDate(new Date()), // ✅ Ensure valid date
      images: product.photos ? [{ loc: product.photos }] : [], // Include product images if available
    }));

    return [...blogRoutes, ...productRoutes];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
});
