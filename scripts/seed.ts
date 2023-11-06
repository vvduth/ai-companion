// this is pure node js , no relation to anything to next
const {PrismaClient} = require("@prisma/client")

const db = new PrismaClient(); 

async function main() {
    try {
        await db.category.createMany({
            data: [
                {name: "MMA fighters"},
                {name: "Muay Thai fighters"},
                {name: "BJJ specialists"},
                {name: "Movies stars"},
                {name: "Musicians"},
                {name: "Scientists"},
                {name: "Wresting specialist"},
                {name: "Karate martial artists"},
                {name: "Taekwondo martial artists"},
            ]
        })
    } catch (error) {
        console.error("Error seeding default categories ", error)
    } finally {
        await db.$disconnect();
    }
}

main();