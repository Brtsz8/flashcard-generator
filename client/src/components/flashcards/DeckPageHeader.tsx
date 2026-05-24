type Props = {
     onStudy: () => void
}

export default function DeckPageHeader({
    onStudy
}: Props) {
    return (
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
                onClick={onStudy}
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
    )
}