import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Rotas que requerem autenticação
const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/api/subscription(.*)',
]);

// Rotas públicas (não requerem autenticação)
const isPublicRoute = createRouteMatcher([
  '/',
  '/pricing',
  '/tutorial',
  '/upload',
  '/analyze', // Mantém analyze público mas com limites
  '/auth/sign-in(.*)',
  '/auth/sign-up(.*)',
  '/api/webhooks(.*)',
]);

export default clerkMiddleware(async (auth, req) => {
  // Se é rota protegida, requer autenticação
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};