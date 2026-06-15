<script lang="ts">
  let { t }: { t: any } = $props();

  const colorMap: Record<string, string> = {
    green: 'var(--primary)',
    gold: 'var(--accent)',
    teal: 'var(--primary-light)',
    sand: '#A0856C',
  };
</script>

<section id="skills">
  <div class="container">
    <div class="section-header" data-reveal>
      <span class="section-eyebrow">{t.eyebrow}</span>
      <h2 class="section-title">{t.title}</h2>
    </div>

    <div class="skills-grid" data-reveal-stagger>
      {#each t.categories as cat}
        <div class="skill-category">
          <div class="cat-header">
            <span class="cat-dot" style="background: {colorMap[cat.color] ?? 'var(--primary)'}"></span>
            <h3>{cat.name}</h3>
          </div>
          <div class="skill-pills">
            {#each cat.items as item}
              <span class="skill-pill" style="--cat-color: {colorMap[cat.color] ?? 'var(--primary)'}">
                {item}
              </span>
            {/each}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<style>
  section {
    background: var(--bg);
  }

  .skills-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .skill-category {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 1.75rem;
  }

  .cat-header {
    display: flex;
    align-items: center;
    gap: 0.6rem;
    margin-bottom: 1.25rem;
  }

  .cat-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  h3 {
    font-size: 0.85rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  .skill-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .skill-pill {
    display: inline-block;
    padding: 0.35rem 0.85rem;
    border-radius: var(--radius-full);
    font-size: 0.82rem;
    font-weight: 500;
    background: color-mix(in srgb, var(--cat-color) 10%, white);
    color: color-mix(in srgb, var(--cat-color) 80%, black);
    border: 1px solid color-mix(in srgb, var(--cat-color) 20%, transparent);
    transition: background 0.15s, transform 0.15s;
  }

  .skill-pill:hover {
    background: color-mix(in srgb, var(--cat-color) 20%, white);
    transform: translateY(-1px);
  }

  @media (max-width: 640px) {
    .skills-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
