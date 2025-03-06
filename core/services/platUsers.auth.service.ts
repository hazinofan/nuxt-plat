import axios from "axios";
import environement from "../environement";

const BASE_URL = environement.ENGINE_URL;

// Retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Register a new user
export const registerUser = async (userData: any) => {
    const response = await axios.post(`${BASE_URL}/users/register`, userData, {
        headers: {
            "Content-Type": "application/json",
        },
    });
    return response.data;
};

// ✅ Login user
export const loginUser = async (email: any, password: any) => {
    const response = await axios.post(`${BASE_URL}/users/login`, { email, password }, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    // Store token in localStorage
    if (response.data.access_token) {
        localStorage.setItem("token", response.data.access_token);
    }

    return response.data;
};

// ✅ Logout user (remove token)
export const logoutUser = () => {
    localStorage.removeItem("token");
};

// ✅ Get current authenticated user profile
export const getUserProfile = async () => {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}/users/profile`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

export const createOrder = async (userId: any, totalPrice: any, products: any) => {
    const token = getToken();
    

    if (!token) {
        throw new Error("Unauthorized: No token found.");
    }

    const response = await axios.post(
        `${BASE_URL}/users/${userId}/orders`,
        {
            total_price: totalPrice,
            products: products
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        }
    );

    return response.data;
};

export const updateUserInfo = async (userId:any, updatedData:any) => {
    const token = localStorage.getItem("token");

    if (!token) {
        throw new Error("Unauthorized: No token found.");
    }

    const response = await axios.patch(`${BASE_URL}/users/${userId}/update`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
        },
    });

    return response.data;
};

// ✅ Check if user is authenticated
export const isAuthenticated = () => {
    return !!getToken(); // Returns true if token exists
};
