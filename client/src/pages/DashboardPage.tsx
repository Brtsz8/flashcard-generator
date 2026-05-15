import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"
import { getDecks, createDeck } from "../services/deckService"
import MainLayout from "../layouts/MainLayout"


interface Deck {
    id: string
    title: string
    description?: string
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
            )
    );

    return (
        <MainLayout>
            <h1 className="text-4x1 font-bold">Welcome {user?.username}</h1>
            <button onClick={logout}>
                Logout
            </button>
            <hr/>

            <h2>Create Deck</h2>
            <form onSubmit={handleCreateDeck}>
                <input
                    type="text"
                    placeholder="Deck title"
                    value={title}
                    onChange={(e) =>
                        setTitle(
                            e.target.value
                        )
                    }
                />

                <textarea 
                    placeholder="Description"
                    value={description}
                    onChange={(e) =>
                        setDescription(
                            e.target.value
                        )
                    }
                />

                <button type="submit">
                    Create
                </button>

            </form>

            <hr />
                    <input
                    type="text"
                    placeholder="Search decks..."
                    value={search}
                    onChange={(e) =>
                        setSearch(
                            e.target.value
                        )
                    }
                    className="
                        w-full
                        border
                        rounded-lg
                        p-3
                        mb-6
                    "
                />
            <hr/>

            <h2>Your Decks</h2>
            
            {decks.length === 0 && (
                <p>No decks yet</p>
            )}

            {
            filteredDecks.length === 0 && (

                <p>
                    No decks found
                </p>
            )
            }

            {filteredDecks.map((deck) => (
                <div
                    key={deck.id}
                    onClick={() =>
                        navigate(`/deck/${deck.id}`)
                    }
                    style={{
                        border: "1px solid gray",
                        padding: "1rem",
                        marginBottom: "1rem",
                        cursor: "pointer"
                    }}
                >
                    <h3>{deck.title}</h3>
                    <p>{deck.description}</p>
                </div>
            ))}
        </MainLayout>
    )
}