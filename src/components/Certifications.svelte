<script lang="ts">
  let { t }: { t: any } = $props();
</script>

<section id="certifications" class="bg-white">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-eyebrow">{t.eyebrow}</span>
      <h2 class="section-title">{t.title}</h2>
    </div>

    <div class="cert-grid" data-reveal-stagger>
      <div class="cert-col">
        <h3 class="col-title obtained">{t.obtained}</h3>
        <div class="cert-list">
          {#each t.items_obtained as cert}
            <div class="cert-item">
              <div class="cert-status obtained-dot" aria-label="Completado"></div>
              <div class="cert-info">
                <p class="cert-name">{cert.name}</p>
                <p class="cert-meta">{cert.org} · {cert.year}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>

      <div class="divider" aria-hidden="true"></div>

      <div class="cert-col">
        <h3 class="col-title in-progress">{t.in_progress}</h3>
        <div class="cert-list">
          {#each t.items_progress as cert}
            <div class="cert-item">
              <div class="cert-status progress-dot" aria-label="En progreso"></div>
              <div class="cert-info">
                <p class="cert-name">{cert.name}</p>
                <p class="cert-meta">{cert.org} · {cert.eta}</p>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .bg-white {
    background: var(--surface);
  }

  .cert-grid {
    display: grid;
    grid-template-columns: 1fr 1px 1fr;
    gap: 3rem;
    align-items: start;
  }

  .divider {
    background: var(--border);
    align-self: stretch;
  }

  .col-title {
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    border-radius: var(--radius-full);
    margin-bottom: 1.5rem;
    display: inline-block;
  }

  .col-title.obtained {
    background: var(--primary-pale);
    color: var(--primary-dark);
  }

  .col-title.in-progress {
    background: #FEF3C7;
    color: #92400E;
  }

  .cert-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .cert-item {
    display: flex;
    gap: 1rem;
    align-items: flex-start;
    padding: 1rem 1.25rem;
    background: var(--bg);
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
  }

  .cert-status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
    margin-top: 4px;
  }

  .obtained-dot {
    background: var(--primary);
    box-shadow: 0 0 0 3px var(--primary-pale);
  }

  .progress-dot {
    background: #F59E0B;
    box-shadow: 0 0 0 3px #FEF3C7;
    animation: progressPulse 2s infinite;
  }

  @keyframes progressPulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .cert-name {
    font-size: 0.9rem;
    font-weight: 500;
    color: var(--text);
    margin-bottom: 0.2rem;
  }

  .cert-meta {
    font-size: 0.8rem;
    color: var(--text-muted);
  }

  @media (max-width: 768px) {
    .cert-grid {
      grid-template-columns: 1fr;
    }

    .divider {
      height: 1px;
    }
  }
</style>
