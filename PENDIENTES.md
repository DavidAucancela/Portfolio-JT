# PENDIENTES — Portfolio Jacqueline Tene

## Críticos (el portfolio no funciona sin esto)
background purple 


| # | Tarea | Dónde |
|---|---|---|
| 1 | **Foto profesional real** | `Hero.svelte` — reemplazar `<div class="photo-placeholder">` por `<img src="/foto.jpg">` |
| 2 | **CV en PDF** | Subir a `public/cv-jacqueline-tene.pdf` (Hero y Experience ya lo enlazan) |
| 3 | **Email real** | `translations.ts` → `contact.email` (ES + EN) |
| 4 | **URL de LinkedIn real** | `translations.ts` → `contact.linkedin` (ES + EN) |
| 5 | **Formulario de contacto funcional** | `Contact.svelte → handleSubmit()` — conectar a Formspree, Netlify Forms o EmailJS |

---

## Próximas actividades (mejoras de contenido)

| # | Actividad | Prioridad |
|---|---|---|
| 6 | Verificar **métricas reales** de `data-count` en `About.svelte` (años de exp., proyectos, etc.) | Alta |
| 7 | Agregar **nombre real de la agencia** en el segundo rol de experiencia (actualmente "Agencia de Viajes Local") | Alta |
| 8 | **Fotos de proyectos** en `Projects.svelte` — capturas de dashboards OTA, fotos de grupos, etc. | Media |
| 9 | Añadir **testimonios** de clientes o superiores — nueva sección o dentro de Proyectos | Media |
| 10 | Conectar **Google Analytics 4** — añadir script GA4 en `Layout.astro` `<head>` | Media |
| 11 | Configurar **dominio personalizado** (ej: `jacquelinetene.com`) al desplegar en Netlify/Vercel | Baja |

---

## Mejoras para un CV único

### Diferenciadores de contenido

- [ ] **Mapa interactivo de Ecuador** en Proyectos o Hero — mostrar visualmente las zonas trabajadas (Cotopaxi, región andina). Impacto inmediato, pocos portfolios lo tienen.
- [ ] **Caso de estudio expandido** para CTC La Moya — gráfico de ocupación antes/después, capturas del Channel Manager, proceso paso a paso. Convierte el +35% en una historia.
- [ ] **Video testimonial corto** (30–60 seg) de alguien de CTC La Moya o un cliente — embebido en Proyectos. Humaniza el trabajo.
- [ ] **Sección "Mi filosofía"** — párrafo íntimo sobre el por qué del turismo comunitario, no solo el qué. Los reclutadores recuerdan el propósito.
- [ ] **Número con contexto** — debajo de "+35%" agregar baseline real (ej. "de 42% → 57% ocupación"). Los datos cuentan mejor con contexto.

### Diferenciadores visuales

- [ ] **Foto editorial en exteriores** — con fondo natural ecuatoriano, consistente con el branding verde-forestal.
- [ ] **Elementos visuales andinos** — textil geométrico como pattern decorativo sutil en alguna sección (reemplazaría un blob). Identidad visual única.

### Diferenciadores técnicos

- [ ] **Open Graph completo** con imagen personalizada — cuando se comparte el link en LinkedIn se ve profesional.
- [ ] **PDF del CV autogenerado** desde el portfolio (usando `@astrojs/pdf` o similar) — siempre sincronizado con el contenido online.
- [ ] **Modo reclutador** — query param `?mode=recruiter` que muestre solo Hero + Experience + Skills en vista limpia para imprimir.

---

_Prioridad sugerida: completar primero los 5 críticos → luego caso de estudio expandido → luego mapa interactivo._
