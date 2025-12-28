const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("?? Finalizing Database Inventory...");
  
  // Clear old data safely
  try { await prisma.funnel.deleteMany(); } catch(e) {}

  const userId = "user_mock_admin"; 

  await prisma.funnel.create({
    data: { userId, name: "The Ultimate Influencer Kit", headline: ["Become an Influencer"], description: "Complete guide + templates.", price: 2500.00, currency: "KES", published: true, category: "Guide" }
  });
  await prisma.funnel.create({
    data: { userId, name: "SaaS Starter Template", headline: ["Launch Your App"], description: "Production-ready Next.js boilerplate.", price: 15000.00, currency: "KES", published: true, category: "Template" }
  });
  await prisma.funnel.create({
    data: { userId, name: "Nairobi Real Estate List", headline: ["Prime Investment Deals"], description: "Curated list of high-yield properties.", price: 5000.00, currency: "KES", published: true, category: "Data" }
  });

  console.log("? INVENTORY LIVE: 3 Products Added.");
}

main().catch((e) => { console.error(e); }).finally(async () => { await prisma.$disconnect(); });
