
import { prisma } from "../src/lib/prisma"


async function seed() {
    await prisma.event.create ({
        data: {
            id: '5f731e56-22d2-4b36-9e55-8f3082c23992',
            title: 'unit submmit',
            slug: 'unit-submmit',
            details: 'evento para apaixonados por codigos',
            maximumAttendeaes: 100,
        }



    })
}
seed().then(() => {
    console.log("database seed!")
    prisma.$disconnect()
})
