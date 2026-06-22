import Link from 'next/link';

interface LogoProps {
  light?: boolean;
  /** Optional: render without link wrapper */
  asSpan?: boolean;
}

function CrescentMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      aria-hidden
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* 8-point star */}
      <path
        d="M20 2 L23.5 12.5 L34 9 L27.5 16.5 L38 20 L27.5 23.5 L34 31 L23.5 27.5 L20 38 L16.5 27.5 L6 31 L12.5 23.5 L2 20 L12.5 16.5 L6 9 L16.5 12.5 Z"
        fill="currentColor"
        opacity="0.22"
      />
      {/* Crescent */}
      <path
        d="M26 11 A 10.5 10.5 0 1 0 26 29 A 8.2 8.2 0 1 1 26 11 Z"
        fill="currentColor"
      />
      <circle cx="27.5" cy="20" r="2" fill="#C9A227" />
    </svg>
  );
}

export default function Logo({ light = false, asSpan = false }: LogoProps) {
  const inner = (
    <>
      <CrescentMark className={`h-9 w-9 ${light ? 'text-gold-light' : 'text-primary'}`} />
      <span className="flex flex-col leading-none">
        <span
          className={`font-heading text-lg font-bold tracking-tight ${
            light ? 'text-white' : 'text-heading'
          }`}
        >
          Muslim Connect
        </span>
        <span
          className={`text-[10px] font-medium uppercase tracking-[0.22em] ${
            light ? 'text-gold-light' : 'text-gold-dark'
          }`}
        >
          Ummah United
        </span>
      </span>
    </>
  );

  if (asSpan) return <span className="flex items-center gap-2.5">{inner}</span>;

  return (
    <Link href="/" className="flex items-center gap-2.5" aria-label="Muslim Connect home">
      {inner}
    </Link>
  );
}
