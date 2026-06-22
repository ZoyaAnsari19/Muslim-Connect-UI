'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  MapPin,
  Phone,
  Mail,
  Send,
  Heart,
} from 'lucide-react';
import Logo from './Logo';
import { useToast } from '@/context/ToastContext';

const QUICK_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about-us', label: 'About Us' },
  { href: '/employment-network', label: 'Employment Network' },
  { href: '/donate', label: 'Donate' },
  { href: '/contact', label: 'Contact' },
  { href: '/onboarding', label: 'Join the Community' },
];

const CONTENT_LINKS = [
  { href: '/daily-dua', label: 'Daily Duas' },
  { href: '/darood-shareef', label: 'Darood Shareef' },
  { href: '/hadees', label: 'Hadees Collection' },
];

const SOCIALS = [
  { label: 'Facebook', icon: Facebook, href: 'https://facebook.com' },
  { label: 'Instagram', icon: Instagram, href: 'https://instagram.com' },
  { label: 'Twitter', icon: Twitter, href: 'https://twitter.com' },
  { label: 'YouTube', icon: Youtube, href: 'https://youtube.com' },
];

export default function Footer() {
  const { toast } = useToast();
  const [email, setEmail] = useState('');

  const onSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast('Please enter a valid email address', 'error');
      return;
    }
    setEmail('');
    toast('Subscribed! JazakAllah Khair for joining us.');
  };

  return (
    <footer className="pattern-overlay-light relative bg-dark-emerald text-white/80">
      <div className="relative mx-auto max-w-7xl px-4 pb-8 pt-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <section aria-label="About Muslim Connect">
            <Logo light />
            <p className="mt-4 text-sm leading-relaxed">
              Connecting the global Muslim community — discover masjids, dargahs &amp; madrasas,
              network with professionals, and find barakah-filled opportunities.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Muslim Connect on ${s.label}`}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-all hover:scale-105 hover:bg-gold hover:text-dark-emerald"
                >
                  <s.icon className="h-4.5 w-4.5" width={18} height={18} aria-hidden />
                </a>
              ))}
            </div>
          </section>

          {/* Quick Links */}
          <nav aria-label="Quick links">
            <h3 className="mb-4 font-heading text-base font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block text-sm transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Islamic Content */}
          <nav aria-label="Islamic content links">
            <h3 className="mb-4 font-heading text-base font-semibold text-white">
              Islamic Content
            </h3>
            <ul className="space-y-2.5">
              {CONTENT_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="inline-block text-sm transition-colors hover:text-gold-light"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="arabic-text mt-6 !text-lg text-gold-light/80" lang="ar">
              وَتَعَاوَنُوا عَلَى الْبِرِّ وَالتَّقْوَىٰ
            </p>
            <p className="mt-1 text-xs italic text-white/50">
              &ldquo;And cooperate in righteousness and piety&rdquo; — 5:2
            </p>
          </nav>

          {/* Contact + Newsletter */}
          <section aria-label="Contact and newsletter">
            <h3 className="mb-4 font-heading text-base font-semibold text-white">Stay Connected</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-light" aria-hidden />
                Mohammed Ali Road, Mumbai, Maharashtra 400003
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-gold-light" aria-hidden />
                <a href="tel:+919820012345" className="hover:text-gold-light">
                  +91 98200 12345
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gold-light" aria-hidden />
                <a href="mailto:salaam@muslimconnect.app" className="hover:text-gold-light">
                  salaam@muslimconnect.app
                </a>
              </li>
            </ul>
            <form onSubmit={onSubscribe} className="mt-5">
              <label htmlFor="newsletter-email" className="mb-2 block text-xs font-medium uppercase tracking-wider text-white/60">
                Newsletter
              </label>
              <div className="flex overflow-hidden rounded-full border border-white/15 bg-white/10 focus-within:border-gold/60">
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="min-h-[44px] w-full bg-transparent px-4 text-sm text-white placeholder:text-white/40 focus:outline-none"
                />
                <button
                  type="submit"
                  aria-label="Subscribe to newsletter"
                  className="flex min-w-[48px] items-center justify-center bg-gold text-dark-emerald transition-colors hover:bg-gold-light"
                >
                  <Send className="h-4 w-4" aria-hidden />
                </button>
              </div>
            </form>
          </section>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Muslim Connect. All rights reserved.</p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="h-3.5 w-3.5 fill-gold text-gold" aria-hidden /> for the
            Ummah
          </p>
        </div>
      </div>
    </footer>
  );
}
