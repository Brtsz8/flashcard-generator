import { useState, useEffect } from "react";
import { FaUsers, FaLayerGroup, FaTrash, FaSearch, FaInfoCircle } from "react-icons/fa";
import adminService from "../services/adminService"
import type { AdminUser, AdminDeck } from "../services/adminService";
import toast from "react-hot-toast";
import MainLayout from "../layouts/MainLayout";

export default function AdminPage() {
    const [users, setUsers] = useState<AdminUser[]>([]);
    const [decks, setDecks] = useState<AdminDeck[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<"users" | "decks">("users");
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [usersData, decksData] = await Promise.all([
                adminService.getUsers(),
                adminService.getDecks(),
            ]);
            setUsers(usersData);
            setDecks(decksData);
        } catch (error) {
            console.error("Error fetching admin data:", error);
            toast.error("Failed to load administrative data");
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteUser = async (id: string, username: string) => {
        if (!window.confirm(`Are you sure you want to delete user "${username}"? This action cannot be undone.`)) {
            return;
        }

        try {
            await adminService.deleteUser(id);
            setUsers(users.filter((u) => u.id !== id));
            toast.success(`User ${username} deleted`);
        } catch (error) {
            console.error("Error deleting user:", error);
            toast.error("Failed to delete user");
        }
    };

    const handleDeleteDeck = async (id: string, title: string) => {
        if (!window.confirm(`Are you sure you want to delete deck "${title}"?`)) {
            return;
        }

        try {
            await adminService.deleteDeck(id);
            setDecks(decks.filter((d) => d.id !== id));
            toast.success(`Deck "${title}" deleted`);
        } catch (error) {
            console.error("Error deleting deck:", error);
            toast.error("Failed to delete deck");
        }
    };

    const filteredUsers = users.filter(
        (u) =>
            u.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
            u.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredDecks = decks.filter(
        (d) =>
            d.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            d.user.username.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
            <div className="space-y-6">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                        <p className="text-gray-500">Manage users, decks, and monitor system activity.</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                                <FaUsers size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-semibold text-nowrap">Total Users</p>
                                <p className="text-2xl font-bold">{users.length}</p>
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100 flex items-center gap-3">
                            <div className="bg-purple-100 p-2 rounded-full text-purple-600">
                                <FaLayerGroup size={20} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500 uppercase font-semibold text-nowrap">Total Decks</p>
                                <p className="text-2xl font-bold">{decks.length}</p>
                            </div>
                        </div>
                    </div>
                </header>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="border-b border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-4">
                            <nav className="flex space-x-4">
                                <button
                                    onClick={() => { setActiveTab("users"); setSearchTerm(""); }}
                                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                                        activeTab === "users"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    Users
                                </button>
                                <button
                                    onClick={() => { setActiveTab("decks"); setSearchTerm(""); }}
                                    className={`px-4 py-2 font-medium rounded-lg transition-colors ${
                                        activeTab === "decks"
                                            ? "bg-blue-600 text-white"
                                            : "text-gray-600 hover:bg-gray-100"
                                    }`}
                                >
                                    Decks
                                </button>
                            </nav>
                            <div className="relative">
                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={`Search ${activeTab}...`}
                                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none w-full sm:w-64"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        {activeTab === "users" ? (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">User</th>
                                        <th className="px-6 py-3">Role</th>
                                        <th className="px-6 py-3">Joined</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredUsers.length > 0 ? (
                                        filteredUsers.map((user) => (
                                            <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{user.username}</div>
                                                    <div className="text-sm text-gray-500">{user.email}</div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                                        user.role === "ADMIN" 
                                                            ? "bg-purple-100 text-purple-700" 
                                                            : "bg-green-100 text-green-700"
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(user.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteUser(user.id, user.username)}
                                                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                                No users found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        ) : (
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-gray-700 uppercase text-xs font-semibold">
                                    <tr>
                                        <th className="px-6 py-3">Deck Title</th>
                                        <th className="px-6 py-3">Owner</th>
                                        <th className="px-6 py-3">Created</th>
                                        <th className="px-6 py-3 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    {filteredDecks.length > 0 ? (
                                        filteredDecks.map((deck) => (
                                            <tr key={deck.id} className="hover:bg-gray-50 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="font-medium text-gray-900">{deck.title}</div>
                                                    {deck.description && (
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">{deck.description}</div>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="text-sm text-gray-900">{deck.user.username}</div>
                                                    <div className="text-xs text-gray-500">{deck.user.email}</div>
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-500">
                                                    {new Date(deck.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button
                                                        onClick={() => handleDeleteDeck(deck.id, deck.title)}
                                                        className="text-red-600 hover:text-red-900 p-2 rounded-lg hover:bg-red-50 transition-colors"
                                                        title="Delete Deck"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={4} className="px-6 py-10 text-center text-gray-500">
                                                No decks found matching your search.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
                    <FaInfoCircle className="text-blue-600 mt-1 flex-shrink-0" />
                    <div className="text-sm text-blue-800">
                        <p className="font-semibold">Administrator Notice</p>
                        <p>Deleting a user will also remove all their associated decks and flashcards. Deleting a deck will remove all flashcards within that deck. These actions are permanent.</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
