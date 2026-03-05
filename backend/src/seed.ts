import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) throw new Error("DATABASE_URL is not set");

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});

async function main() {
  await prisma.user.upsert({
    where: { id: 1 },
    update: {},
    create: {
      id: 1,
      email: "user@example.com",
      passwordHash: "dummy_hash",
      name: "Test User",
    },
  });

  await prisma.wallet.upsert({
    where: { userId_currency: { userId: 1, currency: "JPY" } },
    update: {},
    create: {
      userId: 1,
      currency: "JPY",
      balance: 120000n,
    },
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
