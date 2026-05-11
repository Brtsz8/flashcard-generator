const express = require('express')
const prisma = require('../../config/db.js')
const  authMiddleware = require('../auth/auth_middleware.js')

const router = express.Router()

router.post('/', authMiddleware, async (req, res) => {
    //body contains only title and description for now
    const {title, description} = req.body
    console.log(req.body)
    try {
        const deck = await prisma.deck.create({
            data: {
                title,
                description,
                userId: req.userId
            }
        })
        res.status(201).json(deck)
    }
    catch(err) {
        console.log(err.message)
        res.sendStatus(500)
    }

})

router.get('/', authMiddleware, async (req,res) => {
    try {
        const userDecks = await prisma.deck.findMany({
            where: {
                userId: req.userId
            }
        })

        res.json(userDecks)
    }
    catch(err) {
        console.log(err.message)
        res.sendStatus(500)
    }
})

module.exports = router