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
                deckId: req.deckId
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

    }
    catch(err){
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router