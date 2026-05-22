const express = require('express')
const prisma = require("../../config/db.js")
const authMiddleware = require('../auth/auth_middleware.js')
const ai = require('../../config/gemini.js')

const { z } = require('zod')
const { zodToJsonSchema } = require('zod-to-json-schema')

const router = express.Router()

const flashcardSchema = z.object({
    question: z.string(),
    answer: z.string()
})

const flashcardsSchema = z.array(flashcardSchema)

router.post('/generate', authMiddleware, async (req,res) => {
    const {prompt, deckId} = req.body

    try {
        if(!prompt || !deckId){
            return res.status(400).json({
                message: "Prompt and deckId required"
            })
        }

        const deck = await prisma.deck.findUnique({
            where: {
                id: deckId
            }
        })

        if(!deck){
            return res.status(404).json({
                message: "Deck Not Found"
            })
        }

        if(deck.userId !== req.user.id){
            return res.status(403).json({
                message: "Unauthorized"
            })
        }

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `
                Generate 5 flashcards about:
                ${prompt}
                Return concise study flashcards.
                Return ONLY valid JSON.

                Use EXACTLY this structure:

                [
                {
                    "question": "Question here",
                    "answer": "Answer here"
                }
                ]

                Do NOT use:
                - front/back
                - q/a
                - any other fields`,
            config: {
                responseMimeType: "application/json",
                responseSchema: zodToJsonSchema(flashcardsSchema)
            }
        })
        const flashcards = 
            flashcardsSchema.parse(JSON.parse(response.text))
        
        await prisma.flashcard.createMany({
            data: flashcards.map(card => ({
                question: card.question,
                answer: card.answer,
                deckId
            }))
        })

        return res.status(201).json(flashcards)
        
    }
    catch (err) {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router