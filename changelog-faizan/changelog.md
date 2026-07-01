## [01-07-2026 13:26] — Feed stat bar counts removed

**What changed:** Feed page ke top stat bar tabs se count numbers hata diye — ab sirf "Masjids Registered", "Dargahs Registered" etc. dikhega, "6", "2", "3" nahi.
**Files touched:** `src/app/feed/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [01-07-2026 13:24] — Feed page tabs without counts

**What changed:** Sirf `/feed` page par location tabs me numbers hide kiye — ab "Nearby", "City" etc. bina count ke dikhenge. Registry pages (Masjids, Dargahs, etc.) aur Jobs par tab counts same rahenge.
**Files touched:** `src/app/feed/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [01-07-2026 13:21] — Location tab counts instead of header badge

**What changed:** Registry/Jobs pages ke top bar se count badge (e.g. "6 Masjids") hata diya. Ab har location tab par count dikhta hai — jaise "Nearby 6", "City 6", "State 6". Feed aur Employment Network par bhi same pattern.
**Files touched:** `src/lib/location-scope.ts`, `src/components/feed/LocationScopeTabs.tsx`, `src/components/feed/RegistryView.tsx`, `src/components/feed/JobsView.tsx`, `src/app/feed/page.tsx`, `src/app/employment-network/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [01-07-2026 13:17] — Same dummy data on all location tabs

**What changed:** Location scope tabs (Nearby, City, State, Country, World Wide) par ab har tab par same poora mock dataset dikhta hai — demo mode me filtering off hai. Login demo user ko Mumbai/Kurla West location di taake baad me real filter enable karne par bhi data dikhe.
**Files touched:** `src/lib/location-scope.ts`, `src/app/login/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [01-07-2026 13:15] — Create profile cancel/back goes to feed

**What changed:** Masjid/Dargah/Madrasa register pages par agar user profile create nahi karta (Back ya Cancel) to `/feed` par navigate hoga. Successful submit ke baad `/manage-profiles` par jana same hai. Edit mode me back/cancel ab bhi Manage Profiles par hai.
**Files touched:** `src/components/institutions/InstitutionForm.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [01-07-2026 13:11] — Location tabs on registry tab pages

**What changed:** Feed ke top stat tabs (Masjids, Dargahs, Madrasas, Professionals, Jobs) par 5 location scope tabs add kiye — Nearby, City, State, Country, World Wide. Shared `LocationScopeTabs` component aur `location-scope` lib se filtering; tab click par cards/jobs user location ke basis par filter hote hain, count badge bhi update hota hai.
**Files touched:** `src/lib/location-scope.ts`, `src/components/feed/LocationScopeTabs.tsx`, `src/components/feed/RegistryView.tsx`, `src/components/feed/JobsView.tsx`, `src/app/feed/page.tsx`, `src/app/employment-network/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [26-06-2026 17:25] — Feed location scope tabs

**What changed:** Feed page ke top par 5 location tabs add kiye (Nearby, City, State, Country, World Wide). Tab click par posts user ke area/city/state ke basis par filter hote hain; For You / Following / Trending tabs ke saath kaam karte hain.
**Files touched:** `src/app/feed/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [26-06-2026 17:15] — Manage Profiles back link to feed

**What changed:** Manage Profiles page par back button ab "Back to Feed" dikhata hai aur `/feed` par navigate karta hai (pehle "Back to Dashboard" → `/dashboard` tha).
**Files touched:** `src/app/manage-profiles/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---

## [26-06-2026 17:10] — Sidebar Masjids & More renamed to Dashboard

**What changed:** Feed sidebar me "Masjids & More" nav label ko "Dashboard" rename kiya; link `/dashboard` par same hai.
**Files touched:** `src/app/feed/page.tsx`
**API endpoints used:** None
**Breaking change:** NO
**Branch:** zoya-dev

---
