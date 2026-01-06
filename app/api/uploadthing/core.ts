import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@clerk/nextjs/server"; 
 
const f = createUploadthing();
 
const handleAuth = async () => {
  const { userId } = await auth(); // FIX: Added await here
  if (!userId) throw new Error("Unauthorized");
  return { userId };
};
 
export const ourFileRouter = {
  productFile: f({ 
    image: { maxFileSize: "16MB", maxFileCount: 1 },
    pdf: { maxFileSize: "16MB", maxFileCount: 1 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 }
  })
    .middleware(async () => await handleAuth())
    .onUploadComplete(() => {})
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;