import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Safe upsert ensuring we match the current schema
  const funnelId = "cm50aaaaaaaaaaaaa00000000"; // Dummy ID
  
  await prisma.funnel.upsert({
    where: { id: funnelId },
    update: {
      name: "The Ultimate Guide (Seeded)", // Fixed: Was productName
      price: 1000,
      description: "A sample product to test the flow.",
      published: true
    },
    create: {
      id: funnelId,
      userId: "user_2q...", // Placeholder user
      name: "The Ultimate Guide (Seeded)", // Fixed: Was productName
      price: 1000,
      description: "A sample product to test the flow.",
      published: true,
      category: "E-book"
    }
  });
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