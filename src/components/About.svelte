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

        <div class="values">
          <p class="values-label">{t.values_title}</p>
          <div class="values-list">
            {#each t.values as value}
              <span class="value-chip">{value}</span>
            {/each}
          </div>
        </div>
      </div>

      <div class="visual-col" data-reveal-stagger>
        <div class="stat-card">
          <span class="stat-number" data-count="3" data-suffix="+">3+</span>
          <span class="stat-label">{isEn ? 'Years of experience' : 'Años de experiencia'}</span>
        </div>

        <div class="stat-card accent">
          <span class="stat-number" data-count="35" data-suffix="%">35%</span>
          <span class="stat-label">{isEn ? 'Occupancy increase' : 'Aumento de ocupación'}</span>
        </div>

        <div class="stat-card wide">
          <span class="stat-number" data-count="50" data-suffix="+">50+</span>
          <span class="stat-label">{isEn ? 'People coordinated per trip' : 'Personas por grupo coordinadas'}</span>
        </div>

        <div class="map-decoration" aria-hidden="true">
          <svg viewBox="0 0 200 180" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 20 C60 20 30 55 30 95 C30 135 70 160 100 160 C130 160 170 135 170 95 C170 55 140 20 100 20Z"
              fill="var(--primary-pale)" stroke="var(--primary-light)" stroke-width="1.5"/>
            <circle cx="100" cy="95" r="9" fill="var(--primary)"/>
            <circle cx="100" cy="95" r="18" fill="var(--primary)" opacity="0.18"/>
            <circle cx="100" cy="95" r="28" fill="var(--primary)" opacity="0.07"/>
            <text x="100" y="134" text-anchor="middle" font-size="11"
              fill="var(--primary-dark)" font-family="Inter, sans-serif" font-weight="600">Ecuador</text>
          </svg>
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
    background: radial-gradient(circle, rgba(45,106,79,0.05) 0%, transparent 70%);
    top: -200px; right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  .about-grid {
    display: grid;
    grid-template-columns: 1fr 360px;
    gap: 5rem;
    align-items: start;
    position: relative;
    z-index: 1;
  }

  .text-col p {
    color: var(--text-muted);
    line-height: 1.85;
    margin-bottom: 1.35rem;
  }

  .values {
    margin-top: 2.25rem;
    padding-top: 2.25rem;
    border-top: 1px solid var(--border);
  }

  .values-label {
    font-weight: 700;
    font-size: var(--text-xs);
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--text-muted);
    margin-bottom: 0.85rem;
  }

  .values-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .value-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    padding: 0.45rem 1rem;
    background: var(--primary-pale);
    color: var(--primary-dark);
    border-radius: var(--radius-full);
    font-size: var(--text-sm);
    font-weight: 600;
    border: 1px solid rgba(45,106,79,0.12);
  }

  .value-chip::before {
    content: '✦';
    font-size: 0.55rem;
    color: var(--accent);
  }

  /* ── Stats ── */
  .visual-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  .stat-card {
    background: var(--bg);
    border-radius: var(--radius);
    padding: 1.75rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    border: 1px solid var(--border);
    transition: box-shadow 0.25s, transform 0.25s;
  }

  .stat-card:hover {
    box-shadow: var(--shadow);
    transform: translateY(-3px);
  }

  .stat-card.wide {
    grid-column: 1 / -1;
  }

  .stat-card.accent {
    background: var(--gradient-primary);
    border-color: transparent;
    box-shadow: var(--shadow-dark);
  }

  .stat-number {
    font-family: var(--font-heading);
    font-size: clamp(2.8rem, 4.5vw, 4rem);
    font-weight: 700;
    line-height: 1;
    background: var(--gradient-text);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .stat-card.accent .stat-number {
    background: linear-gradient(135deg, #fff 0%, var(--accent-light) 100%);
    -webkit-background-clip: text;
    background-clip: text;
  }

  /* En el wide card, el número es un poco más grande */
  .stat-card.wide .stat-number {
    font-size: clamp(3rem, 5vw, 4.5rem);
  }

  .stat-label {
    font-size: var(--text-sm);
    color: var(--text-muted);
    font-weight: 500;
    line-height: 1.4;
  }

  .stat-card.accent .stat-label {
    color: rgba(255, 255, 255, 0.78);
  }

  .map-decoration {
    grid-column: 1 / -1;
    background: var(--bg);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 130px;
    overflow: hidden;
  }

  .map-decoration svg {
    height: 106px;
    width: auto;
  }

  @media (max-width: 900px) {
    .about-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
    .visual-col {
      grid-template-columns: repeat(3, 1fr);
    }
    .stat-card.wide { grid-column: auto; }
    .map-decoration { display: none; }
  }

  @media (max-width: 560px) {
    .visual-col { grid-template-columns: 1fr 1fr; }
    .stat-card.wide { grid-column: 1 / -1; }
  }
</style>
