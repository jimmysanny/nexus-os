import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const funnelId = "cm50aaaaaaaaaaaaa00000000"; 
  await prisma.funnel.upsert({
    where: { id: funnelId },
    update: {
      name: "The Ultimate Guide (Seeded)", // Fixed: Matches schema
      price: 1000,
      description: "A sample product.",
      published: true
    },
    create: {
      id: funnelId,
      userId: "user_2q...", 
      name: "The Ultimate Guide (Seeded)", 
      price: 1000,
      description: "A sample product.",
      published: true,
      category: "E-book"
    }
  });
}
main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });