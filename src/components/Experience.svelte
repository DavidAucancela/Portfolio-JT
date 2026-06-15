<script lang="ts">
  let { t }: { t: any } = $props();
</script>

<section id="experience">
  <div class="container">
    <div class="header-row" data-reveal>
      <div class="section-header">
        <span class="section-eyebrow">{t.eyebrow}</span>
        <h2 class="section-title">{t.title}</h2>
      </div>
      <a href="/cv-jacqueline-tene.pdf" download class="btn btn-outline">
        ↓ {t.download_cv}
      </a>
    </div>

    <div class="timeline">
      {#each t.roles as role, i}
        <div class="role-card" data-reveal>
          <div class="role-marker">
            <div class="marker-dot"></div>
            {#if i < t.roles.length - 1}
              <div class="marker-line"></div>
            {/if}
          </div>
          <div class="role-body">
            <div class="role-meta">
              <span class="period">{role.period}</span>
              <span class="location">📍 {role.location}</span>
            </div>
            <h3>{role.title}</h3>
            <p class="company">{role.company}</p>
            <ul>
              {#each role.bullets as bullet}
                <li>{bullet}</li>
              {/each}
            </ul>
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

  .header-row {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin-bottom: 3rem;
    gap: 1rem;
  }

  .header-row .section-header {
    margin-bottom: 0;
  }

  .timeline {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .role-card {
    display: grid;
    grid-template-columns: 48px 1fr;
    gap: 1.5rem;
  }

  .role-marker {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 6px;
  }

  .marker-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    background: var(--primary);
    border: 3px solid var(--bg);
    box-shadow: 0 0 0 2px var(--primary);
    flex-shrink: 0;
  }

  .marker-line {
    width: 2px;
    flex: 1;
    background: var(--border);
    margin-top: 8px;
  }

  .role-body {
    background: var(--surface);
    border-radius: var(--radius);
    border: 1px solid var(--border);
    padding: 1.75rem;
    margin-bottom: 1.5rem;
    transition: box-shadow 0.2s;
  }

  .role-body:hover {
    box-shadow: var(--shadow);
  }

  .role-meta {
    display: flex;
    gap: 1rem;
    margin-bottom: 0.75rem;
    flex-wrap: wrap;
  }

  .period {
    font-size: 0.82rem;
    font-weight: 600;
    color: var(--primary);
    background: var(--primary-pale);
    padding: 0.2rem 0.65rem;
    border-radius: var(--radius-full);
  }

  .location {
    font-size: 0.82rem;
    color: var(--text-muted);
  }

  h3 {
    font-size: 1.15rem;
    color: var(--text);
    margin-bottom: 0.2rem;
  }

  .company {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--primary-light);
    margin-bottom: 1rem;
  }

  ul {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  li {
    font-size: 0.9rem;
    color: var(--text-muted);
    padding-left: 1.25rem;
    position: relative;
    line-height: 1.6;
  }

  li::before {
    content: '→';
    position: absolute;
    left: 0;
    color: var(--accent);
    font-size: 0.8rem;
    top: 1px;
  }

  @media (max-width: 640px) {
    .header-row {
      flex-direction: column;
      align-items: flex-start;
    }

    .role-card {
      grid-template-columns: 1fr;
    }

    .role-marker {
      display: none;
    }
  }
</style>
