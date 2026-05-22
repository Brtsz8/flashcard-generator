import DeckCard from "./DeckCard"

interface Deck {
    id: string,
    title: string,
    description: string
}

type Props = {
    decks: Deck[]
}

export default function DeckGrid({
    decks
}: Props) {
    return(
        <div className="grid gap-5 sm:grid-cols-2">
            {decks.map((deck) => (
                <DeckCard
                    key={deck.id}
                    id={deck.id}
                    title={deck.title}
                    description={deck.description}
                />
            ))}
        </div>
    )
}