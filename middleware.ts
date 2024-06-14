import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// const isDashboardRoute = createRouteMatcher(["/dashboard(.*)"]);
// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
//define public route
//(.*)  this will catch all routes with either sign -in or signup
const isPublicRoute = createRouteMatcher(["/sign-up(.*)", "/sign-in(.*)", "/"]);
export default clerkMiddleware((auth, req) => {
  //if its not a public route protect it
  if (!isPublicRoute(req)) auth().protect();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
