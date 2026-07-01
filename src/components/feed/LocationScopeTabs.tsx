'use client';

import { LOCATION_TABS, type LocationScope } from '@/lib/location-scope';

interface LocationScopeTabsProps {
  scope: LocationScope;
  onChange: (scope: LocationScope) => void;
  /** Per-tab counts, e.g. { nearby: 6, city: 4 } → renders "Nearby 6" */
  counts?: Partial<Record<LocationScope, number>>;
  className?: string;
}

export default function LocationScopeTabs({
  scope,
  onChange,
  counts,
  className = '',
}: LocationScopeTabsProps) {
  return (
    <div
      className={`scrollbar-none flex gap-2 overflow-x-auto pb-1 ${className}`}
      role="tablist"
      aria-label="Location scope"
    >
      {LOCATION_TABS.map((t) => {
        const active = scope === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={active}
            onClick={() => onChange(t.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              active
                ? 'bg-primary text-white shadow-card'
                : 'border border-card-border bg-white text-body hover:border-primary hover:text-primary'
            }`}
          >
            {t.label}
            {counts?.[t.id] !== undefined && (
              <>
                {' '}
                <span className={active ? 'font-bold' : 'font-semibold text-heading'}>
                  {counts[t.id]}
                </span>
              </>
            )}
          </button>
        );
      })}
    </div>
  );
}
