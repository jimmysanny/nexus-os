import { auth } from "@clerk/nextjs/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};

export const ourFileRouter = {
  // CHANGED: 'pdf' -> 'blob'. This allows HTML, ZIP, and other formats.
  productFile: f({ 
    image: { maxFileSize: "8MB", maxFileCount: 1 },
    blob: { maxFileSize: "32MB", maxFileCount: 1 } 
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;