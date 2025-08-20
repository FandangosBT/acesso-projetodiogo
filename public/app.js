(() => {
  const $ = (sel) => document.querySelector(sel);
  const video = $('#video');
  const cta = $('#cta');
  const loader = $('#loader');
  const toast = $('#toast');
  const toastMessage = $('#toast-message');
  const retryBtn = $('#retry');
  const srStatus = $('#sr-status');
  const updateStatus = (text) => { if (srStatus) srStatus.textContent = text; };

  const show = (el) => el && (el.hidden = false);
  const hide = (el) => el && (el.hidden = true);

  function isFullscreenSupported() {
    return !!(document.fullscreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled || video?.webkitEnterFullscreen);
  }

  async function enterFullscreen(el) {
    try {
      if (!el) return;
      if (el.requestFullscreen) return await el.requestFullscreen();
      if (el.webkitRequestFullscreen) return await el.webkitRequestFullscreen();
      if (el.msRequestFullscreen) return await el.msRequestFullscreen();
      // iOS Safari (abre player nativo)
      if (el.webkitEnterFullscreen) return el.webkitEnterFullscreen();
    } catch (_) { /* silencioso */ }
  }

  async function tryPlayAutoplay() {
    try {
      hide(toast);
      show(loader);
      updateStatus('Carregando vídeo…');
      // Garantir muted e inline para maior compatibilidade
      video.muted = true;
      video.playsInline = true;
      const p = video.play();
      if (p && typeof p.then === 'function') await p;
    } catch (err) {
      // Navegador pode exigir gesto do usuário
      console.debug('Autoplay falhou:', err);
    } finally {
      // Loader sai quando vídeo sinalizar playing/canplay
    }
  }

  function onCanPlay() {
    // Ainda mantemos loader até realmente tocar
  }

  function onPlaying() {
    hide(loader);
    updateStatus('Vídeo reproduzindo');
    // Mostrar CTA enquanto estiver mudo
    if (video.muted) {
      cta.style.display = 'inline-flex';
      try { cta.focus({ preventScroll: true }); } catch (_) { try { cta.focus(); } catch (_) {} }
    } else {
      cta.style.display = 'none';
    }
  }

  function onEnded() {
    // loop já cuida, mas garantimos
    try { video.currentTime = 0; video.play(); } catch (_) {}
  }

  function onError() {
    hide(loader);
    cta.style.display = 'inline-flex';
    toastMessage.textContent = 'Não foi possível carregar o vídeo. Verifique a conexão ou envie o arquivo em /video/instrucoes.mp4';
    show(toast);
    updateStatus('Erro ao carregar o vídeo.');
  }

  async function handleCTA() {
    hide(toast);
    try {
      // Desmutar e garantir play sob gesto do usuário
      video.muted = false;
      await video.play().catch(() => {});

      // Tentar fullscreen se suportado
      if (isFullscreenSupported()) {
        await enterFullscreen(video);
      }

      // Ocultar CTA se áudio ativo
      if (!video.muted) cta.style.display = 'none';
    } catch (err) {
      console.debug('Falha ao ativar som/tela cheia:', err);
      // Se falhar, manter CTA visível com feedback sutil
    }
  }

  function handleRetry() {
    hide(toast);
    updateStatus('Recarregando vídeo…');
    try {
      video.load();
      tryPlayAutoplay();
    } catch (_) {}
  }

  // Duplo toque para pausar/retomar (discreto)
  let lastTap = 0;
  video.addEventListener('touchend', () => {
    const now = Date.now();
    if (now - lastTap < 300) {
      if (!video.paused) video.pause(); else video.play().catch(() => {});
    }
    lastTap = now;
  }, { passive: true });

  function onPause() { updateStatus('Vídeo pausado'); }
  // Eventos do vídeo
  video.addEventListener('canplay', onCanPlay);
  video.addEventListener('playing', onPlaying);
  video.addEventListener('pause', onPause);
  video.addEventListener('ended', onEnded);
  video.addEventListener('error', onError);

  // Controles
  cta.addEventListener('click', handleCTA);
  retryBtn.addEventListener('click', handleRetry);

  // Início
  document.addEventListener('DOMContentLoaded', tryPlayAutoplay);
})();