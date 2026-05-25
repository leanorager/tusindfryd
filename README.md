# Teknisk dokumentation – Tusindfryd

Tusindfryd er et møbel- og interiørstudie i Aarhus med fokus på brugte møbler. Dette er dokumentationen for projektets kodebase.

---

## Kom i gang

**Kræver:** Node.js 18+

```bash
npm install
npm run dev       # Start lokal udviklingsserver på http://localhost:4321
npm run build     # Byg til produktion
npm run preview   # Preview af build lokalt
```

> **Note om API-nøgler:** Supabase URL og API-nøgle er hardcodet direkte i kildekoden. Dette er et bevidst valg i et skolesammenhæng, hvor nøglen er en offentlig anon-nøgle med begrænset adgang (kun læsning), og hvor simpel opsætning er prioriteret over sikkerhedspraksis. I et produktionsprojekt bør nøgler altid ligge i en `.env`-fil og aldrig committes til Git.

---

## Projektstruktur

```
tusindfryd/
├── public/
│   ├── img/          # Billeder (.webp)
│   ├── svg/          # Ikoner og logoer
│   ├── vid/          # Videoer
│   └── fonts/        # Lokale fonte
├── src/
│   ├── assets/       # Billeder der behandles af Astro (kun thumbsup.png)
│   ├── components/   # Genbrugelige Astro-komponenter
│   ├── layouts/      # Sidelayout (MainLayout.astro)
│   ├── lib/          # Delte konstanter og typer (categories.ts)
│   ├── pages/        # En fil = én URL-rute
│   │   ├── shop/     # /shop/[category] og /shop/search
│   │   └── product/  # /product/[id]
│   └── styles/       # Global CSS (tailwind.css)
```

Statiske filer (billeder, fonte, videoer) placeres i `public/` og refereres med absolut sti, fx `/img/billede.webp`. Aldrig uden den ledende `/`.

---

## Navngivning

- **Filer og mapper:** små bogstaver, bindestreg som separator – fx `about.astro`, `bliv-medlem.astro`
- **Komponenter:** PascalCase – fx `ProductCardCarousel.astro`, `ShowroomBlock.astro`
- **Billeder:** snake_case – fx `about_left.webp`, `princip_big.webp`
- **CSS-klasser:** Tailwind utility-klasser. Egne klasser bruger kebab-case – fx `.desktop-product-img`
- **TypeScript-typer:** PascalCase – fx `Product`, `CategoryConfig`

---

## Link til scripts

Scripts placeres i bunden af den relevante `.astro`-fil med Astros `<script>`-tag. Lenis (smooth scroll) initialiseres i `MainLayout.astro` og gælder alle sider. Alpine.js initialiseres globalt via `src/entrypoint.ts`.

Eksempel fra `MainLayout.astro`:
```astro
<script>
  import Lenis from "lenis";
  const lenis = new Lenis({ duration: 0.8 });
  // ...
</script>
```

---

## Git branches

Navngivning: `kebab-case` der beskriver hvad branchen indeholder.

Eksempler:
- `fix-horizontal-scroll`
- `fix-images`
- `readme-file`

Branches oprettes fra `master` og merges tilbage via pull request på GitHub.

---

## Arbejdsflow

- Arbejd altid i en ny branch – aldrig direkte i `master`
- En branch pr. feature eller fix
- Commit-beskeder skal være på engelsk og beskrivende – fx `fix img mapping` eller `add intersect animations`
- Deployment sker automatisk via Netlify når `master` opdateres

---

## Kode

- **Komponenter:** Props defineres med TypeScript-interface i frontmatter
- **JavaScript:** Arrow functions foretrækkes i scripts, `function`-keyword i Astro frontmatter
- **CSS:** Tailwind utility-klasser bruges direkte i markup. Global CSS kun til ting Tailwind ikke kan løse
- **Kommentarer:** Skrives kun når det ikke er åbenlyst hvad koden gør – fx `// Client-side pagination from cached results`
- **Alpine.js:** Bruges til reaktiv UI (filtre, accordions, kurv). State defineres med `x-data`, logik i `Alpine.data()`

---

## Funktionalitet

- **Hentning af produkter fra Supabase** – produktdata hentes ved build-tid i statiske sider via Supabase REST API
- **Filtrering og sortering** – brugeren kan filtrere på kategori, materiale, farve og pris via et sidepanel; filtrering sker delvist server-side (kategori, pris) og delvist client-side (materiale, farve)
- **Paginering med "Se flere"** – produkter loades i batches på 24; `loadMore()` henter næste batch fra Supabase eller en cachet liste
- **Produktsøgning** – `/shop/search` filtrerer produkter client-side baseret på søgeord i titel og undertitel
- **Kurv** – Alpine.js `$store.cart` håndterer kurven globalt på tværs af alle sider; state gemmes i `localStorage`
- **Splash screen** – vises ved indlæsning af index, shop og search; logo fader ind og ud
- **Smooth scroll** – Lenis giver blød scroll på alle sider undtagen produktsiden, hvor et custom wheel-handler snapper til billeder
- **Scroll-animationer** – `tailwindcss-intersect` trigger fade-up animationer når elementer ruller ind i viewport

---

## API endpoints

Alle kald går til Supabase REST API:

- `GET https://txfouhhxrpcyrsvjnnpd.supabase.co/rest/v1/products?select=*` – alle produkter
- `GET .../products?id=eq.{id}&select=*` – ét produkt efter ID
- `GET .../products?select=id,title,...&category=cs.{filter}` – produkter filtreret på kategori
- `GET .../products?select=id` – kun ID'er, bruges til at generere statiske ruter

Pagination sker via `Range`-headeren, fx `Range: 0-23` for de første 24 produkter.

---

## Dokumentation af funktion

### `renderCard(product, i)`

Bruges i `shop/[category].astro` og `shop/search.astro` til dynamisk at generere HTML for et produktkort, når nye produkter loades via "Se flere" eller filtrering.

**Beskrivelse:** Tager et produktobjekt og et indeks og returnerer en HTML-streng med animationsklasser og kortets indhold. Kaldes med `.map()` ved initial rendering og med `insertAdjacentHTML` ved paginering.

**Parametre:**
- `product` – produktobjekt med felterne `id`, `title`, `subtitle`, `regular_price`, `member_price`, `image1`, `image2`
- `i` – indeks i den aktuelle batch, bruges til at beregne animation-delay (stagger)

**Returnerer:** HTML-streng klar til at indsættes i DOM'en.

```javascript
renderCard(product, i = 0) {
  const delay = Math.min(i % 4, 3) * 75;

  return `<div class="opacity-0 translate-y-4 intersect:opacity-100 intersect:translate-y-0 transition-all duration-500"
    style="transition-delay: ${delay}ms">
    <a href="/product/${product.id}" class="block group">
      ...
    </a>
  </div>`;
}

// Hvordan funktionen kaldes ved paginering:
nextBatch.forEach((p, i) => {
  grid.insertAdjacentHTML("beforeend", renderCard(p, i));
});
```
