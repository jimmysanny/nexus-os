import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  // We define the router variable
  productFile: f({ pdf: { maxFileSize: "32MB", maxFileCount: 1 }, image: { maxFileSize: "8MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

// THE FIX: We explicitly export the TYPE (Capitalized) based on the variable
export type OurFileRouter = typeof ourFileRouter;