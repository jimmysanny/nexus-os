import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { id: string } }) {
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.id },
  });
  if (!funnel) return notFound();
  return <PublicFunnelView funnel={funnel} />;
}
