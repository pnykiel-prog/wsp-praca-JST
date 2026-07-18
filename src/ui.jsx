/** Powtarzalne elementy UI prezentacji. */
import { Icon } from './icons.jsx'

/* Karta modułu (slajdy „Z czego się składa") */
export function ModCard({ m }) {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #ECE4D3',
        borderRadius: 15,
        padding: '22px 20px',
        boxShadow: '0 10px 30px -22px rgba(20,40,70,.5)',
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: 10,
          background: '#FBF0D2',
          color: '#B07A12',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 15,
        }}
      >
        <Icon d={m.icon} />
      </div>
      <div style={{ fontWeight: 700, color: '#16305A', fontSize: 16, marginBottom: 6 }}>{m.title}</div>
      <div style={{ fontSize: 13.5, color: '#5A6478', lineHeight: 1.45 }}>{m.desc}</div>
    </div>
  )
}

/* Tag-pigułka na ciemnym tle (korzyści) */
export function TagPill({ children, hl }) {
  return (
    <span
      style={{
        fontSize: 13,
        padding: '8px 14px',
        background: hl ? 'rgba(239,176,42,.16)' : 'rgba(255,255,255,.07)',
        border: hl ? '1px solid rgba(239,176,42,.5)' : '1px solid rgba(255,255,255,.13)',
        borderRadius: 999,
        color: hl ? '#F6DFA6' : '#DCE3EE',
        fontWeight: hl ? 700 : 600,
      }}
    >
      {children}
    </span>
  )
}

/* Etykieta sekcji (uppercase, złoto ciemne) na jasnym tle */
export function SectionLabel({ children, style }) {
  return (
    <div
      style={{
        fontSize: 12,
        letterSpacing: '.2em',
        textTransform: 'uppercase',
        fontWeight: 700,
        color: '#B07A12',
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </div>
  )
}

/* Nagłówek slajdu „Dowód/Rozwinięcie": etykieta + badge */
export function ProofHead({ label, badge = 'Rozwinięcie' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
      <span
        style={{
          fontSize: 12,
          letterSpacing: '.2em',
          textTransform: 'uppercase',
          fontWeight: 700,
          color: '#B07A12',
        }}
      >
        {label}
      </span>
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          letterSpacing: '.1em',
          textTransform: 'uppercase',
          padding: '3px 9px',
          background: '#16305A',
          color: '#EFB02A',
          borderRadius: 6,
        }}
      >
        {badge}
      </span>
    </div>
  )
}

/* Wspólny nagłówek H2 slajdów na jasnym tle */
export function H2Light({ children, style }) {
  return (
    <h2
      style={{
        fontFamily: "'Bricolage Grotesque', sans-serif",
        fontWeight: 700,
        fontSize: 38,
        lineHeight: 1.06,
        letterSpacing: '-.02em',
        color: '#16305A',
        margin: '0 0 34px',
        ...style,
      }}
    >
      {children}
    </h2>
  )
}
