// Elemento de firma visual: un hilo curvo que enlaza los tres ejes.
// Refleja literalmente el recorrido conceptual del brief:
// Personas → SER → SABER → HACER → Transformación → Impacto.
export default function HiloSVG({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 900 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hilo-gradiente" x1="0" y1="0" x2="900" y2="0" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#4B2E83" />
          <stop offset="0.5" stopColor="#0FB5AA" />
          <stop offset="1" stopColor="#F5A524" />
        </linearGradient>
      </defs>
      <path
        d="M40 180 C 160 40, 260 40, 320 110 S 480 200, 560 110 S 740 20, 860 90"
        stroke="url(#hilo-gradiente)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray="1 14"
      />
      <circle cx="40" cy="180" r="14" fill="#4B2E83" />
      <circle cx="420" cy="150" r="14" fill="#0FB5AA" />
      <circle cx="860" cy="90" r="14" fill="#F5A524" />
    </svg>
  );
}
