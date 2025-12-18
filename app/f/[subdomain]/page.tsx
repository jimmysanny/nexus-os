import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { subdomain: string } }) {
  // Look up the funnel in the DB by its subdomain
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.subdomain },
  });

  if (!funnel) return notFound();

  return <PublicFunnelView funnel={funnel} />;
}
