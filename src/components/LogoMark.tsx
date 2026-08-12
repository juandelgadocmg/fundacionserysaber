// Isotipo de Ser & Saber: bloques redondeados conectados en diagonal,
// replicando el logo institucional real (turquesa, morado, naranja).
export default function LogoMark({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="2" y="20" width="14" height="14" rx="5" fill="#0FB5AA" />
      <rect x="17" y="12" width="14" height="14" rx="5" fill="#4B2E83" />
      <rect x="32" y="4" width="14" height="14" rx="5" fill="#F5A524" />
      <line x1="9" y1="20" x2="39" y2="10" stroke="#241934" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="9" cy="20" r="2.5" fill="#241934" />
      <circle cx="24" cy="12" r="2.5" fill="#241934" />
      <circle cx="39" cy="10" r="2.5" fill="#241934" />
    </svg>
  );
}
