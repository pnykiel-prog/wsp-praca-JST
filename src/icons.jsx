/**
 * Ikony liniowe (inline SVG) — stroke, 24×24, stroke-width ~1.7, zaokrąglone.
 * Brak biblioteki ikon — wg wytycznych projektu.
 */

// Ikona z pojedynczego path „d" (odpowiednik icon() z prototypu).
export function Icon({ d, size = 22, width, strokeWidth = 1.7, style }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      style={style}
      aria-hidden="true"
    >
      <path
        d={d}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        {...(width ? { strokeWidth: width } : {})}
      />
    </svg>
  )
}
