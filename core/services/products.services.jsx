import axios from "axios";
import environement from "../environement";

const ENGINE_URL = environement.ENGINE_URL
const BASE_URL = `${ENGINE_URL}/products`;

const getAuthToken = () => localStorage.getItem("token");

export const getProductBySlug = async (productName) => {
  try {
    if (!productName || typeof productName !== "string") {
      throw new Error("Invalid product name provided for slug generation");
    }

    const slug = slugify(productName);
    const response = await axios.get(`${BASE_URL}/slug/${slug}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product by slug:", error);
    throw error;
  }
};

const slugify = (text) => {
  if (!text || typeof text !== "string") return "";
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]+/g, "");
};

// Add a new product
export const addProduct = async (productData) => {
  try {
    productData.slug = slugify(productData.name);

    console.log("Sending payload to API:", productData); 
    const response = await axios.post(`${BASE_URL}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("API response:", response.data); 
    return response.data;
  } catch (error) {
    console.error("Error in addProduct service:", error);
    console.error("Error details:", error.response?.data); 
    throw error; 
  }
};

// Delete a product by ID
export const deleteProduct = async (productId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};

// Get all products
export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

// Get a product by ID
export const getProductById = async (productId) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productId}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching product by ID:", error);
    throw error;
  }
};
