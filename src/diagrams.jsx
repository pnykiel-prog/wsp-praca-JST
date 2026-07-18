/**
 * Diagramy wektorowe (inline SVG) — odtworzone 1:1 z prototypu.
 * Kolorystyka marki: jasne karty / kremowe wypełnienia z granatowym tekstem,
 * złote strzałki z grotami, ikony liniowe.
 */
import { Fragment } from 'react'

const CREAM = '#FBF7EF'
const NV = '#16305A'
const GD = '#EFB02A'
const WHT = 'rgba(255,255,255,.95)'

/* ikona wektorowa w węźle diagramu (odpowiednik gicon()) */
function Gicon({ path, x, y, color }) {
  return (
    <g
      transform={`translate(${x},${y})`}
      stroke={color}
      strokeWidth={1.9}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={path} />
    </g>
  )
}

/* definicja grotu strzałki */
function ArrowDefs({ id, color }) {
  return (
    <defs>
      <marker
        id={id}
        markerWidth={8}
        markerHeight={8}
        refX={6}
        refY={4}
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0 0 L7 4 L0 8 Z" fill={color} />
      </marker>
    </defs>
  )
}

/* strzałka (odpowiednik arw()) */
function arw(key, d, color, id) {
  return (
    <path
      key={key}
      d={d}
      stroke={color}
      strokeWidth={2.4}
      fill="none"
      markerEnd={`url(#${id})`}
      strokeLinecap="round"
    />
  )
}

/* węzeł diagramu (odpowiednik node()) */
function node(o) {
  const rx = o.rx == null ? 14 : o.rx
  const els = [
    <rect
      key="r"
      x={o.x}
      y={o.y}
      width={o.w}
      height={o.h}
      rx={rx}
      fill={o.fill}
      stroke={o.stroke || 'none'}
      strokeWidth={o.sw || 1.6}
    />,
  ]
  const left = o.align === 'left'
  if (o.dot)
    els.push(<circle key="d" cx={o.x + 20} cy={o.y + o.h / 2} r={5} fill={o.dot} />)
  const cx = left ? o.x + (o.dot ? 34 : 18) : o.x + o.w / 2
  const anchor = left ? 'start' : 'middle'
  let ty
  if (o.icon) {
    els.push(
      <Gicon key="ic" path={o.icon} x={o.x + o.w / 2 - 11} y={o.y + 16} color={o.iconColor || o.tcolor} />,
    )
    ty = o.sub ? o.y + o.h - 24 : o.y + o.h - 18
  } else {
    ty = o.sub ? o.y + o.h / 2 - 2 : o.y + o.h / 2 + 6
  }
  els.push(
    <text
      key="t"
      x={cx}
      y={ty}
      fill={o.tcolor}
      fontSize={o.fs || 15}
      fontWeight={800}
      fontFamily="Bricolage Grotesque, sans-serif"
      textAnchor={anchor}
    >
      {o.title}
    </text>,
  )
  if (o.sub)
    els.push(
      <text
        key="s"
        x={o.icon ? o.x + o.w / 2 : cx}
        y={ty + 16}
        fill={o.scolor || '#7A8296'}
        fontSize={11.5}
        fontFamily="Manrope"
        textAnchor={o.icon ? 'middle' : anchor}
      >
        {o.sub}
      </text>,
    )
  return <g key={'nd' + o.x + '-' + o.y + '-' + (o.title || '')}>{els}</g>
}

/* ===== 01 Diagnoza ===== */
export function DiagramDiagnoza() {
  return (
    <svg viewBox="0 0 520 430" width="100%" style={{ maxWidth: '490px' }}>
      <ArrowDefs id="arDg" color={GD} />
      <rect x={2} y={6} width={516} height={418} rx={22} fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.10)" />
      <text x={90} y={30} fill="#8FA0B8" fontSize={11.5} fontFamily="Manrope" fontWeight={700} textAnchor="middle" letterSpacing="2">
        ŹRÓDŁA DANYCH
      </text>
      <text x={442} y={30} fill="#8FA0B8" fontSize={11.5} fontFamily="Manrope" fontWeight={700} textAnchor="middle" letterSpacing="2">
        WYNIK
      </text>
      {[['Senior', 44], ['Rodzina', 108], ['POZ', 172], ['OPS', 236], ['NGO', 300]].map((s) =>
        node({ x: 16, y: s[1], w: 150, h: 52, fill: CREAM, title: s[0], tcolor: NV, fs: 16, align: 'left', dot: GD }),
      )}
      {[70, 134, 198, 262, 326].map((y, i) => (
        <path key={'c' + i} d={`M166 ${y} C 198 ${y}, 200 220, 226 220`} stroke="rgba(239,176,42,.5)" strokeWidth={1.7} fill="none" />
      ))}
      {node({ x: 226, y: 158, w: 118, h: 124, fill: GD, title: 'Silnik oceny', sub: 'ADL · IADL', tcolor: NV, scolor: 'rgba(22,48,90,.62)', icon: 'M12 15a3 3 0 100-6 3 3 0 000 6zM19 12a7 7 0 00-.1-1l2-1.6-2-3.4-2.4 1a7 7 0 00-1.7-1L16 2h-4l-.4 3a7 7 0 00-1.7 1l-2.4-1-2 3.4 2 1.6a7 7 0 000 2l-2 1.6 2 3.4 2.4-1a7 7 0 001.7 1L12 22h4', iconColor: NV, fs: 17 })}
      {arw('a1', 'M344 195 C 372 195, 372 122, 396 122', GD, 'arDg')}
      {arw('a2', 'M344 245 C 372 245, 372 312, 396 312', GD, 'arDg')}
      {node({ x: 378, y: 80, w: 138, h: 86, fill: WHT, title: 'Raport', sub: 'indywidualny + rekomendacje', tcolor: NV, icon: 'M14 3v5h5M8 13h8M8 17h6M15 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z', iconColor: GD, fs: 16 })}
      {node({ x: 378, y: 270, w: 138, h: 86, fill: WHT, title: 'Panel JST', sub: 'statystyki · heatmapy', tcolor: NV, icon: 'M3 3v18h18M7 14l3-3 3 3 5-6', iconColor: GD, fs: 16 })}
    </svg>
  )
}

/* ===== 02 Bezpieczny senior ===== */
export function DiagramBezpieczny() {
  return (
    <svg viewBox="0 0 520 430" width="100%" style={{ maxWidth: '490px' }}>
      <ArrowDefs id="arBz" color={GD} />
      <rect x={12} y={58} width={200} height={300} rx={16} fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.18)" />
      <text x={112} y={44} fill="#DCE3EE" fontSize={13} fontFamily="Manrope" fontWeight={700} textAnchor="middle">
        Mieszkanie seniora
      </text>
      <line x1={112} y1={78} x2={112} y2={338} stroke="rgba(255,255,255,.12)" strokeWidth={1.4} />
      <line x1={12} y1={208} x2={212} y2={208} stroke="rgba(255,255,255,.12)" strokeWidth={1.4} />
      {[[62, 143, 'ruch'], [162, 143, 'upadek'], [62, 273, 'obecność'], [162, 273, 'strefa']].map((p, i) => (
        <g key={'sn' + i}>
          <circle cx={p[0]} cy={p[1]} r={16} fill="rgba(239,176,42,.18)" stroke={GD} strokeWidth={1.5} />
          <circle cx={p[0]} cy={p[1]} r={4.5} fill={GD} />
          <text x={p[0]} y={p[1] + 32} fill="#AEB9CB" fontSize={11} fontFamily="Manrope" fontWeight={600} textAnchor="middle">
            {p[2]}
          </text>
        </g>
      ))}
      {arw('e1', 'M214 208 H250', GD, 'arBz')}
      <rect x={214} y={148} width={80} height={22} rx={11} fill="rgba(63,164,106,.18)" stroke="#3FA46A" />
      <text x={254} y={163} fill="#8FE0AE" fontSize={11} fontFamily="Manrope" fontWeight={700} textAnchor="middle">
        bez wideo
      </text>
      {node({ x: 250, y: 182, w: 122, h: 66, fill: GD, title: 'Jednostka', sub: 'brzegowa · tylko alert', tcolor: NV, scolor: 'rgba(22,48,90,.6)', fs: 15 })}
      {arw('r1', 'M372 200 C 400 200, 400 132, 424 132', GD, 'arBz')}
      {arw('r2', 'M372 230 C 400 230, 400 300, 424 300', GD, 'arBz')}
      {node({ x: 392, y: 92, w: 120, h: 80, fill: WHT, title: 'Dyspozytor', sub: 'centrum gminy', tcolor: NV, icon: 'M4 5h16v10H4zM9 19h6M12 15v4', iconColor: GD, fs: 15 })}
      {node({ x: 392, y: 262, w: 120, h: 80, fill: WHT, title: 'Opiekun', sub: 'w terenie', tcolor: NV, icon: 'M12 7a3 3 0 100 6 3 3 0 000-6zM6 21c0-3.3 2.7-5 6-5s6 1.7 6 5', iconColor: GD, fs: 15 })}
    </svg>
  )
}

/* ===== 03 Kampus ===== */
export function DiagramKampus() {
  return (
    <svg viewBox="0 0 520 440" width="100%" style={{ maxWidth: '490px' }}>
      <rect x={8} y={14} width={504} height={412} rx={22} fill="rgba(255,255,255,.035)" stroke="rgba(255,255,255,.12)" />
      <path d="M40 226 H480 M260 44 V400" stroke="rgba(239,176,42,.22)" strokeWidth={8} strokeLinecap="round" fill="none" />
      <path d="M40 226 H480 M260 44 V400" stroke="rgba(239,176,42,.5)" strokeWidth={1.5} strokeDasharray="2 14" fill="none" />
      {node({ x: 32, y: 44, w: 200, h: 150, fill: GD, title: 'Mieszkania', sub: 'wspomagane — rdzeń', tcolor: NV, scolor: 'rgba(22,48,90,.62)', icon: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-6h6v6', iconColor: NV, fs: 19 })}
      {node({ x: 286, y: 44, w: 200, h: 70, fill: WHT, title: 'Dzienny dom', sub: 'aktywizacja', tcolor: NV, icon: 'M12 3a4 4 0 014 4c0 2.5-4 6-4 6s-4-3.5-4-6a4 4 0 014-4z', iconColor: GD, fs: 16 })}
      {node({ x: 286, y: 124, w: 200, h: 70, fill: WHT, title: 'Rehabilitacja', sub: 'opieka na miejscu', tcolor: NV, icon: 'M6 4v5a6 6 0 0012 0V4M12 15v5', iconColor: GD, fs: 16 })}
      {node({ x: 32, y: 256, w: 200, h: 150, fill: WHT, title: 'Przestrzenie', sub: 'stołówka · świetlica', tcolor: NV, icon: 'M3 11l9-7 9 7M5 9v11h14V9', iconColor: GD, fs: 18 })}
      {node({ x: 286, y: 256, w: 200, h: 150, fill: WHT, title: 'Dostępność', sub: 'winda · teleopieka', tcolor: NV, icon: 'M12 2a3 3 0 100 6 3 3 0 000-6zM6 9h12M9 9v11M15 9v11', iconColor: GD, fs: 18 })}
    </svg>
  )
}

/* ===== 04 DPS ===== */
export function DiagramDps() {
  return (
    <svg viewBox="0 0 520 430" width="100%" style={{ maxWidth: '490px' }}>
      {[[95, 96], [425, 96], [95, 334], [425, 334], [95, 215]].map((p, i) => (
        <path key={'cn' + i} d={`M${p[0]} ${p[1]} L260 215`} stroke="rgba(239,176,42,.32)" strokeWidth={1.7} strokeDasharray="4 5" fill="none" />
      ))}
      <path d="M178 152 L260 96 L342 152 Z" fill={GD} />
      <rect x={190} y={152} width={140} height={128} rx={10} fill={WHT} />
      {[[208, 170], [248, 170], [288, 170], [208, 208], [288, 208]].map((w, i) => (
        <rect key={'wn' + i} x={w[0]} y={w[1]} width={24} height={24} rx={3} fill="rgba(22,48,90,.10)" stroke="rgba(22,48,90,.22)" />
      ))}
      <rect x={242} y={236} width={36} height={44} rx={3} fill="#16305A" />
      <text x={260} y={302} fill="#8FA0B8" fontSize={12.5} fontFamily="Manrope" fontWeight={700} textAnchor="middle">
        Placówka (DPS)
      </text>
      {[
        ['Energetyka', 20, 66, 'M13 2L3 14h7l-1 8 10-12h-7z'],
        ['Administracja', 350, 66, 'M8 3h8v4H8zM6 7h12v14H6zM9 12h6M9 16h4'],
        ['Sprzątanie', 20, 304, 'M19 8l-1 12H6L5 8M3 5h18M9 5V3h6v2'],
        ['Analityka AI', 350, 304, 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z'],
        ['Personel', 20, 185, 'M9 8a3 3 0 100 6 3 3 0 000-6zM3 21c0-3 3-5 6-5s6 2 6 5'],
      ].map((m) =>
        node({ x: m[1], y: m[2], w: 150, h: 60, fill: WHT, title: m[0], tcolor: NV, icon: m[3], iconColor: GD, fs: 14.5 }),
      )}
    </svg>
  )
}

/* ===== 05 Wieś ===== */
export function DiagramWies() {
  return (
    <svg viewBox="0 0 520 430" width="100%" style={{ maxWidth: '490px' }}>
      {[[92, 96], [428, 96], [92, 338], [428, 338]].map((p, i) => (
        <path key={'wc' + i} d={`M${p[0]} ${p[1]} L260 215`} stroke="rgba(239,176,42,.32)" strokeWidth={1.7} strokeDasharray="4 5" fill="none" />
      ))}
      <circle cx={260} cy={215} r={60} fill={GD} />
      <text x={260} y={206} fill={NV} fontSize={16} fontWeight={800} fontFamily="Bricolage Grotesque" textAnchor="middle">
        Usługi
      </text>
      <text x={260} y={226} fill={NV} fontSize={16} fontWeight={800} fontFamily="Bricolage Grotesque" textAnchor="middle">
        wspólne
      </text>
      <text x={260} y={246} fill="rgba(22,48,90,.62)" fontSize={10.5} fontFamily="Manrope" textAnchor="middle">
        opieka · transport
      </text>
      {[[92, 96, 'Dom 1'], [428, 96, 'Dom 2'], [92, 338, 'Dom 3'], [428, 338, 'Dom 4']].map((h, i) => (
        <g key={'hs' + i}>
          <path d={`M${h[0] - 36} ${h[1] - 2} L${h[0]} ${h[1] - 38} L${h[0] + 36} ${h[1] - 2} Z`} fill={GD} />
          <rect x={h[0] - 26} y={h[1] - 2} width={52} height={40} rx={4} fill={WHT} />
          <rect x={h[0] - 8} y={h[1] + 16} width={16} height={22} rx={2} fill="#16305A" />
          <text x={h[0]} y={h[1] + 56} fill="#DCE3EE" fontSize={12} fontFamily="Manrope" fontWeight={700} textAnchor="middle">
            {h[2]}
          </text>
        </g>
      ))}
      <text x={260} y={392} fill="#8FA0B8" fontSize={11.5} fontFamily="Manrope" fontWeight={600} textAnchor="middle" fontStyle="italic">
        Społeczna Agencja Najmu — zasiedlanie pustych domów
      </text>
    </svg>
  )
}
