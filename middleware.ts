import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

// 1. Define Public Routes (No Login Required)
const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)', 
  '/sign-up(.*)', 
  '/f/(.*)',      // <--- Crucial: Allows public access to your funnels
  '/api/webhooks(.*)'
])

// 2. Protect Everything Else
export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request)) {
    await auth.protect()
  }
})

// 3. The Matcher (Must copy exactly)
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}