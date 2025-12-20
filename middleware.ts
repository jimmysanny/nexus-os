import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define routes that do NOT require a password
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)", 
  "/sign-up(.*)",
  "/api/uploadthing(.*)", // <--- THIS IS THE KEY FIX
  "/thank-you(.*)"        // Allow users to see the Thank You page
]);

export default clerkMiddleware(async (auth, req) => {
  // If it is a public route, let them pass
  if (isPublicRoute(req)) {
    return;
  }
  // Otherwise, protect the route
  await auth.protect();
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
