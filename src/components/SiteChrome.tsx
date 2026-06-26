'use client';

// ─── Site chrome — global Navbar + Footer, hidden on full-screen app routes ──

import { usePathname } from 'next/navigation';
import { type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

// Routes that render their own full-screen app shell (no global nav/footer)
const FULLSCREEN_ROUTES = ['/feed'];
// Routes that hide only the global navbar (footer stays)
const NO_NAVBAR_ROUTES = [
  '/employment-network',
  '/employment/job-seeker-dashboard',
  '/employment/employer-dashboard',
  '/employment/jobs',
  '/employment/post-job',
  '/my-profile',
  '/create-masjid-profile',
  '/create-dargah-profile',
  '/create-madrasa-profile',
  '/manage-profiles',
  '/daily-dua',
  '/donate',
];
// Dynamic routes that hide the navbar (matched by prefix, e.g. /manage-donations/:id)
const NO_NAVBAR_PREFIXES = [
  '/manage-donations',
  '/edit-masjid-profile',
  '/edit-madrasa-profile',
  '/edit-event',
];

// Prefix match — also covers nested sub-routes (e.g. /feed/masjids)
const matchesPrefix = (pathname: string, routes: string[]) =>
  routes.some((r) => pathname === r || pathname.startsWith(`${r}/`));

// Exact match — only the route itself, not its sub-routes
const matchesExact = (pathname: string, routes: string[]) => routes.includes(pathname);

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isFullscreen = matchesPrefix(pathname, FULLSCREEN_ROUTES);
  const hideNavbar =
    matchesExact(pathname, NO_NAVBAR_ROUTES) || matchesPrefix(pathname, NO_NAVBAR_PREFIXES);

  if (isFullscreen) return <>{children}</>;

  return (
    <>
      {!hideNavbar && <Navbar />}
      <main id="main-content" className="min-h-screen">
        {children}
      </main>
      <Footer />
    </>
  );
}
