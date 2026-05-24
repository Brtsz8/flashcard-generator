import { useState } from "react"

type Props = {
    onCreate: (
        question: string,
        answer: string
    ) => Promise<void>
}

export default function CreateFlashcardForm({
    onCreate
}: Props) {
    const [question, setQuestion] = useState("")
    const [answer, setAnswer] = useState("")

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        await onCreate(question,answer)

        setQuestion("")
        setAnswer("")
    }

    return (
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
                onSubmit={handleSubmit}
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
    )
}