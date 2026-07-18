# Handoff: Strona-prezentacja dla JST — Konsorcjum Bonam Curam

## Przeznaczenie
Strona WWW w formie prezentacji biznesowej skierowanej do Jednostek Samorządu Terytorialnego (JST). Prezentuje kompleksowe wsparcie w opiece senioralnej w 6 obszarach. Ma być przejrzysta i czytelna, ale jednocześnie atrakcyjna wizualnie — pełnoekranowe slajdy przewijane pionowo (scroll-snap) z boczną nawigacją, przełącznikiem wersji krótka/pełna oraz elementami interaktywnymi (mapa obszarów, kalkulator oszczędności, montaż finansowy).

## O plikach w tym pakiecie
Plik `Prezentacja JST Bonam Curam.dc.html` to **referencja projektowa stworzona w HTML** — prototyp pokazujący docelowy wygląd i zachowanie, **nie kod produkcyjny do skopiowania 1:1**. Jest napisany w wewnętrznym formacie „Design Component" (własny runtime `support.js`, template + klasa logiki). 

Zadanie: **odtworzyć ten projekt w docelowym środowisku** (rekomendacja: React + Vite, lub Next.js — projekt to statyczna strona bez backendu), używając ustalonych w kodzie wzorców i bibliotek. Jeśli środowiska jeszcze nie ma — wybrać najodpowiedniejszy framework. Nie należy wdrażać formatu `.dc.html` — należy odtworzyć UI i interakcje natywnie (komponenty React, zwykły CSS/CSS-in-JS/Tailwind wg konwencji zespołu).

## Fidelity
**High-fidelity (hifi)** — makieta ma finalne kolory, typografię, odstępy i interakcje. UI odtworzyć pixel-perfect. Wszystkie wartości (hex, px, font-weight) podane niżej są wiążące. Teksty merytoryczne są finalne (pochodzą z materiałów klienta) — przenieść dosłownie.

## Stos i architektura (rekomendacja)
- **Framework:** React 18 (SPA) + Vite. Routing zbędny — jedna długa strona.
- **Nawigacja:** pełnoekranowe sekcje `min-height: 100vh`, `scroll-snap-type: y proximity` na kontenerze, `scroll-snap-align: start` na sekcjach.
- **Podświetlanie nawigacji:** `IntersectionObserver` (próg 0.4–0.6) ustawia aktywną pozycję menu wg atrybutu grupy sekcji.
- **Przewijanie do sekcji:** `window.scrollTo({ top: el.offsetTop, behavior: 'smooth' })`. NIE używać `scrollIntoView`.
- **Stan:** lokalny (useState/useReducer). Brak zapytań sieciowych, brak backendu.
- **Fonty:** Google Fonts — `Bricolage Grotesque` (nagłówki, wagi 400–800) i `Manrope` (tekst, wagi 400–800). Latin Extended (polskie znaki).
- **Ikony:** inline SVG (stroke, 24×24, `stroke-width` ~1.7, `stroke-linecap/linejoin: round`). Brak biblioteki ikon.
- **Grafiki/diagramy:** rysowane inline SVG (patrz sekcja „Grafiki wektorowe"). Brak zdjęć/rastrów poza logo.

## Paleta i design tokens

### Kolory
| Token | Hex | Użycie |
|---|---|---|
| Granat podstawowy | `#16305A` | nagłówki, tekst na jasnym, elementy marki |
| Granat głęboki (tła) | gradient `#1B3A63 → #14294A → #0E1F3B` | tła slajdów ciemnych (radial-gradient) |
| Złoto (akcent) | `#EFB02A` | akcenty, liczby, serce logo, aktywne stany |
| Złoto ciemne (na jasnym tle) | `#B07A12` | etykiety sekcji na kremowym tle |
| Krem (tło jasne) | `#FBF7EF` | tła slajdów jasnych |
| Krem cieplejszy (dowody) | `#FBF3DF` | tła slajdów typu „dowód/rozwinięcie" |
| Biel kart | `#FFFFFF` | karty na jasnych slajdach |
| Tekst tło jasne | `#14243E` / `#16305A` | tekst główny |
| Tekst wygaszony | `#5A6478` / `#8A93A5` | opisy, podpisy |
| Tekst na ciemnym | `#F4EEE1` (główny), `#C4CEDD` / `#DCE3EE` (opis), `#AEB9CB` / `#8FA0B8` (wygaszony) | |
| Obrys kart (jasne) | `#ECE4D3` / `#E4DECF` | |
| Zielony sensor / sukces | `#33B36B` (sensor), `#2E7D4F`/`#3FA46A` (check) | |
| Czerwony alarm | `#E0524A` | |
| Link / link:hover | `#B07A12` / `#8A5E08` | |

Kolory pomocnicze montażu finansowego (segmenty pasków): złoto `#EFB02A`, teal `#3E7C8C`, oliwka `#8A9A5B`, slate `#7A8296`, szary-wkład `#C9CFDA`.

Tekstura tła (slajdy modułów/dowodów): `radial-gradient(rgba(22,48,90,.05) 1.2px, transparent 1.2px) 0 0/24px 24px` nałożona na kolor tła.

### Typografia
- **Display/nagłówki:** Bricolage Grotesque. H1 slajd tytułowy 64px/800/line-height 1.03/letter-spacing −.02em. H2 slajdów 38–46px/700/1.05–1.06/−.02em. Nagłówki kart 16–20px/700–800.
- **Tekst:** Manrope. Akapity 16–20px/400–500/line-height 1.5–1.55. Opisy kart 13–14px. Etykiety sekcji 12px/700, `text-transform: uppercase`, `letter-spacing: .2em`.
- Minimalny rozmiar tekstu na slajdzie: ~12px (podpisy), treść ≥13–14px.

### Odstępy / promienie / cienie
- Padding sekcji: `104px 96px 84px 210px` (lewy 210px robi miejsce na boczną nawigację). Slajdy tytułowe/nawigacyjne podobnie.
- Promienie: karty 14–20px, kafle 10–15px, pigułki/tagi 999px, badge 6px.
- Cienie kart (jasne tło): `0 10px 30px -22px rgba(20,40,70,.5)` do `0 14px 40px -28px rgba(20,40,70,.5)`.
- Cienie na ciemnym tle: `0 30px 60px -34px rgba(0,0,0,.6)`.

## Struktura strony (stałe elementy)

### Header (fixed, góra, wys. 64px)
- Tło `rgba(251,247,239,.82)` + `backdrop-filter: blur(10px)`, dolny obrys `#EDE6D6`.
- Lewo: logo (44×44, `assets/logo.png`) + nazwa „Bonam Curam" (Bricolage 14/700) i podtytuł „WSPARCIE JST · OPIEKA SENIORALNA" (10.5px, uppercase, letter-spacing .16em, `#9AA2B0`).
- Prawo: przełącznik **Krótka | Pełna** (pigułka `#F1EADA`, aktywny segment `#16305A` z tekstem `#EFB02A`) + licznik „24 sekcje" / „18 sekcji".

### Nawigacja boczna (fixed, lewo, szer. 150px, od top:64px do bottom)
Lista 12 pozycji (kropka 8×8 + etykieta). Aktywna pozycja: tło `#16305A`, kropka `#EFB02A`, tekst biały/700. Kliknięcie przewija do sekcji.
Pozycje → sekcje: Start→s1, Wyzwanie→s2, Kierunek DI→s3, 6 obszarów→s4, 01 · Diagnoza→s5, 02 · Bezpieczny senior→s8, 03 · Kampusy→s11, 04 · Oszczędności DPS→s14, 05 · Tereny wiejskie→s17, 06 · Finansowanie→s20, Model współpracy→s23, Kolejne kroki→s24.

Każda sekcja ma atrybut grupy (`start, wyzw, kier, mapa, a01…a06, model, kroki`); sekcje s5–s7 należą do grupy a01, s8–s10 do a02 itd. — dzięki temu pozycja „01" pozostaje aktywna na wszystkich 3 slajdach obszaru.

## Ekrany / slajdy (24 sekcje)

### BLOK I — Otwarcie
- **s1 Tytuł** (tło ciemne). H1 „Kompleksowe wsparcie JST w opiece **senioralnej**" (słowo „senioralnej" w złocie). Tag „KONSORCJUM NA RZECZ SENIORA" (pigułka z kropką). Podtytuł. 3 tagi: „6 obszarów wsparcia", „Zgodność z deinstytucjonalizacją", „Finansowanie zewnętrzne". Wielkie półprzezroczyste logo (opacity .09, `filter: brightness(0) invert(1)`) po prawej. Przycisk „Przewiń" ze strzałką (animacja `bob`, przewija do s2).
- **s2 Wyzwanie** (tło jasne). H2 „Presja rośnie szybciej niż budżety i kadry". 4 karty-liczby: **~26%** mieszkańców 60+ · **6–8 tys.** zł/mies. DPS · **dziesiątki km** do placówki · **dane rozproszone**. Każda karta: biała, liczba Bricolage 42/800, złota kreska 34×3px, opis. Stopka-notka o zadaniu własnym gminy.
- **s3 Kierunek (DI)** (tło jasne). H2 „Kierunek finansowania przesunął się w stronę opieki w środowisku". Lewa kolumna: 3 numerowane karty (priorytet usług środowiskowych / diagnoza jako warunek / gmina realizuje politykę państwa). Prawa kolumna: ciemna karta z cytatem „Diagnoza to nie koszt — to ubezpieczenie każdej złotówki publicznej." + ikona cudzysłowu.
- **s4 Mapa 6 obszarów** (tło ciemne, INTERAKTYWNE). H2 „Jeden partner — od diagnozy po rozliczenie". Siatka 3×2 klikalnych kafli (01–06): numer w złocie, ikona SVG, tytuł, opis. Hover: `translateY(-4px)`, tło `rgba(239,176,42,.14)`, obrys złoty. Klik → przewija do pierwszego slajdu obszaru. Podpis o rozróżnieniu mieszkanie (02,05) vs placówka (03,04).

### BLOK II — 6 obszarów (każdy obszar = 3 slajdy: Problem / Z czego się składa / Dowód)
Rytm wizualny stały:
- **Problem** (tło ciemne, układ 2-kolumnowy `1fr .82fr`): pigułka „OBSZAR 0X · nazwa", etykieta „Problem", akapit problemu, H2 z hasłem, wiersz tagów z korzyściami, po prawej **diagram wektorowy** (SVG).
- **Z czego się składa** (tło jasne z teksturą kropek): etykieta, H2, siatka 3-kolumnowa kafli modułów (ikona w złotym kwadracie `#FBF0D2`, tytuł, opis), notka.
- **Dowód / Rozwinięcie** (tło cieplejszy krem z teksturą; badge „ROZWINIĘCIE" lub „INTERAKTYWNE"; ukrywane w wersji krótkiej): kroki lub karty liczb.

Obszary i ich slajdy:
- **01 Diagnoza** (s5–s7): Problem „Twarde dane pod każdą decyzję opiekuńczą" + diagram przepływu danych. Składa: Ankieta online, Silnik oceny (ADL/IADL), Raport indywidualny, Panel analityczny JST, Rejestr RODO, Baza placówek. Dowód: 3 kroki (Wypełnienie→Ocena→Wynik) + karty „do 100% z EFS+" i „~54 tys. zł/rok różnicy".
- **02 Bezpieczny senior** (s8–s10): Problem „Opieka nad samotnym seniorem — bez naruszania prywatności" + **diagram mieszkania z czujnikami** (SVG). Składa: Analiza wizyjna bez wideo, Jednostka brzegowa, Reguły alertów, Centrum alarmowe, Aplikacja dla opiekunów, Raportowanie JST. Dowód: Prywatność/Reakcja/Skala + „~70%" i „24/7".
- **03 Kampusy** (s11–s13): Problem „Infrastruktura opiekuńcza — od projektu do rozliczenia" + **diagram rzutu kampusu** (SVG). Składa: Mieszkania wspomagane, Dzienny dom, Rehabilitacja, Przestrzenie wspólne, Dostępność+warstwa cyfrowa, Pakiet realizacyjny. Dowód: karta „do 95%" (Fundusz Dopłat BGK) + 3 karty „dla skarbnika" (bezzwrotne / bez zdolności kredytowej / bez długu) + notka kontekst 2026.
- **04 Oszczędności DPS** (s14–s16): Problem „Nie cięcia — żeby ta sama złotówka robiła więcej" + diagram budynku z 5 modułami. Składa: Energetyka, Administracja, Sprzątanie, Analityka wizyjna AI, Personel opiekuńczy, Warstwa danych. Dowód: **KALKULATOR** (INTERAKTYWNE).
- **05 Tereny wiejskie** (s17–s19): Problem „Opieka tam, gdzie jej nie było — bez budowy od zera" + diagram hub+domy. Składa: Sąsiedzkie Domy Seniora, Usługi wspólne, Warstwa bezpieczeństwa, Lokalny operator społeczny, Społeczna Agencja Najmu, Pakiet integratora. Dowód: tabela „Adaptacja vs budowa klasyczna" (5 wierszy).
- **06 Finansowanie** (s20–s22): Problem/zasada „Źródła się uzupełniają, nie wykluczają" (układ 1-kolumnowy) + 3 karty zasad. Składa/**MONTAŻ** (INTERAKTYWNE): mapa instrumentów (5 kart) + interaktywny pasek montażu. Dowód: 4 przykładowe montaże (paski segmentowe).

### BLOK III — Współpraca i kroki
- **s23 Model współpracy** (tło jasne). H2 „Każdy robi to, co robi najlepiej". 2 kolumny: „Gmina / JST" (biała karta, lista) i „Konsorcjum Bonam Curam" (ciemna karta, siatka 2×3).
- **s24 Kolejne kroki** (tło ciemne). H2 „Zacznijmy od rozmowy i pilotażu — nie od zobowiązania". 4 kroki (karta 4 wyróżniona złotem). Cytat „Gmina nie musi budować opieki sama." Karta kontaktu (logo + „Kontakt — dane do uzupełnienia"). Stopka z zastrzeżeniem poglądowości liczb. **Uwaga:** dane kontaktowe są placeholderem — do uzupełnienia.

## Elementy interaktywne (logika)

### Przełącznik Krótka/Pełna
Stan `full: boolean` (domyślnie true). W wersji krótkiej ukrywane są slajdy typu „Dowód/Rozwinięcie": **s7, s10, s13, s16, s19, s22** (`display: none`). Licznik w headerze: 24 / 18.

### Mapa 6 obszarów (s4)
6 kafli; klik = przewinięcie do sekcji s5/s8/s11/s14/s17/s20.

### Kalkulator oszczędności (s16)
Dwa suwaki: **liczba łóżek** (20–200, krok 5, domyślnie 50) i **zakres wdrożenia** (40–100%, krok 5, domyślnie 100). `accent-color: #EFB02A`.
Wzory (współczynnik `f = łóżka × zakres%/100`):
- Media = `2000 × f` zł/rok
- Administracja = `600 × f` zł/rok; etaty = `0.01 × f` (np. 0,5 przy 50 łóżek/100%)
- Sprzątanie = `3000 × f` zł/rok; etaty = `0.06 × f` (np. 3 przy 50/100%)
- Suma = media + administracja + sprzątanie (przy 50/100% ≈ 280 000 zł/rok, zakres 200–350 tys.)
Formatowanie liczb: `toLocaleString('pl-PL')` ze spacjami jako separatorem tysięcy; etaty z przecinkiem dziesiętnym. Pokazywana wyłącznie strona korzyści (bez kosztów wdrożenia).

### Montaż finansowy (s21)
4 przyciski wyboru celu (aktywny: `#16305A`/`#EFB02A`, nieaktywny `#F1EADA`/`#7A6A3E`) przełączają poziomy pasek segmentowy (suma do 100%). Konfiguracje (etykieta, %, kolor):
- **Budowa kampusu:** Fundusz Dopłat (BGK) 80 (złoto), Termomodernizacja 8 (teal), PFRON 5 (oliwka), Wkład własny 7 (szary).
- **Cyfrowe narzędzie:** FERC 50, FERS/EFS+ 30, Wkład własny 20.
- **Usługi opiekuńcze:** FERS/EFS+ 45, Programy senioralne 30, Opłaty odbiorców 15, Wkład własny 10.
- **Utrzymanie:** Programy senioralne 40, FERS 35, Budżet OPS 25.
Segment: szerokość = `pct%`, transition width .5s. Legenda pod paskiem. Pod spodem 5 kart instrumentów (Usługi i DI, Cyfryzacja, Programy senioralne, Budownictwo społeczne, Dostępność/innowacje).

## Grafiki wektorowe (diagramy SVG)
Wszystkie diagramy są rysowane inline SVG w kolorystyce marki (jasne karty/kremowe wypełnienia z granatowym tekstem, złote strzałki z grotami, ikony liniowe). viewBox ~ `0 0 520 430`. Elementy: prostokąty z zaokrągleniem (rx 12–14), etykiety Bricolage/Manrope, strzałki `marker-end` (grot 7×4). Do odtworzenia 1:1 jako komponenty SVG w Reakcie:
- **s5 Diagnoza:** kolumna 5 źródeł (Senior/Rodzina/POZ/OPS/NGO) → złota karta „Silnik oceny (ADL·IADL)" → 2 wyniki (Raport, Panel JST).
- **s8 Bezpieczny senior:** plan mieszkania z 4 czujnikami (ruch/upadek/obecność/strefa) → badge „bez wideo" → „Jednostka brzegowa" → Dyspozytor / Opiekun.
- **s11 Kampus:** rzut z blokami funkcji (Mieszkania wspomagane — rdzeń, Dzienny dom, Rehabilitacja, Przestrzenie wspólne, Dostępność) z „drogą" krzyżową.
- **s14 DPS:** budynek placówki + 5 modułów (Energetyka, Administracja, Sprzątanie, Analityka AI, Personel) połączonych liniami przerywanymi.
- **s17 Wieś:** centralny hub „Usługi wspólne" + 4 domy + podpis SAN.
Diagramy 3-krokowe (s7) i tabela (s19) — zwykły HTML/flex/grid.

**Ważne:** wcześniej testowano warianty z izometryczną grafiką mieszkania i renderem/zdjęciami — klient odrzucił je na rzecz czystych diagramów wektorowych. Trzymać się stylu diagramów wektorowych.

## Zachowanie responsywne
Projekt jest desktop-first (docelowo pełny ekran / laptop). Slajdy zaprojektowane dla szerokości ~1440px i wysokości ~1080px. Dla mniejszych wysokości treść może wychodzić poza 100vh — przy wdrożeniu warto dodać `min-height` z bezpiecznym `padding` i pozwolić sekcjom rosnąć. Wersja mobilna nie była projektowana — do ustalenia z klientem (rekomendacja: kolumny 2→1, ukrycie bocznej nawigacji za przyciskiem, diagramy skalowane do szerokości).

## Assets
- `assets/logo.png` — jedyne logo: „KONSORCJUM NA RZECZ SENIORA — BONAM CURAM" (serce w złocie, tekst granatowy). Wersja na ciemnym tle: `filter: brightness(0) invert(1)` z obniżoną opacity dla znaku wodnego. **Jedyne dopuszczone logo w całej prezentacji.**
- Brak innych rastrów — wszystkie ilustracje to inline SVG.

## Treść merytoryczna
Pełne teksty (nagłówki, hasła, opisy modułów, notatki) znajdują się w pliku `Prezentacja JST Bonam Curam.dc.html` — przenieść dosłownie. Liczby mają charakter poglądowy (zaznaczone w stopkach). Nie ujawniać nazw partnerów.

## Pliki w pakiecie
- `Prezentacja JST Bonam Curam.dc.html` — kompletny prototyp (template + logika + wszystkie teksty i diagramy). Referencja do odtworzenia.
- `assets/logo.png` — logo.
