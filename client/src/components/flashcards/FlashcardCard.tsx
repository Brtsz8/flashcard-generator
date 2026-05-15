import { useState } from "react"
import { updateFlashcard, deleteFlashcard } 
    from "../../services/flashcardService"
import toast from "react-hot-toast"

interface Flashcard {
    id: string
    question: string
    answer: string
    deckId: string
}

interface Props {
    flashcard: Flashcard

    onDelete: (flashcardId: string) => void
    onUpdate: (updatedFlashcard: Flashcard) => void
}

export default function FlashcardCard({
    flashcard,
    onDelete,
    onUpdate
}: Props) {
    const [editing, setEditing] = useState(false)
    const [question, setQuestion] = useState(flashcard.question)
    const [answer, setAnswer] = useState(flashcard.answer)

    const handleSave = async () => {
        try{
            const updated = await updateFlashcard(
                flashcard.id,
                question,
                answer
            )

            onUpdate(updated)
            toast.success("Flashcard saved")
            setEditing(false)
        }
        catch(err)
        {
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    const handleDelete = async () => {
        try{
            await deleteFlashcard(
                flashcard.id
            )
            onDelete(flashcard.id)
            toast.success("Flashcard deleted")
        }
        catch(err){
            console.error(err)
            toast.error("Something went wrong!")
        }
    }

    return (
        <div
            className="
                border
                rounded-xl
                p-6
                shadow-sm
                bg-white
                mb-4
            "
        >
            {editing ? (
                <div className="space-y-4">
                    <input
                        className="
                            w-full
                            border
                            rounded-lg
                            p-2
                        "
                        value={question}
                        onChange={(e) =>
                            setQuestion(
                                e.target.value
                            )
                        }
                    />
                    <textarea
                        className="
                            w-full
                            border
                            rounded-lg
                            p-2
                        "
                        value={answer}
                        onChange={(e) =>
                            setAnswer(
                                e.target.value
                            )
                        }
                    />
                    <div className="flex gap-2">
                        <button
                            className="
                                bg-black
                                text-white
                                px-4
                                py-2
                                rounded-lg
                            "
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button 
                            className="
                                border
                                px-4
                                py-2
                                rounded-lg
                            "
                            onClick={() =>
                                setEditing(false)
                            }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            ) : (
                <div>
                    <h3
                        className="
                            text-xl
                            font-semibold
                        "
                    >
                        {flashcard.question}
                    </h3>
                    <p className="mt-2">
                        {flashcard.answer}
                    </p>
                    <div
                        className="
                            flex
                            gap-2
                            mt-4
                        "
                    >
                        <button 
                            className="
                                border
                                px-4
                                py-2
                                rounded-lg
                            "
                            onClick={() => 
                                setEditing(true)
                            }
                        >
                            Edit
                        </button>
                        <button
                            className="
                                bg-red-500
                                text-white
                                px-4
                                py-2
                                rounded-lg
                            "
                            onClick={handleDelete}
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}

        </div>

    )
}