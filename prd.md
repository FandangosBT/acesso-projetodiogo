# PRD: Página de Vídeo de Acessibilidade com Autoplay

## 1. visão geral do produto

### 1.1 título do documento e versão
- PRD: Página de Vídeo de Acessibilidade com Autoplay
- Versão: 1.0.0

### 1.2 resumo do produto
Esta ferramenta é uma página web minimalista acessada via QR Code que reproduz automaticamente um vídeo curto em .mp4 com instruções de acessibilidade para pessoas surdas.

Ao escanear o QR Code no estabelecimento, o navegador do visitante abrirá a página e o vídeo iniciará imediatamente (em silêncio, para compatibilidade), com opção de um toque para ativar som e entrar em tela cheia. O foco é velocidade, compatibilidade móvel e acessibilidade.

## 2. objetivos

### 2.1 objetivos de negócio
- Fornecer instruções claras e imediatas de acessibilidade a visitantes surdos no ponto de atendimento.
- Reduzir tempo de atendimento e dúvidas sobre recursos de acessibilidade do local.
- Garantir experiência confiável e consistente em dispositivos móveis.

### 2.2 objetivos do usuário
- Assistir ao vídeo rapidamente após escanear o QR Code.
- Ativar som e tela cheia com um único toque, quando desejado.
- Ter uma experiência fluida, responsiva e acessível.

### 2.3 não-objetivos
- Área logada, cadastro ou autenticação de usuários.
- Biblioteca de múltiplos vídeos e playlists.
- Comentários, curtidas ou recursos sociais.

## 3. personas de usuário

### 3.1 principais tipos de usuário
- Visitantes surdos.
- Acompanhantes e intérpretes.
- Equipe do estabelecimento (operações/manutenção).

### 3.2 detalhes básicos das personas
- Visitantes surdos: Pessoas que precisam de instruções em vídeo de forma rápida e clara.
- Acompanhantes: Podem apoiar na navegação e ativação de som/tela cheia.
- Equipe do estabelecimento: Garante que o QR e a página funcionem corretamente.

### 3.3 acesso baseado em papéis
- Visitantes: Podem acessar a página, assistir ao vídeo, ativar som e tela cheia.
- Equipe do estabelecimento: Sem acesso administrativo; apenas validação operacional do link/QR.

## 4. requisitos funcionais
- Acesso via QR Code (Prioridade: Alta)
  - Abrir a URL no navegador móvel ao escanear o QR do local.
- Autoplay silencioso (Prioridade: Alta)
  - Iniciar o vídeo automaticamente em modo mudo para máxima compatibilidade.
- Ativação de som e tela cheia por toque (Prioridade: Alta)
  - Exibir CTA para ativar som e entrar em tela cheia com um toque.
- Tela cheia responsiva (Prioridade: Alta)
  - Ajustar para diferentes tamanhos e orientações, com preenchimento adequado.
- Loop e reinício (Prioridade: Média)
  - Ao finalizar, reiniciar automaticamente ou manter em loop contínuo.
- Indicadores de carregamento e erro (Prioridade: Alta)
  - Exibir estado de carregamento, tempo limite e mensagens de erro amigáveis.
- Compatibilidade cross-browser (Prioridade: Alta)
  - Funcionar em iOS Safari, Android Chrome e navegadores modernos.
- Performance e otimização (Prioridade: Alta)
  - Tamanho de arquivo otimizado, início de reprodução rápido e pré-carregamento adequado.
- Acessibilidade web (Prioridade: Alta)
  - Suporte a navegação por teclado, descrições, contraste e foco visível.
- Analytics anônimo opcional (Prioridade: Baixa)
  - Medir inícios de reprodução, erros e conclusão, sem PII.

## 5. experiência do usuário

### 5.1 pontos de entrada e fluxo do primeiro acesso
- Usuário escaneia o QR Code e a página abre no navegador móvel.
- O vídeo inicia automaticamente em modo silencioso com indicador breve de carregamento.
- Um CTA fica visível para ativar som e entrar em tela cheia com um toque.

### 5.2 experiência principal
- abrir a página: O visitante acessa a URL pelo QR e vê o vídeo começar em silêncio.
Experiência rápida: primeira imagem do vídeo em até ~1,5s em rede 4G.

- ativar som e tela cheia: Um toque ativa o áudio e entra em tela cheia quando permitido.
Clareza: texto e ícones grandes, legíveis ao ar livre.

- assistir e repetir: O vídeo reproduz até o fim e reinicia (loop) ou exibe “repetir”.
Controle sutil: sem distrações visuais; interação por toque quando necessário.

### 5.3 recursos avançados e casos extremos
- Fallback quando o navegador bloquear tela cheia automática: CTA informa e solicita toque.
- Mensagem clara em caso de erro de rede e opção de tentar novamente.
- Suporte a rotação de tela com object-fit para evitar barras pretas.

### 5.4 destaques de UI/UX
- Layout minimalista, sem elementos além do vídeo e CTAs essenciais.
- Tipografia e ícones de alto contraste e fáceis de entender.
- Feedback de estado (carregando, erro, reproduzindo) simples e acessível.

## 6. narrativa
Maria é uma visitante surda que deseja instruções claras sobre acessibilidade do local. Ela escaneia o QR no balcão, o navegador abre e o vídeo começa imediatamente em silêncio; com um toque, ela ativa o som e entra em tela cheia. Em poucos segundos, Maria entende os recursos disponíveis e segue confiante pelo estabelecimento.

## 7. métricas de sucesso

### 7.1 métricas centradas no usuário
- Tempo até primeira imagem do vídeo ≤ 1,5s em 4G típico.
- Taxa de início de reprodução bem-sucedido ≥ 98%.
- Taxa de erro percebido pelo usuário ≤ 1%.

### 7.2 métricas de negócio
- Percentual de visitantes que assistem ≥ 80% da duração do vídeo ≥ 60%.
- Redução de dúvidas operacionais relacionadas à acessibilidade ≥ 30%.

### 7.3 métricas técnicas
- Tamanho do vídeo ≤ 10–20 MB (alvo) mantendo legibilidade.
- Uptime da página ≥ 99,9% mensal.
- LCP ≤ 2,5s em dispositivos móveis alvo.

## 8. considerações técnicas

### 8.1 pontos de integração
- CDN para servir vídeo (.mp4) e página estática.
- Analytics opcional sem cookies (ex.: eventos anônimos).

### 8.2 armazenamento de dados e privacidade
- Nenhum dado pessoal coletado; sem login, sem cookies de rastreamento.
- Logs/analytics agregados e anônimos, apenas telemetria essencial.

### 8.3 escalabilidade e desempenho
- Arquivo .mp4 otimizado (H.264), bitrate adaptado para mobile.
- Cabeçalhos de cache para ativos estáticos; pré-carregamento do vídeo.
- Reprodutor com playsinline; autoplay em mudo por padrão.

### 8.4 desafios potenciais
- Restrições de autoplay/tela cheia exigindo interação do usuário.
- Variações de comportamento entre navegadores móveis.
- Conexões lentas que afetam início e qualidade de reprodução.

## 9. marcos e sequenciamento

### 9.1 estimativa do projeto
- Pequeno: 1–2 semanas

### 9.2 tamanho e composição da equipe
- Equipe Pequena: 1–2 pessoas no total
- Gerente de produto, 1 engenheiro front-end (e suporte de QA conforme necessidade).

### 9.3 fases sugeridas
- Fase 1: Estrutura estática, player e autoplay mudo, CTA de som/tela cheia (3–4 dias)
Entregáveis chave: Página mínima, vídeo hospedado, comportamento de autoplay, CTA funcional.

- Fase 2: Otimizações, acessibilidade, métricas e testes cross-browser (3–5 dias)
Entregáveis chave: Indicadores de estado, acessibilidade, analytics opcional, testes em iOS/Android.

## 10. histórias de usuário

### 10.1. abrir via qr code
ID: US-001

Descrição: Como visitante, quero abrir a página ao escanear o QR Code para acessar o vídeo rapidamente.

Critérios de aceitação:
- A URL abre diretamente no navegador padrão do dispositivo.
- A página carrega sem interações adicionais.

### 10.2. autoplay silencioso
ID: US-002

Descrição: Como visitante, quero que o vídeo inicie automaticamente em silêncio para começar a assistir sem ações extras.

Critérios de aceitação:
- O vídeo inicia automaticamente em modo mudo ao carregar a página.
- A primeira imagem do vídeo aparece em até ~1,5s em 4G típico.

### 10.3. ativar som e entrar em tela cheia
ID: US-003

Descrição: Como visitante, quero ativar som e entrar em tela cheia com um toque para melhor compreensão do conteúdo.

Critérios de aceitação:
- Um CTA visível permite ativar som e entrar em tela cheia com um toque.
- Em navegadores que exigem interação, o toque cumpre os requisitos e ativa ambos.

### 10.4. fallback de tela cheia
ID: US-004

Descrição: Como visitante, quero ser informado se a tela cheia não puder ser ativada automaticamente, com instrução clara de como proceder.

Critérios de aceitação:
- Quando a API de tela cheia não estiver disponível, exibir mensagem orientando o uso em modo paisagem.
- O vídeo continua reproduzindo inline, sem travar.

### 10.5. loop/repetição
ID: US-005

Descrição: Como visitante, quero que o vídeo reinicie automaticamente para que eu possa rever as instruções sem ações adicionais.

Critérios de aceitação:
- Ao terminar, o vídeo reinicia automaticamente (loop) sem interrupções perceptíveis.

### 10.6. indicadores de estado
ID: US-006

Descrição: Como visitante, quero ver indicadores de carregamento e mensagens de erro para entender o que está acontecendo.

Critérios de aceitação:
- Exibir indicador de carregamento até o início da reprodução.
- Em erro de rede, exibir mensagem amigável e opção “tentar novamente”.

### 10.7. compatibilidade móvel
ID: US-007

Descrição: Como visitante, quero que a página funcione corretamente no meu smartphone, independentemente do navegador.

Critérios de aceitação:
- Testes aprovados em iOS Safari e Android Chrome recentes.
- Reprodução estável em modo retrato e paisagem com object-fit adequado.

### 10.8. acessibilidade da página
ID: US-008

Descrição: Como visitante com necessidades de acessibilidade, quero que os elementos de interface tenham rótulos, contraste e foco adequados.

Critérios de aceitação:
- Botões/CTAs com aria-label e foco visível.
- Contraste mínimo AA para textos e ícones.

### 10.9. performance de reprodução
ID: US-009

Descrição: Como visitante, quero que o vídeo comece rapidamente para não abandonar a página.

Critérios de aceitação:
- Tempo até primeira imagem ≤ 1,5s em 4G típico.
- Tamanho do arquivo otimizado para redes móveis (≤ 10–20 MB).

### 10.10. controle mínimo
ID: US-010

Descrição: Como visitante, quero uma interface sem distrações, mas com possibilidade de pausar/retomar quando necessário.

Critérios de aceitação:
- Sem controles visíveis por padrão; um toque mostra opções discretas de pausar/retomar.
- O estado de reprodução é claro visualmente.

### 10.11. analytics anônimo (opcional)
ID: US-011

Descrição: Como equipe de operações, quero métricas anônimas básicas para monitorar uso e erros sem coletar PII.

Critérios de aceitação:
- Eventos: início de reprodução, erro, conclusão.
- Sem cookies, sem identificação pessoal; dados agregados.