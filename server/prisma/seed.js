const {PrismaClient} = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    const user = await prisma.user.create({
        data: {
            email: "test@test.com",
            name: "Test User",
            avatar: "https://example.com/avatar.png",
        },
    })

    console.log(user)
}

main()
    .catch((e) => {
        console.error(e)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })