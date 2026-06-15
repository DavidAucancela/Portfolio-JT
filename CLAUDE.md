# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # dev server — suele arrancar en :4321, sube si el puerto está ocupado
npm run build    # static build → dist/
npm run preview  # preview del build estático
```

No hay test runner ni linter configurados.

## MCP servers (scope user, ya registrados)

| Servidor | Comando | Para qué usarlo |
|---|---|---|
| **playwright** | `npx @playwright/mcp@latest` | QA visual de animaciones y layout |
| **context7** | `npx @upstash/context7-mcp@latest` | Docs actualizadas de Astro 5 / Svelte 5 / GSAP |

Invocar explícitamente en el prompt: *"usa playwright mcp"* o *"usa context7 para la sintaxis actual de Svelte 5"*. De lo contrario el agente puede ignorarlos.

---

## Stack y output

**Astro 6 + Svelte 5 + TypeScript.** Salida completamente estática (SSG). Sin backend, sin base de datos.

Dependencias de producción: `astro`, `@astrojs/svelte`, `svelte`, `gsap`, `lenis`.

---

## i18n

Astro i18n nativo con `prefixDefaultLocale: true` (configurado en `astro.config.mjs`):

| URL | Idioma |
|---|---|
| `/es` | Español (default) |
| `/en` | Inglés |
| `/` | Redirect automático a `/es` |

**Regla crítica:** todo el texto visible va en `src/i18n/translations.ts`. Nunca hardcodear strings en los componentes. El helper `t(locale)` devuelve el objeto de traducciones para ese idioma; cada página lo pasa como prop `t` a sus componentes.

Hreflang y canonical están en `src/layouts/Layout.astro`. El `<ClientRouter />` (View Transitions) también vive ahí — habilita transiciones SPA entre `/es` y `/en`. El `<Nav>` usa `transition:persist="nav"` en ambas páginas para que no parpadee al cambiar de idioma.

---

## Arquitectura de componentes

```
src/
├── i18n/
│   └── translations.ts        ← único source of truth de todo el texto (ES + EN)
├── layouts/
│   └── Layout.astro           ← shell HTML: meta, hreflang, fuentes, ClientRouter, script de animaciones
├── styles/
│   └── global.css             ← design system completo (ver sección abajo)
├── scripts/
│   └── animations.ts          ← Lenis + GSAP + ScrollTrigger + parallax + contadores + magnéticos
└── components/
    ├── Nav.svelte              ← client:load · hamburger · scroll detection · progress bar
    ├── Hero.svelte             ← static · gradient mesh · h1 italic display · blobs animados · parallax layer
    ├── About.svelte            ← static · stats con gradient text · data-count para contador animado
    ├── Experience.svelte       ← static · timeline · botón descarga CV
    ├── Services.svelte         ← static · glassmorphism cards · icon watermark · blobs decorativos
    ├── Projects.svelte         ← static · números grandes -webkit-text-stroke · columna visual
    ├── Certifications.svelte   ← static · dos columnas: obtenidas / en curso
    ├── Skills.svelte           ← static · pills color-coded por categoría (color-mix())
    ├── Contact.svelte          ← client:load · form con $state · Svelte fade/fly en estado éxito
    └── Footer.svelte           ← static · nav + toggle idioma + créditos

pages/
├── index.astro                ← redirect a /es
├── es/index.astro             ← página en español
└── en/index.astro             ← página en inglés
```

**Hidratación:** sólo `Nav.svelte` y `Contact.svelte` tienen `client:load` y envían JS al cliente. El resto se renderiza a HTML estático en build time — cero JS de Svelte en el bundle del cliente para esas secciones.

**Svelte 5 runes usadas:**
- `let { t, lang } = $props()` — declaración de props en todos los componentes
- `$state()` — estado reactivo local (Nav: menuOpen, scrolled · Contact: formData, submitted, submitting)
- `$effect()` — efectos con cleanup (Nav: listener de scroll)
- `in:fly` / `out:fade` — transiciones Svelte en Contact (estado éxito del formulario)

---

## Design system (`src/styles/global.css`)

### Variables CSS clave

```css
/* Superficies */
--bg               /* #F5F2EC — crema cálido, fondo global */
--surface          /* #ffffff */
--surface-glass    /* rgba(255,255,255,0.72) — para glassmorphism */

/* Paleta */
--primary          /* #2D6A4F — verde forestal */
--primary-light    /* #40916C */
--primary-dark     /* #1B4332*/
--primary-pale     /* #D8F3DC — verde muy claro, fondos y tags */
--accent           /* #C9982A — dorado cálido */
--accent-light     /* #F0D080 */

/* Sombras coloreadas (no usar rgba negro) */
--shadow-sm / --shadow / --shadow-lg / --shadow-accent / --shadow-dark

/* Gradientes reutilizables */
--gradient-primary  /* primary-dark → primary-light, diagonal */
--gradient-text     /* primary-dark → accent, para texto clippeado */
--gradient-accent   /* accent → accent-light */
--gradient-mesh     /* 3 radiales superpuestos sobre #1B4332 — Hero bg */

/* Tipografía */
--font-heading     /* 'Playfair Display' (carga italic también) */
--font-body        /* 'Inter' */
--text-display     /* clamp(3.25rem, 7vw, 5.5rem) — h1 del Hero */
/* escala completa: --text-xs → --text-4xl */

/* Forma */
--radius    /* 16px */
--radius-sm /* 10px */
--radius-lg /* 28px */
--radius-full /* 9999px */
```

### Clases globales de utilidad

`.container` · `.btn` · `.btn-primary` · `.btn-outline` · `.btn-white` · `.btn-outline-white` · `.tag` · `.section-eyebrow` · `.section-title` · `.section-lead` · `.section-header` · `.text-gradient`

Los `<style>` de Svelte son **scoped** — usan las variables globales pero no comparten selectores de clase. Usar las clases globales directamente en el markup (`.btn`, `.container`, etc.) sin redeclararlas en el `<style>` del componente.

### Grain texture

`body::after` aplica una textura de ruido SVG al 2.5% de opacidad sobre toda la página (z-index: 9999, pointer-events: none). Se desactiva con `prefers-reduced-motion: reduce`.

---

## Sistema de animaciones (`src/scripts/animations.ts`)

Cinco capas independientes, cargadas vía `<script>` en `Layout.astro`:

| Capa | Tecnología | Qué hace |
|---|---|---|
| 1 | `<ClientRouter />` (Astro) | Transición SPA fade entre `/es` y `/en` |
| 2 | Lenis | Smooth scroll global, dirigido por GSAP ticker |
| 3a | GSAP hero entrance | Stagger de los hijos de `.text-side` al cargar |
| 3b | GSAP parallax | `.hero-bg` y blob se desplazan en scroll (scrub) |
| 3c | GSAP ScrollTrigger `data-reveal` | Fade+slide de elementos individuales |
| 3d | GSAP ScrollTrigger `data-reveal-stagger` | Stagger de hijos al entrar en viewport |
| 3e | GSAP contador | `[data-count]` + `[data-suffix]` → cuenta de 0 al valor |
| 3f | GSAP progress bar | `.nav-progress` refleja posición de scroll |
| 3g | GSAP magnético | `.btn-primary` y `.btn-white` siguen el cursor |
| 4 | Svelte transitions | `in:fly` / `out:fade` en Contact (estado éxito) |
| 5 | Three.js / Spline | No instalado — reservado para hero 3D futuro |

**Ciclo de vida con View Transitions:**
- `astro:before-swap` → `destroy()` — mata Lenis, ScrollTrigger y listeners magnéticos
- `astro:page-load` → `init()` — recrea todo desde cero

**`prefers-reduced-motion`:** si está activo, `init()` retorna inmediatamente. El CSS expone todo estáticamente con `!important`.

### Cómo añadir animaciones a un nuevo elemento

```html
<!-- Elemento que entra solo -->
<div data-reveal>...</div>

<!-- Contenedor cuyos hijos entran con stagger -->
<div data-reveal-stagger>
  <div>hijo 1</div>
  <div>hijo 2</div>
</div>

<!-- Contador numérico -->
<span data-count="35" data-suffix="%">35%</span>
```

El CSS de `global.css` pre-oculta estos elementos (`opacity: 0`). GSAP los anima al entrar en el viewport. No se necesita tocar `animations.ts` para añadir nuevos usos.

---

## Añadir una nueva sección

1. Agregar las traducciones en `src/i18n/translations.ts` bajo las claves `es` y `en`.
2. Crear `src/components/MiSeccion.svelte` con `let { t } = $props()`.
3. Importarla en `src/pages/es/index.astro` **y** `src/pages/en/index.astro`, pasando `t={texts.miSeccion}`.
4. Añadir `id="mi-seccion"` al `<section>` del componente.
5. Añadir el enlace de navegación en `translations.ts → nav.miSeccion` (ambos idiomas).
6. Añadir `data-reveal` o `data-reveal-stagger` según el contenido — las animaciones funcionan automáticamente.

---

## Contenido pendiente (placeholders en el código)

| Qué | Dónde cambiar |
|---|---|
| Foto real | `Hero.svelte` — reemplazar `<div class="photo-placeholder">` por `<img src="/foto.jpg" alt="Jacqueline Tene" />` |
| CV PDF | Colocar en `public/cv-jacqueline-tene.pdf` (enlazado desde Hero y Experience) |
| Email profesional | `translations.ts` → `contact.email` (ES y EN) |
| URL de LinkedIn | `translations.ts` → `contact.linkedin` (ES y EN) |
| Formulario real | `Contact.svelte → handleSubmit()` — conectar a Formspree, Netlify Forms u otro |
| Google Analytics | `Layout.astro` — añadir script GA4 en el `<head>` |
| Fotos de proyectos | `Projects.svelte` — añadir `<img>` dentro de `.project-body` |
| Métricas reales | `About.svelte` — ajustar los valores de `data-count` con cifras verificadas |
