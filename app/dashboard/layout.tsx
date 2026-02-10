import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  const { userId } = await auth();

  if (!userId || !user) {
    redirect("/sign-in");
  }

  const isAdmin =
    user.emailAddresses[0].emailAddress === "jimmysanny01@gmail.com";

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <DashboardSidebar
        userName={`${user.firstName || ""} ${user.lastName || ""}`.trim()}
        userEmail={user.emailAddresses[0].emailAddress}
        isAdmin={isAdmin}
      />
      <main className="flex-1 overflow-auto pl-0 md:pl-64">
        <div className="mx-auto max-w-6xl px-6 py-8">{children}</div>
      </main>
    </div>
  );
}
