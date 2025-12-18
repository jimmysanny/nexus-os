import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { id: string } }) {
  // We use 'id' to please the router, but search by subdomain in the database
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.id },
  });
  if (!funnel) return notFound();
  return <PublicFunnelView funnel={funnel} />;
}
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import PublicFunnelView from "./_components/PublicFunnelView";

export default async function PublicPage({ params }: { params: { id: string } }) {
  // We use params.id because the folder is now strictly named [id]
  const funnel = await db.funnel.findUnique({
    where: { subdomain: params.id },
  });

  if (!funnel) return notFound();

  return <PublicFunnelView funnel={funnel} />;
}