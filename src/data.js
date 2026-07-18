/**
 * Dane merytoryczne prezentacji — przeniesione dosłownie z prototypu
 * „Prezentacja JST Bonam Curam". Liczby mają charakter poglądowy.
 */

/* ===== Paleta / design tokens ===== */
export const C = {
  navy: '#16305A',
  gold: '#EFB02A',
  goldDark: '#B07A12',
  cream: '#FBF7EF',
  creamWarm: '#FBF3DF',
  white: '#FFFFFF',
  textDim: '#5A6478',
  textDimmer: '#8A93A5',
  onDark: '#F4EEE1',
  onDarkDesc: '#C4CEDD',
  onDarkDimmer: '#AEB9CB',
  cardBorder: '#ECE4D3',
}

/* ===== Nawigacja boczna: pozycja -> sekcja startowa ===== */
export const navItems = [
  { group: 'start', label: 'Start', target: 's1' },
  { group: 'video', label: 'Wideo', target: 'svideo' },
  { group: 'wyzw', label: 'Wyzwanie', target: 's2' },
  { group: 'kier', label: 'Kierunek DI', target: 's3' },
  { group: 'mapa', label: '6 obszarów', target: 's4' },
  { group: 'a01', label: '01 · Diagnoza', target: 's5' },
  { group: 'a02', label: '02 · Bezpieczny senior', target: 's8' },
  { group: 'a03', label: '03 · Kampusy', target: 's11' },
  { group: 'a04', label: '04 · Oszczędności DPS', target: 's14' },
  { group: 'a05', label: '05 · Tereny wiejskie', target: 's17' },
  { group: 'a06', label: '06 · Finansowanie', target: 's20' },
  { group: 'model', label: 'Model współpracy', target: 's23' },
  { group: 'kroki', label: 'Kolejne kroki', target: 's24' },
]

/* ===== Mapa 6 obszarów (s4) ===== */
export const areaTiles = [
  {
    num: '01',
    title: 'Diagnoza potrzeb',
    desc: 'Cyfrowa, żywa mapa potrzeb mieszkańców.',
    target: 's5',
    icon: 'M9 11l3 3L22 4M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11',
  },
  {
    num: '02',
    title: 'Bezpieczny senior',
    desc: 'Monitoring w mieszkaniach bez obrazu wideo.',
    target: 's8',
    icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z',
  },
  {
    num: '03',
    title: 'Kampusy senioralne',
    desc: 'Infrastruktura — od projektu po rozliczenie.',
    target: 's11',
    icon: 'M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6',
  },
  {
    num: '04',
    title: 'Oszczędności w DPS',
    desc: 'Ta sama złotówka robi więcej.',
    target: 's14',
    icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6',
  },
  {
    num: '05',
    title: 'Tereny wiejskie',
    desc: 'Opieka bez budowy od zera.',
    target: 's17',
    icon: 'M3 21h18M6 21V11l6-5 6 5v10M10 21v-4h4v4',
  },
  {
    num: '06',
    title: 'Finansowanie',
    desc: 'Źródła się uzupełniają, nie wykluczają.',
    target: 's20',
    icon: 'M4 20V10M10 20V4M16 20v-7M22 20H2',
  },
]

/* ===== Moduły obszarów (Z czego się składa) ===== */
export const mods01 = [
  { title: 'Ankieta online', desc: 'Wersja prosta i rozszerzona dla profesjonalistów.', icon: 'M9 12h6M9 16h4M9 8h6M6 4h9l3 3v13a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1z' },
  { title: 'Silnik oceny potrzeb', desc: 'Skala ADL/IADL, bezpieczeństwo, sieć wsparcia.', icon: 'M12 20V10M6 20v-6M18 20V6M3 20h18' },
  { title: 'Raport indywidualny', desc: 'Podsumowanie z rekomendacjami.', icon: 'M14 3v5h5M8 13h8M8 17h5M15 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V8z' },
  { title: 'Panel analityczny JST', desc: 'Statystyki i heatmapy z filtrami.', icon: 'M3 3v18h18M7 14l3-3 3 3 5-6' },
  { title: 'Rejestr RODO', desc: 'Opcja anonimizacji + gotowe zgody.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10zM9 12l2 2 4-4' },
  { title: 'Baza placówek + kojarzenie', desc: 'Dopasowanie do wolnych miejsc.', icon: 'M21 10c0 6-9 12-9 12s-9-6-9-12a9 9 0 0118 0zM12 8v4M10 10h4' },
]

export const mods02 = [
  { title: 'Analiza wizyjna bez wideo', desc: 'Czujniki ruchu i obecności — bez obrazu.', icon: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6zM4 4l16 16' },
  { title: 'Jednostka brzegowa', desc: 'Na zewnątrz tylko metadane i alerty.', icon: 'M4 7h16v10H4zM8 7V4M16 7V4M9 20h6M8 11h.01M12 11h.01' },
  { title: 'Reguły alertów', desc: 'Upadek, brak ruchu, zbyt długi pobyt, wyjście ze strefy.', icon: 'M12 9v4M12 17h.01M10.3 3.9l-8 14A2 2 0 004 21h16a2 2 0 001.7-3l-8-14a2 2 0 00-3.4 0z' },
  { title: 'Centrum alarmowe', desc: 'Pulpit dyspozytora gminy.', icon: 'M3 4h18v12H3zM8 20h8M12 16v4M7 8h4M7 11h6' },
  { title: 'Aplikacja dla opiekunów', desc: 'Zdarzenia, historia, trasy w terenie.', icon: 'M7 2h10a1 1 0 011 1v18a1 1 0 01-1 1H7a1 1 0 01-1-1V3a1 1 0 011-1zM10 19h4' },
  { title: 'Raportowanie dla JST', desc: 'Statystyki, czasy reakcji, trendy.', icon: 'M3 3v18h18M7 14l3-3 3 3 5-6' },
]

export const mods03 = [
  { title: 'Mieszkania wspomagane', desc: 'Rdzeń kampusu.', icon: 'M3 21h18M5 21V9l7-5 7 5v12M9 21v-5h6v5M9 12h.01M15 12h.01' },
  { title: 'Dzienny dom i aktywizacja', desc: 'Zajęcia, spotkania, integracja.', icon: 'M12 2a5 5 0 015 5c0 3-5 8-5 8s-5-5-5-8a5 5 0 015-5zM4 22c0-3 4-5 8-5s8 2 8 5' },
  { title: 'Zaplecze rehabilitacji', desc: 'Opieka i rehabilitacja na miejscu.', icon: 'M6 3v6a6 6 0 0012 0V3M6 21v-6a6 6 0 0112 0v6M4 3h4M16 3h4M4 21h4M16 21h4' },
  { title: 'Przestrzenie wspólne', desc: 'Stołówka, świetlica, sale zajęć.', icon: 'M3 11l9-8 9 8M5 9v11h14V9M9 20v-6h6v6' },
  { title: 'Dostępność + warstwa cyfrowa', desc: 'Winda, teleopieka, monitoring.', icon: 'M12 2a3 3 0 100 6 3 3 0 000-6zM6 9h12M9 9v11M15 9v11M9 14h6' },
  { title: 'Pakiet realizacyjny', desc: 'Usługi wspólne + realizacja Konsorcjum.', icon: 'M20 7l-8-4-8 4 8 4 8-4zM4 7v10l8 4 8-4V7M12 11v10' },
]

export const mods04 = [
  { title: 'Energetyka', desc: 'Audyt, fotowoltaika, pompy ciepła, smart metering.', icon: 'M13 2L3 14h7l-1 8 10-12h-7z' },
  { title: 'Administracja', desc: 'Cyfrowy obieg dokumentów, e-zlecenia.', icon: 'M8 3H6a1 1 0 00-1 1v16a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1h-2M9 3h6v3H9zM9 12h6M9 16h4' },
  { title: 'Sprzątanie', desc: 'Inteligentne planowanie i automatyzacja.', icon: 'M19 8l-1 12a1 1 0 01-1 1H7a1 1 0 01-1-1L5 8M3 5h18M8 5V3h8v2' },
  { title: 'Analityka wizyjna AI', desc: 'Monitoring stref, alerty, statystyki obłożenia.', icon: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z' },
  { title: 'Personel opiekuńczy', desc: 'E-grafiki, obecność, mobilna dokumentacja.', icon: 'M9 7a3 3 0 100 6 3 3 0 000-6zM3 21c0-3 3-5 6-5s6 2 6 5M17 8l2 2 4-4' },
  { title: 'Warstwa danych zarządczych', desc: 'Dashboard, KPI, pakiety premium.', icon: 'M3 3v18h18M7 14l3-3 3 3 5-6' },
]

export const mods05 = [
  { title: 'Sąsiedzkie Domy Seniora', desc: '3–4 zaadaptowane domy, po 4–8 osób.', icon: 'M3 21h18M6 21V11l6-5 6 5v10M10 21v-5h4v5' },
  { title: 'System usług wspólnych', desc: 'Opieka, wyżywienie, transport.', icon: 'M3 13h13v-3l4 3v3h-2M6 16a2 2 0 100 4 2 2 0 000-4zM16 16a2 2 0 100 4 2 2 0 000-4z' },
  { title: 'Warstwa bezpieczeństwa', desc: 'Teleopieka, SOS, bezdotykowy monitoring.', icon: 'M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z' },
  { title: 'Lokalny operator społeczny', desc: 'Np. OSP z sekcją senioralną.', icon: 'M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87' },
  { title: 'Społeczna Agencja Najmu', desc: 'Mechanizm zwolnionych domów.', icon: 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2zM9 22V12h6v10' },
  { title: 'Pakiet integratora', desc: 'Montaż finansowy + realizacja.', icon: 'M20 7l-8-4-8 4 8 4 8-4zM4 7v10l8 4 8-4V7M12 11v10' },
]

/* ===== Tabela adaptacja vs budowa (s19) ===== */
export const rows05 = [
  { k: 'Nakład', a: 'niski', b: 'bardzo wysoki' },
  { k: 'Czas', a: 'miesiące', b: '3–5 lat' },
  { k: 'Zgodność z DI', a: 'wzorcowa', b: 'model wycofywany' },
  { k: 'Ryzyko obłożenia', a: 'niskie (dom po domu)', b: 'wysokie' },
  { k: 'Bliskość środowiska', a: 'senior zostaje we wsi', b: 'wyrwanie z otoczenia' },
]

/* ===== Montaż finansowy (s21) ===== */
const GOLD = '#EFB02A',
  NAVY = '#16305A',
  TEAL = '#3E7C8C',
  OLIVE = '#8A9A5B',
  SLATE = '#7A8296',
  GREYW = '#C9CFDA'

export const montages = {
  kampus: {
    title: 'Budowa kampusu senioralnego',
    segs: [
      { label: 'Fundusz Dopłat (BGK)', pct: 80, color: GOLD, txt: NAVY },
      { label: 'Termomodernizacja', pct: 8, color: TEAL, txt: '#fff' },
      { label: 'PFRON', pct: 5, color: OLIVE, txt: '#fff' },
      { label: 'Wkład własny', pct: 7, color: GREYW, txt: NAVY },
    ],
  },
  cyfrowe: {
    title: 'Cyfrowe narzędzie koordynacji',
    segs: [
      { label: 'FERC', pct: 50, color: GOLD, txt: NAVY },
      { label: 'FERS / EFS+', pct: 30, color: TEAL, txt: '#fff' },
      { label: 'Wkład własny', pct: 20, color: GREYW, txt: NAVY },
    ],
  },
  uslugi: {
    title: 'Usługi opiekuńcze',
    segs: [
      { label: 'FERS / EFS+', pct: 45, color: GOLD, txt: NAVY },
      { label: 'Programy senioralne', pct: 30, color: TEAL, txt: '#fff' },
      { label: 'Opłaty odbiorców', pct: 15, color: OLIVE, txt: '#fff' },
      { label: 'Wkład własny', pct: 10, color: GREYW, txt: NAVY },
    ],
  },
  utrzymanie: {
    title: 'Utrzymanie',
    segs: [
      { label: 'Programy senioralne', pct: 40, color: GOLD, txt: NAVY },
      { label: 'FERS', pct: 35, color: TEAL, txt: '#fff' },
      { label: 'Budżet OPS', pct: 25, color: SLATE, txt: '#fff' },
    ],
  },
}

export const montageOptDefs = [
  ['kampus', 'Budowa kampusu'],
  ['cyfrowe', 'Cyfrowe narzędzie'],
  ['uslugi', 'Usługi opiekuńcze'],
  ['utrzymanie', 'Utrzymanie'],
]

export const instruments = [
  { h: 'Usługi i DI', d: 'FERS/EFS+, programy regionalne' },
  { h: 'Cyfryzacja', d: 'FERC, komponenty KPO' },
  { h: 'Programy senioralne', d: 'Senior+, Opieka 75+, KWS' },
  { h: 'Budownictwo społeczne', d: 'Fundusz Dopłat do 95%, SIM/TBS' },
  { h: 'Dostępność / innowacje', d: 'PFRON, Fundusze Norweskie/EOG' },
]

export const montageExamples = [
  {
    title: 'Cyfrowe narzędzie',
    segs: [
      { label: 'FERC 40–60%', width: '50%', color: GOLD },
      { label: 'FERS 20–30%', width: '28%', color: TEAL },
      { label: 'Wkład 10–20%', width: '22%', color: GREYW },
    ],
  },
  {
    title: 'Budowa kampusu',
    segs: [
      { label: 'Fundusz Dopłat ~95%', width: '82%', color: GOLD },
      { label: 'Termo + PFRON', width: '11%', color: TEAL },
      { label: 'Wkład', width: '7%', color: GREYW },
    ],
  },
  {
    title: 'Usługi opiekuńcze',
    segs: [
      { label: 'FERS', width: '45%', color: GOLD },
      { label: 'Programy senioralne', width: '30%', color: TEAL },
      { label: 'Opłaty + wkład', width: '25%', color: OLIVE },
    ],
  },
  {
    title: 'Utrzymanie',
    segs: [
      { label: 'Programy senioralne', width: '40%', color: GOLD },
      { label: 'FERS', width: '35%', color: TEAL },
      { label: 'Budżet OPS', width: '25%', color: SLATE },
    ],
  },
]
