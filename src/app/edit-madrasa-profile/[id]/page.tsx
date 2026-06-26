'use client';

import { useParams } from 'next/navigation';
import EditInstitutionPage from '@/components/institutions/EditInstitutionPage';

export default function EditMadrasaProfilePage() {
  const { id } = useParams<{ id: string }>();
  return <EditInstitutionPage type="madrasa" profileId={id} flushTop />;
}
