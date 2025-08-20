# Página de Vídeo de Acessibilidade — Plano de Desenvolvimento

## Visão Geral
Página web minimalista acessada via QR Code que reproduz automaticamente (em mudo) um vídeo .mp4 com instruções de acessibilidade para surdos, com CTA para ativar som e entrar em tela cheia, alta compatibilidade móvel, desempenho e acessibilidade.

## 1. Configuração do Projeto

- [ ] Definir escopo técnico
  - Escolher hospedagem/CDN (Vercel, Netlify, Cloudflare Pages) e CDN de vídeo (mesma plataforma ou S3+CloudFront)
  - Definir domínio e URL final usada no QR Code
  - Decidir se haverá analytics anônimo (opcional)
- [ ] Configuração do ambiente de desenvolvimento
  - Definir versão do Node (para tooling) e EditorConfig
  - Adicionar Prettier/ESLint (se usar tooling) e scripts npm para dev/preview
  - Live server local para testes em dispositivos móveis
- [ ] Estrutura inicial do projeto
  - Criar diretórios: /public (index.html, styles.css, app.js, icons.svg), /assets (poster.jpg|svg), /video (video.mp4)
  - Adicionar favicon e ícones em SVG; manifesto opcional (PWA leve, se desejado)

## 2. Base do Backend

- [ ] Serviços e utilitários principais
  - Configurar headers: Cache-Control, Content-Type video/mp4, Accept-Ranges, CORS adequado
  - Security headers: CSP mínima, Referrer-Policy, X-Content-Type-Options
- [ ] Estrutura base da API
  - Se analytics próprio: endpoint POST /api/metrics com validação, rate limit e anonimização

## 3. Backend Específico de Funcionalidades

- [ ] Autoplay silencioso
  - Garantir headers e suporte a range requests para start rápido
- [ ] Ativar som e tela cheia
  - Sem backend; opcional registrar evento “unmute_fullscreen”
- [ ] Loop/repetição
  - Sem backend; opcional registrar “loop_count”
- [ ] Indicadores de carregamento e erro
  - Registrar erros de rede/timeout (se analytics)
- [ ] Compatibilidade cross-browser
  - Configurar compressão (gzip/br) para assets estáticos; vídeo sem compressão HTTP adicional
- [ ] Performance e otimização
  - Publicar múltiplas qualidades (opcional) e escolher bitrate alvo (~2–3 Mbps mobile)

## 4. Base do Frontend

- [ ] Configuração do framework de UI
  - Optar por Vanilla JS + HTML/CSS (sem framework) para footprint mínimo
- [ ] Biblioteca de componentes
  - Criar componentes simples: Overlay CTA, Loader, Toast de erro
- [ ] Sistema de rotas
  - Single page (index.html); 404 redireciona para index (config do host)
- [ ] Gerenciamento de estado
  - Estado mínimo: loading, playing, muted, fullscreen, error
- [ ] UI de autenticação
  - Não aplicável

## 5. Frontend Específico de Funcionalidades

- [ ] Autoplay silencioso (US-002)
  - <video playsinline muted autoplay preload="auto" poster="/assets/poster.jpg"> com source .mp4
  - Exibir Loader até evento canplay/playing
- [ ] Ativar som e tela cheia (US-003)
  - Overlay CTA "Toque para ativar som e tela cheia"; on click: video.muted=false e requestFullscreen()
  - Fallback se fullscreen não suportado: instruir rotação/zoom
- [ ] Loop/repetição (US-005)
  - Definir loop no elemento; ao ended, garantir reinício suave
- [ ] Indicadores de carregamento e erro (US-006)
  - Loader visível até playback; toast em erro com botão “Tentar novamente”
- [ ] Compatibilidade móvel (US-007)
  - CSS: video 100vw x 100vh, object-fit: cover; suportar retrato/paisagem
  - Testar eventos iOS (touchstart) e política de autoplay
- [ ] Acessibilidade da página (US-008)
  - CTA com aria-label, foco visível, contraste AA; navegação por teclado
- [ ] Performance de reprodução (US-009)
  - Poster otimizado; lazy de ícones; evitar bloqueios de render
- [ ] Controle mínimo (US-010)
  - Ocultar controles nativos; toque duplo para pausar/retomar; hint discreto
- [ ] Analytics anônimo (US-011) — opcional
  - Disparar eventos (play_start, error, complete) para endpoint/serviço

## 6. Integração

- [ ] Integração com API
  - Conectar app.js ao endpoint /api/metrics (se aplicável) com fetch e retry exponencial básico
- [ ] Conexões de funcionalidades ponta a ponta
  - Garantir que o QR aponta para a URL final; validar redirecionamentos/HTTPS

## 7. Testes

- [ ] Testes unitários
  - Testar helpers (detecção de fullscreen, handlers de erro, parse de estados)
- [ ] Testes de integração
  - Simular eventos de vídeo (canplay, error); verificar UI (overlay, loader, toasts)
- [ ] Testes ponta a ponta
  - Playwright/Cypress: fluxo QR→autoplay mudo→unmute+fullscreen→loop
- [ ] Testes de desempenho
  - Lighthouse mobile: LCP ≤ 2,5s; TTFB vídeo via CDN; tamanho do bundle mínimo
- [ ] Testes de segurança
  - Verificar headers, CSP, HTTPS, ausência de PII em analytics

## 8. Documentação

- [ ] Documentação da API
  - Especificar /api/metrics (se houver): contrato, exemplos, limites
- [ ] Guias para usuários (operacional)
  - Como gerar e imprimir QR Codes; boas práticas de posicionamento
- [ ] Documentação para desenvolvedores
  - Como rodar localmente, testar em dispositivos, deploy
- [ ] Documentação da arquitetura do sistema
  - Diagrama simples: Browser → CDN (página/vídeo) → (opcional) API métricas

## 9. Implantação

- [ ] Ambiente de produção
  - Configurar domínio, HTTPS, cache e regras 404/SPA

## 10. Manutenção

- [ ] Procedimentos para correção de bugs
  - Triagem, reprodução, correção, teste e rollback
- [ ] Processos de atualização
  - Renovar certificados/DOMÍNIO; atualizar dependências de tooling
- [ ] Estratégias de backup
  - Versionamento do vídeo/ativos e rollback rápido
- [ ] Monitoramento de desempenho
  - Revisões periódicas de LCP/TTFB e tamanho do vídeo; re-encode quando necessário