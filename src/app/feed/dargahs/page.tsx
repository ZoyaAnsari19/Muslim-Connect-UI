import type { Metadata } from 'next';
import RegistryView from '@/components/feed/RegistryView';
import { DARGAHS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Registered Dargahs' };

export default function DargahsPage() {
  return (
    <RegistryView
      eyebrow="Community Directory"
      title="Registered Dargahs"
      subtitle="Revered dargahs and their spiritual heritage — visit timings, urs dates, and services."
      items={DARGAHS}
    />
  );
}
