import { createUploadthing, type FileRouter } from "uploadthing/next";
 
const f = createUploadthing();
 
export const ourFileRouter = {
  // Define as many endpoints as you want here
  productFile: f({ 
    pdf: { maxFileSize: "32MB", maxFileCount: 1 },
    image: { maxFileSize: "4MB", maxFileCount: 1 },
    video: { maxFileSize: "64MB", maxFileCount: 1 },
    text: { maxFileSize: "4MB", maxFileCount: 1 },
    blob: { maxFileSize: "8MB", maxFileCount: 1 }
  })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata);
      console.log("file url", file.url);
      return { uploadedBy: "user" };
    }),
} satisfies FileRouter;
 
export type OurFileRouter = typeof ourFileRouter;