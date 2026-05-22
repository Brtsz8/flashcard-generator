const router = require("express").Router()

const authRoutes = require("../modules/auth/auth_routes.js")
const deckRoutes = require("../modules/decks/deck_routes.js")
const flashcardRoutes = require("../modules/flashcards/flashcard_routes.js")
const aiRoutes = require("../modules/ai/ai_routes.js")
const adminRoutes = require("../modules/admin/admin_routes.js")

router.use("/auth", authRoutes)
router.use("/decks", deckRoutes)
router.use("/flashcards", flashcardRoutes)
router.use("/ai", aiRoutes)
router.use("/admin", adminRoutes)

module.exports = router