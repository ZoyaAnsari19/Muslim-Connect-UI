'use client';

import { useParams } from 'next/navigation';
import EditInstitutionPage from '@/components/institutions/EditInstitutionPage';

export default function EditMasjidProfilePage() {
  const { id } = useParams<{ id: string }>();
  return <EditInstitutionPage type="masjid" profileId={id} />;
}
