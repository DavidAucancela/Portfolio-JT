<script lang="ts">
  let { t }: { t: any } = $props();
  const isEn = t.eyebrow === 'About me';
</script>

<section id="about">
  <div class="container">
    <div class="about-grid">
      <div class="text-col" data-reveal>
        <div class="section-header">
          <span class="section-eyebrow">{t.eyebrow}</span>
          <h2 class="section-title">{t.title}</h2>
        </div>
        <p>{t.p1}</p>
        <p>{t.p2}</p>

        <div class="knowledge">
          <p class="knowledge-label">{t.knowledge_title}</p>
          <ul class="knowledge-list">
            {#each t.knowledge as item}
              <li class="knowledge-item">
                <span class="knowledge-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12.5l4.5 4.5L19 7.5" stroke="currentColor" stroke-width="2.4"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </span>
                <span class="knowledge-text">{item}</span>
              </li>
            {/each}
          </ul>
        </div>
      </div>

      <div class="visual-col" data-reveal-stagger>
        <div class="stat-card">
          <span class="stat-number" data-count="3" data-suffix="+">3+</span>
          <span class="stat-label">{isEn ? 'Years of experience' : 'Años de experiencia'}</span>
        </div>

        <div class="stat-card">
          <span class="stat-number" data-count="50" data-suffix="+">50+</span>
          <span class="stat-label">{isEn ? 'People coordinated per trip' : 'Personas por grupo coordinadas'}</span>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: var(--surface);
    position: relative;
    overflow: hidden;
  }

  /* Decoración de fondo sutil */
  section::before {
    content: '';
    position: absolute;
    width: 600px; height: 600px;
    background: radial-gradient(circle, rgba(124,58,237,0.05) 0%, transparent 70%);
    top: -200px; right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 5rem;
    align-items: stretch;
    position: relative;
    z-index: 1;
  }

  .text-col p {
    color: var(--text-muted);
    line-height: 1.85;
    margin-bottom: 1.35rem;
  }

  .knowledge {
    margin-top: 2.25rem;
    padding-top: 2.25rem;
    border-top: 1px solid var(--border);
  }

  .knowledge-label {
    font-weight: 700;
    font-size: var(--text-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 1.25rem;
  }

  .knowledge-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.85rem 1.25rem;
  }

  .knowledge-item {
    display: flex;
    align-items: center;
    gap: 0.7rem;
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text);
    line-height: 1.3;
  }

  .knowledge-icon {
    flex-shrink: 0;
    width: 26px;
    height: 26px;
    display: grid;
    place-items: center;
    border-radius: var(--radius-full);
    background: var(--primary-pale);
    color: var(--primary);
    transition: background 0.25s, color 0.25s, transform 0.25s;
  }

  .knowledge-icon svg {
    width: 15px;
    height: 15px;
  }

  .knowledge-item:hover .knowledge-icon {
    background: var(--primary);
    color: #fff;
    transform: scale(1.08);
  }

  @media (max-width: 480px) {
    .knowledge-list {
      grid-template-columns: 1fr;
    }
  }

  /* ── Stats ── */
  .visual-col {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    height: 100%;
  }

  .stat-card {
    flex: 1;
    background: var(--bg);
    border-radius: var(--radius);
    padding: 2.5rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 0.6rem;
    border: 1px solid var(--border);
    transition: box-shadow 0.25s, transform 0.25s;
  }

  .stat-card:hover {
    box-shadow: var(--shadow);
    transform: translateY(-3px);
  }

  .stat-number {
    font-family: var(--font-heading);
    font-size: clamp(3.5rem, 6vw, 5.5rem);
    font-weight: 700;
    line-height: 1;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-label {
    font-size: var(--text-base);
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1.4;
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .visual-col {
      flex-direction: row;
      height: auto;
    }
    .stat-card {
      padding: 2rem 1.5rem;
    }
  }

  @media (max-width: 560px) {
    .visual-col { flex-direction: column; }
  }
</style>
