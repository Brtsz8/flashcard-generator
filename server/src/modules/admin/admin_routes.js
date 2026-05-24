const express = require("express")
const prisma =  require("../../config/db.js")
const requireAdmin = require("./admin_middleware.js")
const authMiddleware = require("../auth/auth_middleware.js")

const router = express.Router()
router.use(authMiddleware,requireAdmin)

// USERS
router.get("/users", async (req, res) => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            username: true,
            role: true,
            createdAt: true
        }
    })

    res.json(users)
    
})

router.delete("/users/:id", async (req, res) => {

    const { id } = req.params

    await prisma.user.delete({
        where: { id }
    })

    res.json({message:"User deleted"})   
})

// DECKS

router.get(
    "/decks",
    async (req, res) => {
        const decks =
            await prisma.deck.findMany({
                include: {
                    user: {
                        select: {

                            id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            });

        res.json(decks);
    }
);

router.delete(
    "/decks/:id",
    async (req, res) => {

        const { id } = req.params;

        await prisma.deck.delete({
            where: { id }
        });

        res.json({
            message:
                "Deck deleted"
        });
    }
);

module.exports = router