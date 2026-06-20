<script lang="ts">
  let { t, lang }: { t: any; lang: string } = $props();
</script>

<section id="services">
  <!-- Blobs decorativos de fondo para que el glass tenga algo detrás -->
  <div class="bg-blob bg-blob-1" aria-hidden="true"></div>
  <div class="bg-blob bg-blob-2" aria-hidden="true"></div>

  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-eyebrow">{t.eyebrow}</span>
      <h2 class="section-title">{t.title}</h2>
      <p class="section-lead">{t.subtitle}</p>
    </div>

    <div class="services-grid" data-reveal-stagger>
      {#each t.items as service}
        <div class="service-card">
          <!-- Icono grande de fondo como watermark -->
          <span class="icon-bg" aria-hidden="true">{service.icon}</span>
          <div class="service-icon">{service.icon}</div>
          <h3>{service.title}</h3>
          <p>{service.desc}</p>
        </div>
      {/each}
    </div>

    <div class="cta-row">
      <a href={`/${lang}#contact`} class="btn btn-primary">{t.cta}</a>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(180deg, var(--surface) 0%, var(--bg) 100%);
    position: relative;
    overflow: hidden;
  }

  .bg-blob {
    position: absolute;
    border-radius: 50%;
    pointer-events: none;
  }

  .bg-blob-1 {
    width: 700px; height: 700px;
    background: radial-gradient(circle, rgba(124,58,237,0.07) 0%, transparent 70%);
    top: -200px; right: -150px;
  }

  .bg-blob-2 {
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(214,36,140,0.06) 0%, transparent 70%);
    bottom: -150px; left: -100px;
  }

  .container {
    position: relative;
    z-index: 1;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-bottom: 3.5rem;
  }

  .service-card {
    background: var(--surface-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border: 1px solid var(--border-glass);
    border-radius: var(--radius-lg);
    padding: 2.25rem 2rem;
    position: relative;
    overflow: hidden;
    box-shadow: var(--shadow-sm), inset 0 1px 0 rgba(255,255,255,0.95);
    transition: transform 0.28s cubic-bezier(.34,1.56,.64,1),
                box-shadow 0.28s ease;
  }

  .service-card:hover {
    transform: translateY(-6px);
    box-shadow: var(--shadow-lg), inset 0 1px 0 rgba(255,255,255,0.95);
  }

  /* Línea de acento superior con gradiente por card */
  .service-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: var(--gradient-primary);
  }

  .service-card:nth-child(2)::before {
    background: var(--gradient-accent);
  }

  .service-card:nth-child(3)::before {
    background: linear-gradient(90deg, var(--primary-dark), var(--primary));
  }

  .service-card:nth-child(4)::before {
    background: linear-gradient(90deg, var(--primary), var(--primary-light));
  }

  /* Icono watermark de fondo */
  .icon-bg {
    position: absolute;
    right: -0.75rem;
    bottom: -0.75rem;
    font-size: 5.5rem;
    opacity: 0.07;
    pointer-events: none;
    transition: opacity 0.3s, transform 0.35s cubic-bezier(.34,1.56,.64,1);
    user-select: none;
  }

  .service-card:hover .icon-bg {
    opacity: 0.13;
    transform: scale(1.15) rotate(-6deg);
  }

  .service-icon {
    font-size: 2rem;
    margin-bottom: 1.25rem;
    display: block;
    position: relative;
    z-index: 1;
  }

  h3 {
    font-size: var(--text-xl);
    color: var(--primary-dark);
    margin-bottom: 0.65rem;
    position: relative;
    z-index: 1;
  }

  p {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.75;
    position: relative;
    z-index: 1;
  }

  .cta-row {
    text-align: center;
  }

  @media (max-width: 640px) {
    .services-grid { grid-template-columns: 1fr; }
  }
</style>
