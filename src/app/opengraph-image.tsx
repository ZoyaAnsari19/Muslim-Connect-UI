import { ImageResponse } from 'next/og';

// ─── Open Graph image for link previews (WhatsApp, X, Facebook, etc.) ────────

// Edge runtime: avoids a Windows-dev font-loading bug in @vercel/og's node path
// and is the recommended runtime for OG images on Vercel.
export const runtime = 'edge';

export const alt = 'Muslim Connect — Connecting the Global Muslim Community';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: 'linear-gradient(135deg, #06281D 0%, #0B6E4F 60%, #0E8560 100%)',
          fontFamily: 'sans-serif',
        }}
      >
        {/* Decorative corner glow */}
        <div
          style={{
            position: 'absolute',
            top: -160,
            right: -120,
            width: 460,
            height: 460,
            borderRadius: 460,
            background: 'rgba(201,162,39,0.20)',
            display: 'flex',
          }}
        />

        {/* Brand row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width="92" height="92" viewBox="0 0 40 40" fill="none">
            <path
              d="M20 2 L23.5 12.5 L34 9 L27.5 16.5 L38 20 L27.5 23.5 L34 31 L23.5 27.5 L20 38 L16.5 27.5 L6 31 L12.5 23.5 L2 20 L12.5 16.5 L6 9 L16.5 12.5 Z"
              fill="#E5C75D"
              opacity="0.30"
            />
            <path d="M26 11 A 10.5 10.5 0 1 0 26 29 A 8.2 8.2 0 1 1 26 11 Z" fill="#E5C75D" />
            <circle cx="27.5" cy="20" r="2" fill="#0B6E4F" />
          </svg>
          <div
            style={{
              display: 'flex',
              fontSize: 30,
              letterSpacing: 8,
              color: '#E5C75D',
              fontWeight: 700,
            }}
          >
            UMMAH UNITED
          </div>
        </div>

        {/* Headline block */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 92,
              fontWeight: 800,
              color: '#FFFFFF',
              lineHeight: 1.05,
            }}
          >
            Muslim Connect
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 24,
              fontSize: 40,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: 920,
              lineHeight: 1.3,
            }}
          >
            Connecting the Global Muslim Community
          </div>
        </div>

        {/* Footer tags */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {['Masjids & Dargahs', 'Islamic Content', 'Employment Network', 'Donations'].map(
            (tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  padding: '12px 24px',
                  borderRadius: 999,
                  border: '1px solid rgba(229,199,93,0.45)',
                  background: 'rgba(255,255,255,0.06)',
                  color: '#F5ECD3',
                  fontSize: 24,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
