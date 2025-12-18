import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { url: string } }) {
  // Use 'url' here to match the new folder name [url]
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.url },
  });

  if (!funnel) return notFound();

  return <PublicFunnelView funnel={funnel} />;
}