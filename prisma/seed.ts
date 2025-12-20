import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log(" STARTING SEED...");
  
  const funnelId = "test-funnel-id";

  // Force-create the funnel
  await prisma.funnel.upsert({
    where: { id: funnelId },
    update: {
      digitalProductUrl: "https://files.edgestore.dev/sample-pdf.pdf",
      productName: "The Ultimate Guide (Seeded)",
    },
    create: {
      id: funnelId,
      userId: "user_123",
      name: "Test Funnel",
      description: "This is a seeded test funnel.",
      price: 49.99,
      headline: "Seeded Headline",
      subheadline: "Seeded Subheadline",
      published: true,
      digitalProductUrl: "https://files.edgestore.dev/sample-pdf.pdf",
      productName: "The Ultimate Guide (Seeded)",
    },
  });

  console.log("✅ DATABASE SEEDED SUCCESSFULLY!");
}

main()
  .catch((e) => {
    console.error("❌ SEED FAILED:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
