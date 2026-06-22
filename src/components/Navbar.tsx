'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  BookOpen,
  Heart,
  ScrollText,
  Briefcase,
  HandCoins,
  Phone,
  Info,
  Home,
  UserCircle2,
  LayoutDashboard,
  Landmark,
  Sparkles,
  GraduationCap,
  FolderKanban,
  Settings,
  LogOut,
} from 'lucide-react';
import Logo from './Logo';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';

const ISLAMIC_CONTENT_LINKS = [
  { href: '/daily-dua', label: 'Daily Duas', icon: BookOpen, desc: 'Authentic duas for every moment' },
  { href: '/darood-shareef', label: 'Darood Shareef', icon: Heart, desc: 'Salutations upon the Prophet' },
  { href: '/hadees', label: 'Hadees', icon: ScrollText, desc: 'Sayings of the Prophet' },
];

const NAV_LINKS = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/about-us', label: 'About', icon: Info },
  { href: '/employment-network', label: 'Employment', icon: Briefcase },
  { href: '/donate', label: 'Donate', icon: HandCoins },
  { href: '/contact', label: 'Contact', icon: Phone },
];

const ACCOUNT_LINKS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/my-profile', label: 'My Profile', icon: UserCircle2 },
  { href: '/create-masjid-profile', label: 'Create Masjid Profile', icon: Landmark },
  { href: '/create-dargah-profile', label: 'Create Dargah Profile', icon: Sparkles },
  { href: '/create-madrasa-profile', label: 'Create Madrasa Profile', icon: GraduationCap },
  { href: '/manage-profiles', label: 'Manage Profiles', icon: FolderKanban },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoggedIn, user, isHydrated, logout } = useAuth();
  const { toast } = useToast();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const dropdownTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accountRef = useRef<HTMLDivElement | null>(null);

  const handleLogout = () => {
    setAccountOpen(false);
    setMobileOpen(false);
    logout();
    toast('You have been logged out. See you soon, InshaAllah!', 'success');
    router.push('/');
  };

  const transparentAtTop = pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
    setAccountOpen(false);
  }, [pathname]);

  // Close account dropdown when clicking outside
  useEffect(() => {
    if (!accountOpen) return;
    const onClick = (e: MouseEvent) => {
      if (accountRef.current && !accountRef.current.contains(e.target as Node)) {
        setAccountOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, [accountOpen]);

  const solid = scrolled || !transparentAtTop || mobileOpen;

  const openDropdown = () => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setDropdownOpen(true);
  };
  const closeDropdownDelayed = () => {
    dropdownTimer.current = setTimeout(() => setDropdownOpen(false), 150);
  };

  const linkColor = solid ? 'text-heading hover:text-primary' : 'text-white/90 hover:text-white';
  const isActive = (href: string) => (href === '/' ? pathname === '/' : pathname.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid
          ? 'border-b border-card-border/60 bg-white/85 shadow-sm backdrop-blur-xl'
          : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <Logo light={!solid} />

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.slice(0, 2).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkColor} ${
                  isActive(link.href) ? (solid ? 'text-primary' : 'text-gold-light') : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}

          {/* Islamic Content dropdown */}
          <li className="relative" onMouseEnter={openDropdown} onMouseLeave={closeDropdownDelayed}>
            <button
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkColor}`}
              aria-expanded={dropdownOpen}
              aria-haspopup="menu"
              onClick={() => setDropdownOpen((v) => !v)}
            >
              Islamic Content
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-200 ${dropdownOpen ? 'rotate-180' : ''}`}
                aria-hidden
              />
            </button>
            <AnimatePresence>
              {dropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.98 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full w-72 -translate-x-1/2 pt-3"
                  role="menu"
                >
                  <div className="overflow-hidden rounded-2xl border border-card-border bg-white p-2 shadow-card-hover">
                    {ISLAMIC_CONTENT_LINKS.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        className="flex items-start gap-3 rounded-xl px-3 py-3 transition-colors hover:bg-primary-50"
                      >
                        <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary-50 text-primary">
                          <item.icon width={18} height={18} aria-hidden />
                        </span>
                        <span>
                          <span className="block text-sm font-semibold text-heading">
                            {item.label}
                          </span>
                          <span className="block text-xs text-body">{item.desc}</span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>

          {NAV_LINKS.slice(2).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${linkColor} ${
                  isActive(link.href) ? (solid ? 'text-primary' : 'text-gold-light') : ''
                }`}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right: auth CTA */}
        <div className="flex items-center gap-3">
          {isHydrated && isLoggedIn && user ? (
            <div ref={accountRef} className="relative hidden lg:block">
              <button
                onClick={() => setAccountOpen((v) => !v)}
                aria-expanded={accountOpen}
                aria-haspopup="menu"
                aria-label="Account menu"
                className="flex items-center gap-2 rounded-full border border-card-border bg-white py-1.5 pl-2 pr-3 shadow-card transition-shadow hover:shadow-card-hover"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-gradient text-sm font-bold text-white">
                  {user.fullName.charAt(0).toUpperCase()}
                </span>
                <span className="max-w-[120px] truncate text-sm font-medium text-heading">
                  {user.fullName.split(' ')[0]}
                </span>
                <ChevronDown
                  className={`h-4 w-4 text-body transition-transform duration-200 ${accountOpen ? 'rotate-180' : ''}`}
                  aria-hidden
                />
              </button>
              <AnimatePresence>
                {accountOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute right-0 top-full w-64 pt-3"
                    role="menu"
                  >
                    <div className="overflow-hidden rounded-2xl border border-card-border bg-white p-2 shadow-card-hover">
                      <div className="border-b border-card-border px-3 pb-2.5 pt-1.5">
                        <p className="truncate text-sm font-semibold text-heading">{user.fullName}</p>
                        <p className="truncate text-xs text-body">
                          {user.countryCode} {user.mobile}
                        </p>
                      </div>
                      <div className="py-1">
                        {ACCOUNT_LINKS.map((item) => (
                          <Link
                            key={item.href}
                            href={item.href}
                            role="menuitem"
                            onClick={() => setAccountOpen(false)}
                            className="flex min-h-[40px] items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-heading transition-colors hover:bg-primary-50 hover:text-primary"
                          >
                            <item.icon className="h-4 w-4 text-primary" aria-hidden />
                            {item.label}
                          </Link>
                        ))}
                        <button
                          role="menuitem"
                          onClick={() => {
                            setAccountOpen(false);
                            toast('Settings — coming soon', 'info');
                          }}
                          className="flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-heading transition-colors hover:bg-primary-50 hover:text-primary"
                        >
                          <Settings className="h-4 w-4 text-primary" aria-hidden />
                          Settings
                        </button>
                      </div>
                      <div className="border-t border-card-border pt-1">
                        <button
                          role="menuitem"
                          onClick={handleLogout}
                          className="flex min-h-[40px] w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-danger transition-colors hover:bg-red-50"
                        >
                          <LogOut className="h-4 w-4" aria-hidden />
                          Logout
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Link
              href="/onboarding"
              className="hidden min-h-[44px] items-center rounded-full bg-primary px-6 text-sm font-medium text-white shadow-card transition-all hover:bg-primary-hover hover:shadow-card-hover lg:inline-flex"
            >
              Login / Get Started
            </Link>
          )}

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            className={`flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden ${
              solid ? 'text-heading hover:bg-ivory' : 'text-white hover:bg-white/10'
            }`}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-16 z-40 bg-dark-emerald/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32 }}
              className="fixed bottom-0 right-0 top-16 z-50 w-[300px] max-w-[85vw] overflow-y-auto border-l border-card-border bg-white shadow-card-hover lg:hidden"
            >
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.05, delayChildren: 0.08 } },
                }}
                className="flex flex-col gap-1 p-4"
              >
                {[...NAV_LINKS.slice(0, 2), ...ISLAMIC_CONTENT_LINKS, ...NAV_LINKS.slice(2)].map(
                  (link) => (
                    <motion.li
                      key={link.href}
                      variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                    >
                      <Link
                        href={link.href}
                        className={`flex min-h-[48px] items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors ${
                          isActive(link.href)
                            ? 'bg-primary-50 text-primary'
                            : 'text-heading hover:bg-ivory'
                        }`}
                      >
                        <link.icon className="h-5 w-5 text-primary" aria-hidden />
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
                <motion.li
                  variants={{ hidden: { opacity: 0, x: 24 }, show: { opacity: 1, x: 0 } }}
                  className="mt-3 border-t border-card-border pt-4"
                >
                  {isHydrated && isLoggedIn && user ? (
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 px-4 pb-2">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-gradient text-sm font-bold text-white">
                          {user.fullName.charAt(0).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-heading">{user.fullName}</p>
                          <p className="truncate text-xs text-body">{user.countryCode} {user.mobile}</p>
                        </div>
                      </div>
                      {ACCOUNT_LINKS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="flex min-h-[44px] items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-primary-50"
                        >
                          <item.icon className="h-5 w-5 text-primary" aria-hidden />
                          {item.label}
                        </Link>
                      ))}
                      <button
                        onClick={() => toast('Settings — coming soon', 'info')}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-heading transition-colors hover:bg-primary-50"
                      >
                        <Settings className="h-5 w-5 text-primary" aria-hidden />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex min-h-[44px] w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-medium text-danger transition-colors hover:bg-red-50"
                      >
                        <LogOut className="h-5 w-5" aria-hidden />
                        Logout
                      </button>
                    </div>
                  ) : (
                    <Link
                      href="/onboarding"
                      className="flex min-h-[48px] items-center justify-center rounded-full bg-primary px-4 py-3 text-sm font-medium text-white"
                    >
                      Login / Get Started
                    </Link>
                  )}
                </motion.li>
              </motion.ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
