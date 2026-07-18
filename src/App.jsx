import { useEffect, useRef, useState, useCallback } from 'react'
import Header from './components/Header.jsx'
import SideNav from './components/SideNav.jsx'
import Logo from './Logo.jsx'
import { Icon } from './icons.jsx'
import { ModCard, TagPill, SectionLabel, ProofHead, H2Light } from './ui.jsx'
import {
  DiagramDiagnoza,
  DiagramBezpieczny,
  DiagramKampus,
  DiagramDps,
  DiagramWies,
} from './diagrams.jsx'
import {
  areaTiles,
  mods01,
  mods02,
  mods03,
  mods04,
  mods05,
  rows05,
  montages,
  montageOptDefs,
  instruments,
  montageExamples,
} from './data.js'

/* ===== Tła slajdów ===== */
const BG_PROBLEM = 'radial-gradient(120% 120% at 85% 15%, #1B3A63 0%, #14294A 48%, #0E1F3B 100%)'
const BG_COMPOSE = 'radial-gradient(rgba(22,48,90,.05) 1.2px, transparent 1.2px) 0 0/24px 24px, #FBF7EF'
const BG_PROOF = 'radial-gradient(rgba(176,122,18,.08) 1.2px, transparent 1.2px) 0 0/24px 24px, #FBF3DF'
const FONT_DISPLAY = "'Bricolage Grotesque', sans-serif"

/* ===== Wideo (YouTube) =====
 * Wklej tutaj ID filmu z YouTube — jedyna wartość do podmiany.
 * ID to część adresu po „v=" (np. https://www.youtube.com/watch?v=dQw4w9WgXcQ)
 * lub po „youtu.be/". Pusta wartość = na slajdzie widać placeholder.
 */
const YOUTUBE_ID = 'kKnJ7Dj0Msc'

/* ===== Slajd „Problem" (obszary 01–05) ===== */
function ProblemSlide({ id, group, num, subtitle, problem, heading, tags, note, diagram }) {
  return (
    <section
      id={id}
      data-nav-group={group}
      className="slide"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '104px 96px 84px 210px',
        background: BG_PROBLEM,
        color: '#F4EEE1',
      }}
    >
      <div
        className="split"
        style={{
          maxWidth: 1120,
          width: '100%',
          display: 'grid',
          gridTemplateColumns: '1fr .82fr',
          gap: 56,
          alignItems: 'center',
        }}
      >
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 14px',
              border: '1px solid rgba(239,176,42,.4)',
              borderRadius: 999,
              marginBottom: 24,
            }}
          >
            <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 13, letterSpacing: '.14em', color: '#EFB02A' }}>
              OBSZAR {num}
            </span>
            <span style={{ fontSize: 12.5, color: '#C4CEDD', letterSpacing: '.03em' }}>{subtitle}</span>
          </div>
          <div style={{ fontSize: 14, color: '#EFB02A', fontWeight: 700, marginBottom: 12, letterSpacing: '.02em' }}>
            Problem
          </div>
          <p style={{ fontSize: 18, color: '#C4CEDD', lineHeight: 1.5, margin: '0 0 26px', maxWidth: 520 }}>{problem}</p>
          <h2
            style={{
              fontFamily: FONT_DISPLAY,
              fontWeight: 700,
              fontSize: 40,
              lineHeight: 1.08,
              letterSpacing: '-.02em',
              margin: '0 0 28px',
              maxWidth: 560,
            }}
          >
            {heading}
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: note ? 22 : 0 }}>
            {tags.map((t, i) => (
              <TagPill key={i} hl={typeof t === 'object' && t.hl}>
                {typeof t === 'object' ? t.t : t}
              </TagPill>
            ))}
          </div>
          {note && (
            <div style={{ fontSize: 13, color: '#8FA0B8', fontStyle: 'italic', maxWidth: 500 }}>{note}</div>
          )}
        </div>
        <div>{diagram}</div>
      </div>
    </section>
  )
}

/* ===== Slajd „Z czego się składa" (obszary 01–05) ===== */
function ComposeSlide({ id, group, label, heading, mods, note }) {
  return (
    <section
      id={id}
      data-nav-group={group}
      className="slide"
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        padding: '104px 96px 84px 210px',
        background: BG_COMPOSE,
      }}
    >
      <div style={{ maxWidth: 1120, width: '100%' }}>
        <SectionLabel>{label}</SectionLabel>
        <H2Light>{heading}</H2Light>
        <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
          {mods.map((m, i) => (
            <ModCard key={i} m={m} />
          ))}
        </div>
        <div style={{ marginTop: 24, fontSize: 13.5, color: '#8A93A5', fontStyle: 'italic' }}>{note}</div>
      </div>
    </section>
  )
}

/* ===== Wrapper slajdu „Dowód/Rozwinięcie" (chowany w wersji krótkiej) ===== */
function ProofSection({ id, group, full, maxWidth = 1120, children }) {
  return (
    <section
      id={id}
      data-nav-group={group}
      className="slide"
      style={{
        position: 'relative',
        display: full ? 'flex' : 'none',
        alignItems: 'center',
        padding: '104px 96px 84px 210px',
        background: BG_PROOF,
      }}
    >
      <div style={{ maxWidth, width: '100%' }}>{children}</div>
    </section>
  )
}

export default function App() {
  const [full, setFull] = useState(true)
  const [beds, setBeds] = useState(50)
  const [scope, setScope] = useState(100)
  const [montageKey, setMontageKey] = useState('kampus')
  const [activeGroup, setActiveGroup] = useState('start')
  const obsRef = useRef(null)

  const goTo = useCallback((id) => {
    const el = document.getElementById(id)
    if (el) window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })
  }, [])

  // Podświetlanie nawigacji wg widocznej sekcji.
  useEffect(() => {
    const t = setTimeout(() => {
      const secs = [...document.querySelectorAll('section[data-nav-group]')]
      if (!secs.length) return
      const obs = new IntersectionObserver(
        (entries) => {
          entries.forEach((e) => {
            if (e.isIntersecting && e.intersectionRatio >= 0.4) {
              setActiveGroup(e.target.getAttribute('data-nav-group'))
            }
          })
        },
        { threshold: [0.4, 0.6] },
      )
      secs.forEach((s) => obs.observe(s))
      obsRef.current = obs
    }, 60)
    return () => {
      clearTimeout(t)
      if (obsRef.current) obsRef.current.disconnect()
    }
  }, [full])

  // ===== Kalkulator oszczędności =====
  const f = (beds * scope) / 100
  const media = Math.round(2000 * f)
  const admin = Math.round(600 * f)
  const sprzat = Math.round(3000 * f)
  const total = media + admin + sprzat
  const fmt = (n) => n.toLocaleString('pl-PL').replace(/,/g, ' ')
  const adminEt = (0.01 * f).toFixed(1).replace('.', ',')
  const sprzatEt = (0.06 * f).toFixed(1).replace('.', ',')

  // ===== Montaż finansowy =====
  const cur = montages[montageKey]

  return (
    <>
      <Header full={full} onShort={() => setFull(false)} onFull={() => setFull(true)} />
      <SideNav activeGroup={activeGroup} onNavigate={goTo} />

      <main>
        {/* ===== s1 — Tytuł ===== */}
        <section
          id="s1"
          data-nav-group="start"
          className="slide"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '96px 96px 96px 210px',
            background: 'radial-gradient(120% 120% at 82% 18%, #1B3A63 0%, #14294A 46%, #0E1F3B 100%)',
            color: '#F4EEE1',
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -60,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 560,
              height: 560,
              opacity: 0.09,
              pointerEvents: 'none',
            }}
          >
            <Logo size="100%" variant="mono" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'relative', maxWidth: 920, animation: 'fadeUp .7s ease both' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '7px 15px',
                border: '1px solid rgba(239,176,42,.4)',
                borderRadius: 999,
                marginBottom: 30,
              }}
            >
              <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#EFB02A' }} />
              <span style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, color: '#EFB02A' }}>
                Konsorcjum na rzecz seniora
              </span>
            </div>
            <h1
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 800,
                fontSize: 64,
                lineHeight: 1.03,
                letterSpacing: '-.02em',
                margin: '0 0 22px',
                textWrap: 'balance',
              }}
            >
              Kompleksowe wsparcie JST
              <br />w opiece <span style={{ color: '#EFB02A' }}>senioralnej</span>
            </h1>
            <p style={{ fontSize: 20, lineHeight: 1.5, color: '#C4CEDD', maxWidth: 660, margin: '0 0 38px' }}>
              Narzędzia cyfrowe · infrastruktura · współpraca publiczno-prywatna · finansowanie zewnętrzne. Jeden
              partner na cały łańcuch — od diagnozy po rozliczenie.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 11,
                }}
              >
                <strong style={{ color: '#EFB02A', fontFamily: FONT_DISPLAY, fontSize: 17 }}>6</strong>
                <span style={{ fontSize: 13.5, color: '#DCE3EE', fontWeight: 600 }}>obszarów wsparcia</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 11,
                }}
              >
                <span style={{ fontSize: 13.5, color: '#DCE3EE', fontWeight: 600 }}>Zgodność z deinstytucjonalizacją</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 9,
                  padding: '10px 16px',
                  background: 'rgba(255,255,255,.06)',
                  border: '1px solid rgba(255,255,255,.12)',
                  borderRadius: 11,
                }}
              >
                <span style={{ fontSize: 13.5, color: '#DCE3EE', fontWeight: 600 }}>Finansowanie zewnętrzne</span>
              </div>
            </div>
          </div>
          <button
            onClick={() => goTo('s2')}
            style={{
              position: 'absolute',
              left: '50%',
              bottom: 34,
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 6,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: 'rgba(244,238,225,.7)',
              animation: 'bob 2s ease-in-out infinite',
            }}
          >
            <span style={{ fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', fontWeight: 600 }}>
              Przewiń
            </span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </section>

        {/* ===== Wideo (YouTube) ===== */}
        <section
          id="svideo"
          data-nav-group="video"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '104px 96px 84px 210px',
            background: 'radial-gradient(120% 120% at 50% 15%, #1B3A63 0%, #14294A 50%, #0E1F3B 100%)',
            color: '#F4EEE1',
          }}
        >
          <div style={{ maxWidth: 1000, width: '100%', margin: '0 auto' }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, color: '#EFB02A', marginBottom: 14 }}>
              Wideo
            </div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.05,
                letterSpacing: '-.02em',
                margin: '0 0 28px',
                maxWidth: 760,
              }}
            >
              Zobacz prezentację
            </h2>
            <div
              style={{
                position: 'relative',
                width: '100%',
                aspectRatio: '16 / 9',
                borderRadius: 18,
                overflow: 'hidden',
                border: '1px solid rgba(255,255,255,.12)',
                boxShadow: '0 30px 60px -34px rgba(0,0,0,.6)',
                background: '#0B1626',
              }}
            >
              {YOUTUBE_ID ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${YOUTUBE_ID}?rel=0`}
                  title="Prezentacja Bonam Curam"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 'none' }}
                />
              ) : (
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 16,
                    background: 'rgba(255,255,255,.04)',
                    color: '#AEB9CB',
                    textAlign: 'center',
                    padding: 24,
                  }}
                >
                  <div
                    style={{
                      width: 74,
                      height: 74,
                      borderRadius: '50%',
                      border: '2px solid #EFB02A',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#EFB02A',
                    }}
                  >
                    <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <div style={{ fontSize: 14, lineHeight: 1.5, maxWidth: 420 }}>
                    Wideo — do uzupełnienia. Wklej ID filmu YouTube w stałej{' '}
                    <code style={{ color: '#F4EEE1' }}>YOUTUBE_ID</code> (plik <code style={{ color: '#F4EEE1' }}>src/App.jsx</code>).
                  </div>
                </div>
              )}
            </div>
            <div style={{ marginTop: 18, fontSize: 12.5, color: '#8FA0B8', lineHeight: 1.5 }}>
              Film hostowany na YouTube (osadzenie w trybie prywatności rozszerzonej — bez ciasteczek do momentu odtworzenia).
            </div>
          </div>
        </section>

        {/* ===== s2 — Wyzwanie ===== */}
        <section
          id="s2"
          data-nav-group="wyzw"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '110px 96px 90px 210px',
            background: '#FBF7EF',
          }}
        >
          <div style={{ maxWidth: 1100 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <span style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, color: '#B07A12' }}>
                Wyzwanie demograficzne
              </span>
            </div>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.06,
                letterSpacing: '-.02em',
                color: '#16305A',
                margin: '0 0 14px',
              }}
            >
              Presja rośnie szybciej niż budżety i kadry
            </h2>
            <p style={{ fontSize: 17, color: '#5A6478', maxWidth: 720, margin: '0 0 44px', lineHeight: 1.55 }}>
              Więcej osób niesamodzielnych → więcej świadczeń, skierowań i interwencji → presja na budżet i kadry.
              Dane o potrzebach są rozproszone między instytucjami.
            </p>
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 18 }}>
              {[
                { big: <>~26%</>, desc: <>mieszkańców to osoby <strong style={{ color: '#16305A' }}>60+</strong></> },
                {
                  big: <>6–8<span style={{ fontSize: 20, color: '#8A93A5' }}> tys.</span></>,
                  desc: <>zł/mies. koszt utrzymania w <strong style={{ color: '#16305A' }}>DPS</strong></>,
                },
                { big: <>dziesiątki</>, desc: <><strong style={{ color: '#16305A' }}>km</strong> do placówki na terenach wiejskich</> },
                {
                  big: <>dane</>,
                  desc: <><strong style={{ color: '#16305A' }}>rozproszone</strong> między OPS, POZ, ZUS, placówkami, NGO</>,
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: '#fff',
                    border: '1px solid #ECE4D3',
                    borderRadius: 16,
                    padding: '26px 22px',
                    boxShadow: '0 10px 30px -20px rgba(20,40,70,.4)',
                  }}
                >
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 42, color: '#16305A', lineHeight: 1 }}>
                    {c.big}
                  </div>
                  <div style={{ height: 3, width: 34, background: '#EFB02A', borderRadius: 2, margin: '14px 0' }} />
                  <div style={{ fontSize: 14, color: '#5A6478', lineHeight: 1.4, fontWeight: 500 }}>{c.desc}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 30, fontSize: 13.5, color: '#8A93A5', fontStyle: 'italic' }}>
              Organizowanie usług opiekuńczych to obowiązkowe zadanie własne gminy (ustawa o pomocy społecznej).
            </div>
          </div>
        </section>

        {/* ===== s3 — Kierunek (DI) ===== */}
        <section
          id="s3"
          data-nav-group="kier"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '110px 96px 90px 210px',
            background: '#FBF7EF',
          }}
        >
          <div style={{ maxWidth: 1120, width: '100%' }}>
            <SectionLabel style={{ marginBottom: 16 }}>Deinstytucjonalizacja</SectionLabel>
            <h2
              style={{
                fontFamily: FONT_DISPLAY,
                fontWeight: 700,
                fontSize: 44,
                lineHeight: 1.06,
                letterSpacing: '-.02em',
                color: '#16305A',
                margin: '0 0 40px',
                maxWidth: 900,
              }}
            >
              Kierunek finansowania przesunął się w stronę opieki w środowisku
            </h2>
            <div className="split" style={{ display: 'grid', gridTemplateColumns: '1.1fr .9fr', gap: 44, alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[
                  ['1', 'Priorytet usług środowiskowych', 'Projekty w środowisku mają pierwszeństwo i krótszy czas realizacji w naborach.'],
                  ['2', 'Rzetelna diagnoza jako warunek', 'Diagnoza potrzeb to formalny wymóg większości wniosków o dofinansowanie.'],
                  ['3', 'Gmina realizuje politykę państwa', 'Zgodność z DI to mocny argument formalny przed instytucją finansującą i radą.'],
                ].map(([n, t, d]) => (
                  <div
                    key={n}
                    style={{
                      display: 'flex',
                      gap: 16,
                      alignItems: 'flex-start',
                      background: '#fff',
                      border: '1px solid #ECE4D3',
                      borderRadius: 14,
                      padding: '20px 22px',
                    }}
                  >
                    <span
                      style={{
                        flex: '0 0 auto',
                        width: 34,
                        height: 34,
                        borderRadius: 9,
                        background: '#FBF0D2',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: FONT_DISPLAY,
                        fontWeight: 800,
                        color: '#B07A12',
                      }}
                    >
                      {n}
                    </span>
                    <div>
                      <div style={{ fontWeight: 700, color: '#16305A', fontSize: 16, marginBottom: 3 }}>{t}</div>
                      <div style={{ fontSize: 14, color: '#5A6478', lineHeight: 1.45 }}>{d}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={{
                  background: 'radial-gradient(120% 120% at 80% 20%, #1B3A63, #0E1F3B)',
                  borderRadius: 20,
                  padding: '40px 36px',
                  color: '#F4EEE1',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <svg width="46" height="46" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.9, marginBottom: 18 }}>
                  <path
                    d="M10 11H6a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v6c0 2.5-1.5 4-4 4M20 11h-4a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2v6c0 2.5-1.5 4-4 4"
                    stroke="#EFB02A"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 26, lineHeight: 1.25, letterSpacing: '-.01em' }}>
                  Diagnoza to nie koszt — to ubezpieczenie każdej złotówki publicznej.
                </div>
                <div style={{ marginTop: 22, fontSize: 13, letterSpacing: '.06em', color: '#EFB02A', fontWeight: 700, textTransform: 'uppercase' }}>
                  Konsorcjum Bonam Curam
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== s4 — Mapa 6 obszarów ===== */}
        <section
          id="s4"
          data-nav-group="mapa"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '104px 96px 84px 210px',
            background: 'radial-gradient(120% 120% at 15% 12%, #1B3A63 0%, #14294A 50%, #0E1F3B 100%)',
            color: '#F4EEE1',
          }}
        >
          <div style={{ maxWidth: 1160, width: '100%' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: 16,
                marginBottom: 32,
              }}
            >
              <div>
                <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, color: '#EFB02A', marginBottom: 14 }}>
                  Konsorcjum jako integrator
                </div>
                <h2
                  style={{
                    fontFamily: FONT_DISPLAY,
                    fontWeight: 700,
                    fontSize: 44,
                    lineHeight: 1.05,
                    letterSpacing: '-.02em',
                    margin: 0,
                    maxWidth: 720,
                  }}
                >
                  Jeden partner — od diagnozy po rozliczenie
                </h2>
              </div>
              <div style={{ fontSize: 13.5, color: '#AEB9CB', maxWidth: 300, lineHeight: 1.5 }}>
                Kliknij kafel, aby przejść do obszaru →
              </div>
            </div>
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16 }}>
              {areaTiles.map((a) => (
                <button
                  key={a.num}
                  className="area-tile"
                  onClick={() => goTo(a.target)}
                  style={{
                    textAlign: 'left',
                    cursor: 'pointer',
                    border: '1px solid rgba(255,255,255,.13)',
                    background: 'rgba(255,255,255,.05)',
                    borderRadius: 16,
                    padding: '24px 22px',
                    color: '#F4EEE1',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                    <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 15, letterSpacing: '.14em', color: '#EFB02A' }}>
                      {a.num}
                    </span>
                    <span style={{ color: '#EFB02A' }}>
                      <Icon d={a.icon} />
                    </span>
                  </div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 19, lineHeight: 1.15, marginBottom: 8 }}>
                    {a.title}
                  </div>
                  <div style={{ fontSize: 13, color: '#AEB9CB', lineHeight: 1.45 }}>{a.desc}</div>
                </button>
              ))}
            </div>
            <div style={{ marginTop: 26, fontSize: 13.5, color: '#AEB9CB', fontStyle: 'italic', lineHeight: 1.5, maxWidth: 820 }}>
              Inaczej wygląda opieka nad seniorem w mieszkaniu (02, 05), a inaczej placówka typu DPS (03, 04) — nie
              mieszamy tych światów.
            </div>
          </div>
        </section>

        {/* ===== OBSZAR 01 — Diagnoza ===== */}
        <ProblemSlide
          id="s5"
          group="a01"
          num="01"
          subtitle="Diagnoza potrzeb opiekuńczych"
          problem="Dane o potrzebach są rozproszone i szybko się dezaktualizują — trudno precyzyjnie planować usługi i pisać wnioski."
          heading="Twarde dane pod każdą decyzję opiekuńczą"
          tags={['Jeden aktualny obraz potrzeb', 'Krótszy czas oceny i raportu', 'Trafniejsze kierowanie wsparcia', 'Gotowa diagnoza pod wnioski']}
          diagram={<DiagramDiagnoza />}
        />
        <ComposeSlide
          id="s6"
          group="a01"
          label="Obszar 01 · Z czego się składa"
          heading="Aplikacja do diagnozy potrzeb"
          mods={mods01}
          note="Dane wprowadza cała sieć otoczenia seniora — senior, rodzina, POZ, OPS, NGO — nie tylko OPS. Integracje/API z lokalnymi systemami."
        />
        <ProofSection id="s7" group="a01" full={full}>
          <ProofHead label="Obszar 01 · Jak to działa" />
          <H2Light style={{ margin: '0 0 34px' }}>Trzy kroki od ankiety do decyzji</H2Light>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 0, marginBottom: 36, position: 'relative' }} className="grid-3">
            {[
              ['KROK 1', 'Wypełnienie', 'Ankieta online wypełniana przez seniora, rodzinę, POZ, OPS, NGO.', '0 28px 0 0', false],
              ['KROK 2', 'Ocena', 'Automatyczne przeliczenie odpowiedzi na poziom potrzeb (ADL/IADL).', '0 28px', true],
              ['KROK 3', 'Wynik', 'Raport + dane zbiorcze + wskazanie wolnych miejsc w placówkach.', '0 0 0 28px', true],
            ].map(([k, t, d, pad, border]) => (
              <div key={k} style={{ padding: pad, borderLeft: border ? '1px dashed #D9CFB6' : 'none', position: 'relative' }}>
                <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 15, color: '#EFB02A', letterSpacing: '.12em', marginBottom: 12 }}>
                  {k}
                </div>
                <div style={{ fontWeight: 700, color: '#16305A', fontSize: 18, marginBottom: 8 }}>{t}</div>
                <div style={{ fontSize: 14, color: '#5A6478', lineHeight: 1.5 }}>{d}</div>
              </div>
            ))}
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#16305A', color: '#F4EEE1', borderRadius: 15, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 44, color: '#EFB02A', lineHeight: 1 }}>do 100%</div>
              <div style={{ fontSize: 14, color: '#C4CEDD', lineHeight: 1.45 }}>
                finansowania diagnozy możliwe ze środków <strong style={{ color: '#fff' }}>EFS+</strong>
              </div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 15, padding: '26px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 44, color: '#16305A', lineHeight: 1 }}>
                ~54<span style={{ fontSize: 20, color: '#8A93A5' }}> tys.</span>
              </div>
              <div style={{ fontSize: 14, color: '#5A6478', lineHeight: 1.45 }}>
                zł/rok różnicy między <strong style={{ color: '#16305A' }}>DPS a usługami środowiskowymi</strong> (przykładowo)
              </div>
            </div>
          </div>
        </ProofSection>

        {/* ===== OBSZAR 02 — Bezpieczny senior ===== */}
        <ProblemSlide
          id="s8"
          group="a02"
          num="02"
          subtitle="Bezpieczny senior — monitoring w mieszkaniach"
          problem="Samotny senior często nie jest w stanie sam wezwać pomocy — przycisk SOS wymaga przytomności."
          heading="Opieka nad samotnym seniorem — bez naruszania prywatności"
          tags={['Szybsza reakcja bez udziału seniora', 'Obchody krótsze i celowane', 'Bez obrazu wideo (RODO)', 'Dokumentacja zdarzeń']}
          note="Zakres: mieszkania rozproszone — lokale wspomagane, COM, mieszkania gminne i prywatne (nie DPS)."
          diagram={<DiagramBezpieczny />}
        />
        <ComposeSlide
          id="s9"
          group="a02"
          label="Obszar 02 · Z czego się składa"
          heading="System bezpieczeństwa w mieszkaniu"
          mods={mods02}
          note={'Integracja z opieką środowiskową MOPS; opcjonalnie teleopieka i przycisk SOS. „Bez obrazu wideo" to sedno akceptacji przez seniorów i rodziny.'}
        />
        <ProofSection id="s10" group="a02" full={full}>
          <ProofHead label="Obszar 02 · Prywatność, reakcja, skala" />
          <H2Light style={{ margin: '0 0 34px' }}>Reaguje sam — zanim będzie za późno</H2Light>
          <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, marginBottom: 32 }}>
            {[
              ['Prywatność', 'Obraz przetwarzany lokalnie — na zewnątrz wychodzi tylko zdarzenie.', 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z'],
              ['Reakcja', 'Alert trafia jednocześnie do dyspozytora i opiekuna w terenie.', 'M13 2L3 14h7l-1 8 10-12h-7z'],
              ['Skala', null, 'M3 21h18M5 21V8l4-3M9 21V5l6-3v19M15 21V9l4 3v9'],
            ].map(([t, d, icon], i) => (
              <div key={t} style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 15, padding: '24px 22px' }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 11,
                    background: '#FBF0D2',
                    color: '#B07A12',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 14,
                  }}
                >
                  <Icon d={icon} />
                </div>
                <div style={{ fontWeight: 700, color: '#16305A', fontSize: 17, marginBottom: 7 }}>{t}</div>
                <div style={{ fontSize: 13.5, color: '#5A6478', lineHeight: 1.5 }}>
                  {i === 2 ? (
                    <>Od kilku do <strong style={{ color: '#16305A' }}>200+</strong> lokali w jednej gminie.</>
                  ) : (
                    d
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            <div style={{ background: '#16305A', color: '#F4EEE1', borderRadius: 15, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 44, color: '#EFB02A', lineHeight: 1 }}>~70%</div>
              <div style={{ fontSize: 14, color: '#C4CEDD', lineHeight: 1.45 }}>mniej interwencji reaktywnych (przykładowo)</div>
            </div>
            <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 15, padding: '24px 28px', display: 'flex', alignItems: 'center', gap: 22 }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 44, color: '#16305A', lineHeight: 1 }}>24/7</div>
              <div style={{ fontSize: 14, color: '#5A6478', lineHeight: 1.45 }}>
                bez kamer osobowych. Model <strong style={{ color: '#16305A' }}>SaaS</strong> — koszty kwalifikowane do EFS+/FEW.
              </div>
            </div>
          </div>
        </ProofSection>

        {/* ===== OBSZAR 03 — Kampusy ===== */}
        <ProblemSlide
          id="s11"
          group="a03"
          num="03"
          subtitle="Zintegrowane kampusy senioralne"
          problem="Budowa infrastruktury opiekuńczej jest długa, kosztowna i skomplikowana prawnie."
          heading="Infrastruktura opiekuńcza — od projektu do rozliczenia"
          tags={[
            'Budowa bez własnych kompetencji projektowych',
            { t: 'Niemal pełne pokrycie kosztów', hl: true },
            'Mniej ryzyka przetargowego',
            'Jedna linia odpowiedzialności',
          ]}
          diagram={<DiagramKampus />}
        />
        <ComposeSlide
          id="s12"
          group="a03"
          label="Obszar 03 · Z czego się składa"
          heading="Kampus to zespół funkcji, nie jeden budynek"
          mods={mods03}
          note="Opcjonalnie miejsca opieki całodobowej dla najwyższych potrzeb (stopniowanie opieki). Pakiet realizacyjny = montaż finansowy, dokumentacja, zamówienia, nadzór, rozliczenie."
        />
        <ProofSection id="s13" group="a03" full={full}>
          <ProofHead label="Obszar 03 · Jak sfinansować budowę" />
          <H2Light style={{ margin: '0 0 32px', maxWidth: 820 }}>
            Budowa finansowana ze społecznego budownictwa mieszkaniowego
          </H2Light>
          <div className="split" style={{ display: 'grid', gridTemplateColumns: '.9fr 1.1fr', gap: 24, alignItems: 'stretch' }}>
            <div
              style={{
                background: 'radial-gradient(120% 120% at 80% 20%, #1B3A63, #0E1F3B)',
                borderRadius: 18,
                padding: '34px 32px',
                color: '#F4EEE1',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 72, lineHeight: 1, color: '#EFB02A' }}>do 95%</div>
              <div style={{ fontSize: 16, color: '#DCE3EE', marginTop: 14, lineHeight: 1.5 }}>
                wartości przedsięwzięcia — <strong style={{ color: '#fff' }}>bezzwrotne</strong> wsparcie z Funduszu Dopłat (BGK).
              </div>
              <div style={{ marginTop: 20, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.15)', fontSize: 13.5, color: '#AEB9CB', lineHeight: 1.5 }}>
                Obejmuje infrastrukturę towarzyszącą — stołówkę, świetlicę, rehabilitację, części wspólne.
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <div style={{ fontSize: 14, color: '#8A7B58', fontWeight: 700, letterSpacing: '.04em', textTransform: 'uppercase' }}>
                Dla skarbnika
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12 }} className="grid-3">
                {['Bezzwrotne', 'Bez oceny zdolności kredytowej', 'Bez obciążania długu gminy'].map((t) => (
                  <div key={t} style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 13, padding: '20px 16px', textAlign: 'center' }}>
                    <div style={{ color: '#2E7D4F', marginBottom: 8 }}>
                      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" style={{ display: 'inline' }}>
                        <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div style={{ fontSize: 13.5, fontWeight: 700, color: '#16305A' }}>{t}</div>
                  </div>
                ))}
              </div>
              <div style={{ background: '#FDF6E3', border: '1px solid #F0E2BC', borderRadius: 13, padding: '18px 20px', fontSize: 13.5, color: '#7A6A3E', lineHeight: 1.5 }}>
                <strong style={{ color: '#16305A' }}>Kontekst 2026:</strong> rekordowe środki na budownictwo społeczne i
                komunalne. Po połączeniu z premią termomodernizacyjną i PFRON montaż zbliża się do pełnego pokrycia
                budowy.
              </div>
            </div>
          </div>
        </ProofSection>

        {/* ===== OBSZAR 04 — Oszczędności DPS ===== */}
        <ProblemSlide
          id="s14"
          group="a04"
          num="04"
          subtitle="Oszczędności w placówkach (DPS)"
          problem={'Placówki działają pod presją kosztów i braków kadrowych — nie da się „ciąć etatów", bo kadry brakuje.'}
          heading="Nie cięcia — żeby ta sama złotówka robiła więcej"
          tags={['Niższe koszty mediów bez obniżania standardu', 'Mniej pracy bezproduktywnej', 'Wcześniejsze wykrywanie incydentów', 'Decyzje na danych']}
          diagram={<DiagramDps />}
        />
        <ComposeSlide
          id="s15"
          group="a04"
          label="Obszar 04 · Pięć modułów optymalizacji"
          heading="System nie zastępuje personelu — daje mu narzędzia"
          mods={mods04}
          note="Moduły dobierane pod konkretny obiekt — wdraża się te, które dadzą największy efekt."
        />
        <ProofSection id="s16" group="a04" full={full}>
          <ProofHead label="Obszar 04 · Ile to daje" badge="Interaktywne" />
          <H2Light style={{ margin: '0 0 30px' }}>Kalkulator przykładowych oszczędności</H2Light>
          <div className="split" style={{ display: 'grid', gridTemplateColumns: '.85fr 1.15fr', gap: 26, alignItems: 'stretch' }}>
            <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 18, padding: '30px 30px' }}>
              <div style={{ marginBottom: 30 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#16305A' }}>Liczba łóżek w DPS</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, color: '#B07A12' }}>{beds}</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={beds}
                  onChange={(e) => setBeds(+e.target.value)}
                  style={{ width: '100%', accentColor: '#EFB02A', height: 6 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#A6A08C', marginTop: 6 }}>
                  <span>20</span>
                  <span>200</span>
                </div>
              </div>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#16305A' }}>Zakres wdrożenia</span>
                  <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 24, color: '#B07A12' }}>{scope}%</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="100"
                  step="5"
                  value={scope}
                  onChange={(e) => setScope(+e.target.value)}
                  style={{ width: '100%', accentColor: '#EFB02A', height: 6 }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: '#A6A08C', marginTop: 6 }}>
                  <span>część modułów</span>
                  <span>pełne</span>
                </div>
              </div>
              <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid #EFE7D6', fontSize: 12, color: '#A6A08C', lineHeight: 1.5, fontStyle: 'italic' }}>
                Założenia poglądowe. Pokazujemy wyłącznie stronę korzyści — bez kosztów wdrożenia.
              </div>
            </div>
            <div
              style={{
                background: 'radial-gradient(120% 120% at 82% 12%, #1B3A63, #0E1F3B)',
                borderRadius: 18,
                padding: '30px 34px',
                color: '#F4EEE1',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <div style={{ fontSize: 13, letterSpacing: '.14em', textTransform: 'uppercase', color: '#8FA0B8', fontWeight: 700 }}>
                Przykładowy efekt roczny
              </div>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 64, lineHeight: 1, color: '#EFB02A', margin: '10px 0 4px' }}>
                {fmt(total)}
                <span style={{ fontSize: 26, color: '#C4CEDD', fontWeight: 700 }}> zł/rok</span>
              </div>
              <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 12, marginTop: 26 }}>
                <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#AEB9CB', marginBottom: 8 }}>Media</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22, color: '#fff' }}>{fmt(media)}</div>
                  <div style={{ fontSize: 11, color: '#8FA0B8', marginTop: 4 }}>zł/rok</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#AEB9CB', marginBottom: 8 }}>Administracja</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22, color: '#fff' }}>{adminEt}</div>
                  <div style={{ fontSize: 11, color: '#8FA0B8', marginTop: 4 }}>etatu / {fmt(admin)} zł</div>
                </div>
                <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 12, padding: 16 }}>
                  <div style={{ fontSize: 12, color: '#AEB9CB', marginBottom: 8 }}>Sprzątanie</div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 22, color: '#fff' }}>{sprzatEt}</div>
                  <div style={{ fontSize: 11, color: '#8FA0B8', marginTop: 4 }}>etaty / {fmt(sprzat)} zł</div>
                </div>
              </div>
              <div style={{ marginTop: 'auto', paddingTop: 22, fontSize: 12.5, color: '#AEB9CB', lineHeight: 1.5 }}>
                + korzyści dodatkowe: pakiety premium, mniej roszczeń, lepsza pozycja wobec płatników.
              </div>
            </div>
          </div>
        </ProofSection>

        {/* ===== OBSZAR 05 — Tereny wiejskie ===== */}
        <ProblemSlide
          id="s17"
          group="a05"
          num="05"
          subtitle="Opieka na terenach wiejskich"
          problem="W tysiącach wsi nie ma żadnej opieki, a budowa domu seniora jest nieopłacalna."
          heading="Opieka tam, gdzie jej nie było — bez budowy od zera"
          tags={['Senior zostaje w swojej miejscowości', 'Nowe miejsca pracy', 'Zasiedlanie pustych domów', 'Szybki start i odwracalność']}
          diagram={<DiagramWies />}
        />
        <ComposeSlide
          id="s18"
          group="a05"
          label="Obszar 05 · Z czego się składa"
          heading="System opieki wiejskiej"
          mods={mods05}
          note="Adaptacja domów może korzystać z Funduszu Dopłat (BGK) — CAPEX również na wsi. Przy OSP obowiązuje zasada rozdzielności księgowej."
        />
        <ProofSection id="s19" group="a05" full={full} maxWidth={1000}>
          <ProofHead label="Obszar 05 · Dlaczego adaptacja" />
          <H2Light style={{ margin: '0 0 30px' }}>Adaptacja domów, a nie budowa instytucji</H2Light>
          <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 18, overflow: 'hidden', boxShadow: '0 14px 40px -28px rgba(20,40,70,.5)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr' }}>
              <div style={{ padding: '18px 26px', fontSize: 12, letterSpacing: '.1em', textTransform: 'uppercase', fontWeight: 700, color: '#8A93A5' }}>
                Kryterium
              </div>
              <div style={{ padding: '18px 22px', background: '#16305A', color: '#EFB02A', fontWeight: 800, fontFamily: FONT_DISPLAY, fontSize: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                Adaptacja
              </div>
              <div style={{ padding: '18px 22px', fontWeight: 700, color: '#8A93A5', fontSize: 15, display: 'flex', alignItems: 'center' }}>
                Budowa klasyczna
              </div>
            </div>
            {rows05.map((r) => (
              <div key={r.k} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderTop: '1px solid #F0E8D8' }}>
                <div style={{ padding: '16px 26px', fontWeight: 600, color: '#16305A', fontSize: 14.5 }}>{r.k}</div>
                <div style={{ padding: '16px 22px', background: '#FCF6E6', color: '#16305A', fontWeight: 700, fontSize: 14.5 }}>{r.a}</div>
                <div style={{ padding: '16px 22px', color: '#8A93A5', fontSize: 14.5 }}>{r.b}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 20, fontSize: 13.5, color: '#8A93A5', fontStyle: 'italic' }}>
            Start od 1–2 domów (pilotaż), rozbudowa po potwierdzeniu efektów. Forma prawna uzgadniana z wojewodą i
            prawnikiem.
          </div>
        </ProofSection>

        {/* ===== OBSZAR 06 — Finansowanie ===== */}
        <section
          id="s20"
          data-nav-group="a06"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '104px 96px 84px 210px',
            background: BG_PROBLEM,
            color: '#F4EEE1',
          }}
        >
          <div style={{ maxWidth: 1000, width: '100%' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '6px 14px',
                border: '1px solid rgba(239,176,42,.4)',
                borderRadius: 999,
                marginBottom: 26,
              }}
            >
              <span style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 13, letterSpacing: '.14em', color: '#EFB02A' }}>
                OBSZAR 06
              </span>
              <span style={{ fontSize: 12.5, color: '#C4CEDD', letterSpacing: '.03em' }}>Jak to wszystko sfinansować</span>
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, lineHeight: 1.06, letterSpacing: '-.02em', margin: '0 0 22px', maxWidth: 760 }}>
              Źródła się uzupełniają, nie wykluczają
            </h2>
            <p style={{ fontSize: 18, color: '#C4CEDD', lineHeight: 1.55, margin: '0 0 34px', maxWidth: 640 }}>
              Poruszanie się po programach, naborach i rozliczeniach jest czasochłonne i ryzykowne — dlatego cały cykl
              bierze na siebie Konsorcjum.
            </p>
            <div className="grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 16, maxWidth: 820 }}>
              <div style={{ background: 'rgba(239,176,42,.12)', border: '1px solid rgba(239,176,42,.45)', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontWeight: 700, color: '#F6DFA6', fontSize: 15, marginBottom: 6 }}>To nie projekt IT</div>
                <div style={{ fontSize: 13, color: '#C4CEDD', lineHeight: 1.45 }}>To narzędzie wykonywania zadania własnego.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.13)', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 6 }}>Niewielki wkład własny</div>
                <div style={{ fontSize: 13, color: '#C4CEDD', lineHeight: 1.45 }}>Pełne finansowanie z wielu źródeł.</div>
              </div>
              <div style={{ background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.13)', borderRadius: 14, padding: '20px 22px' }}>
                <div style={{ fontWeight: 700, color: '#fff', fontSize: 15, marginBottom: 6 }}>Obsługa po naszej stronie</div>
                <div style={{ fontSize: 13, color: '#C4CEDD', lineHeight: 1.45 }}>Wnioski i rozliczenia prowadzi Konsorcjum.</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== s21 — Montaż finansowy (interaktywne) ===== */}
        <section
          id="s21"
          data-nav-group="a06"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            padding: '104px 96px 84px 210px',
            background: BG_COMPOSE,
          }}
        >
          <div style={{ maxWidth: 1120, width: '100%' }}>
            <ProofHead label="Obszar 06 · Montaż finansowy" badge="Interaktywne" />
            <H2Light style={{ margin: '0 0 26px' }}>Z czego składamy finansowanie</H2Light>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 26 }}>
              {montageOptDefs.map(([key, label]) => {
                const on = montageKey === key
                return (
                  <button
                    key={key}
                    onClick={() => setMontageKey(key)}
                    style={{
                      border: 'none',
                      cursor: 'pointer',
                      padding: '11px 20px',
                      borderRadius: 11,
                      fontSize: 14,
                      fontWeight: 700,
                      fontFamily: 'Manrope, sans-serif',
                      transition: 'all .2s',
                      ...(on ? { background: '#16305A', color: '#EFB02A' } : { background: '#F1EADA', color: '#7A6A3E' }),
                    }}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
            <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 18, padding: '30px 34px', boxShadow: '0 14px 40px -28px rgba(20,40,70,.5)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
                <div style={{ fontWeight: 700, color: '#16305A', fontSize: 17 }}>{cur.title}</div>
                <div style={{ fontSize: 13, color: '#8A93A5' }}>montaż do 100%</div>
              </div>
              <div style={{ display: 'flex', height: 58, borderRadius: 12, overflow: 'hidden', border: '1px solid #EFE7D6' }}>
                {cur.segs.map((seg, i) => (
                  <div
                    key={i}
                    style={{
                      width: seg.pct + '%',
                      background: seg.color,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'width .5s ease',
                    }}
                  >
                    <span style={{ fontSize: 13, fontWeight: 800, color: seg.txt, fontFamily: 'Bricolage Grotesque' }}>{seg.pct}%</span>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 18, marginTop: 22 }}>
                {cur.segs.map((seg, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 9 }}>
                    <span style={{ width: 13, height: 13, borderRadius: 4, background: seg.color }} />
                    <span style={{ fontSize: 13.5, color: '#16305A', fontWeight: 600 }}>{seg.label}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid-5" style={{ marginTop: 22, display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 12 }}>
              {instruments.map((it, i) => (
                <div key={i} style={{ background: '#F6F1E4', border: '1px solid #EDE4D0', borderRadius: 12, padding: '15px 15px' }}>
                  <div style={{ fontWeight: 700, color: '#16305A', fontSize: 13, marginBottom: 4 }}>{it.h}</div>
                  <div style={{ fontSize: 11.5, color: '#7A8296', lineHeight: 1.4 }}>{it.d}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===== s22 — Przykładowe montaże (rozwinięcie) ===== */}
        <ProofSection id="s22" group="a06" full={full}>
          <ProofHead label="Obszar 06 · Przykładowe montaże" />
          <H2Light style={{ margin: '0 0 30px' }}>Przykładowe montaże (poglądowo)</H2Light>
          <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {montageExamples.map((e, i) => (
              <div key={i} style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 15, padding: '24px 26px' }}>
                <div style={{ fontWeight: 700, color: '#16305A', fontSize: 17, marginBottom: 14 }}>{e.title}</div>
                <div style={{ display: 'flex', height: 26, borderRadius: 7, overflow: 'hidden', marginBottom: 14, border: '1px solid #EFE7D6' }}>
                  {e.segs.map((s, j) => (
                    <div key={j} style={{ width: s.width, background: s.color }} />
                  ))}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  {e.segs.map((s, j) => (
                    <div key={j} style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                      <span style={{ width: 11, height: 11, borderRadius: 3, background: s.color }} />
                      <span style={{ fontSize: 12.5, color: '#5A6478', fontWeight: 600 }}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 22, fontSize: 13.5, color: '#8A93A5', fontStyle: 'italic' }}>
            Udziały procentowe poglądowe; konkretne nabory i warunki wymagają weryfikacji. Cały cykl — dobór,
            dokumentacja, zamówienia, rozliczenie — po stronie Konsorcjum.
          </div>
        </ProofSection>

        {/* ===== s23 — Model współpracy ===== */}
        <section
          id="s23"
          data-nav-group="model"
          className="slide"
          style={{
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '110px 96px 90px 210px',
            background: '#FBF7EF',
          }}
        >
          <div style={{ maxWidth: 1100, width: '100%' }}>
            <SectionLabel style={{ marginBottom: 14 }}>Model współpracy</SectionLabel>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 44, lineHeight: 1.05, letterSpacing: '-.02em', color: '#16305A', margin: '0 0 12px' }}>
              Każdy robi to, co robi najlepiej
            </h2>
            <p style={{ fontSize: 16, color: '#5A6478', margin: '0 0 40px', maxWidth: 680, lineHeight: 1.5 }}>
              Gmina zachowuje kontrolę i własność zadania; nie musi utrzymywać kompetencji pojawiających się
              nieregularnie. To istota dobrze skonstruowanego PPP.
            </p>
            <div className="split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
              <div style={{ background: '#fff', border: '1px solid #ECE4D3', borderRadius: 18, padding: '34px 34px', boxShadow: '0 14px 40px -30px rgba(20,40,70,.5)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: '#FBF0D2', color: '#B07A12', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6M9 11h.01M15 11h.01" size={24} />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, color: '#16305A' }}>Gmina / JST</div>
                    <div style={{ fontSize: 12.5, color: '#8A93A5', fontWeight: 600 }}>partner · regulator · współpłatnik</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {['Wpisanie zadania do strategii', 'Udostępnienie zasobów', 'Powierzenie zadania', 'Kierowanie mieszkańców'].map((t) => (
                    <div key={t} style={{ display: 'flex', gap: 11, alignItems: 'flex-start' }}>
                      <span style={{ color: '#B07A12', marginTop: 2 }}>▪</span>
                      <span style={{ fontSize: 14.5, color: '#3D4657', lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div
                style={{
                  background: 'radial-gradient(120% 120% at 82% 15%, #1B3A63, #0E1F3B)',
                  borderRadius: 18,
                  padding: '34px 34px',
                  color: '#F4EEE1',
                  boxShadow: '0 20px 50px -30px rgba(20,40,70,.7)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(239,176,42,.16)', color: '#EFB02A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Logo size={30} variant="color" />
                  </div>
                  <div>
                    <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 20, color: '#fff' }}>Konsorcjum Bonam Curam</div>
                    <div style={{ fontSize: 12.5, color: '#8FA0B8', fontWeight: 600 }}>standard · technologia · wykonanie</div>
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
                  {['Narzędzia', 'Finansowanie', 'Dokumentacja', 'Nadzór', 'Rozliczenia', 'Ryzyko operacyjne'].map((t) => (
                    <div key={t} style={{ display: 'flex', gap: 9, alignItems: 'flex-start' }}>
                      <span style={{ color: '#EFB02A', marginTop: 2 }}>▪</span>
                      <span style={{ fontSize: 14, color: '#DCE3EE', lineHeight: 1.4 }}>{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== s24 — Kolejne kroki ===== */}
        <section
          id="s24"
          data-nav-group="kroki"
          className="slide"
          style={{
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '104px 96px 70px 210px',
            background: 'radial-gradient(120% 120% at 20% 15%, #1B3A63 0%, #14294A 48%, #0E1F3B 100%)',
            color: '#F4EEE1',
          }}
        >
          <div style={{ position: 'absolute', right: -40, bottom: -40, width: 420, height: 420, opacity: 0.07, pointerEvents: 'none' }}>
            <Logo size="100%" variant="mono" style={{ width: '100%', height: '100%' }} />
          </div>
          <div style={{ position: 'relative', maxWidth: 1080, width: '100%' }}>
            <div style={{ fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, color: '#EFB02A', marginBottom: 16 }}>
              Kolejne kroki
            </div>
            <h2 style={{ fontFamily: FONT_DISPLAY, fontWeight: 700, fontSize: 46, lineHeight: 1.05, letterSpacing: '-.02em', margin: '0 0 40px', maxWidth: 820 }}>
              Zacznijmy od rozmowy i pilotażu — nie od zobowiązania
            </h2>
            <div className="grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 16, marginBottom: 44 }}>
              {[
                ['1', 'Spotkanie robocze', 'Rozpoznanie potrzeb i możliwości.', false],
                ['2', 'Diagnoza i zakres pilotażu', 'Wybór 1–2 elementów na start.', false],
                ['3', 'List intencyjny', 'Bez zobowiązań — kierunek współpracy.', false],
                ['4', 'Montaż finansowy i start', 'Uruchomienie i rozbudowa po efektach.', true],
              ].map(([n, t, d, hl]) => (
                <div
                  key={n}
                  style={{
                    background: hl ? 'rgba(239,176,42,.13)' : 'rgba(255,255,255,.05)',
                    border: hl ? '1px solid rgba(239,176,42,.5)' : '1px solid rgba(255,255,255,.13)',
                    borderRadius: 14,
                    padding: '24px 22px',
                  }}
                >
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 34, color: '#EFB02A', lineHeight: 1, marginBottom: 12 }}>{n}</div>
                  <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 5, color: hl ? '#F6DFA6' : undefined }}>{t}</div>
                  <div style={{ fontSize: 13, color: hl ? '#DCE3EE' : '#AEB9CB', lineHeight: 1.45 }}>{d}</div>
                </div>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 26, flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 600, fontSize: 26, color: '#fff', letterSpacing: '-.01em', maxWidth: 520 }}>
                „Gmina nie musi budować opieki sama."
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.13)', borderRadius: 16, padding: '16px 24px' }}>
                <Logo size={56} variant="color" />
                <div>
                  <div style={{ fontFamily: FONT_DISPLAY, fontWeight: 800, fontSize: 16, color: '#fff' }}>Konsorcjum Bonam Curam</div>
                  <div style={{ fontSize: 12.5, color: '#8FA0B8', marginTop: 2 }}>Kontakt — dane do uzupełnienia</div>
                </div>
              </div>
            </div>
            <div style={{ marginTop: 40, paddingTop: 18, borderTop: '1px solid rgba(255,255,255,.12)', fontSize: 11.5, color: '#7C879B', lineHeight: 1.5, maxWidth: 900 }}>
              Wszystkie wartości mają charakter poglądowy i nie stanowią oferty ani kosztorysu. Zakres kwalifikowalności
              w konkretnym naborze wymaga weryfikacji. W prezentacji nie ujawniamy nazw partnerów.
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
