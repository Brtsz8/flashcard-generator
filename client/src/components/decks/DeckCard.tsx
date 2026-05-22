import { useNavigate } from "react-router-dom"

type Props = {
    id: string
    title: string
    description: string
}

export default function DeckCard({
    id,
    title,
    description
}: Props) {
    const navigate = useNavigate()

    return (
        <div
            key={id}
            onClick={() =>
            navigate(`/deck/${id}`)
            }
            className="
            cursor-pointer
            rounded-3xl
            border
            border-gray-200
            bg-white
            p-6
            shadow-sm
            transition
            hover:-translate-y-1
            hover:border-black
            "
        >
            <div className="flex h-full flex-col justify-between">
            <div>
                <h3 className="text-xl font-semibold text-black">
                {title}
                </h3>

                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
                {description || "No description"}
                </p>
            </div>

            <div className="mt-6">
                <span className="text-sm font-medium text-black">
                Open Deck →
                </span>
            </div>
            </div>
        </div>
    )
}