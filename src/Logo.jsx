/**
 * Logo Konsorcjum na rzecz Seniora — Bonam Curam.
 * Renderuje oryginalny plik `public/logo.png` (jedyne dopuszczone logo).
 *
 * variant:
 *   'color' — logo w oryginalnych kolorach (na jasnym / neutralnym tle)
 *   'mono'  — biała sylwetka (filter brightness(0) invert(1)) — na ciemnym
 *             tle i jako znak wodny (z obniżoną opacity ustawianą przez rodzica)
 */
export default function Logo({ size = 44, variant = 'color', alt = 'Konsorcjum Bonam Curam', style }) {
  return (
    <img
      src={`${import.meta.env.BASE_URL}logo.png`}
      alt={alt}
      style={{
        width: size,
        height: size,
        objectFit: 'contain',
        display: 'block',
        ...(variant === 'mono' ? { filter: 'brightness(0) invert(1)' } : null),
        ...style,
      }}
    />
  )
}
