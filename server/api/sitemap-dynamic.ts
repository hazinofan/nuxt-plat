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

    // Convert blogs to sitemap format
    const blogRoutes = blogs.map((blog: any) => ({
      loc: `/blogs/${blog.slug}`,
      lastmod: new Date().toISOString(),
      images: blog.coverImage ? [{ loc: blog.coverImage }] : [],  
    }));

    // Convert products to sitemap format
    const productRoutes = products.map((product: any) => ({
      loc: `/products/${product.slug}`,
      lastmod: new Date().toISOString(),
      images: product.photos ? [{ loc: product.photos }] : [],
    }));

    return [...blogRoutes, ...productRoutes];
  } catch (error) {
    console.error("Error fetching dynamic routes:", error);
    return [];
  }
});
