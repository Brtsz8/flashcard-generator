const express = require('express')
const prisma = require('../../config/db.js')
const authMiddleware = require('../auth/auth_middleware.js')

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    const { question, answer, deckId } = req.body

    try {
        //check if deck exists
        const deck = await prisma.deck.findUnique({
            where: {
                id: deckId
            }
        })

        if(!deck) {
            res.status(404).json({
                message: "Deck not found"
            })
        }

        //check if user is authorized to modify this deck
        if(req.userId !== deck.userId)
        {
            res.status(403).json({
                message: "Unathorized"
            })
        }
        //create flashcard
        const flashcard = await prisma.flashcard.create({
            data: {
                question,
                answer,
                deckId
            }
        })

        res.status(201).json(flashcard)
    }
    catch(err){
        console.error(err)
        res.sendStatus(500)
    }
})

//GET flashcard for deck
router.get('/:deckId', authMiddleware, async (req,res) => {
    const {deckId} = req.params

    try {
        //check if deck exists
        const deck = await prisma.deck.findUnique({
            where : {
                id : deckId
            }
        })

        if(!deck) {
            res.status(404).json({
                message : "Deck not found"
            })
        }
        //check if user is authorized to acces this deck
        if(req.userId !== deck.userId)
        {
            res.status(403).json({
                message: "Unathorized"
            })
        }
        //get flashcards
        const flashcards = await prisma.flashcard.findMany({
            where : {
                deckId : deckId
            }
        })

        //console.log(flashcards)

        //send flashcards for this deck
        res.status(201).json(flashcards)
    }
    catch(err) {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router