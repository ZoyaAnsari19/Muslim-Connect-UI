// ─── Muslim Connect — Centralized Mock Data Layer ─────────────────────────────
// All mock content lives here. Part 2 dashboards will reuse these exports.

import type {
  Masjid,
  Dargah,
  Madrasa,
  Professional,
  ProfessionGroup,
  Dua,
  Darood,
  Hadees,
  Job,
  Testimonial,
  TimelineEvent,
  StatItem,
  DonationCategory,
} from './types';

// ─── Hero Slides ──────────────────────────────────────────────────────────────

export const HERO_SLIDES = [
  {
    id: 'slide-1',
    image:
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=1920&auto=format&fit=crop',
    alt: 'Grand mosque with illuminated domes at dusk',
  },
  {
    id: 'slide-2',
    image:
      'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=1920&auto=format&fit=crop',
    alt: 'Sheikh Zayed Grand Mosque white marble courtyard',
  },
  {
    id: 'slide-3',
    image:
      'https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=1920&auto=format&fit=crop',
    alt: 'Blue Mosque silhouette at golden sunset',
  },
];

// ─── Platform Stats ───────────────────────────────────────────────────────────

export const PLATFORM_STATS: StatItem[] = [
  { label: 'Masjids Registered', value: 6 },
  { label: 'Dargahs', value: 2 },
  { label: 'Madrasas', value: 3 },
  { label: 'Muslim Professionals', value: 48 },
  { label: 'Active Jobs', value: 12 },
];

export const MCEN_STATS: StatItem[] = [
  { label: 'Active Jobs', value: 12 },
  { label: 'Employers', value: 8 },
  { label: 'Applications', value: 156 },
  { label: 'Islamic Organizations', value: 5 },
];

// ─── Masjids ──────────────────────────────────────────────────────────────────

export const MASJIDS: Masjid[] = [
  {
    id: 'masjid-1',
    category: 'masjid',
    name: 'Jama Masjid Noorani',
    area: 'Mohammed Ali Road',
    city: 'Mumbai',
    state: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.8,
    nextPrayer: { name: 'Asr', time: '4:45 PM' },
    capacity: 1200,
    services: ['5 Daily Prayers', 'Jumu\u2019ah Khutbah', 'Ramadan Taraweeh', 'Nikah Services', 'Janazah Services'],
    description:
      'A historic masjid serving the community for over 80 years with daily congregational prayers, Islamic lectures, and community welfare programs.',
    phone: '+91 98200 11223',
    reviews: [
      { id: 'r1', author: 'Abdul Rahman', rating: 5, comment: 'Beautiful masjid with excellent management. The Jumu\u2019ah khutbah is always inspiring.', date: '2026-05-12' },
      { id: 'r2', author: 'Mohammed Faizan', rating: 5, comment: 'Very clean wudu area and spacious prayer hall. Alhamdulillah.', date: '2026-04-28' },
      { id: 'r3', author: 'Salim Sheikh', rating: 4, comment: 'Great community programs during Ramadan.', date: '2026-03-15' },
    ],
  },
  {
    id: 'masjid-2',
    category: 'masjid',
    name: 'Masjid-e-Aqsa',
    area: 'Shivaji Nagar',
    city: 'Pune',
    state: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1585129777188-94600bc7b4b3?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.6,
    nextPrayer: { name: 'Maghrib', time: '7:02 PM' },
    capacity: 600,
    services: ['5 Daily Prayers', 'Quran Classes', 'Youth Halaqa', 'Iftar Programs'],
    description:
      'A vibrant neighbourhood masjid known for its youth engagement programs, weekly halaqas, and Quran memorization circles.',
    phone: '+91 98500 22334',
    reviews: [
      { id: 'r4', author: 'Imran Qureshi', rating: 5, comment: 'The youth programs here changed my life. May Allah reward the committee.', date: '2026-05-02' },
      { id: 'r5', author: 'Zaid Khan', rating: 4, comment: 'Peaceful atmosphere, good parking space.', date: '2026-04-10' },
    ],
  },
  {
    id: 'masjid-3',
    category: 'masjid',
    name: 'Makkah Masjid',
    area: 'Charminar',
    city: 'Hyderabad',
    state: 'Telangana',
    image:
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.9,
    nextPrayer: { name: 'Isha', time: '8:20 PM' },
    capacity: 10000,
    services: ['5 Daily Prayers', 'Jumu\u2019ah Khutbah', 'Islamic Library', 'Heritage Tours', 'Zakat Distribution'],
    description:
      'One of the oldest and largest masjids in India, a magnificent piece of Qutb Shahi architecture welcoming thousands of worshippers daily.',
    phone: '+91 99080 33445',
    reviews: [
      { id: 'r6', author: 'Syed Akbar', rating: 5, comment: 'SubhanAllah, the architecture and spirituality of this place is unmatched.', date: '2026-05-20' },
      { id: 'r7', author: 'Farhan Ali', rating: 5, comment: 'A must-visit historic masjid. Very well maintained.', date: '2026-05-01' },
    ],
  },
  {
    id: 'masjid-4',
    category: 'masjid',
    name: 'Masjid Al-Falah',
    area: 'Frazer Town',
    city: 'Bengaluru',
    state: 'Karnataka',
    image:
      'https://images.unsplash.com/photo-1512970648279-ff3398568f77?q=80&w=800&auto=format&fit=crop',
    verified: false,
    rating: 4.4,
    nextPrayer: { name: 'Fajr', time: '5:10 AM' },
    capacity: 450,
    services: ['5 Daily Prayers', 'Weekend Madrasa', 'Marriage Bureau', 'Counselling'],
    description:
      'A modern community masjid offering family counselling services, a weekend madrasa for children, and active social welfare initiatives.',
    phone: '+91 98860 44556',
    reviews: [
      { id: 'r8', author: 'Rizwan Ahmed', rating: 4, comment: 'Good facilities for families. The weekend madrasa is excellent.', date: '2026-04-22' },
    ],
  },
  {
    id: 'masjid-5',
    category: 'masjid',
    name: 'Noor-e-Madina Masjid',
    area: 'Zakir Nagar',
    city: 'New Delhi',
    state: 'Delhi',
    image:
      'https://images.unsplash.com/photo-1574246915327-8cf501d94757?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.7,
    nextPrayer: { name: 'Dhuhr', time: '1:15 PM' },
    capacity: 800,
    services: ['5 Daily Prayers', 'Tafseer Classes', 'Free Medical Camp', 'Orphan Support'],
    description:
      'Known for its monthly free medical camps and orphan sponsorship program, this masjid is a pillar of social service in the community.',
    phone: '+91 98110 55667',
    reviews: [
      { id: 'r9', author: 'Aamir Siddiqui', rating: 5, comment: 'The free medical camps help hundreds every month. True service to humanity.', date: '2026-05-18' },
      { id: 'r10', author: 'Bilal Ansari', rating: 4, comment: 'Inspiring tafseer classes every Sunday.', date: '2026-04-05' },
    ],
  },
  {
    id: 'masjid-6',
    category: 'masjid',
    name: 'Masjid-e-Khadria',
    area: 'Nampally',
    city: 'Hyderabad',
    state: 'Telangana',
    image:
      'https://images.unsplash.com/photo-1519074069444-1ba4fff66d16?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.5,
    nextPrayer: { name: 'Asr', time: '4:50 PM' },
    capacity: 350,
    services: ['5 Daily Prayers', 'Hifz Program', 'Community Kitchen'],
    description:
      'A welcoming masjid with a full-time Hifz program and a community kitchen serving daily meals to those in need.',
    phone: '+91 99490 66778',
    reviews: [
      { id: 'r11', author: 'Yusuf Pasha', rating: 5, comment: 'The community kitchen feeds 200+ people daily. MashaAllah.', date: '2026-05-09' },
    ],
  },
];

// ─── Dargahs ──────────────────────────────────────────────────────────────────

export const DARGAHS: Dargah[] = [
  {
    id: 'dargah-1',
    category: 'dargah',
    name: 'Haji Ali Dargah',
    saintName: 'Pir Haji Ali Shah Bukhari (RA)',
    area: 'Worli',
    city: 'Mumbai',
    state: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1567157577867-05ccb1388e66?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.8,
    ursDate: '17 Rabi al-Thani',
    services: ['Ziyarat', 'Langar (Free Meals)', 'Qawwali Evenings', 'Library', 'Sanatorium'],
    description:
      'An iconic dargah situated on an islet off the coast of Worli, visited by thousands of devotees of all faiths every week.',
    phone: '+91 98200 77889',
    reviews: [
      { id: 'r12', author: 'Naseem Bano', rating: 5, comment: 'A deeply spiritual experience. The sea breeze and the dua... SubhanAllah.', date: '2026-05-14' },
      { id: 'r13', author: 'Javed Mirza', rating: 5, comment: 'Thursday qawwali evenings are soul-stirring.', date: '2026-04-30' },
    ],
  },
  {
    id: 'dargah-2',
    category: 'dargah',
    name: 'Ajmer Sharif Dargah',
    saintName: 'Khwaja Moinuddin Chishti (RA)',
    area: 'Dargah Bazaar',
    city: 'Ajmer',
    state: 'Rajasthan',
    image:
      'https://images.unsplash.com/photo-1623492701902-47dc207df5dc?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.9,
    ursDate: '6 Rajab',
    services: ['Ziyarat', 'Langar (Free Meals)', 'Urs Celebrations', 'Mehfil-e-Sama', 'Guest House'],
    description:
      'The revered dargah of Gharib Nawaz, Khwaja Moinuddin Chishti (RA), one of the most visited spiritual sites in South Asia.',
    phone: '+91 96360 88990',
    reviews: [
      { id: 'r14', author: 'Shabnam Khatoon', rating: 5, comment: 'The langar and the atmosphere of devotion is beyond words.', date: '2026-05-22' },
      { id: 'r15', author: 'Arif Hussain', rating: 5, comment: 'Visited during Urs. An unforgettable spiritual journey.', date: '2026-03-08' },
    ],
  },
];

// ─── Madrasas ─────────────────────────────────────────────────────────────────

export const MADRASAS: Madrasa[] = [
  {
    id: 'madrasa-1',
    category: 'madrasa',
    name: 'Darul Uloom Al-Hidaya',
    area: 'Byculla',
    city: 'Mumbai',
    state: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.7,
    courses: ['Aalim Course', 'Hifz-ul-Quran', 'Tajweed', 'Arabic Grammar'],
    students: 320,
    services: ['Boarding Facility', 'Scholarships', 'Library', 'Modern Curriculum Integration'],
    description:
      'A premier institution offering the complete Aalim course alongside modern education, producing scholars who serve communities worldwide.',
    phone: '+91 98200 99001',
    reviews: [
      { id: 'r16', author: 'Maulana Saeed', rating: 5, comment: 'Excellent balance of deeni and dunyawi taleem.', date: '2026-05-05' },
      { id: 'r17', author: 'Haroon Patel', rating: 4, comment: 'My son completed Hifz here. Very dedicated teachers.', date: '2026-04-12' },
    ],
  },
  {
    id: 'madrasa-2',
    category: 'madrasa',
    name: 'Madrasa Tajweed-ul-Quran',
    area: 'Kausa',
    city: 'Mumbra',
    state: 'Maharashtra',
    image:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=800&auto=format&fit=crop',
    verified: true,
    rating: 4.5,
    courses: ['Nazra Quran', 'Tajweed', 'Qirat'],
    students: 150,
    services: ['Evening Classes', 'Ladies Batch', 'Online Classes'],
    description:
      'Specialized institute for Quranic recitation with certified Qaris, offering flexible evening and online batches for all ages.',
    phone: '+91 99670 10112',
    reviews: [
      { id: 'r18', author: 'Fatima Shaikh', rating: 5, comment: 'The ladies batch timing is very convenient. Excellent Tajweed training.', date: '2026-05-11' },
    ],
  },
  {
    id: 'madrasa-3',
    category: 'madrasa',
    name: 'Jamia Islamia Arabia',
    area: 'Saharanpur Road',
    city: 'Deoband',
    state: 'Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1604480132736-44c188fe4d20?q=80&w=800&auto=format&fit=crop',
    verified: false,
    rating: 4.6,
    courses: ['Aalim Course', 'Ifta Specialization', 'Hadees Studies', 'Nazra Quran'],
    students: 540,
    services: ['Boarding Facility', 'Dar-ul-Ifta', 'Research Department'],
    description:
      'A well-established jamia offering advanced Islamic studies including Ifta specialization and Hadees research programs.',
    phone: '+91 98970 21223',
    reviews: [
      { id: 'r19', author: 'Qari Abdullah', rating: 5, comment: 'The Ifta department maintains very high academic standards.', date: '2026-04-25' },
    ],
  },
];

// ─── Professionals ────────────────────────────────────────────────────────────

export const PROFESSIONALS: Professional[] = [
  {
    id: 'prof-1',
    category: 'professional',
    name: 'Dr. Ayesha Siddiqui',
    profession: 'Gynecologist',
    professionCategory: 'Medical',
    area: 'Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    avatar: 'https://i.pravatar.cc/150?img=47',
    rating: 4.9,
    verified: true,
    experienceYears: 12,
    services: ['Consultation', 'Prenatal Care', 'Women\u2019s Health Camps'],
    description:
      'Senior gynecologist passionate about accessible women\u2019s healthcare, conducting free monthly health camps in partnership with local masjids.',
    reviews: [
      { id: 'r20', author: 'Sana Khan', rating: 5, comment: 'Very compassionate doctor. Highly recommended for sisters.', date: '2026-05-16' },
      { id: 'r21', author: 'Rukhsar Ahmed', rating: 5, comment: 'Dr. Ayesha took great care during my pregnancy.', date: '2026-04-18' },
    ],
  },
  {
    id: 'prof-2',
    category: 'professional',
    name: 'Qari Mohammed Irfan',
    profession: 'Qari',
    professionCategory: 'Religious',
    area: 'Nagpada',
    city: 'Mumbai',
    state: 'Maharashtra',
    avatar: 'https://i.pravatar.cc/150?img=12',
    rating: 4.8,
    verified: true,
    experienceYears: 18,
    services: ['Tajweed Classes', 'Qirat Training', 'Online Quran Classes'],
    description:
      'Internationally certified Qari with 18 years of teaching experience, offering Tajweed and Qirat training for children and adults.',
    reviews: [
      { id: 'r22', author: 'Adnan Shaikh', rating: 5, comment: 'My recitation improved tremendously under Qari Sahab\u2019s guidance.', date: '2026-05-08' },
    ],
  },
  {
    id: 'prof-3',
    category: 'professional',
    name: 'Faisal Khan',
    profession: 'Software Engineer',
    professionCategory: 'Engineering',
    area: 'HSR Layout',
    city: 'Bengaluru',
    state: 'Karnataka',
    avatar: 'https://i.pravatar.cc/150?img=68',
    rating: 4.7,
    verified: true,
    experienceYears: 8,
    services: ['Web Development', 'Mobile Apps', 'Tech Mentorship'],
    description:
      'Full-stack engineer at a leading tech company, mentoring Muslim youth into tech careers through free weekend bootcamps.',
    reviews: [
      { id: 'r23', author: 'Umar Farooq', rating: 5, comment: 'Faisal bhai\u2019s mentorship helped me land my first developer job!', date: '2026-05-19' },
    ],
  },
  {
    id: 'prof-4',
    category: 'professional',
    name: 'Mufti Abdul Qadir',
    profession: 'Mufti',
    professionCategory: 'Religious',
    area: 'Charminar',
    city: 'Hyderabad',
    state: 'Telangana',
    avatar: 'https://i.pravatar.cc/150?img=59',
    rating: 4.9,
    verified: true,
    experienceYears: 22,
    services: ['Fatwa Consultation', 'Islamic Finance Guidance', 'Nikah Services'],
    description:
      'Senior Mufti specializing in Islamic finance and family matters, serving as advisor to multiple Islamic organizations.',
    reviews: [
      { id: 'r24', author: 'Khalid Mohiuddin', rating: 5, comment: 'Mufti sahab explains complex masail with great clarity and patience.', date: '2026-05-03' },
    ],
  },
  {
    id: 'prof-5',
    category: 'professional',
    name: 'Sameera Ansari',
    profession: 'Chartered Accountant',
    professionCategory: 'Business',
    area: 'Koregaon Park',
    city: 'Pune',
    state: 'Maharashtra',
    avatar: 'https://i.pravatar.cc/150?img=45',
    rating: 4.6,
    verified: false,
    experienceYears: 9,
    services: ['Tax Filing', 'Zakat Calculation', 'Business Advisory'],
    description:
      'Practicing CA helping families and businesses with halal investment planning, accurate zakat calculation, and tax compliance.',
    reviews: [
      { id: 'r25', author: 'Tariq Mehmood', rating: 5, comment: 'She helped our business become fully shariah-compliant. JazakAllah.', date: '2026-04-29' },
    ],
  },
  {
    id: 'prof-6',
    category: 'professional',
    name: 'Hafiz Salman Nadwi',
    profession: 'Hafiz & Teacher',
    professionCategory: 'Religious',
    area: 'Jamia Nagar',
    city: 'New Delhi',
    state: 'Delhi',
    avatar: 'https://i.pravatar.cc/150?img=33',
    rating: 4.8,
    verified: true,
    experienceYears: 14,
    services: ['Hifz Classes', 'Arabic Language', 'Taraweeh Imam'],
    description:
      'Graduate of Nadwatul Ulama, leading Taraweeh prayers for over a decade and running an acclaimed Hifz program for children.',
    reviews: [
      { id: 'r26', author: 'Nadeem Akhtar', rating: 5, comment: 'Both my children completed Hifz under Hafiz sahab. Excellent methodology.', date: '2026-05-21' },
    ],
  },
];

// ─── Profession Groups (Onboarding Step 3) ───────────────────────────────────

export const PROFESSION_GROUPS: ProfessionGroup[] = [
  {
    category: 'Religious',
    professions: [
      'Imam',
      'Naib Imam',
      'Muazzin',
      'Trustee / Committee Member',
      'Qari',
      'Aalim',
      'Mufti',
      'Hafiz',
    ],
  },
  {
    category: 'Medical',
    professions: ['Doctor', 'Nurse', 'Pharmacist', 'Physiotherapist', 'Lab Technician'],
  },
  {
    category: 'Engineering',
    professions: ['Software Engineer', 'Civil Engineer', 'Mechanical Engineer', 'Electrical Engineer'],
  },
  {
    category: 'Business',
    professions: ['Entrepreneur', 'Retailer', 'Chartered Accountant', 'Import / Export', 'Real Estate'],
  },
  {
    category: 'Education',
    professions: ['School Teacher', 'Professor', 'Tutor', 'Madrasa Teacher'],
  },
  {
    category: 'Other',
    professions: ['Lawyer', 'Journalist', 'Designer', 'Driver', 'Tailor', 'Chef'],
  },
];

// ─── Daily Duas ───────────────────────────────────────────────────────────────

export const DUA_CATEGORIES = [
  'Morning',
  'Evening',
  'Before Eating',
  'After Eating',
  'Travel',
  'Sleep',
  'Entering Home',
] as const;

export const DUAS: Dua[] = [
  {
    id: 'dua-1',
    category: 'Morning',
    title: 'Dua upon waking up',
    arabic:
      '\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u062D\u0652\u064A\u064E\u0627\u0646\u064E\u0627 \u0628\u064E\u0639\u0652\u062F\u064E \u0645\u064E\u0627 \u0623\u064E\u0645\u064E\u0627\u062A\u064E\u0646\u064E\u0627 \u0648\u064E\u0625\u0650\u0644\u064E\u064A\u0652\u0647\u0650 \u0627\u0644\u0646\u0651\u064F\u0634\u064F\u0648\u0631\u064F',
    transliteration: 'Alhamdu lillahil-lathee ahyana ba\u2019da ma amatana wa-ilayhin-nushoor',
    englishMeaning:
      'All praise is for Allah who gave us life after having taken it from us, and unto Him is the resurrection.',
    hindiMeaning:
      '\u0938\u093E\u0930\u0940 \u092A\u094D\u0930\u0936\u0902\u0938\u093E \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u0932\u093F\u090F \u0939\u0948 \u091C\u093F\u0938\u0928\u0947 \u0939\u092E\u0947\u0902 \u092E\u093E\u0930\u0928\u0947 \u0915\u0947 \u092C\u093E\u0926 \u091C\u093F\u0928\u094D\u200D\u0926\u093E \u0915\u093F\u092F\u093E \u0914\u0930 \u0909\u0938\u0940 \u0915\u0940 \u0913\u0930 \u0932\u094C\u091F\u0928\u093E \u0939\u0948\u0964',
    reference: 'Sahih al-Bukhari 6312',
  },
  {
    id: 'dua-2',
    category: 'Morning',
    title: 'Morning remembrance',
    arabic:
      '\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u0652\u0646\u064E\u0627 \u0648\u064E\u0623\u064E\u0635\u0652\u0628\u064E\u062D\u064E \u0627\u0644\u0652\u0645\u064F\u0644\u0652\u0643\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650',
    transliteration: 'Asbahna wa-asbahal-mulku lillah, walhamdu lillah',
    englishMeaning:
      'We have reached the morning and at this very time all sovereignty belongs to Allah, and all praise is for Allah.',
    hindiMeaning:
      '\u0939\u092E\u0928\u0947 \u0938\u0941\u092C\u0939 \u0915\u0940 \u0914\u0930 \u0938\u093E\u0930\u0940 \u092C\u093E\u0926\u0936\u093E\u0939\u0924 \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0940 \u0939\u0948, \u0914\u0930 \u0938\u093E\u0930\u0940 \u0924\u093E\u0930\u0940\u092B\u093C \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u0932\u093F\u090F \u0939\u0948\u0964',
    reference: 'Sahih Muslim 2723',
  },
  {
    id: 'dua-3',
    category: 'Before Eating',
    title: 'Dua before eating',
    arabic: '\u0628\u0650\u0633\u0652\u0645\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0628\u064E\u0631\u064E\u0643\u064E\u0629\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650',
    transliteration: 'Bismillahi wa \u2019ala barakatillah',
    englishMeaning: 'In the name of Allah and with the blessings of Allah.',
    hindiMeaning: '\u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u0928\u093E\u092E \u0938\u0947 \u0914\u0930 \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0940 \u092C\u0930\u0915\u0924 \u0938\u0947\u0964',
    reference: 'Abu Dawud',
  },
  {
    id: 'dua-4',
    category: 'After Eating',
    title: 'Dua after eating',
    arabic:
      '\u0627\u0644\u0652\u062D\u064E\u0645\u0652\u062F\u064F \u0644\u0650\u0644\u0651\u064E\u0647\u0650 \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0623\u064E\u0637\u0652\u0639\u064E\u0645\u064E\u0646\u064E\u0627 \u0648\u064E\u0633\u064E\u0642\u064E\u0627\u0646\u064E\u0627 \u0648\u064E\u062C\u064E\u0639\u064E\u0644\u064E\u0646\u064E\u0627 \u0645\u064F\u0633\u0652\u0644\u0650\u0645\u0650\u064A\u0646\u064E',
    transliteration: 'Alhamdu lillahil-lathee at\u2019amana wasaqana waja\u2019alana muslimeen',
    englishMeaning: 'All praise is for Allah who fed us, gave us drink, and made us Muslims.',
    hindiMeaning:
      '\u0938\u093E\u0930\u0940 \u0924\u093E\u0930\u0940\u092B\u093C \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u0932\u093F\u090F \u0939\u0948 \u091C\u093F\u0938\u0928\u0947 \u0939\u092E\u0947\u0902 \u0916\u093F\u0932\u093E\u092F\u093E, \u092A\u093F\u0932\u093E\u092F\u093E \u0914\u0930 \u092E\u0941\u0938\u0932\u092E\u093E\u0928 \u092C\u0928\u093E\u092F\u093E\u0964',
    reference: 'Abu Dawud 3850',
  },
  {
    id: 'dua-5',
    category: 'Travel',
    title: 'Dua for travel',
    arabic:
      '\u0633\u064F\u0628\u0652\u062D\u064E\u0627\u0646\u064E \u0627\u0644\u0651\u064E\u0630\u0650\u064A \u0633\u064E\u062E\u0651\u064E\u0631\u064E \u0644\u064E\u0646\u064E\u0627 \u0647\u064E\u0630\u064E\u0627 \u0648\u064E\u0645\u064E\u0627 \u0643\u064F\u0646\u0651\u064E\u0627 \u0644\u064E\u0647\u064F \u0645\u064F\u0642\u0652\u0631\u0650\u0646\u0650\u064A\u0646\u064E',
    transliteration: 'Subhanal-lathee sakhkhara lana hatha wama kunna lahu muqrineen',
    englishMeaning:
      'Glory be to Him who has subjected this to us, and we could never have it by our own efforts.',
    hindiMeaning:
      '\u092A\u093E\u0915 \u0939\u0948 \u0935\u0939 \u091C\u093F\u0938\u0928\u0947 \u0907\u0938\u0947 \u0939\u092E\u093E\u0930\u0947 \u0935\u0936 \u092E\u0947\u0902 \u0915\u0930 \u0926\u093F\u092F\u093E, \u0935\u0930\u0928\u093E \u0939\u092E \u0907\u0938\u0947 \u0935\u0936 \u092E\u0947\u0902 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0928 \u0925\u0947\u0964',
    reference: 'Quran 43:13',
  },
  {
    id: 'dua-6',
    category: 'Sleep',
    title: 'Dua before sleeping',
    arabic: '\u0628\u0650\u0627\u0633\u0652\u0645\u0650\u0643\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0623\u064E\u0645\u064F\u0648\u062A\u064F \u0648\u064E\u0623\u064E\u062D\u0652\u064A\u064E\u0627',
    transliteration: 'Bismika Allahumma amootu wa-ahya',
    englishMeaning: 'In Your name O Allah, I die and I live.',
    hindiMeaning:
      '\u0910 \u0905\u0932\u094D\u0932\u093E\u0939! \u0924\u0947\u0930\u0947 \u0928\u093E\u092E \u0915\u0947 \u0938\u093E\u0925 \u092E\u0948\u0902 \u092E\u0930\u0924\u093E \u0939\u0942\u0901 \u0914\u0930 \u091C\u0940\u0924\u093E \u0939\u0942\u0901\u0964',
    reference: 'Sahih al-Bukhari 6324',
  },
  {
    id: 'dua-7',
    category: 'Evening',
    title: 'Evening protection',
    arabic:
      '\u0623\u064E\u0639\u064F\u0648\u0630\u064F \u0628\u0650\u0643\u064E\u0644\u0650\u0645\u064E\u0627\u062A\u0650 \u0627\u0644\u0644\u0651\u064E\u0647\u0650 \u0627\u0644\u062A\u0651\u064E\u0627\u0645\u0651\u064E\u0627\u062A\u0650 \u0645\u0650\u0646\u0652 \u0634\u064E\u0631\u0651\u0650 \u0645\u064E\u0627 \u062E\u064E\u0644\u064E\u0642\u064E',
    transliteration: 'A\u2019oothu bikalimatil-lahit-tammati min sharri ma khalaq',
    englishMeaning: 'I take refuge in Allah\u2019s perfect words from the evil He has created.',
    hindiMeaning:
      '\u092E\u0948\u0902 \u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u092A\u0942\u0930\u094D\u0923 \u0936\u092C\u094D\u200D\u0926\u094B\u0902 \u0915\u0940 \u092A\u0928\u093E\u0939 \u092E\u093E\u0902\u0917\u0924\u093E \u0939\u0942\u0901 \u0909\u0938\u0915\u0940 \u092E\u0916\u0932\u0942\u0915 \u0915\u0940 \u092C\u0941\u0930\u093E\u0908 \u0938\u0947\u0964',
    reference: 'Sahih Muslim 2708',
  },
  {
    id: 'dua-8',
    category: 'Entering Home',
    title: 'Dua when entering home',
    arabic:
      '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0625\u0650\u0646\u0651\u0650\u064A \u0623\u064E\u0633\u0652\u0623\u064E\u0644\u064F\u0643\u064E \u062E\u064E\u064A\u0652\u0631\u064E \u0627\u0644\u0652\u0645\u064E\u0648\u0652\u0644\u064E\u062C\u0650 \u0648\u064E\u062E\u064E\u064A\u0652\u0631\u064E \u0627\u0644\u0652\u0645\u064E\u062E\u0652\u0631\u064E\u062C\u0650',
    transliteration: 'Allahumma inni as\u2019aluka khayral-mawlaji wakhayral-makhraji',
    englishMeaning:
      'O Allah, I ask You for the best entering and the best exiting.',
    hindiMeaning:
      '\u0910 \u0905\u0932\u094D\u0932\u093E\u0939! \u092E\u0948\u0902 \u0924\u0941\u091D\u0938\u0947 \u092C\u0947\u0939\u0924\u0930\u0940\u0928 \u092A\u094D\u0930\u0935\u0947\u0936 \u0914\u0930 \u092C\u0947\u0939\u0924\u0930\u0940\u0928 \u0928\u093F\u0915\u093E\u0938 \u092E\u093E\u0902\u0917\u0924\u093E \u0939\u0942\u0901\u0964',
    reference: 'Abu Dawud 5096',
  },
  {
    id: 'dua-9',
    category: 'Travel',
    title: 'Dua when returning from travel',
    arabic: '\u0622\u064A\u0650\u0628\u064F\u0648\u0646\u064E \u062A\u064E\u0627\u0626\u0650\u0628\u064F\u0648\u0646\u064E \u0639\u064E\u0627\u0628\u0650\u062F\u064F\u0648\u0646\u064E \u0644\u0650\u0631\u064E\u0628\u0651\u0650\u0646\u064E\u0627 \u062D\u064E\u0627\u0645\u0650\u062F\u064F\u0648\u0646\u064E',
    transliteration: 'Ayiboona ta\u2019iboona \u2019abidoona lirabbina hamidoon',
    englishMeaning:
      'We return repentant to our Lord, worshipping our Lord, and praising our Lord.',
    hindiMeaning:
      '\u0939\u092E \u0932\u094C\u091F\u0928\u0947 \u0935\u093E\u0932\u0947 \u0939\u0948\u0902, \u0924\u094C\u092C\u093E \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947, \u0907\u092C\u093E\u0926\u0924 \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0914\u0930 \u0905\u092A\u0928\u0947 \u0930\u092C \u0915\u0940 \u0924\u093E\u0930\u0940\u092B\u093C \u0915\u0930\u0928\u0947 \u0935\u093E\u0932\u0947 \u0939\u0948\u0902\u0964',
    reference: 'Sahih al-Bukhari 1797',
  },
  {
    id: 'dua-10',
    category: 'Sleep',
    title: 'Ayat-ul-Kursi before sleep',
    arabic:
      '\u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0627 \u0625\u0650\u0644\u064E\u0647\u064E \u0625\u0650\u0644\u0651\u064E\u0627 \u0647\u064F\u0648\u064E \u0627\u0644\u0652\u062D\u064E\u064A\u0651\u064F \u0627\u0644\u0652\u0642\u064E\u064A\u0651\u064F\u0648\u0645\u064F',
    transliteration: 'Allahu la ilaha illa huwal-hayyul-qayyoom',
    englishMeaning:
      'Allah — there is no deity except Him, the Ever-Living, the Sustainer of existence. (Recite full Ayat-ul-Kursi)',
    hindiMeaning:
      '\u0905\u0932\u094D\u0932\u093E\u0939 \u0915\u0947 \u0938\u093F\u0935\u093E \u0915\u094B\u0908 \u092E\u093E\u092C\u0942\u0926 \u0928\u0939\u0940\u0902, \u0935\u0939 \u091C\u093C\u093F\u0902\u200D\u0926\u093E \u0914\u0930 \u0938\u092C\u0915\u094B \u0925\u093E\u092E\u0928\u0947 \u0935\u093E\u0932\u093E \u0939\u0948\u0964',
    reference: 'Quran 2:255',
  },
];

// ─── Darood Shareef ───────────────────────────────────────────────────────────

export const DAROOD_BENEFITS = [
  { title: 'Tenfold Rewards', description: 'Whoever sends one salutation upon the Prophet ﷺ, Allah sends ten upon him.', icon: 'Gift' },
  { title: 'Sins Forgiven', description: 'Reciting Darood is a means of forgiveness and the removal of sins.', icon: 'Heart' },
  { title: 'Duas Accepted', description: 'Dua remains suspended until Darood is sent upon the Prophet ﷺ.', icon: 'Star' },
];

export const DAROODS: Darood[] = [
  {
    id: 'darood-1',
    title: 'Darood-e-Ibrahimi',
    arabic:
      '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0635\u064E\u0644\u0651\u0650 \u0639\u064E\u0644\u064E\u0649 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F\u064D \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0622\u0644\u0650 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F\u064D \u0643\u064E\u0645\u064E\u0627 \u0635\u064E\u0644\u0651\u064E\u064A\u0652\u062A\u064E \u0639\u064E\u0644\u064E\u0649 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E \u0648\u064E\u0639\u064E\u0644\u064E\u0649 \u0622\u0644\u0650 \u0625\u0650\u0628\u0652\u0631\u064E\u0627\u0647\u0650\u064A\u0645\u064E \u0625\u0650\u0646\u0651\u064E\u0643\u064E \u062D\u064E\u0645\u0650\u064A\u062F\u064C \u0645\u064E\u062C\u0650\u064A\u062F\u064C',
    transliteration:
      'Allahumma salli \u2019ala Muhammadin wa \u2019ala aali Muhammadin kama sallayta \u2019ala Ibrahima wa \u2019ala aali Ibrahima innaka Hamidum-Majeed',
    translation:
      'O Allah, send Your mercy upon Muhammad and the family of Muhammad, as You sent mercy upon Ibrahim and the family of Ibrahim. Indeed, You are Praiseworthy, Most Glorious.',
    virtue: 'The most complete form of Darood, recited in every salah.',
  },
  {
    id: 'darood-2',
    title: 'Darood-e-Shareef (Short)',
    arabic: '\u0635\u064E\u0644\u0651\u064E\u0649 \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0639\u064E\u0644\u064E\u0649 \u0627\u0644\u0646\u0651\u064E\u0628\u0650\u064A\u0651\u0650 \u0627\u0644\u0652\u0623\u064F\u0645\u0651\u0650\u064A\u0651\u0650',
    transliteration: 'Sallallahu \u2019alan-nabiyyil-ummiyy',
    translation: 'May Allah send blessings upon the Unlettered Prophet ﷺ.',
    virtue: 'Short and easy to recite abundantly throughout the day.',
  },
  {
    id: 'darood-3',
    title: 'Darood-e-Tunajjina',
    arabic:
      '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0635\u064E\u0644\u0651\u0650 \u0639\u064E\u0644\u064E\u0649 \u0633\u064E\u064A\u0651\u0650\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F\u064D \u0635\u064E\u0644\u064E\u0627\u0629\u064B \u062A\u064F\u0646\u0652\u062C\u0650\u064A\u0646\u064E\u0627 \u0628\u0650\u0647\u064E\u0627 \u0645\u0650\u0646\u0652 \u062C\u064E\u0645\u0650\u064A\u0639\u0650 \u0627\u0644\u0652\u0623\u064E\u0647\u0652\u0648\u064E\u0627\u0644\u0650 \u0648\u064E\u0627\u0644\u0652\u0622\u0641\u064E\u0627\u062A\u0650',
    transliteration:
      'Allahumma salli \u2019ala sayyidina Muhammadin salatan tunjina biha min jami\u2019il-ahwali wal-aafat',
    translation:
      'O Allah, send blessings upon our master Muhammad ﷺ, a blessing by which You deliver us from all fears and calamities.',
    virtue: 'Recited for relief from difficulties and calamities.',
  },
  {
    id: 'darood-4',
    title: 'Darood-e-Nariya',
    arabic:
      '\u0627\u0644\u0644\u0651\u064E\u0647\u064F\u0645\u0651\u064E \u0635\u064E\u0644\u0651\u0650 \u0635\u064E\u0644\u064E\u0627\u0629\u064B \u0643\u064E\u0627\u0645\u0650\u0644\u064E\u0629\u064B \u0648\u064E\u0633\u064E\u0644\u0651\u0650\u0645\u0652 \u0633\u064E\u0644\u064E\u0627\u0645\u064B\u0627 \u062A\u064E\u0627\u0645\u0651\u064B\u0627 \u0639\u064E\u0644\u064E\u0649 \u0633\u064E\u064A\u0651\u0650\u062F\u0650\u0646\u064E\u0627 \u0645\u064F\u062D\u064E\u0645\u0651\u064E\u062F\u064D',
    transliteration:
      'Allahumma salli salatan kamilatan wa sallim salaman tamman \u2019ala sayyidina Muhammadin',
    translation:
      'O Allah, send complete blessings and perfect peace upon our master Muhammad ﷺ.',
    virtue: 'Known for the fulfilment of needs by the will of Allah.',
  },
];

// ─── Hadees ───────────────────────────────────────────────────────────────────

export const HADEES_CATEGORIES = ['Faith', 'Prayer', 'Character', 'Knowledge', 'Charity', 'Family'];
export const HADEES_NARRATORS = [
  'Abu Hurairah (RA)',
  'Aisha (RA)',
  'Umar ibn al-Khattab (RA)',
  'Anas ibn Malik (RA)',
  'Abdullah ibn Umar (RA)',
];

export const HADEES_LIST: Hadees[] = [
  {
    id: 'hadees-1',
    arabic: '\u0625\u0650\u0646\u0651\u064E\u0645\u064E\u0627 \u0627\u0644\u0652\u0623\u064E\u0639\u0652\u0645\u064E\u0627\u0644\u064F \u0628\u0650\u0627\u0644\u0646\u0651\u0650\u064A\u0651\u064E\u0627\u062A\u0650',
    translation: 'Actions are judged by intentions, and every person will get what they intended.',
    narrator: 'Umar ibn al-Khattab (RA)',
    book: 'Sahih al-Bukhari',
    reference: 'Bukhari 1',
    category: 'Faith',
  },
  {
    id: 'hadees-2',
    arabic:
      '\u0644\u064E\u0627 \u064A\u064F\u0624\u0652\u0645\u0650\u0646\u064F \u0623\u064E\u062D\u064E\u062F\u064F\u0643\u064F\u0645\u0652 \u062D\u064E\u062A\u0651\u064E\u0649 \u064A\u064F\u062D\u0650\u0628\u0651\u064E \u0644\u0650\u0623\u064E\u062E\u0650\u064A\u0647\u0650 \u0645\u064E\u0627 \u064A\u064F\u062D\u0650\u0628\u0651\u064F \u0644\u0650\u0646\u064E\u0641\u0652\u0633\u0650\u0647\u0650',
    translation:
      'None of you truly believes until he loves for his brother what he loves for himself.',
    narrator: 'Anas ibn Malik (RA)',
    book: 'Sahih al-Bukhari',
    reference: 'Bukhari 13',
    category: 'Faith',
  },
  {
    id: 'hadees-3',
    arabic: '\u0627\u0644\u0635\u0651\u064E\u0644\u064E\u0627\u0629\u064F \u0639\u0650\u0645\u064E\u0627\u062F\u064F \u0627\u0644\u062F\u0651\u0650\u064A\u0646\u0650',
    translation: 'Prayer is the pillar of religion.',
    narrator: 'Umar ibn al-Khattab (RA)',
    book: 'Bayhaqi',
    reference: 'Shu\u2019ab al-Iman 2807',
    category: 'Prayer',
  },
  {
    id: 'hadees-4',
    arabic:
      '\u0623\u064E\u0643\u0652\u0645\u064E\u0644\u064F \u0627\u0644\u0652\u0645\u064F\u0624\u0652\u0645\u0650\u0646\u0650\u064A\u0646\u064E \u0625\u0650\u064A\u0645\u064E\u0627\u0646\u064B\u0627 \u0623\u064E\u062D\u0652\u0633\u064E\u0646\u064F\u0647\u064F\u0645\u0652 \u062E\u064F\u0644\u064F\u0642\u064B\u0627',
    translation: 'The most complete of believers in faith are those with the best character.',
    narrator: 'Abu Hurairah (RA)',
    book: 'Sunan at-Tirmidhi',
    reference: 'Tirmidhi 1162',
    category: 'Character',
  },
  {
    id: 'hadees-5',
    arabic: '\u0637\u064E\u0644\u064E\u0628\u064F \u0627\u0644\u0652\u0639\u0650\u0644\u0652\u0645\u0650 \u0641\u064E\u0631\u0650\u064A\u0636\u064E\u0629\u064C \u0639\u064E\u0644\u064E\u0649 \u0643\u064F\u0644\u0651\u0650 \u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064D',
    translation: 'Seeking knowledge is an obligation upon every Muslim.',
    narrator: 'Anas ibn Malik (RA)',
    book: 'Sunan Ibn Majah',
    reference: 'Ibn Majah 224',
    category: 'Knowledge',
  },
  {
    id: 'hadees-6',
    arabic: '\u0627\u0644\u0635\u0651\u064E\u062F\u064E\u0642\u064E\u0629\u064F \u062A\u064F\u0637\u0652\u0641\u0650\u0626\u064F \u0627\u0644\u0652\u062E\u064E\u0637\u0650\u064A\u0626\u064E\u0629\u064E \u0643\u064E\u0645\u064E\u0627 \u064A\u064F\u0637\u0652\u0641\u0650\u0626\u064F \u0627\u0644\u0652\u0645\u064E\u0627\u0621\u064F \u0627\u0644\u0646\u0651\u064E\u0627\u0631\u064E',
    translation: 'Charity extinguishes sin as water extinguishes fire.',
    narrator: 'Anas ibn Malik (RA)',
    book: 'Sunan at-Tirmidhi',
    reference: 'Tirmidhi 614',
    category: 'Charity',
  },
  {
    id: 'hadees-7',
    arabic: '\u062E\u064E\u064A\u0652\u0631\u064F\u0643\u064F\u0645\u0652 \u062E\u064E\u064A\u0652\u0631\u064F\u0643\u064F\u0645\u0652 \u0644\u0650\u0623\u064E\u0647\u0652\u0644\u0650\u0647\u0650',
    translation: 'The best of you are those who are best to their families.',
    narrator: 'Aisha (RA)',
    book: 'Sunan at-Tirmidhi',
    reference: 'Tirmidhi 3895',
    category: 'Family',
  },
  {
    id: 'hadees-8',
    arabic:
      '\u0645\u064E\u0646\u0652 \u0633\u064E\u0644\u064E\u0643\u064E \u0637\u064E\u0631\u0650\u064A\u0642\u064B\u0627 \u064A\u064E\u0644\u0652\u062A\u064E\u0645\u0650\u0633\u064F \u0641\u0650\u064A\u0647\u0650 \u0639\u0650\u0644\u0652\u0645\u064B\u0627 \u0633\u064E\u0647\u0651\u064E\u0644\u064E \u0627\u0644\u0644\u0651\u064E\u0647\u064F \u0644\u064E\u0647\u064F \u0637\u064E\u0631\u0650\u064A\u0642\u064B\u0627 \u0625\u0650\u0644\u064E\u0649 \u0627\u0644\u0652\u062C\u064E\u0646\u0651\u064E\u0629\u0650',
    translation:
      'Whoever travels a path in search of knowledge, Allah makes easy for him a path to Paradise.',
    narrator: 'Abu Hurairah (RA)',
    book: 'Sahih Muslim',
    reference: 'Muslim 2699',
    category: 'Knowledge',
  },
  {
    id: 'hadees-9',
    arabic: '\u0627\u0644\u0652\u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064F \u0645\u064E\u0646\u0652 \u0633\u064E\u0644\u0650\u0645\u064E \u0627\u0644\u0652\u0645\u064F\u0633\u0652\u0644\u0650\u0645\u064F\u0648\u0646\u064E \u0645\u0650\u0646\u0652 \u0644\u0650\u0633\u064E\u0627\u0646\u0650\u0647\u0650 \u0648\u064E\u064A\u064E\u062F\u0650\u0647\u0650',
    translation:
      'A Muslim is the one from whose tongue and hands other Muslims are safe.',
    narrator: 'Abdullah ibn Umar (RA)',
    book: 'Sahih al-Bukhari',
    reference: 'Bukhari 10',
    category: 'Character',
  },
  {
    id: 'hadees-10',
    arabic:
      '\u0645\u064E\u0646\u0652 \u0635\u064E\u0644\u0651\u064E\u0649 \u0627\u0644\u0652\u0628\u064E\u0631\u0652\u062F\u064E\u064A\u0652\u0646\u0650 \u062F\u064E\u062E\u064E\u0644\u064E \u0627\u0644\u0652\u062C\u064E\u0646\u0651\u064E\u0629\u064E',
    translation: 'Whoever prays the two cool prayers (Fajr and Asr) will enter Paradise.',
    narrator: 'Abu Hurairah (RA)',
    book: 'Sahih al-Bukhari',
    reference: 'Bukhari 574',
    category: 'Prayer',
  },
  {
    id: 'hadees-11',
    arabic: '\u0627\u0644\u0652\u0643\u064E\u0644\u0650\u0645\u064E\u0629\u064F \u0627\u0644\u0637\u0651\u064E\u064A\u0651\u0650\u0628\u064E\u0629\u064F \u0635\u064E\u062F\u064E\u0642\u064E\u0629\u064C',
    translation: 'A good word is charity.',
    narrator: 'Abu Hurairah (RA)',
    book: 'Sahih al-Bukhari',
    reference: 'Bukhari 2989',
    category: 'Charity',
  },
  {
    id: 'hadees-12',
    arabic: '\u0627\u0644\u0652\u062C\u064E\u0646\u0651\u064E\u0629\u064F \u062A\u064E\u062D\u0652\u062A\u064E \u0623\u064E\u0642\u0652\u062F\u064E\u0627\u0645\u0650 \u0627\u0644\u0652\u0623\u064F\u0645\u0651\u064E\u0647\u064E\u0627\u062A\u0650',
    translation: 'Paradise lies beneath the feet of mothers.',
    narrator: 'Anas ibn Malik (RA)',
    book: 'Sunan an-Nasa\u2019i',
    reference: 'Nasa\u2019i 3104',
    category: 'Family',
  },
];

// ─── Jobs (MCEN) ──────────────────────────────────────────────────────────────

export const JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'Imam for Community Masjid',
    organization: 'Jama Masjid Noorani',
    location: 'Mumbai, Maharashtra',
    salary: '₹35,000 – ₹45,000 / month',
    type: ['Urgent', 'Religious', 'Full-time'],
    skills: ['Hafiz', 'Qirat', 'Tajweed', 'Khutbah Delivery'],
    description:
      'Seeking a qualified Imam to lead five daily prayers, deliver Jumu\u2019ah khutbah, and guide community religious programs.',
    postedDaysAgo: 2,
    applicants: 14,
  },
  {
    id: 'job-2',
    title: 'Full Stack Developer',
    organization: 'Barakah Tech Solutions',
    location: 'Bengaluru, Karnataka',
    salary: '₹12 – ₹18 LPA',
    type: ['Remote', 'Full-time'],
    skills: ['React', 'Node.js', 'TypeScript', 'PostgreSQL'],
    description:
      'Join a halal fintech startup building shariah-compliant investment tools. 3+ years experience required.',
    postedDaysAgo: 5,
    applicants: 38,
  },
  {
    id: 'job-3',
    title: 'Madrasa Teacher (Aalim/Aalima)',
    organization: 'Darul Uloom Al-Hidaya',
    location: 'Mumbai, Maharashtra',
    salary: '₹25,000 – ₹32,000 / month',
    type: ['Religious', 'Full-time'],
    skills: ['Aalim Course', 'Arabic', 'Fiqh', 'Teaching'],
    description:
      'Experienced Aalim/Aalima needed to teach intermediate students Arabic grammar, Fiqh, and Hadees studies.',
    postedDaysAgo: 3,
    applicants: 9,
  },
  {
    id: 'job-4',
    title: 'Halal Restaurant Manager',
    organization: 'Zam Zam Restaurants Group',
    location: 'Hyderabad, Telangana',
    salary: '₹40,000 – ₹55,000 / month',
    type: ['Urgent', 'Full-time', 'On-site'],
    skills: ['Operations', 'Team Management', 'Inventory', 'Customer Service'],
    description:
      'Manage day-to-day operations of our flagship halal restaurant. 5+ years hospitality experience preferred.',
    postedDaysAgo: 1,
    applicants: 22,
  },
  {
    id: 'job-5',
    title: 'Muazzin',
    organization: 'Masjid-e-Aqsa',
    location: 'Pune, Maharashtra',
    salary: '₹18,000 – ₹22,000 / month',
    type: ['Religious', 'Full-time'],
    skills: ['Adhan', 'Punctuality', 'Basic Tajweed'],
    description:
      'Dedicated Muazzin required for five daily adhans and assisting the Imam in masjid management.',
    postedDaysAgo: 7,
    applicants: 6,
  },
  {
    id: 'job-6',
    title: 'Islamic Finance Advisor',
    organization: 'Amanah Capital',
    location: 'Mumbai, Maharashtra',
    salary: '₹8 – ₹12 LPA',
    type: ['Full-time', 'On-site'],
    skills: ['Islamic Banking', 'Shariah Compliance', 'CFA/MBA', 'Client Advisory'],
    description:
      'Advise clients on shariah-compliant investments, sukuk, and halal wealth management strategies.',
    postedDaysAgo: 6,
    applicants: 17,
  },
  {
    id: 'job-7',
    title: 'Quran Teacher (Online)',
    organization: 'iQra Online Academy',
    location: 'Remote',
    salary: '₹20,000 – ₹35,000 / month',
    type: ['Remote', 'Religious', 'Part-time'],
    skills: ['Tajweed', 'Qirat', 'Online Teaching', 'English Fluency'],
    description:
      'Teach Quran with Tajweed to international students online. Flexible hours, evening batches available.',
    postedDaysAgo: 4,
    applicants: 31,
  },
  {
    id: 'job-8',
    title: 'Graphic Designer',
    organization: 'Ummah Creatives',
    location: 'New Delhi, Delhi',
    salary: '₹4.5 – ₹7 LPA',
    type: ['Full-time', 'On-site'],
    skills: ['Figma', 'Illustrator', 'Branding', 'Social Media'],
    description:
      'Design beautiful Islamic-themed branding and social media creatives for masjids and Islamic organizations.',
    postedDaysAgo: 8,
    applicants: 26,
  },
  {
    id: 'job-9',
    title: 'School Principal',
    organization: 'Al-Falah International School',
    location: 'Bengaluru, Karnataka',
    salary: '₹15 – ₹20 LPA',
    type: ['Urgent', 'Full-time'],
    skills: ['Educational Leadership', 'CBSE Curriculum', 'Administration', '10+ yrs Experience'],
    description:
      'Lead an established Islamic international school blending modern CBSE education with Islamic values.',
    postedDaysAgo: 2,
    applicants: 11,
  },
  {
    id: 'job-10',
    title: 'Community Outreach Coordinator',
    organization: 'Muslim Connect Foundation',
    location: 'Mumbai, Maharashtra',
    salary: '₹30,000 – ₹40,000 / month',
    type: ['Full-time', 'On-site'],
    skills: ['Event Management', 'Communication', 'Social Work', 'Urdu/Hindi/English'],
    description:
      'Coordinate community programs, masjid partnerships, and welfare drives across the Mumbai region.',
    postedDaysAgo: 5,
    applicants: 19,
  },
];

// ─── Testimonials ─────────────────────────────────────────────────────────────

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 't-1',
    name: 'Mohammed Arsalan',
    role: 'Software Engineer',
    city: 'Bengaluru',
    avatar: 'https://i.pravatar.cc/150?img=11',
    quote:
      'Muslim Connect helped me find a masjid near my new home within minutes, and through MCEN I even found a halal fintech job. This platform is a game-changer for our community.',
    rating: 5,
  },
  {
    id: 't-2',
    name: 'Ayesha Fatima',
    role: 'Madrasa Administrator',
    city: 'Hyderabad',
    avatar: 'https://i.pravatar.cc/150?img=44',
    quote:
      'Registering our madrasa brought us 40+ new admissions this year. Parents trust the verified badge, and the platform makes us discoverable to the whole community.',
    rating: 5,
  },
  {
    id: 't-3',
    name: 'Qari Imtiyaz Ahmed',
    role: 'Qari & Teacher',
    city: 'Mumbai',
    avatar: 'https://i.pravatar.cc/150?img=53',
    quote:
      'As a Qari, I listed my Tajweed classes here and now teach students from five different cities. May Allah reward the team behind this beautiful initiative.',
    rating: 5,
  },
  {
    id: 't-4',
    name: 'Dr. Salma Khan',
    role: 'Pediatrician',
    city: 'Pune',
    avatar: 'https://i.pravatar.cc/150?img=49',
    quote:
      'The professional network connected me with masjid committees to organize free health camps. Technology in the service of the Ummah — exactly what we needed.',
    rating: 4,
  },
];

// ─── About Page ───────────────────────────────────────────────────────────────

export const TIMELINE: TimelineEvent[] = [
  {
    year: '2023',
    title: 'The Idea is Born',
    description:
      'A small group of volunteers in Mumbai begin mapping local masjids and madrasas to help newcomers find places of worship.',
  },
  {
    year: '2024',
    title: 'Community Platform Launch',
    description:
      'Muslim Connect launches with verified masjid listings, dargah directories, and the first 100 registered professionals.',
  },
  {
    year: '2025',
    title: 'MCEN Employment Network',
    description:
      'The Muslim Connect Employment Network goes live, connecting Islamic organizations and halal businesses with talented job seekers.',
  },
  {
    year: '2026',
    title: 'Going Global',
    description:
      'Expansion across India and the Gulf begins, with donations infrastructure and multilingual Islamic content on the roadmap.',
  },
];

export const VALUES = [
  {
    title: 'Amanah (Trust)',
    description: 'Every listing is verified with care. Trust is the foundation of everything we build.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Ukhuwwah (Brotherhood)',
    description: 'We connect Muslims across cities and professions into one supportive family.',
    icon: 'HeartHandshake',
  },
  {
    title: 'Ihsan (Excellence)',
    description: 'From design to service, we pursue excellence as an act of worship.',
    icon: 'Sparkles',
  },
  {
    title: 'Khidmah (Service)',
    description: 'Serving the Ummah is our purpose — from prayer times to livelihoods.',
    icon: 'Handshake',
  },
];

// ─── Donate Page ──────────────────────────────────────────────────────────────

export const DONATION_PILLARS = [
  {
    title: 'Global Connection',
    description: 'Linking donors with verified causes across the global Muslim community.',
    icon: 'Globe',
  },
  {
    title: 'Trust & Verification',
    description: 'Every cause is vetted and verified so your sadaqah reaches the right hands.',
    icon: 'ShieldCheck',
  },
  {
    title: 'Structured Systems',
    description: 'Transparent tracking, receipts, and impact reports for every contribution.',
    icon: 'LayoutGrid',
  },
  {
    title: 'Ummah Unity',
    description: 'Bringing the community together to uplift those in need, as one body.',
    icon: 'Users',
  },
];

export const DONATION_CATEGORIES: DonationCategory[] = [
  {
    id: 'don-1',
    title: 'Education',
    description: 'Sponsor madrasa students, scholarships, and school supplies for underprivileged children.',
    icon: 'GraduationCap',
    image:
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'don-2',
    title: 'Healthcare',
    description: 'Fund free medical camps, medicines, and treatment for families who cannot afford care.',
    icon: 'HeartPulse',
    image:
      'https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'don-3',
    title: 'Islamic Finance',
    description: 'Interest-free microloans (Qard Hasan) helping families start halal businesses.',
    icon: 'Coins',
    image:
      'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'don-4',
    title: 'Community Support',
    description: 'Food drives, widow & orphan support, and emergency relief for community members.',
    icon: 'HandHeart',
    image:
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'don-5',
    title: 'Skill Development',
    description: 'Vocational training and digital skills programs creating sustainable livelihoods.',
    icon: 'Wrench',
    image:
      'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=800&auto=format&fit=crop',
  },
];

// ─── Country Codes (Onboarding) ──────────────────────────────────────────────

export const COUNTRY_CODES = [
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+971', country: 'UAE', flag: '🇦🇪' },
  { code: '+966', country: 'Saudi Arabia', flag: '🇸🇦' },
  { code: '+92', country: 'Pakistan', flag: '🇵🇰' },
  { code: '+880', country: 'Bangladesh', flag: '🇧🇩' },
  { code: '+44', country: 'UK', flag: '🇬🇧' },
  { code: '+1', country: 'USA', flag: '🇺🇸' },
  { code: '+60', country: 'Malaysia', flag: '🇲🇾' },
  { code: '+62', country: 'Indonesia', flag: '🇮🇩' },
  { code: '+90', country: 'Turkey', flag: '🇹🇷' },
];

// ─── Aggregated helpers ───────────────────────────────────────────────────────

export const ALL_LISTINGS = [...MASJIDS, ...DARGAHS, ...MADRASAS];
export const FEATURED_ITEMS = [...MASJIDS, ...DARGAHS, ...MADRASAS, ...PROFESSIONALS];

// ═══════════════════════════════════════════════════════════════════════════════
// PART 2 — Authenticated experience mock data
// ═══════════════════════════════════════════════════════════════════════════════

import type {
  FeedPost,
  RecentDonationProject,
  ReceivedReview,
  UserService,
  Applicant,
  JobApplication,
  OwnedProfile,
  ManagedEvent,
  DonationCampaign,
} from './types';

// ─── Religious roles (role-based dashboard logic) ─────────────────────────────

export const RELIGIOUS_ROLES = [
  'Imam',
  'Naib Imam',
  'Muazzin',
  'Trustee / Committee Member',
  'Qari',
  'Aalim',
  'Mufti',
  'Hafiz',
];

// ─── Prayer times strip (dashboard) ───────────────────────────────────────────

export const PRAYER_TIMES_TODAY = [
  { name: 'Fajr', time: '4:42 AM' },
  { name: 'Dhuhr', time: '12:38 PM' },
  { name: 'Asr', time: '4:58 PM' },
  { name: 'Maghrib', time: '7:14 PM' },
  { name: 'Isha', time: '8:36 PM' },
];

// ─── Donation summary panel ───────────────────────────────────────────────────

export const DONATION_SUMMARY = {
  totalCollected: 1284500,
  totalDonors: 342,
  activeProjects: 3,
};

export const RECENT_DONATION_PROJECTS: RecentDonationProject[] = [
  { id: 'dp-1', title: 'Masjid Roof Repair', raised: 185000, target: 250000, donors: 64 },
  { id: 'dp-2', title: 'Water Cooler Installation', raised: 42000, target: 60000, donors: 38 },
  { id: 'dp-3', title: 'Madrasa Books & Supplies', raised: 96500, target: 120000, donors: 87 },
];

// ─── Community feed ───────────────────────────────────────────────────────────

export const FEED_POSTS: FeedPost[] = [
  {
    id: 'feed-1',
    type: 'announcement',
    authorName: 'Jama Masjid Noorani',
    authorMeta: 'Masjid \u00b7 Mumbai, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1466442929976-97f336a657be?q=80&w=800&auto=format&fit=crop',
    content:
      'Alhamdulillah! Our Ramadan Taraweeh schedule is now finalized. Hafiz Abdul Kareem will lead 20 rakats nightly starting from the first night of Ramadan. Iftar arrangements for 300 people daily \u2014 volunteers welcome!',
    likes: 128,
    comments: [
      { id: 'fc-1', author: 'Mohammed Faizan', text: 'MashaAllah! Will be there with family every night InshaAllah.', timeAgo: '2h ago' },
      { id: 'fc-2', author: 'Salim Sheikh', text: 'How can I register as an iftar volunteer?', timeAgo: '1h ago' },
    ],
    timeAgo: '3h ago',
    linkedListingId: 'masjid-1',
  },
  {
    id: 'feed-2',
    type: 'professional',
    authorName: 'Dr. Ayesha Siddiqui',
    authorMeta: 'General Physician \u00b7 Mumbai',
    avatar: 'https://i.pravatar.cc/150?img=47',
    content:
      'Assalamu Alaikum! I have joined Muslim Connect to offer free health consultations for senior citizens every Saturday at my clinic in Byculla. DM or call to book a slot. May Allah grant shifa to all our elders. \ud83e\udd32',
    likes: 86,
    comments: [
      { id: 'fc-3', author: 'Abdul Rahman', text: 'JazakAllah khair doctor sahiba, this is a great initiative!', timeAgo: '4h ago' },
    ],
    timeAgo: '6h ago',
    linkedListingId: 'prof-1',
  },
  {
    id: 'feed-3',
    type: 'event',
    authorName: 'Darul Uloom Al-Hidaya',
    authorMeta: 'Madrasa \u00b7 Mumbai, Maharashtra',
    image:
      'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop',
    content:
      '\ud83d\udcda Annual Quran Competition 2026 \u2014 registrations open! Categories: Hifz (full), Last 10 Surahs, and Qirat. Open to students aged 8\u201318. Prizes sponsored by local businesses. Last date to register: 25th June.',
    likes: 214,
    comments: [
      { id: 'fc-4', author: 'Bilqis Fatima', text: 'Registered my son for the Hifz category. JazakAllah!', timeAgo: '30m ago' },
      { id: 'fc-5', author: 'Yusuf Khan', text: 'Is there an entry fee?', timeAgo: '15m ago' },
    ],
    timeAgo: '1d ago',
    linkedListingId: 'madrasa-1',
  },
  {
    id: 'feed-4',
    type: 'announcement',
    authorName: 'Haji Ali Dargah',
    authorMeta: 'Dargah \u00b7 Mumbai, Maharashtra',
    content:
      'Langar (community kitchen) timing update: due to high summer footfall, langar will now be served from 11:30 AM to 3:30 PM daily. Drinking water stations have been added along the causeway. Please keep the premises clean.',
    likes: 342,
    comments: [],
    timeAgo: '2d ago',
    linkedListingId: 'dargah-1',
  },
];

// ─── My Profile — services & reviews ─────────────────────────────────────────

export const DEFAULT_USER_SERVICES: UserService[] = [
  {
    id: 'svc-1',
    title: 'Quran Recitation Classes',
    description: 'One-to-one Tajweed and Qirat coaching for children and adults, online or in person.',
    priceRange: '\u20b9500 \u2013 \u20b91,500 / month',
    active: true,
  },
  {
    id: 'svc-2',
    title: 'Nikah Khutbah Services',
    description: 'Conducting nikah ceremonies with khutbah in Arabic and Urdu, documentation guidance included.',
    priceRange: '\u20b92,000 \u2013 \u20b95,000 / event',
    active: true,
  },
];

export const RECEIVED_REVIEWS: ReceivedReview[] = [
  {
    id: 'rr-1',
    author: 'Imran Qureshi',
    rating: 5,
    comment: 'Excellent Tajweed classes! My son improved remarkably within three months. Very patient and structured teaching.',
    date: '2026-05-20',
  },
  {
    id: 'rr-2',
    author: 'Bilqis Fatima',
    rating: 4,
    comment: 'Conducted our family nikah beautifully. The khutbah was heartfelt. Slight delay in arrival but overall wonderful.',
    date: '2026-04-11',
  },
  {
    id: 'rr-3',
    author: 'Yusuf Khan',
    rating: 5,
    comment: 'MashaAllah very knowledgeable. The online Quran classes are flexible and well organized.',
    date: '2026-03-02',
  },
];

// ─── Employment — employer side ───────────────────────────────────────────────

export const MOCK_APPLICANTS: Applicant[] = [
  { id: 'app-1', name: 'Hafiz Abdul Kareem', jobTitle: 'Imam for Community Masjid', experience: '8 years', location: 'Mumbai', appliedDaysAgo: 1, avatar: 'https://i.pravatar.cc/150?img=12' },
  { id: 'app-2', name: 'Qari Mohammed Saad', jobTitle: 'Imam for Community Masjid', experience: '5 years', location: 'Thane', appliedDaysAgo: 2, avatar: 'https://i.pravatar.cc/150?img=15' },
  { id: 'app-3', name: 'Maulana Rashid Nadvi', jobTitle: 'Madrasa Teacher (Aalim/Aalima)', experience: '12 years', location: 'Lucknow', appliedDaysAgo: 1, avatar: 'https://i.pravatar.cc/150?img=33' },
  { id: 'app-4', name: 'Aamir Shaikh', jobTitle: 'Full Stack Developer', experience: '4 years', location: 'Pune', appliedDaysAgo: 3, avatar: 'https://i.pravatar.cc/150?img=53' },
  { id: 'app-5', name: 'Sana Ansari', jobTitle: 'Graphic Designer', experience: '3 years', location: 'Delhi', appliedDaysAgo: 2, avatar: 'https://i.pravatar.cc/150?img=45' },
];

export const EMPLOYER_ANALYTICS = [
  { label: 'Mon', views: 42, applications: 6 },
  { label: 'Tue', views: 58, applications: 9 },
  { label: 'Wed', views: 35, applications: 4 },
  { label: 'Thu', views: 71, applications: 12 },
  { label: 'Fri', views: 96, applications: 18 },
  { label: 'Sat', views: 64, applications: 8 },
  { label: 'Sun', views: 49, applications: 7 },
];

// ─── Employment — job-seeker side ─────────────────────────────────────────────

export const DEFAULT_APPLICATIONS: JobApplication[] = [
  { id: 'ja-1', jobId: 'job-2', jobTitle: 'Full Stack Developer', organization: 'Barakah Tech Solutions', status: 'Interview', appliedDate: '2026-06-02' },
  { id: 'ja-2', jobId: 'job-7', jobTitle: 'Quran Teacher (Online)', organization: 'iQra Online Academy', status: 'Shortlisted', appliedDate: '2026-06-05' },
  { id: 'ja-3', jobId: 'job-8', jobTitle: 'Graphic Designer', organization: 'Ummah Creatives', status: 'Applied', appliedDate: '2026-06-08' },
  { id: 'ja-4', jobId: 'job-6', jobTitle: 'Islamic Finance Advisor', organization: 'Amanah Capital', status: 'Rejected', appliedDate: '2026-05-21' },
];

// ─── Institution module constants ─────────────────────────────────────────────

export const MASJID_KINDS = ['Jama Masjid', 'Local Masjid', 'Eidgah'] as const;

export const IMAM_FIQH_OPTIONS = [
  'Imam Abu Hanifa',
  'Malik ibn Anas',
  'Ahmad ibn Hanbal',
  "Shafi'i",
] as const;

export const SECT_OPTIONS = [
  'Deobandi',
  'Barelvi',
  'Sufi',
  'Shia Ithna Ashari',
  'Ismaili',
  'Bohra',
  'Khoja',
  'Ahmadiyya',
  'Other',
] as const;

export const MADRASA_COURSE_OPTIONS = [
  'Aalim Course',
  'Nazra Quran',
  'Hifz',
  'Tajweed',
  'Islamic Studies',
];

export const INSTITUTION_FALLBACK_IMAGES: Record<string, string> = {
  masjid:
    'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
  dargah:
    'https://images.unsplash.com/photo-1542816417-0983c9c9ad53?q=80&w=800&auto=format&fit=crop',
  madrasa:
    'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800&auto=format&fit=crop',
};

// ─── Seed data for the institution store (first login demo) ──────────────────

export const SEED_OWNED_PROFILES: OwnedProfile[] = [
  {
    id: 'owned-masjid-1',
    type: 'masjid',
    name: 'Masjid-e-Rahmah',
    country: 'India',
    state: 'Maharashtra',
    city: 'Mumbai',
    area: 'Kurla West',
    pincode: '400070',
    image:
      'https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=800&auto=format&fit=crop',
    verified: true,
    createdAt: '2026-05-10T09:00:00.000Z',
    description: 'A neighbourhood masjid serving the Kurla community with five daily prayers and weekend Quran classes.',
    masjidKind: 'Local Masjid',
    imamFiqh: 'Imam Abu Hanifa',
    sect: 'Deobandi',
    prayerTimes: { fajr: '04:45', dhuhr: '13:00', asr: '17:00', maghrib: '19:15', isha: '20:45' },
    verificationRole: 'Trustee',
  },
];

export const SEED_EVENTS: ManagedEvent[] = [
  {
    id: 'event-1',
    profileId: 'owned-masjid-1',
    title: 'Weekly Tafseer Halaqa',
    date: '2026-06-19',
    time: '20:00',
    venue: 'Main Prayer Hall',
    description: 'Weekly Quran tafseer session after Isha prayers, led by the Imam. Open to all brothers; sisters\u2019 gallery available.',
    active: true,
    attendees: 85,
    createdAt: '2026-05-15T10:00:00.000Z',
  },
  {
    id: 'event-2',
    profileId: 'owned-masjid-1',
    title: 'Eid Milan Community Dinner',
    date: '2026-06-28',
    time: '19:30',
    venue: 'Masjid Courtyard',
    description: 'Community dinner celebrating Eid-ul-Adha with families. Potluck contributions welcome.',
    active: false,
    attendees: 220,
    createdAt: '2026-05-20T10:00:00.000Z',
  },
];

export const SEED_CAMPAIGNS: DonationCampaign[] = [
  {
    id: 'camp-1',
    profileId: 'owned-masjid-1',
    title: 'Masjid Roof Repair',
    target: 250000,
    raised: 185000,
    donors: 64,
    deadline: '2026-07-31',
    description: 'Monsoon-proofing the main prayer hall roof before the rainy season. Every contribution counts.',
    status: 'Active',
    createdAt: '2026-05-12T10:00:00.000Z',
  },
  {
    id: 'camp-2',
    profileId: 'owned-masjid-1',
    title: 'Water Cooler Installation',
    target: 60000,
    raised: 42000,
    donors: 38,
    deadline: '2026-06-30',
    description: 'Installing two RO water coolers for musallis during the summer months.',
    status: 'Active',
    createdAt: '2026-05-18T10:00:00.000Z',
  },
];
