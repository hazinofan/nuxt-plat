const API_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const login = async (email, password) => {
  try {
    const response = await fetch(`http://localhost:3001/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error("Invalid email or password");
    }

    const data = await response.json();
    localStorage.setItem("token", data.access_token);
    return data;
  } catch (error) {
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem("token");
};
