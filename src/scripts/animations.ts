import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis: Lenis | null = null;
let tickerCb: ((time: number) => void) | null = null;
let abortMagnetic: AbortController | null = null;

// ─── Inicializar todo ──────────────────────────────────────────────────────
function init() {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduced) return;

  // ── Capa 2: Lenis dirigido por GSAP ticker ──────────────────────────────
  lenis = new Lenis({ duration: 1.25, smoothWheel: true, autoRaf: false });
  lenis.on('scroll', ScrollTrigger.update);
  tickerCb = (time: number) => lenis!.raf(time * 1000);
  gsap.ticker.add(tickerCb);
  gsap.ticker.lagSmoothing(0);

  // ── Capa 3a: Parallax en el hero-bg ────────────────────────────────────
  const heroBg = document.querySelector<HTMLElement>('.hero-bg');
  if (heroBg) {
    gsap.to(heroBg, {
      yPercent: -22,
      ease: 'none',
      scrollTrigger: {
        trigger: '#hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }

  // Blob 1 — parallax suave
  const blob1 = document.querySelector<HTMLElement>('#hero .blob:not(.blob-2)');
  if (blob1) {
    gsap.to(blob1, {
      yPercent: -14,
      xPercent: 8,
      ease: 'none',
      scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    });
  }

  // ── Capa 3b: Hero entrance ──────────────────────────────────────────────
  const heroText = document.querySelector<HTMLElement>('#hero .text-side');
  if (heroText) {
    gsap.fromTo(
      Array.from(heroText.children),
      { opacity: 0, y: 32 },
      { opacity: 1, y: 0, duration: 0.95, stagger: 0.11, ease: 'power3.out', delay: 0.2 }
    );
  }

  const photoFrame = document.querySelector<HTMLElement>('#hero .photo-frame');
  if (photoFrame) {
    gsap.fromTo(
      photoFrame,
      { opacity: 0, scale: 0.85 },
      { opacity: 1, scale: 1, duration: 1.1, ease: 'power3.out', delay: 0.45 }
    );
  }

  // ── Capa 3c: Scroll reveals — elementos individuales ───────────────────
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 44 },
      {
        opacity: 1, y: 0,
        duration: 0.85,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 87%' },
      }
    );
  });

  // ── Capa 3d: Scroll reveals — hijos con stagger ────────────────────────
  gsap.utils.toArray<HTMLElement>('[data-reveal-stagger]').forEach((parent) => {
    gsap.fromTo(
      Array.from(parent.children) as HTMLElement[],
      { opacity: 0, y: 32 },
      {
        opacity: 1, y: 0,
        duration: 0.7,
        stagger: 0.09,
        ease: 'power3.out',
        scrollTrigger: { trigger: parent, start: 'top 87%' },
      }
    );
  });

  // ── Contadores animados para los stats ─────────────────────────────────
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = parseInt(el.dataset.count!);
    const suffix = el.dataset.suffix ?? '';

    ScrollTrigger.create({
      trigger: el,
      start: 'top 82%',
      once: true,
      onEnter: () => {
        const proxy = { val: 0 };
        gsap.fromTo(
          proxy,
          { val: 0 },
          {
            val: end,
            duration: 1.8,
            ease: 'power2.out',
            onUpdate() {
              el.textContent = Math.round(proxy.val) + suffix;
            },
          }
        );
      },
    });
  });

  // ── Progress bar de lectura en el nav ──────────────────────────────────
  const progressBar = document.querySelector<HTMLElement>('.nav-progress');
  if (progressBar) {
    ScrollTrigger.create({
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        progressBar.style.width = `${self.progress * 100}%`;
      },
    });
  }

  // ── Botones magnéticos (Fase C2) ───────────────────────────────────────
  initMagneticButtons();
}

// ─── Botones magnéticos ────────────────────────────────────────────────────
function initMagneticButtons() {
  abortMagnetic = new AbortController();
  const { signal } = abortMagnetic;

  document.querySelectorAll<HTMLElement>('.btn-primary, .btn-white').forEach((btn) => {
    btn.addEventListener(
      'mousemove',
      (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * 0.28;
        const y = (e.clientY - r.top - r.height / 2) * 0.28;
        gsap.to(btn, { x, y, duration: 0.28, ease: 'power2.out', overwrite: 'auto' });
      },
      { signal }
    );

    btn.addEventListener(
      'mouseleave',
      () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.65, ease: 'elastic.out(1, 0.4)', overwrite: 'auto' });
      },
      { signal }
    );
  });
}

// ─── Destruir todo antes de cada View Transition ──────────────────────────
function destroy() {
  abortMagnetic?.abort();
  abortMagnetic = null;

  if (tickerCb) {
    gsap.ticker.remove(tickerCb);
    tickerCb = null;
  }

  lenis?.destroy();
  lenis = null;

  ScrollTrigger.getAll().forEach((t) => t.kill());
}

document.addEventListener('astro:page-load', init);
document.addEventListener('astro:before-swap', destroy);
