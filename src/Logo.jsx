/**
 * Logo Konsorcjum na rzecz Seniora — Bonam Curam.
 * Odtworzone jako inline SVG (spójne z założeniem „wszystkie ilustracje to SVG").
 * Złote „naszkicowane" serce w środku + granatowy tekst na okręgu:
 *   góra: KONSORCJUM NA RZECZ SENIORA
 *   dół:  BONAM CURAM
 *
 * variant:
 *   'color' — złote serce + granatowy tekst (na jasnym tle)
 *   'mono'  — jeden kolor (domyślnie biały) — na ciemnym tle / znak wodny
 */

const GOLD = '#EFB02A'
const NAVY = '#16305A'

// pojedyncze „bazgroły" wypełniające serce (efekt odręcznego szkicu)
const SCRIBBLE =
  'M175 165 C 205 150 250 150 250 175 C 250 150 300 148 330 168 ' +
  'M158 190 Q 250 205 348 188 M150 210 Q 250 230 356 206 ' +
  'M156 232 Q 250 252 350 226 M168 254 Q 250 274 338 246 ' +
  'M182 276 Q 250 296 322 266 M198 298 Q 250 314 305 286 ' +
  'M218 320 Q 250 334 285 306 M236 342 L 250 352 L 268 328'

const HEART =
  'M250 358 ' +
  'C 250 358 138 282 138 202 ' +
  'C 138 160 172 138 204 138 ' +
  'C 230 138 246 158 250 176 ' +
  'C 254 158 270 138 296 138 ' +
  'C 328 138 362 160 362 202 ' +
  'C 362 282 250 358 250 358 Z'

export default function Logo({ size = 44, variant = 'color', color = '#F4EEE1', style }) {
  const heartFill = variant === 'mono' ? color : GOLD
  const textFill = variant === 'mono' ? color : NAVY

  return (
    <svg
      viewBox="0 0 500 500"
      width={size}
      height={size}
      role="img"
      aria-label="Konsorcjum na rzecz Seniora — Bonam Curam"
      style={{ display: 'block', ...style }}
    >
      <defs>
        {/* łuk górny — tekst czytany po górze, od lewej do prawej */}
        <path id="lg-top" d="M 70 300 A 195 195 0 0 1 430 300" fill="none" />
        {/* łuk dolny — tekst czytany po dole, od lewej do prawej */}
        <path id="lg-bottom" d="M 108 388 A 165 165 0 0 0 392 388" fill="none" />
      </defs>

      <g
        fill={textFill}
        fontFamily="'Bricolage Grotesque', sans-serif"
        fontWeight="800"
      >
        <text fontSize="43" letterSpacing="2.5">
          <textPath href="#lg-top" startOffset="50%" textAnchor="middle">
            KONSORCJUM NA RZECZ SENIORA
          </textPath>
        </text>
        <text fontSize="47" letterSpacing="3">
          <textPath href="#lg-bottom" startOffset="50%" textAnchor="middle">
            BONAM CURAM
          </textPath>
        </text>
      </g>

      {/* serce */}
      <path d={HEART} fill={heartFill} opacity={variant === 'mono' ? color === '#F4EEE1' ? 0.95 : 1 : 0.92} />
      <path
        d={SCRIBBLE}
        fill="none"
        stroke={variant === 'mono' ? color : '#D79A1E'}
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity={variant === 'mono' ? 0.35 : 0.55}
      />
    </svg>
  )
}
