# Bonam Curam — strona-prezentacja dla JST

Strona WWW w formie prezentacji biznesowej skierowanej do Jednostek Samorządu
Terytorialnego (JST). Prezentuje kompleksowe wsparcie w opiece senioralnej w
6 obszarach — pełnoekranowe slajdy przewijane pionowo (scroll-snap) z boczną
nawigacją, przełącznikiem wersji **Krótka / Pełna** oraz elementami
interaktywnymi (mapa obszarów, kalkulator oszczędności, montaż finansowy).

## Stos technologiczny

- **React 18** (SPA) + **Vite** — jedna długa strona, bez routingu i backendu.
- Nawigacja: sekcje `min-height: 100vh`, `scroll-snap-type: y proximity`.
- Podświetlanie nawigacji: `IntersectionObserver` (próg 0.4).
- Przewijanie: `window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })`.
- Fonty: Google Fonts — `Bricolage Grotesque` (nagłówki) + `Manrope` (tekst).
- Ikony i diagramy: wyłącznie inline SVG (brak bibliotek ikon i rastrów).
- Logo odtworzone jako komponent SVG (`src/Logo.jsx`).

## Uruchomienie

```bash
npm install
npm run dev       # serwer deweloperski
npm run build     # build produkcyjny -> dist/
npm run preview   # podgląd builda
```

## Struktura

```
src/
  main.jsx            punkt wejścia
  App.jsx             wszystkie 24 sekcje + logika interakcji
  index.css           style globalne, animacje, responsywność
  data.js             treść (nawigacja, moduły, montaże, instrumenty)
  diagrams.jsx        5 diagramów wektorowych (SVG)
  icons.jsx           helper ikon liniowych
  ui.jsx              powtarzalne elementy UI (karty, tagi, nagłówki)
  Logo.jsx            logo Konsorcjum (SVG)
  components/
    Header.jsx        górny pasek + przełącznik Krótka/Pełna
    SideNav.jsx       boczna nawigacja
```

## Elementy interaktywne

- **Przełącznik Krótka / Pełna** — w wersji krótkiej ukrywane są slajdy typu
  „Dowód/Rozwinięcie" (s7, s10, s13, s16, s19, s22); licznik 24 / 18 sekcji.
- **Mapa 6 obszarów** (s4) — klik kafla przewija do danego obszaru.
- **Kalkulator oszczędności** (s16) — suwaki: liczba łóżek (20–200) i zakres
  wdrożenia (40–100%); wynik liczony na żywo (formatowanie `pl-PL`).
- **Montaż finansowy** (s21) — 4 warianty celu przełączają pasek segmentowy.

## Uwagi

- Wszystkie liczby mają charakter **poglądowy** (zaznaczone w stopkach).
- Dane kontaktowe (s24) to **placeholder** — do uzupełnienia.
- Projekt jest **desktop-first** (~1440×1080); dla mniejszych szerokości
  dodano degradację układów (2→1 kolumny, ukrycie bocznej nawigacji).
