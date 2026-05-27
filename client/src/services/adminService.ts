import axiosInstance from "../api/axios";
import type { User } from "../types/auth";

export interface AdminUser extends User {
    createdAt: string;
}

export interface AdminDeck {
    id: string;
    title: string;
    description?: string;
    createdAt: string;
    user: {
        id: string;
        username: string;
        email: string;
    };
}

const adminService = {
    getUsers: async (): Promise<AdminUser[]> => {
        const response = await axiosInstance.get("/admin/users");
        return response.data;
    },

    deleteUser: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/admin/users/${id}`);
    },

    getDecks: async (): Promise<AdminDeck[]> => {
        const response = await axiosInstance.get("/admin/decks");
        return response.data;
    },

    deleteDeck: async (id: string): Promise<void> => {
        await axiosInstance.delete(`/admin/decks/${id}`);
    },
};

export default adminService;
