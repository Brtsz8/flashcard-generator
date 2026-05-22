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

// interface Flashcard {
//     id: string
//     question: string
//     answer: string
// }

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
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault() //this blocks basic reload on form after submit, now its just react working

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
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

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
        } catch (err) {
            console.error(err)
            toast.error("Something went wrong! Try again")
        } finally {
            setGenerating(false)
            toast.success("Flashcards generated")
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
            <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                <p className="mb-2 text-sm uppercase tracking-widest text-gray-400">
                    Deck
                </p>

                <h1 className="text-4xl font-bold tracking-tight text-black">
                    Flashcards
                </h1>

                <p className="mt-3 text-gray-500">
                    Review, create and generate flashcards.
                </p>
                </div>

                <button
                onClick={() =>
                    navigate(`/deck/${id}/study`)
                }
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
                Start Study Mode
                </button>
            </div>
            </section>

            {/* AI Generation */}
            <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-black">
                Generate with AI
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                Paste notes, topics or summaries and
                generate flashcards automatically.
                </p>
            </div>

            <form
                onSubmit={handleGenerate}
                className="flex flex-col gap-5"
            >
                <textarea
                placeholder="Enter topic or notes..."
                value={prompt}
                onChange={(e) =>
                    setPrompt(e.target.value)
                }
                rows={6}
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

                <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={generating}
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
                    disabled:cursor-not-allowed
                    disabled:opacity-50
                    "
                >
                    {generating
                    ? "Generating..."
                    : "Generate Flashcards"}
                </button>
                </div>
            </form>
            </section>

            {/* Manual creation */}
            <section className="rounded-3xl border border-gray-200 bg-white p-8 shadow-sm">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold text-black">
                Add Flashcard
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                Create flashcards manually.
                </p>
            </div>

            <form
                onSubmit={handleCreateFlashcard}
                className="flex flex-col gap-5"
            >
                <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">
                    Question
                </label>

                <input
                    type="text"
                    placeholder="Enter question..."
                    value={question}
                    onChange={(e) =>
                    setQuestion(e.target.value)
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
                    Answer
                </label>

                <textarea
                    placeholder="Enter answer..."
                    value={answer}
                    onChange={(e) =>
                    setAnswer(e.target.value)
                    }
                    rows={5}
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
                    border
                    border-black
                    px-6
                    py-3
                    text-sm
                    font-medium
                    transition
                    hover:bg-gray-100
                    "
                >
                    Add Flashcard
                </button>
                </div>
            </form>
            </section>

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

            <input
                type="text"
                placeholder="Search flashcards..."
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