import { useState } from "react"

type Props = {
    onCreate: (
        title: string,
        description: string
    ) => Promise<void>
}

export default function CreateDeckForm({
    onCreate
}: Props ) {

    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        await onCreate(title, description)
        
        setTitle("")
        setDescription("")
    }

    return(
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
                onSubmit={handleSubmit}
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
    )
}