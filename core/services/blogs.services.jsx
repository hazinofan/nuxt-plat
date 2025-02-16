import axios from "axios";

const BASE_URL = "http://localhost:3001";

// Retrieve token from localStorage
const getToken = () => localStorage.getItem("token");

// ✅ Upload a file
export const uploadFile = async (file) => {
    const token = getToken(); 

    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${BASE_URL}/upload`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data.url;
};

// ✅ Save a new blog
export const saveBlog = async (blogData) => {
    const token = getToken(); 

    const response = await axios.post(`${BASE_URL}/blogs`, blogData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// ✅ Get all projects
export const getAllBlogs = async () => {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}/blogs`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// ✅ Get a project by ID
export const getBlogById = async (projectId) => {
    const token = getToken();

    const response = await axios.get(`${BASE_URL}/projects/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// ✅ Delete a project by ID
export const deleteBlog = async (projectId) => {
    const token = getToken();

    const response = await axios.delete(`${BASE_URL}/blogs/${projectId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

// ✅ Update (patch) a project
export const updateProject = async (projectId, updatedData) => {
    const token = getToken();

    const response = await axios.patch(`${BASE_URL}/blogs/${projectId}`, updatedData, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
