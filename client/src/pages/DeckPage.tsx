import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlashcards, createFlashcard } 
    from "../services/flashcardService";
import { generateFlashcards } from "../services/aiService";
import { useNavigate } from "react-router-dom";
import FlashcardCard from "../components/flashcards/FlashcardCard";
import type { Flashcard } from "../types/flashcard";
import MainLayout from "../layouts/MainLayout";
import toast from "react-hot-toast";
import DeckPageHeader from "../components/flashcards/DeckPageHeader";
import AIGenerateForm from "../components/flashcards/AIGenerateForm";
import CreateFlashcardForm from "../components/flashcards/CreateFlashcardForm";
import FlashcardSearch from "../components/flashcards/FlashcardSearch";

export default function DeckPage() {
    const {id} = useParams();
    const deckId = id as string

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [loading, setLoading] = useState(true)

    const navigate = useNavigate()

    //manual flashcard form
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    //ai generation with gemini
    const [prompt, setPrompt] = useState("")
    const [generating, setGenerating] = useState(false)

    //search
    const [search, setSearch] = useState("");

    //fetch flashcards
    useEffect(() => {
        const fetchFlashcards = async () => {
            try{
                const data = await getFlashcards(
                    deckId
                )

                setFlashcards(data)
            }
            catch(err){
                console.error(err)
            }
            finally{
                setLoading(false)
            }
        }

        fetchFlashcards()
    }, [deckId])

    //create flashcard
    const handleCreateFlashcard = async (
        question: string,
        answer: string
    ) => {
        try {
            const newFlashcard = await createFlashcard(
                deckId,
                question,
                answer
            )

            setFlashcards((prev) => [
                ...prev,
                newFlashcard
            ])
            toast.success("Flashcard created")
            setQuestion("")
            setAnswer("")
        }
        catch(err){
            console.error(err)
        }
    }

    //ai generate flashcard
    const handleGenerate = async (
        prompt: string
    ) => {
        try{
            setGenerating(true)
            const generated = await generateFlashcards(
                deckId,
                prompt
            )

            setFlashcards((prev) => [
                ...prev,
                ...generated
            ])

            setPrompt("")            
            toast.success("Flashcards generated")
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong! Try again")
        } finally {
            setGenerating(false)

        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    const filteredFlashcards = flashcards.filter((flashcard) =>
        flashcard.question.toLowerCase().includes(
                search.toLowerCase()
            ) ||
        flashcard.answer.toLowerCase().includes(
                search.toLowerCase()
            )
    );

    return(
        <MainLayout>
        <div className="mx-auto flex max-w-5xl flex-col gap-10">
            
            {/* Header */}
            <DeckPageHeader onStudy={() => navigate(`/deck/${id}/study`)}/>

            {/* AI Generation */}
            <AIGenerateForm generating={generating} onGenerate={handleGenerate}/>

            {/* Manual creation */}
            <CreateFlashcardForm onCreate={handleCreateFlashcard}/>

            {/* Search */}
            <section>
            <div className="mb-6">
                <h2 className="text-2xl font-semibold text-black">
                Your Flashcards
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                Search through your deck.
                </p>
            </div>

            <FlashcardSearch value={search} onChange={setSearch}/>

            {/* Empty state */}
            {flashcards.length === 0 && (
                <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                <p className="text-lg font-medium text-black">
                    No flashcards yet
                </p>

                <p className="mt-2 text-sm text-gray-500">
                    Create your first flashcard to
                    begin studying.
                </p>
                </div>
            )}

            {/* Search empty state */}
            {flashcards.length > 0 &&
                filteredFlashcards.length === 0 && (
                <div className="rounded-3xl border border-dashed border-gray-300 p-12 text-center">
                    <p className="text-lg font-medium text-black">
                    No flashcards found
                    </p>

                    <p className="mt-2 text-sm text-gray-500">
                    Try another search term.
                    </p>
                </div>
                )}

            {/* Flashcards */}
            <div className="flex flex-col gap-5">
                {filteredFlashcards.map(
                (flashcard) => (
                    <FlashcardCard
                    key={flashcard.id}
                    flashcard={flashcard}
                    onDelete={(id) =>
                        setFlashcards((prev) =>
                        prev.filter(
                            (card) =>
                            card.id !== id
                        )
                        )
                    }
                    onUpdate={(updated) =>
                        setFlashcards((prev) =>
                        prev.map((card) =>
                            card.id === updated.id
                            ? updated
                            : card
                        )
                        )
                    }
                    />
                )
                )}
            </div>
            </section>
        </div>
        </MainLayout>
    )
}