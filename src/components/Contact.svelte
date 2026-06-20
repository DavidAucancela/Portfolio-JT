<script lang="ts">
  import { fade, fly } from 'svelte/transition';

  let { t }: { t: any } = $props();

  // Web3Forms: obtén tu access key gratis en https://web3forms.com (entra tu email)
  // No es secreta (viaja en el cliente), por eso va aquí directamente.
  const WEB3FORMS_ACCESS_KEY = 'a4f8fda7-17e2-45b2-b110-827bc95c752b';

  let formData = $state({ name: '', email: '', subject: '', message: '' });
  // Honeypot anti-spam: los humanos lo dejan vacío; si un bot lo llena, Web3Forms descarta el envío
  let botcheck = $state('');
  let submitted = $state(false);
  let submitting = $state(false);
  let error = $state('');

  async function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    submitting = true;
    error = '';
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          subject: formData.subject || 'Nuevo mensaje desde el portfolio',
          message: formData.message,
          from_name: 'Portfolio Jacqueline Tene',
          botcheck,
        }),
      });
      const data = await res.json();
      if (data.success) {
        submitted = true;
      } else {
        error = t.form_error;
      }
    } catch {
      error = t.form_error;
    } finally {
      submitting = false;
    }
  }
</script>

<section id="contact">
  <div class="container">
    <div class="contact-grid">
      <div class="info-col">
        <div class="section-header">
          <span class="section-eyebrow" style="color: var(--accent-light)">{t.eyebrow}</span>
          <h2 class="section-title" style="color: #fff">{t.title}</h2>
          <p class="section-lead" style="color: rgba(255,255,255,0.75)">{t.subtitle}</p>
        </div>

        <div class="contact-links">
          <a href="mailto:{t.email}" class="contact-link">
            <span class="link-icon">✉</span>
            <div>
              <p class="link-label">{t.email_label}</p>
              <p class="link-value">{t.email}</p>
            </div>
          </a>
          <a href="https://{t.linkedin}" target="_blank" rel="noopener noreferrer" class="contact-link">
            <span class="link-icon">in</span>
            <div>
              <p class="link-label">{t.linkedin_label}</p>
              <p class="link-value">{t.linkedin}</p>
            </div>
          </a>
        </div>

        <div class="audience-cards">
          <div class="audience-card">
            <p class="aud-title">👔 {t.for_recruiters}</p>
            <p class="aud-desc">{t.cta_recruiter}</p>
          </div>
          <div class="audience-card">
            <p class="aud-title">💼 {t.for_clients}</p>
            <p class="aud-desc">{t.cta_client}</p>
          </div>
        </div>
      </div>

      <div class="form-col">
        {#if submitted}
          <!-- Capa 4: Svelte transition en el estado de éxito -->
          <div class="success-state" in:fly={{ y: 24, duration: 400, delay: 80 }}>
            <div class="success-icon">✓</div>
            <p>{t.form_success}</p>
          </div>
        {:else}
          <form onsubmit={handleSubmit} novalidate out:fade={{ duration: 200 }}>
            <!-- Honeypot oculto: invisible para humanos, trampa para bots -->
            <input
              type="text"
              name="botcheck"
              bind:value={botcheck}
              tabindex="-1"
              autocomplete="off"
              aria-hidden="true"
              class="honeypot"
            />
            <div class="form-group">
              <input
                type="text"
                placeholder={t.form_name}
                bind:value={formData.name}
                required
                autocomplete="name"
              />
            </div>
            <div class="form-group">
              <input
                type="email"
                placeholder={t.form_email}
                bind:value={formData.email}
                required
                autocomplete="email"
              />
            </div>
            <div class="form-group">
              <input
                type="text"
                placeholder={t.form_subject}
                bind:value={formData.subject}
              />
            </div>
            <div class="form-group">
              <textarea
                rows="5"
                placeholder={t.form_message}
                bind:value={formData.message}
                required
              ></textarea>
            </div>
            <button type="submit" class="btn btn-white" disabled={submitting}>
              {submitting ? '...' : t.form_submit}
            </button>
            {#if error}
              <p class="form-error" role="alert">{error}</p>
            {/if}
          </form>
        {/if}
      </div>
    </div>
  </div>
</section>

<style>
  section {
    background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary) 100%);
  }

  .contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: start;
  }

  /* Info column */
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .contact-link {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: var(--radius);
    text-decoration: none;
    color: #fff;
    transition: background 0.2s;
  }

  .contact-link:hover {
    background: rgba(255, 255, 255, 0.18);
  }

  .link-icon {
    width: 38px;
    height: 38px;
    background: rgba(255, 255, 255, 0.15);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1rem;
    font-weight: 700;
    flex-shrink: 0;
  }

  .link-label {
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 0.1rem;
  }

  .link-value {
    font-size: 0.88rem;
    font-weight: 500;
    color: #fff;
  }

  .audience-cards {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .audience-card {
    padding: 1rem 1.25rem;
    background: rgba(255, 255, 255, 0.07);
    border-radius: var(--radius-sm);
    border-left: 3px solid var(--accent);
  }

  .aud-title {
    font-size: 0.82rem;
    font-weight: 600;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 0.25rem;
  }

  .aud-desc {
    font-size: 0.8rem;
    color: rgba(255, 255, 255, 0.6);
    line-height: 1.5;
  }

  /* Form column */
  .form-col {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid rgba(255, 255, 255, 0.12);
    border-radius: var(--radius);
    padding: 2rem;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .form-group input,
  .form-group textarea {
    width: 100%;
    background: rgba(255, 255, 255, 0.1);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: var(--radius-sm);
    padding: 0.75rem 1rem;
    color: #fff;
    font-family: var(--font-body);
    font-size: 0.9rem;
    outline: none;
    transition: border-color 0.2s, background 0.2s;
    resize: vertical;
  }

  .form-group input::placeholder,
  .form-group textarea::placeholder {
    color: rgba(255, 255, 255, 0.45);
  }

  .form-group input:focus,
  .form-group textarea:focus {
    border-color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.15);
  }

  button[type='submit'] {
    width: 100%;
    justify-content: center;
    margin-top: 0.5rem;
  }

  button:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }

  .form-error {
    margin-top: 0.25rem;
    font-size: 0.85rem;
    color: #ffd2d2;
    text-align: center;
  }

  .honeypot {
    position: absolute;
    left: -9999px;
    width: 1px;
    height: 1px;
    opacity: 0;
    pointer-events: none;
  }

  /* Success */
  .success-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 1.25rem;
    min-height: 240px;
    text-align: center;
    color: rgba(255, 255, 255, 0.85);
  }

  .success-icon {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary-light);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5rem;
    font-weight: 700;
  }

  @media (max-width: 768px) {
    .contact-grid {
      grid-template-columns: 1fr;
      gap: 3rem;
    }
  }
</style>
