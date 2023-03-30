import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const victor = await prisma.user.upsert({
    where: { email: "victor@example.com" },
    update: {},
    create: {
      email: "victor@example.com",
      username: "Victor",
    },
  });

  const account = await prisma.account.create({
    data: {
      name: "Victor's account",
      user: {
        connect: {
          email: "victor@example.com",
        },
      },
    },
  });

  console.log({ victor, account });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
