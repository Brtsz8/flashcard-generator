import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFlashcards, createFlashcard } from "../services/flashcardService";
import { generateFlashcards } from "../services/aiService";

interface Flashcard {
    id: string
    question: string
    answer: string
}

export default function DeckPage() {
    const {id} = useParams();
    const deckId = id as string

    const [flashcards, setFlashcards] = useState<Flashcard[]>([])
    const [loading, setLoading] = useState(true)

    //manual flashcard form
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    //ai generation with gemini
    const [prompt, setPrompt] = useState("")
    const [generating, setGenerating] = useState(false)

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
        } finally {
            setGenerating(false)
        }
    }

    if (loading) {
        return <div>Loading...</div>
    }

    return(
        <div>
            <h1>Deck Page</h1>

            <hr/>

            <h2>Generate with AI</h2>

            <form onSubmit={handleGenerate}>
                <textarea
                    placeholder="Enter topic or notes..."
                    value={prompt}
                    onChange={(e) => setPrompt(
                        e.target.value
                    )}
                />
                <button
                    type="submit"
                    disabled={generating}
                >
                    {generating ? "Generating..." : "Generate"}
                </button>
            </form>
            
            <hr/>
            <h2>Add Flashcard</h2>

            <form onSubmit={handleCreateFlashcard}>
                <input 
                    type="text"
                    placeholder="Question"
                    value={question}
                    onChange={(e) => setQuestion(
                        e.target.value
                    )}
                />
                <textarea
                    placeholder="Answer"
                    value={answer}
                    onChange={(e) => setAnswer(
                        e.target.value
                    )}
                />

                <button type="submit">
                    Add
                </button>
            </form>

            <h2>Flashcards</h2>
            
            {flashcards.length === 0 && (
                <p>No flashcards yet</p>
            )}

            {flashcards.map(
                (flashcard) => (
                    <div
                        key={flashcard.id}
                        style={{
                            border: "1px solid gray",
                            padding: "1rem",
                            marginBottom: "1rem"
                        }}
                    >
                        <h3>{flashcard.question}</h3>
                        <p>{flashcard.answer}</p>
                    </div>    
                )
            )}
        </div>
    )
}