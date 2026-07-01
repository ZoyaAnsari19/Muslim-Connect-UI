export type LocationScope = 'nearby' | 'city' | 'state' | 'country' | 'worldwide';

export const LOCATION_TABS: { id: LocationScope; label: string }[] = [
  { id: 'nearby', label: 'Nearby' },
  { id: 'city', label: 'City' },
  { id: 'state', label: 'State' },
  { id: 'country', label: 'Country' },
  { id: 'worldwide', label: 'World Wide' },
];

export interface Locatable {
  area: string;
  city: string;
  state: string;
}

const norm = (s: string) => s.trim().toLowerCase();

/** Demo: har location tab par poora mock dataset dikhe (filter off) */
export const DEMO_LOCATION_SCOPE_SHOW_ALL = true;

export function matchesLocationScope(
  loc: Locatable,
  scope: LocationScope,
  userArea: string,
  userCity: string,
  userState: string
): boolean {
  if (DEMO_LOCATION_SCOPE_SHOW_ALL) return true;

  switch (scope) {
    case 'nearby':
      if (userArea && loc.area) {
        return norm(loc.area).includes(norm(userArea)) || norm(userArea).includes(norm(loc.area));
      }
      return userCity ? norm(loc.city) === norm(userCity) : false;
    case 'city':
      return userCity ? norm(loc.city) === norm(userCity) : false;
    case 'state':
      return userState ? norm(loc.state) === norm(userState) : false;
    case 'country':
    case 'worldwide':
      return true;
    default:
      return true;
  }
}

/** Count items per location scope tab */
export function countByLocationScope<T>(
  items: T[],
  getLoc: (item: T) => Locatable,
  userArea: string,
  userCity: string,
  userState: string
): Record<LocationScope, number> {
  return LOCATION_TABS.reduce(
    (acc, tab) => {
      acc[tab.id] = items.filter((item) =>
        matchesLocationScope(getLoc(item), tab.id, userArea, userCity, userState)
      ).length;
      return acc;
    },
    {} as Record<LocationScope, number>
  );
}

/** Parse job location strings like "Mumbai, Maharashtra" or "Remote" */
export function parseJobLocation(location: string): Locatable {
  const parts = location.split(',').map((s) => s.trim());
  if (parts.length >= 2) {
    return { area: '', city: parts[0], state: parts.slice(1).join(', ') };
  }
  return { area: '', city: parts[0] ?? '', state: '' };
}
