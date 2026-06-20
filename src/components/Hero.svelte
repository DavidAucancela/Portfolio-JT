<script lang="ts">
  let { t, lang }: { t: any; lang: string } = $props();
</script>

<section id="hero">
  <!-- Capa parallax (GSAP la mueve en scroll) -->
  <div class="hero-bg" aria-hidden="true"></div>

  <div class="container">
    <div class="hero-content">
      <div class="text-side">
        <p class="greeting">{t.greeting}</p>
        <h1>{t.name}</h1>
        <p class="title">{t.title}</p>
        <p class="subtitle">{t.subtitle}</p>
        <p class="location" aria-label="Ubicación">
          <span aria-hidden="true">📍</span> {t.location}
        </p>

        <div class="ctas">
          <a href="/Tene_Jacqueline-CV.pdf" download class="btn btn-white">
            ↓ {t.cta_cv}
          </a>
          <a href={`/${lang}#services`} class="btn btn-outline-white">
            {t.cta_services}
          </a>
        </div>
      </div>

      <div class="photo-side">
        <!-- Blob orgánico animado detrás de la foto -->
        <div class="blob" aria-hidden="true"></div>
        <div class="blob blob-2" aria-hidden="true"></div>

        <div class="photo-frame">
          <img
            src="/foto_principal.png"
            alt="Jacqueline Tene"
            class="photo"
            width="1023"
            height="1537"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="scroll-hint" aria-hidden="true">
    <span></span>
  </div>
</section>

<style>
  section {
    min-height: 100vh;
    background: var(--gradient-mesh);
    display: flex;
    align-items: center;
    padding-top: 80px;
    position: relative;
    overflow: hidden;
  }

  /* Capa de fondo con textura de puntos — GSAP la desplaza para parallax */
  .hero-bg {
    position: absolute;
    inset: -20% 0;
    background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1.5' fill='%23ffffff' fill-opacity='0.06'/%3E%3C/svg%3E");
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  .container {
    position: relative;
    z-index: 1;
    width: 100%;
  }

  .hero-content {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: center;
    gap: 5rem;
    padding-block: 4rem;
  }

  /* ── Texto ── */
  .text-side {
    color: #fff;
  }

  .greeting {
    font-size: var(--text-lg);
    color: rgba(255, 255, 255, 0.65);
    margin-bottom: 0.1rem;
    font-weight: 300;
    letter-spacing: 0.02em;
  }

  h1 {
    font-family: var(--font-body);
    font-size: var(--text-display);
    font-style: normal;
    font-weight: 800;
    text-transform: uppercase;
    letter-spacing: -0.02em;
    color: #fff;
    line-height: 0.95;
    margin-bottom: 0.6rem;
    /* Sutil text-shadow para dar profundidad */
    text-shadow: 0 4px 32px rgba(0,0,0,0.25);
  }

  .title {
    font-size: clamp(0.95rem, 2vw, 1.2rem);
    color: var(--accent-light);
    font-weight: 500;
    margin-bottom: 1.4rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    font-family: var(--font-body);
  }

  .subtitle {
    font-size: var(--text-base);
    color: rgba(255, 255, 255, 0.75);
    max-width: 460px;
    line-height: 1.75;
    margin-bottom: 1rem;
    font-weight: 300;
  }

  .location {
    font-size: var(--text-sm);
    color: rgba(255, 255, 255, 0.6);
    margin-bottom: 2.5rem;
    font-weight: 400;
    letter-spacing: 0.01em;
  }

  .ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }

  /* ── Foto y blobs ── */
  .photo-side {
    position: relative;
    flex-shrink: 0;
    width: 300px;
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .blob {
    position: absolute;
    width: 340px;
    height: 340px;
    background: rgba(157, 92, 245, 0.22);
    border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
    animation: morphBlob 10s ease-in-out infinite;
    filter: blur(2px);
    z-index: 0;
  }

  .blob-2 {
    width: 260px;
    height: 260px;
    background: rgba(214, 36, 140, 0.12);
    animation: morphBlob 14s ease-in-out infinite reverse;
    animation-delay: -4s;
    filter: blur(4px);
  }

  @keyframes morphBlob {
    0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
    25%       { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; }
    50%       { border-radius: 50% 50% 40% 60% / 40% 50% 60% 50%; }
    75%       { border-radius: 40% 60% 50% 50% / 60% 40% 50% 40%; }
  }

  .photo-frame {
    width: 260px;
    height: 260px;
    border-radius: 50%;
    border: 3px solid rgba(255, 255, 255, 0.28);
    padding: 5px;
    background: rgba(255, 255, 255, 0.07);
    position: relative;
    z-index: 1;
    box-shadow: 0 0 0 1px rgba(255,255,255,0.1),
                var(--shadow-dark);
  }

  .photo {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
    object-position: center top;
    display: block;
  }

  /* ── Scroll hint ── */
  .scroll-hint {
    position: absolute;
    bottom: 2.25rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
  }

  .scroll-hint span {
    display: block;
    width: 1.5px;
    height: 44px;
    background: linear-gradient(to bottom, rgba(255,255,255,0.65), transparent);
    margin: auto;
    animation: scrollDown 2s ease-in-out infinite;
  }

  @keyframes scrollDown {
    0%   { transform: scaleY(0); transform-origin: top; opacity: 0; }
    50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
    100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
  }

  /* ── Mobile ── */
  @media (max-width: 768px) {
    .hero-content {
      grid-template-columns: 1fr;
      text-align: center;
      gap: 3rem;
      padding-block: 2.5rem;
    }

    .photo-side {
      order: -1;
      width: 220px;
      height: 220px;
      margin-inline: auto;
    }

    .blob { width: 240px; height: 240px; }
    .blob-2 { width: 180px; height: 180px; }
    .photo-frame { width: 190px; height: 190px; }

    .subtitle { margin-inline: auto; }
    .location { text-align: center; }
    .ctas { justify-content: center; }
  }
</style>
