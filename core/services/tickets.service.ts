import axios from "axios";
import environement from "../environement";

const BASE_URL = environement.ENGINE_URL;

// Retrieve token from localStorage
const getToken = (): string | null => localStorage.getItem("token");

interface Ticket {
    id: number;
    subject: string;
    message: string;
    status: string;
    created_at: string;
}

//  Create a new ticket
export const createTicket = async (userId: number, subject: string, message: string): Promise<Ticket> => {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.post<Ticket>(`${BASE_URL}/users/${userId}/tickets`, {
        subject,
        message,
    }, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

//  Delete a ticket
export const deleteTicket = async (userId: number, ticketId: number): Promise<{ message: string }> => {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.delete<{ message: string }>(`${BASE_URL}/users/${userId}/tickets/${ticketId}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};

//  Get all tickets for a user
export const getUserTickets = async (userId: number): Promise<Ticket[]> => {
    const token = getToken();
    if (!token) throw new Error("No authentication token found.");

    const response = await axios.get<Ticket[]>(`${BASE_URL}/users/${userId}/tickets`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });

    return response.data;
};
