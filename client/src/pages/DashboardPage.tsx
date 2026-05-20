import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import { useAuth } from "../hooks/useAuth"
import { getDecks, createDeck } from "../services/deckService"
import MainLayout from "../layouts/MainLayout"


interface Deck {
    id: string
    title: string
    description: string
}

export default function DashboardPage() {
    const navigate = useNavigate()
    const { user, logout } = useAuth()

    const [decks, setDecks] = useState<Deck[]>([])
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [loading, setLoading] = useState(true)

    //search
    const [search, setSearch] = useState("");

    //fetch decks
    useEffect(() => {
        const fetchDecks = async () => {
            try {
                const data = await getDecks()
                setDecks(data)
            }
            catch (err) {
                console.error(err)
            }
            finally {
                setLoading(false)
            }

            
        }
        fetchDecks()

    }, [])

    // create decks
    const handleCreateDeck = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        try {
            const newDeck = await createDeck(
                title,
                description
            )

            setDecks((prev) => [
                ...prev,
                newDeck
            ])

            setTitle("")
            setDescription("")
        }
        catch (err) {
            console.error(err)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const filteredDecks = decks.filter((deck) =>
        deck.title.toLowerCase().includes(
                search.toLowerCase()
            ) ||
        deck.description.toLowerCase().includes(
                search.toLowerCase()
            )
    );

    return (
        <MainLayout>
            <div className="mx-auto flex max-w-5xl flex-col gap-10">
            
                {/* Header */}
                <section className="flex flex-col gap-6 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
                    Dashboard
                    </p>

                    <h1 className="text-4xl font-bold tracking-tight text-black">
                    Welcome back, {user?.username}
                    </h1>

                    <p className="mt-3 text-gray-500">
                    Continue studying or create a new deck.
                    </p>
                </div>

                </section>
            

                {/* Create deck */}
                <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
                <div className="mb-8">
                    <h2 className="text-2xl font-semibold text-black">
                    Create Deck
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                    Organize your flashcards into focused study sets.
                    </p>
                </div>

                <form
                    onSubmit={handleCreateDeck}
                    className="flex flex-col gap-5"
                >
                    <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Deck title
                    </label>

                    <input
                        type="text"
                        placeholder="Biology Final Exam"
                        value={title}
                        onChange={(e) =>
                        setTitle(e.target.value)
                        }
                        className="
                        rounded-2xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-black
                        "
                    />
                    </div>

                    <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700">
                        Description
                    </label>

                    <textarea
                        placeholder="Add a short description..."
                        value={description}
                        onChange={(e) =>
                        setDescription(e.target.value)
                        }
                        rows={4}
                        className="
                        resize-none
                        rounded-2xl
                        border
                        border-gray-300
                        px-4
                        py-3
                        outline-none
                        transition
                        placeholder:text-gray-400
                        focus:border-black
                        "
                    />
                    </div>

                    <div className="flex justify-end">
                    <button
                        type="submit"
                        className="
                        rounded-2xl
                        bg-black
                        px-6
                        py-3
                        text-sm
                        font-medium
                        text-white
                        transition
                        hover:opacity-90
                        "
                    >
                        Create Deck
                    </button>
                    </div>
                </form>
                </section>
                
                {/* Search */}
                <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-semibold text-black">
                    Your Decks
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                    Search and continue your study sessions.
                    </p>
                </div>

                <input
                    type="text"
                    placeholder="Search decks..."
                    value={search}
                    onChange={(e) =>
                    setSearch(e.target.value)
                    }
                    className="
                    mb-8
                    w-full
                    rounded-2xl
                    border
                    border-gray-300
                    bg-white
                    px-4
                    py-3
                    outline-none
                    transition
                    placeholder:text-gray-400
                    focus:border-black
                    "
                />

                {/* Empty states */}
                {decks.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                    <p className="text-lg font-medium text-black">
                        No decks yet
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                        Create your first deck to begin studying.
                    </p>
                    </div>
                )}

                {decks.length > 0 &&
                    filteredDecks.length === 0 && (
                    <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                        <p className="text-lg font-medium text-black">
                        No decks found
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                        Try a different search term.
                        </p>
                    </div>
                    )}

                {/* Deck grid */}
                <div className="grid gap-5 sm:grid-cols-2">
                    {filteredDecks.map((deck) => (
                    <div
                        key={deck.id}
                        onClick={() =>
                        navigate(`/deck/${deck.id}`)
                        }
                        className="
                        cursor-pointer
                        rounded-3xl
                        border
                        border-gray-200
                        bg-white
                        p-6
                        shadow-sm
                        transition
                        hover:-translate-y-1
                        hover:border-black
                        "
                    >
                        <div className="flex h-full flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-semibold text-black">
                            {deck.title}
                            </h3>

                            <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                            {deck.description || "No description"}
                            </p>
                        </div>

                        <div className="mt-6">
                            <span className="text-sm font-medium text-black">
                            Open Deck →
                            </span>
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
                </section>
                
            </div>
        </MainLayout>
    )
}