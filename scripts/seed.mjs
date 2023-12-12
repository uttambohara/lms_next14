import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.category.createMany({
    data: [
      { name: "Computer Science" },
      { name: "Engineering" },
      { name: "Fitness" },
      { name: "Accounting" },
      { name: "Filming" },
      { name: "Photography" },
      { name: "Cooking" },
    ],
  });
}

main()
  .then(async () => await prisma.$disconnect())
  .catch(async (err) => {
    console.log(err);
    await prisma.$disconnect();
  });
