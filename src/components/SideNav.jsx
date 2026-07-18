import { navItems } from '../data.js'

/** Boczna nawigacja (fixed, lewo, 150px). Aktywna pozycja wg grupy sekcji. */
export default function SideNav({ activeGroup, onNavigate }) {
  return (
    <nav
      className="side-nav"
      style={{
        position: 'fixed',
        left: 0,
        top: 64,
        bottom: 0,
        width: 188,
        zIndex: 55,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        padding: '22px 12px',
        overflowY: 'auto',
        background: 'transparent',
      }}
    >
      {navItems.map((it) => {
        const on = it.group === activeGroup
        return (
          <button
            key={it.group}
            onClick={() => onNavigate(it.target)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 11,
              width: '100%',
              textAlign: 'left',
              border: 'none',
              background: on ? '#16305A' : 'transparent',
              cursor: 'pointer',
              padding: '9px 11px',
              borderRadius: 9,
              transition: 'background .2s',
            }}
          >
            <span
              style={{
                flex: '0 0 auto',
                width: 9,
                height: 9,
                borderRadius: 2,
                background: on ? '#EFB02A' : '#C9CFDA',
              }}
            />
            <span
              style={{
                fontSize: 13,
                fontWeight: on ? 700 : 500,
                color: on ? '#fff' : '#8A93A5',
                letterSpacing: '.01em',
                lineHeight: 1.2,
              }}
            >
              {it.label}
            </span>
          </button>
        )
      })}
    </nav>
  )
}
