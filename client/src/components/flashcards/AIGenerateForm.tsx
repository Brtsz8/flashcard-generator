import { useState } from "react"

type Props = {
    generating: boolean

    onGenerate: (
        prompt: string
    ) => Promise<void>
}

export default function AIGenerateForm({
    generating,
    onGenerate
}: Props) {
    const [prompt, setPrompt] = useState("")

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault()

        await onGenerate(prompt)

        setPrompt("")
    }

    return (
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
                onSubmit={handleSubmit}
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
    )
}