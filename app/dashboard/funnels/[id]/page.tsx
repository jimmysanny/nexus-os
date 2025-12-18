// FILE: app/dashboard/funnels/[id]/page.tsx
import { notFound, redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import { getFunnel } from "@/app/actions/funnel"; // We use your existing action
import FunnelEditor from "./_components/FunnelEditor"; // We will build this next

interface PageProps {
  params: Promise<{ id: string }>; // Updated for Next.js 15/16 syntax
}

export default async function EditorPage({ params }: PageProps) {
  // 1. Security Check (The "Bouncer")
  const { userId } = await auth();
  if (!userId) return redirect("/sign-in");

  // 2. Fetch Data (The "Bodyguard" logic is inside getFunnel)
  const resolvedParams = await params;
  const funnel = await getFunnel(resolvedParams.id);

  // 3. Handle 404
  if (!funnel) {
    return notFound();
  }

  // 4. Render the Client Component (The actual Drag & Drop Tool)
  // We pass the data down so the editor starts with the saved content
  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <FunnelEditor 
        funnelId={funnel.id} 
        initialBlocks={funnel.blocks} 
        initialName={funnel.name}
      />
    </div>
  );
}