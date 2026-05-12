const router = require("express").Router()

const authRoutes = require("../modules/auth/auth_routes.js")
const deckRoutes = require("../modules/decks/deck_routes.js")
const flashcardRoutes = require("../modules/flashcards/flashcard_routes.js")

router.use("/auth", authRoutes)
router.use("/decks", deckRoutes)
router.use("/flashcards", flashcardRoutes)

module.exports = router