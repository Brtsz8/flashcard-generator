import api from "../api/axios"

export const getFlashcards = async (
    deckId: string
) => {
    const response = await api.get(
        `/flashcards/${deckId}`
    )

    return response.data
}

export const createFlashcard = async (
    deckId: string,
    question: string,
    answer: string
) => {
    const response = await api.post(
        "/flashcards",
        {
            deckId,
            question,
            answer
        }
    )

    return response.data
}