import api from "../api/axios"

export const getDecks = async () => {
    const response = await api.get("/decks")
    return response.data
}

export const createDeck = async (
    title: string,
    description: string
) => {
    const response = await api.post("/decks", {
        title,
        description
    })

    return response.data
}