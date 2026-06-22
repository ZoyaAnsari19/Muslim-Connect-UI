'use client';

import { useState, type FormEvent } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock4, Send } from 'lucide-react';
import { Input, Textarea } from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import SectionHeading from '@/components/ui/SectionHeading';
import PageTransition from '@/components/PageTransition';
import { useToast } from '@/context/ToastContext';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const INITIAL: ContactForm = { name: '', email: '', phone: '', subject: '', message: '' };

const INFO_CARDS = [
  {
    icon: MapPin,
    title: 'Visit Us',
    lines: ['Mohammed Ali Road,', 'Mumbai, Maharashtra 400003'],
  },
  {
    icon: Phone,
    title: 'Call Us',
    lines: ['+91 98200 12345', 'Mon–Sat, 10 AM – 7 PM'],
  },
  {
    icon: Mail,
    title: 'Email Us',
    lines: ['salaam@muslimconnect.app', 'support@muslimconnect.app'],
  },
  {
    icon: Clock4,
    title: 'Response Time',
    lines: ['We reply within 24 hours,', 'inshaAllah'],
  },
];

export default function ContactPage() {
  const { toast } = useToast();
  const [form, setForm] = useState<ContactForm>(INITIAL);
  const [errors, setErrors] = useState<Partial<ContactForm>>({});
  const [submitting, setSubmitting] = useState(false);

  const set = (key: keyof ContactForm, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const validate = (): boolean => {
    const e: Partial<ContactForm> = {};
    if (form.name.trim().length < 3) e.name = 'Please enter your name (min 3 characters)';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Please enter a valid email';
    if (form.phone && !/^\+?\d{7,13}$/.test(form.phone.replace(/[\s-]/g, '')))
      e.phone = 'Please enter a valid phone number';
    if (form.subject.trim().length < 3) e.subject = 'Please enter a subject';
    if (form.message.trim().length < 10) e.message = 'Message should be at least 10 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setForm(INITIAL);
      toast('Message sent! We will get back to you within 24 hours, inshaAllah.');
    }, 1200);
  };

  return (
    <PageTransition>
      {/* Hero */}
      <section className="pattern-overlay-light relative bg-emerald-gradient px-4 pb-16 pt-36 text-center sm:pb-20 sm:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative mx-auto max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-gold-light">
            Get in Touch
          </span>
          <h1 className="mt-5 font-heading text-4xl font-bold text-white sm:text-5xl">
            We&rsquo;d Love to <span className="text-gold-light">Hear From You</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-base text-white/75">
            Questions, suggestions, or want to register your masjid? Send us a message.
          </p>
        </motion.div>
      </section>

      <section className="bg-ivory py-16 sm:py-20" aria-label="Contact form and information">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 sm:px-6 lg:grid-cols-5 lg:px-8">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <form
              onSubmit={onSubmit}
              noValidate
              className="rounded-3xl border border-card-border bg-white p-6 shadow-card sm:p-10"
            >
              <h2 className="font-heading text-2xl font-bold text-heading">Send a Message</h2>
              <p className="mt-1 text-sm text-body">
                Fill in the form and our team will respond promptly.
              </p>

              <div className="mt-7 grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  id="contact-name"
                  label="Full Name"
                  required
                  placeholder="Your name"
                  value={form.name}
                  onChange={(e) => set('name', e.target.value)}
                  error={errors.name}
                />
                <Input
                  id="contact-email"
                  label="Email"
                  required
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={(e) => set('email', e.target.value)}
                  error={errors.email}
                />
                <Input
                  id="contact-phone"
                  label="Phone"
                  type="tel"
                  placeholder="+91 98XXXXXXXX (optional)"
                  value={form.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  error={errors.phone}
                />
                <Input
                  id="contact-subject"
                  label="Subject"
                  required
                  placeholder="How can we help?"
                  value={form.subject}
                  onChange={(e) => set('subject', e.target.value)}
                  error={errors.subject}
                />
              </div>
              <div className="mt-5">
                <Textarea
                  id="contact-message"
                  label="Message"
                  required
                  placeholder="Write your message here…"
                  value={form.message}
                  onChange={(e) => set('message', e.target.value)}
                  error={errors.message}
                />
              </div>

              <Button type="submit" size="lg" loading={submitting} className="mt-7 w-full sm:w-auto">
                <Send className="h-4 w-4" aria-hidden />
                {submitting ? 'Sending…' : 'Send Message'}
              </Button>
            </form>
          </motion.div>

          {/* Side panel */}
          <motion.aside
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.12 }}
            className="space-y-5 lg:col-span-2"
            aria-label="Contact information"
          >
            <div className="grid grid-cols-1 gap-4 xs:grid-cols-2">
              {INFO_CARDS.map((card) => (
                <motion.div
                  key={card.title}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 24 }}
                  className="rounded-2xl border border-card-border bg-white p-5 shadow-card hover:shadow-card-hover"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary-50 text-primary">
                    <card.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <h3 className="mt-3 font-heading text-sm font-bold text-heading">{card.title}</h3>
                  {card.lines.map((line) => (
                    <p key={line} className="mt-0.5 break-words text-xs leading-relaxed text-body">
                      {line}
                    </p>
                  ))}
                </motion.div>
              ))}
            </div>

            {/* Decorative map */}
            <div className="relative h-64 overflow-hidden rounded-2xl border border-card-border shadow-card">
              <Image
                src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop"
                alt="Decorative map showing our location area in Mumbai"
                fill
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-dark-emerald/30" aria-hidden />
              <span className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
                <motion.span
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white shadow-card-hover"
                >
                  <MapPin className="h-5 w-5" aria-hidden />
                </motion.span>
                <span className="rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-heading shadow-card">
                  Mumbai HQ
                </span>
              </span>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Bottom heading filler */}
      <section className="bg-white py-16 text-center" aria-label="Closing note">
        <SectionHeading
          eyebrow="Always Here"
          title="Your Feedback Builds This Platform"
          subtitle="Every suggestion from the community shapes Muslim Connect. JazakAllah Khair for helping us serve better."
        />
      </section>
    </PageTransition>
  );
}
