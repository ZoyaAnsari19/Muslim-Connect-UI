// ─── Muslim Connect — Central Type Definitions ───────────────────────────────
// Shared across Part 1 (public pages) and Part 2 (authenticated dashboards).

export type ListingCategory = 'masjid' | 'dargah' | 'madrasa' | 'professional';

export interface Review {
  id: string;
  author: string;
  rating: number; // 1–5
  comment: string;
  date: string;
}

export interface BaseListing {
  id: string;
  category: ListingCategory;
  name: string;
  area: string;
  city: string;
  state: string;
  image: string;
  verified: boolean;
  rating: number;
  reviews: Review[];
  services: string[];
  description: string;
  phone?: string;
}

export interface Masjid extends BaseListing {
  category: 'masjid';
  nextPrayer: { name: string; time: string };
  capacity?: number;
}

export interface Dargah extends BaseListing {
  category: 'dargah';
  saintName: string;
  ursDate?: string;
}

export interface Madrasa extends BaseListing {
  category: 'madrasa';
  courses: string[];
  students?: number;
}

export interface Professional {
  id: string;
  category: 'professional';
  name: string;
  profession: string;
  professionCategory: ProfessionCategory;
  area: string;
  city: string;
  state: string;
  avatar: string;
  rating: number;
  reviews: Review[];
  services: string[];
  description: string;
  verified: boolean;
  experienceYears: number;
}

export type Listing = Masjid | Dargah | Madrasa;
export type FeaturedItem = Listing | Professional;

// ─── Professions (Onboarding Step 3) ─────────────────────────────────────────

export type ProfessionCategory =
  | 'Religious'
  | 'Medical'
  | 'Engineering'
  | 'Business'
  | 'Education'
  | 'Other';

export interface ProfessionGroup {
  category: ProfessionCategory;
  professions: string[];
}

// ─── Auth / User ──────────────────────────────────────────────────────────────

export interface SocialLinks {
  instagram?: string;
  facebook?: string;
  website?: string;
}

export interface User {
  id: string;
  mobile: string;
  countryCode: string;
  fullName: string;
  gender: 'male' | 'female';
  dob: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  professions: string[]; // includes religious roles — important for Part 2
  socialLinks: SocialLinks;
  avatar?: string;
  createdAt: string;
}

// ─── Islamic Content ──────────────────────────────────────────────────────────

export type DuaCategory =
  | 'Morning'
  | 'Evening'
  | 'Before Eating'
  | 'After Eating'
  | 'Travel'
  | 'Sleep'
  | 'Entering Home';

export interface Dua {
  id: string;
  category: DuaCategory;
  title: string;
  arabic: string;
  transliteration: string;
  englishMeaning: string;
  hindiMeaning: string;
  reference?: string;
}

export interface Darood {
  id: string;
  title: string;
  arabic: string;
  transliteration: string;
  translation: string;
  virtue?: string;
}

export interface Hadees {
  id: string;
  arabic: string;
  translation: string;
  narrator: string;
  book: string;
  reference: string;
  category: string;
}

// ─── Employment (MCEN) ────────────────────────────────────────────────────────

export type JobTag = 'Urgent' | 'Religious' | 'Remote' | 'Full-time' | 'Part-time' | 'On-site';

export interface Job {
  id: string;
  title: string;
  organization: string;
  location: string;
  salary: string;
  type: JobTag[];
  skills: string[];
  description: string;
  postedDaysAgo: number;
  applicants: number;
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  quote: string;
  rating: number;
}

export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix?: string;
}

export interface DonationCategory {
  id: string;
  title: string;
  description: string;
  icon: string; // lucide icon name resolved at render
  image: string;
}

// ═══════════════════════════════════════════════════════════════════════════════
// PART 2 — Authenticated experience types
// ═══════════════════════════════════════════════════════════════════════════════

// ─── Institution CRUD (user-owned profiles) ──────────────────────────────────

export type InstitutionType = 'masjid' | 'dargah' | 'madrasa';

export type MasjidKind = 'Jama Masjid' | 'Local Masjid' | 'Eidgah';
export type ImamFiqh =
  | 'Imam Abu Hanifa'
  | 'Malik ibn Anas'
  | 'Ahmad ibn Hanbal'
  | "Shafi'i";
export type MasjidSect =
  | 'Deobandi'
  | 'Barelvi'
  | 'Sufi'
  | 'Shia Ithna Ashari'
  | 'Ismaili'
  | 'Bohra'
  | 'Khoja'
  | 'Ahmadiyya'
  | 'Other';
export type VerificationRole = 'Trustee' | 'Community Member';

export interface PrayerTimes {
  fajr: string;
  dhuhr: string;
  asr: string;
  maghrib: string;
  isha: string;
}

export interface OwnedProfile {
  id: string;
  type: InstitutionType;
  name: string;
  // Address
  country: string;
  state: string;
  city: string;
  area: string;
  pincode: string;
  image: string; // data-URL from upload or fallback stock image
  verified: boolean;
  createdAt: string;
  description?: string;
  // Masjid-specific
  masjidKind?: MasjidKind;
  imamFiqh?: ImamFiqh;
  sect?: MasjidSect;
  prayerTimes?: PrayerTimes;
  verificationRole?: VerificationRole;
  // Dargah-specific
  ursDate?: string;
  caretaker?: string; // Sajjada Nashin
  // Madrasa-specific
  courses?: string[];
  studentCapacity?: number;
  hostelAvailable?: boolean;
}

// ─── Events management ────────────────────────────────────────────────────────

export interface ManagedEvent {
  id: string;
  profileId: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  description: string;
  banner?: string;
  active: boolean;
  attendees: number;
  createdAt: string;
}

// ─── Donation campaigns ───────────────────────────────────────────────────────

export type CampaignStatus = 'Active' | 'Paused' | 'Closed';

export interface DonationCampaign {
  id: string;
  profileId: string;
  title: string;
  target: number; // ₹
  raised: number; // ₹
  donors: number;
  deadline: string; // ISO date
  description: string;
  image?: string;
  status: CampaignStatus;
  createdAt: string;
}

// ─── User services & reviews ──────────────────────────────────────────────────

export interface UserService {
  id: string;
  title: string;
  description: string;
  priceRange: string;
  active: boolean;
}

export interface ReceivedReview extends Review {
  reply?: string;
}

// ─── Employment (Part 2) ──────────────────────────────────────────────────────

export type JobCategory =
  | 'Religious'
  | 'IT'
  | 'Education'
  | 'Healthcare'
  | 'Business'
  | 'Other';

export type PostedJobStatus = 'Active' | 'Closed';

export interface PostedJob extends Job {
  category: JobCategory;
  status: PostedJobStatus;
  postedByUser: boolean;
}

export type ApplicationStatus = 'Applied' | 'Shortlisted' | 'Interview' | 'Rejected';

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  organization: string;
  status: ApplicationStatus;
  appliedDate: string;
}

export interface Applicant {
  id: string;
  name: string;
  jobTitle: string;
  experience: string;
  location: string;
  appliedDaysAgo: number;
  avatar: string;
}

// ─── Community feed ───────────────────────────────────────────────────────────

export type FeedPostType = 'announcement' | 'professional' | 'event';

export interface FeedComment {
  id: string;
  author: string;
  text: string;
  timeAgo: string;
}

export interface FeedPost {
  id: string;
  type: FeedPostType;
  authorName: string;
  authorMeta: string; // e.g. "Jama Masjid Noorani · Mumbai"
  avatar?: string;
  image?: string;
  content: string;
  likes: number;
  comments: FeedComment[];
  timeAgo: string;
  /** Optional link to an existing FEATURED_ITEMS listing — opens DetailModal */
  linkedListingId?: string;
}

// ─── Dashboard misc ───────────────────────────────────────────────────────────

export interface RecentDonationProject {
  id: string;
  title: string;
  raised: number;
  target: number;
  donors: number;
}
