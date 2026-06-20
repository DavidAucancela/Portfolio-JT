<script lang="ts">
  let { t, lang }: { t: any; lang: string } = $props();

  let menuOpen = $state(false);
  let scrolled = $state(false);

  const otherLang = lang === 'es' ? 'en' : 'es';

  $effect(() => {
    const onScroll = () => {
      // Oculto sobre el hero; aparece al acercarse a la siguiente sección
      scrolled = window.scrollY > window.innerHeight * 0.8;
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  });

  function close() {
    menuOpen = false;
  }
</script>

<nav class:scrolled>
  <div class="nav-progress" aria-hidden="true"></div>
  <div class="nav-inner container">
    <a href={`/${lang}#hero`} class="logo" onclick={close}>
      <span class="logo-initials">JT</span>
      <span class="logo-name">Jacqueline Tene</span>
    </a>

    <button
      class="hamburger"
      class:open={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
      aria-label="Toggle menu"
      aria-expanded={menuOpen}
    >
      <span></span>
      <span></span>
      <span></span>
    </button>

    <div class="nav-links" class:open={menuOpen}>
      <a href={`/${lang}#about`} onclick={close}>{t.about}</a>
      <a href={`/${lang}#experience`} onclick={close}>{t.experience}</a>
      <a href={`/${lang}#services`} onclick={close}>{t.services}</a>
      <a href={`/${lang}#projects`} onclick={close}>{t.projects}</a>
      <a href={`/${lang}#certifications`} onclick={close}>{t.certifications}</a>
      <a href={`/${lang}#contact`} onclick={close}>{t.contact}</a>
      <a href={`/${otherLang}`} class="lang-toggle" aria-label="Switch language">
        {otherLang.toUpperCase()}
      </a>
    </div>
  </div>
</nav>

<style>
  nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    height: 64px;
    display: flex;
    align-items: center;
    /* Oculto por defecto (sobre el hero); se revela al hacer scroll */
    transform: translateY(-100%);
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transition: background 0.3s ease, box-shadow 0.3s ease,
      transform 0.35s ease, opacity 0.35s ease, visibility 0.35s ease;
  }

  nav.scrolled {
    transform: translateY(0);
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    background: rgba(255, 255, 255, 0.97);
    backdrop-filter: blur(8px);
    box-shadow: 0 1px 0 var(--border);
  }

  .nav-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .logo {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    text-decoration: none;
    flex-shrink: 0;
  }

  .logo-initials {
    width: 36px;
    height: 36px;
    background: var(--primary);
    color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.85rem;
    flex-shrink: 0;
  }

  .logo-name {
    font-family: var(--font-heading);
    font-weight: 600;
    font-size: 1rem;
    color: var(--primary-dark);
  }

  .nav-links {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .nav-links a {
    padding: 0.4rem 0.75rem;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: color 0.15s, background 0.15s;
    white-space: nowrap;
  }

  .nav-links a:hover {
    color: var(--primary);
    background: var(--primary-pale);
  }

  .lang-toggle {
    margin-left: 0.5rem;
    padding: 0.35rem 0.85rem !important;
    border: 1.5px solid var(--border) !important;
    border-radius: var(--radius-full) !important;
    font-weight: 600 !important;
    font-size: 0.78rem !important;
    color: var(--primary) !important;
    background: transparent !important;
  }

  .lang-toggle:hover {
    background: var(--primary) !important;
    color: #fff !important;
    border-color: var(--primary) !important;
  }

  .hamburger {
    display: none;
    flex-direction: column;
    gap: 5px;
    background: none;
    border: none;
    cursor: pointer;
    padding: 4px;
  }

  .hamburger span {
    display: block;
    width: 22px;
    height: 2px;
    background: var(--primary-dark);
    border-radius: 2px;
    transition: transform 0.25s, opacity 0.25s;
  }

  .hamburger.open span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.open span:nth-child(2) {
    opacity: 0;
  }
  .hamburger.open span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  @media (max-width: 768px) {
    .logo-name {
      display: none;
    }

    .hamburger {
      display: flex;
    }

    .nav-links {
      display: none;
      position: absolute;
      top: 64px;
      left: 0;
      right: 0;
      flex-direction: column;
      align-items: stretch;
      background: #fff;
      padding: 1rem 1.5rem 1.5rem;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
      border-top: 1px solid var(--border);
      gap: 0.25rem;
    }

    .nav-links.open {
      display: flex;
    }

    .nav-links a {
      padding: 0.65rem 0.75rem;
      font-size: 0.95rem;
    }

    .lang-toggle {
      margin-left: 0 !important;
      margin-top: 0.5rem;
      align-self: flex-start;
    }
  }

  /* ── Progress bar de lectura ── */
  .nav-progress {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 0%;
    background: linear-gradient(to right, var(--primary-light), var(--accent));
    border-radius: 0 2px 2px 0;
    pointer-events: none;
    z-index: 10;
    transition: width 0.08s linear;
  }
</style>
