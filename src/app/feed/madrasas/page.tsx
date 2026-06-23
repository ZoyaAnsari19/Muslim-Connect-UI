import type { Metadata } from 'next';
import RegistryView from '@/components/feed/RegistryView';
import { MADRASAS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Registered Madrasas' };

export default function MadrasasPage() {
  return (
    <RegistryView
      eyebrow="Community Directory"
      title="Registered Madrasas"
      subtitle="Islamic institutions offering Quran, Aalim, and Tajweed courses — discover programs and admissions."
      unit="Madrasas"
      items={MADRASAS}
    />
  );
}
