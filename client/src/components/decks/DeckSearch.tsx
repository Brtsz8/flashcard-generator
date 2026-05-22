type Props = {
    value: string

    onChange: (
        value: string
    ) => void
}

export default function DeckSearch({
    value,
    onChange
}: Props) {
    return (
        <input
            type="text"
            placeholder="Search decks..."
            value={value}
            onChange={(e) =>
            onChange(e.target.value)
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
    )
}