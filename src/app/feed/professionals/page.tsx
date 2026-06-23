import type { Metadata } from 'next';
import RegistryView from '@/components/feed/RegistryView';
import { PROFESSIONALS } from '@/lib/mock-data';

export const metadata: Metadata = { title: 'Muslim Professionals' };

export default function ProfessionalsPage() {
  return (
    <RegistryView
      eyebrow="Community Directory"
      title="Muslim Professionals"
      subtitle="Trusted Muslim professionals across medical, religious, engineering, and business fields."
      items={PROFESSIONALS}
    />
  );
}
