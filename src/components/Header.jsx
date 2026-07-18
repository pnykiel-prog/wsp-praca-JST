import Logo from '../Logo.jsx'

/** Górny pasek (fixed, 64px) — logo, nazwa, przełącznik Krótka/Pełna, licznik. */
export default function Header({ full, onShort, onFull }) {
  const pill = (active) => ({
    border: 'none',
    cursor: 'pointer',
    padding: '6px 16px',
    borderRadius: 999,
    fontSize: 12.5,
    fontWeight: 700,
    fontFamily: 'Manrope, sans-serif',
    transition: 'all .2s',
    ...(active
      ? { background: '#16305A', color: '#EFB02A' }
      : { background: 'transparent', color: '#8A7B58' }),
  })

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 64,
        zIndex: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 28px 0 24px',
        background: 'rgba(251,247,239,.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderBottom: '1px solid #EDE6D6',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <Logo size={44} variant="color" />
        <div style={{ lineHeight: 1.05 }}>
          <div
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: '.02em',
              color: '#16305A',
            }}
          >
            Bonam Curam
          </div>
          <div
            style={{
              fontSize: 10.5,
              letterSpacing: '.16em',
              textTransform: 'uppercase',
              color: '#9AA2B0',
              fontWeight: 600,
            }}
          >
            Wsparcie JST · opieka senioralna
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            background: '#F1EADA',
            border: '1px solid #E4DBC8',
            borderRadius: 999,
            padding: 3,
          }}
        >
          <button onClick={onShort} style={pill(!full)}>
            Krótka
          </button>
          <button onClick={onFull} style={pill(full)}>
            Pełna
          </button>
        </div>
        <div
          className="version-count"
          style={{ fontSize: 11, color: '#9AA2B0', fontWeight: 600, letterSpacing: '.02em' }}
        >
          {full ? '25 sekcji' : '19 sekcji'}
        </div>
      </div>
    </header>
  )
}
