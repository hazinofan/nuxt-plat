import axios from "axios";

// Define the base URL for the backend API
const BASE_URL = `http://localhost:3001/products`;

// Get the token from localStorage
const getAuthToken = () => localStorage.getItem("token");

// Add a new product
export const addProduct = async (productData) => {
  try {
    console.log("Sending payload to API:", productData); // Log payload
    const response = await axios.post(`${BASE_URL}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    });
    console.log("API response:", response.data); // Log response
    return response.data;
  } catch (error) {
    console.error("Error in addProduct service:", error);
    console.error("Error details:", error.response?.data); // Log backend error message
    throw error; // Re-throw the error for the calling function to handle
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
