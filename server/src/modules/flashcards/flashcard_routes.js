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

router.delete("/:id",authMiddleware, async (req,res) => {
    const {id} = req.params

    try {
        const flashcard = await prisma.flashcard.findUnique({
            where : { id },
            include : {deck: true}  //prisma doesnt include relations if we dont specify it
        })

        if(!flashcard) {
            return res.status(404).json({
                message: "Flashcard not found"
            })
        }

        //chech if user is authorized to delete this flashcard
        if(req.userId !== flashcard.deck.userId) {
            return res.status(403).json({
                messege: "User can't delete this flashcard (Unauthorized)"
            })
        }

        await prisma.flashcard.delete({
            where: {id}
        })

        res.status(200).json({
            message: "Flashcard deleted"
        })
    }
    catch(err)
    {
        console.error(err)
        res.sendStatus(500)
    }
})

router.put("/:id",authMiddleware, async (req,res) => {
    const {id} = req.params
    const {question, answer} = req.body

    try {
        const flashcard = await prisma.flashcard.findUnique({
            where : { id },
            include : {deck: true}  //prisma doesnt include relations if we dont specify it
        })

        if(!flashcard) {
            return res.status(404).json({
                message: "Flashcard not found"
            })
        }

        //chech if user is authorized to delete this flashcard
        if(req.userId !== flashcard.deck.userId) {
            return res.status(403).json({
                messege: "User can't delete this flashcard (Unauthorized)"
            })
        }

        const updated = await prisma.flashcard.updated({
            where: {id},
            data: {
                question,
                answer
            }
        })

        res.json(updated)
    }
    catch(err)
    {
        console.error(err)
        res.sendStatus(500)
    }
})

module.exports = router