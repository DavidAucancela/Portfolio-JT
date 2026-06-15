<script lang="ts">
  let { t }: { t: any } = $props();
</script>

<section id="projects">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-eyebrow">{t.eyebrow}</span>
      <h2 class="section-title">{t.title}</h2>
    </div>

    <div class="projects-list">
      {#each t.items as project, i}
        <div class="project-card" data-reveal>
          <div class="project-number" aria-hidden="true">0{i + 1}</div>
          <div class="project-body">
            <div class="project-result">{project.result}</div>
            <h3>{project.title}</h3>
            <p>{project.desc}</p>
            <div class="tags">
              {#each project.tags as tag}
                <span class="tag">{tag}</span>
              {/each}
            </div>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  section::before {
    content: '';
    position: absolute;
    width: 500px; height: 500px;
    background: radial-gradient(circle, rgba(45,106,79,0.05) 0%, transparent 70%);
    bottom: -100px; right: -100px;
    border-radius: 50%;
    pointer-events: none;
  }

  .projects-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    position: relative;
    z-index: 1;
  }

  .project-card {
    display: grid;
    grid-template-columns: 110px 1fr;
    gap: 0;
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    overflow: hidden;
    transition: box-shadow 0.28s, transform 0.28s cubic-bezier(.34,1.56,.64,1);
  }

  .project-card:hover {
    box-shadow: var(--shadow-lg);
    transform: translateX(6px);
  }

  /* Número grande como columna visual */
  .project-number {
    background: var(--primary-pale);
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font-heading);
    font-size: clamp(3.5rem, 5vw, 5rem);
    font-weight: 700;
    font-style: italic;
    color: transparent;
    -webkit-text-stroke: 1.5px rgba(45,106,79,0.35);
    line-height: 1;
    user-select: none;
    transition: background 0.28s, -webkit-text-stroke 0.28s;
    padding: 1.5rem 1rem;
  }

  .project-card:hover .project-number {
    background: var(--primary-dark);
    -webkit-text-stroke-color: rgba(255,255,255,0.35);
  }

  .project-body {
    padding: 1.75rem 2rem;
  }

  .project-result {
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;
    background: var(--gradient-primary);
    color: #fff;
    font-size: var(--text-xs);
    font-weight: 700;
    letter-spacing: 0.04em;
    padding: 0.28rem 0.85rem;
    border-radius: var(--radius-full);
    margin-bottom: 0.75rem;
  }

  .project-result::before {
    content: '↑';
    font-size: 0.75rem;
  }

  h3 {
    font-size: var(--text-xl);
    color: var(--primary-dark);
    margin-bottom: 0.6rem;
    line-height: 1.3;
  }

  p {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: 1.75;
    margin-bottom: 1.1rem;
  }

  .tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  @media (max-width: 580px) {
    .project-card { grid-template-columns: 1fr; }
    .project-number {
      font-size: 2.5rem;
      padding: 1rem 1.5rem;
      justify-content: flex-start;
      border-bottom: 1px solid var(--border);
    }
    .project-card:hover { transform: none; }
  }
</style>
