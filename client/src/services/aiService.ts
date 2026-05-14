import api from "../api/axios"

export const generateFlashcards = async (
    deckId: string,
    prompt: string
) => {
    const response = await api.post(
        "/ai/generate",
        {
            deckId,
            prompt
        }
    )

    return response.data
}