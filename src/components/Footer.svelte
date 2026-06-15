<script lang="ts">
  let { lang }: { lang: string } = $props();
  const year = 2026;
</script>

<footer>
  <div class="container">
    <div class="footer-inner">
      <div class="footer-logo">
        <span class="initials">JT</span>
        <div>
          <p class="name">Jacqueline Tene</p>
          <p class="role">
            {lang === 'es' ? 'Especialista en Operaciones Turísticas' : 'Tourism Operations Specialist'}
          </p>
        </div>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="/{lang}#about">{lang === 'es' ? 'Sobre mí' : 'About'}</a>
        <a href="/{lang}#experience">{lang === 'es' ? 'Experiencia' : 'Experience'}</a>
        <a href="/{lang}#services">{lang === 'es' ? 'Servicios' : 'Services'}</a>
        <a href="/{lang}#contact">{lang === 'es' ? 'Contacto' : 'Contact'}</a>
      </nav>

      <div class="footer-lang">
        <a href="/es" class:active={lang === 'es'}>ES</a>
        <span>|</span>
        <a href="/en" class:active={lang === 'en'}>EN</a>
      </div>
    </div>

    <div class="footer-bottom">
      <p>© {year} Jacqueline Tene. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}</p>
      <p class="built-with">
        {lang === 'es' ? 'Construido con' : 'Built with'}
        <a href="https://astro.build" target="_blank" rel="noopener">Astro</a> +
        <a href="https://svelte.dev" target="_blank" rel="noopener">Svelte</a>
      </p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: var(--primary-dark);
    color: rgba(255, 255, 255, 0.7);
    padding-block: 2.5rem 1.5rem;
  }

  .footer-inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    padding-bottom: 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 1.5rem;
  }

  .footer-logo {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .initials {
    width: 40px;
    height: 40px;
    background: rgba(255, 255, 255, 0.12);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-weight: 700;
    font-size: 0.9rem;
    color: #fff;
    flex-shrink: 0;
  }

  .name {
    font-weight: 600;
    color: #fff;
    font-size: 0.95rem;
  }

  .role {
    font-size: 0.78rem;
    color: rgba(255, 255, 255, 0.5);
  }

  .footer-nav {
    display: flex;
    gap: 0.25rem;
    flex-wrap: wrap;
  }

  .footer-nav a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.6);
    font-size: 0.85rem;
    padding: 0.3rem 0.65rem;
    border-radius: var(--radius-sm);
    transition: color 0.15s, background 0.15s;
  }

  .footer-nav a:hover {
    color: #fff;
    background: rgba(255, 255, 255, 0.08);
  }

  .footer-lang {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .footer-lang a {
    text-decoration: none;
    color: rgba(255, 255, 255, 0.5);
    font-weight: 600;
    transition: color 0.15s;
  }

  .footer-lang a.active {
    color: #fff;
  }

  .footer-lang a:hover {
    color: #fff;
  }

  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.4);
  }

  .built-with a {
    color: rgba(255, 255, 255, 0.6);
    text-decoration: none;
    transition: color 0.15s;
  }

  .built-with a:hover {
    color: var(--accent-light);
  }

  @media (max-width: 640px) {
    .footer-inner {
      flex-direction: column;
      align-items: flex-start;
    }

    .footer-bottom {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
