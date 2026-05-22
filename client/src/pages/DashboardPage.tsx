import { useEffect, useState } from "react"

import { useAuth } from "../hooks/useAuth"
import { getDecks, createDeck } from "../services/deckService"
import MainLayout from "../layouts/MainLayout"
import DashboardHeader from "../components/decks/DashboardHeader"
import CreateDeckForm from "../components/decks/CreateDeckForm"
import DeckSearch from "../components/decks/DeckSearch"
import DeckGrid from "../components/decks/DeckGrid"


interface Deck {
    id: string
    title: string
    description: string
}

export default function DashboardPage() {
    const { user } = useAuth()

    const [decks, setDecks] = useState<Deck[]>([])
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
        title: string,
        description: string
    ) => {
        try {
            const newDeck = await createDeck(
                title,
                description
            )

            setDecks((prev) => [
                ...prev,
                newDeck
            ])
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
            
                <DashboardHeader username={user?.username}/>

                <CreateDeckForm onCreate={handleCreateDeck}/>
                
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
        
                <DeckSearch value={search} onChange={setSearch}/>

                <DeckGrid decks={filteredDecks}/>

                </section>
                
            </div>
        </MainLayout>
    )
}