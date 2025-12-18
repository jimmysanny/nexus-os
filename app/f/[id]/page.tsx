import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { id: string } }) {
  // We name it 'id' to please the code, but it still searches by the subdomain name
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.id },
  });
  if (!funnel) return notFound();
  return <PublicFunnelView funnel={funnel} />;
}
