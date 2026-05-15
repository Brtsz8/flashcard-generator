import toast from "react-hot-toast"
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

export const deleteFlashcard = async (
    flashcardId: string
) => {
    const response = await api.delete(
        `/flashcards/${flashcardId}`
    )

    return response.data
}

export const updateFlashcard = async (
    flashcardId: string,
    question: string,
    answer: string
) => {
    const response = await api.put(
        `/flashcards/${flashcardId}`,
        {
            question,
            answer
        }
    )

    return response.data
}