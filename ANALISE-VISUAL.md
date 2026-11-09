# Análise Visual Profunda (`image-to-code` + `design-taste-frontend`) — Atelier Veral

> **Fonte Primária de Verdade Visual:** As 7 imagens de layout desktop (`16:9` / `1440x900`) aprovadas em `marca/layouts/secao-01-inicio.jpg` a `secao-07-contatos.jpg`, combinadas com o [GUIA-DA-MARCA.md](file:///F:/Dev/atelier-veral/marca/GUIA-DA-MARCA.md), [PRODUCT.md](file:///F:/Dev/atelier-veral/PRODUCT.md) e [CONTEUDO.md](file:///F:/Dev/atelier-veral/CONTEUDO.md).

---

## 1. Extração do Sistema de Design Global

### 1.1. Paleta de Cores Extraída das Imagens Aprovadas
- **`--bg-obsidian` (`#0F0F0E`)**: Fundo escuro principal das Seções 1 (`#inicio`), 3 (`#projetos`), 5 (`#como-funciona`) e 7 (`#contatos` + Rodapé).
- **`--bg-charcoal` (`#181715` / `#1E1E1E`)**: Superfície de cards escuros, colunas emolduradas da Seção 5 e card do formulário da Seção 7.
- **`--bg-ivory` (`#F6F1EB`)**: Fundo claro editorial de respiro nas Seções 2 (`#o-atelie`), 4 (`#antes-e-depois`) e 6 (`#materiais`).
- **`--surface-card-light` (`#FFFFFF` / `#FAF7F2`)**: Cartões sobre fundo marfim na Seção 4 (`#antes-e-depois`).
- **`--text-champagne` (`#F5EFE6`)**: Títulos e textos principais sobre fundo escuro.
- **`--text-charcoal` (`#171614`)**: Títulos e textos principais sobre fundo claro.
- **`--text-muted-dark` (`#B5ADA2`)**: Subtítulos e parágrafos sobre fundo escuro.
- **`--text-muted-light` (`#57524B`)**: Parágrafos sobre fundo claro.
- **`--accent-gold` (`#C5A56E`)**: Botões primários, abas ativas, números de seção, bordas arquitetônicas de `1px` e links de ação sobre fundo escuro.
- **`--accent-bronze` (`#9E7D45` / `#AE8B52`)**: Botões, links sublinhados, controles de slider e identificadores de seção sobre fundo claro.
- **`--hairline-gold` (`rgba(197, 165, 110, 0.28)`)**: Filetes arquitetônicos de `1px` no cabeçalho, cards, divisores e rodapé com ornamento de losango (`♦`).

### 1.2. Hierarquia Tipográfica Extraída
- **Display & Títulos (`Cormorant Garamond`, pesos 400, 500, 600):**
  - **H1 Hero (`#inicio`):** `clamp(2.75rem, 4.4vw, 4.25rem)`, `line-height: 1.08`, `letter-spacing: -0.01em`, 3 linhas equilibradas (`Precisão arquitetônica / esculpida em madeira / nobre.`).
  - **H2 Seções:** `clamp(2.15rem, 3.3vw, 3.25rem)`, `line-height: 1.12`, peso 500.
  - **H3 Cards e Modalidades:** `1.45rem` a `1.75rem`, `line-height: 1.2`, serifado clássico.
  - **Números de Indicadores (`+15 anos`, `+420 projetos`, `Execução própria`):** `clamp(2rem, 2.8vw, 2.75rem)` em serifado.
- **Interface, Eyebrows e Corpo (`Plus Jakarta Sans` / `Montserrat`, pesos 300, 400, 500, 600):**
  - **Eyebrows (`01 — O ATELIÊ`, `TAUBATÉ • VALE DO PARAÍBA...`):** `0.75rem` (`12px`), ` uppercase`, `letter-spacing: 0.22em`, peso 500, cor `--accent-gold` ou `--accent-bronze`.
  - **Subtítulos e Corpo:** `1rem` a `1.0625rem` (`16px`–`17px`), `line-height: 1.68`, largura máxima de leitura controlada (`54ch`–`64ch`).
  - **Botões:** `0.875rem` (`14px`), peso 500, `letter-spacing: 0.04em`, `border-radius: 6px`, altura `48px`–`52px`, padding horizontal `28px`.

### 1.3. Regras de Layout e Micro-Interações (`design-taste-frontend`)
- **Alinhamento de Bordas Iguais (`Equal Edges`):** Container central `.wrap` com `max-width: 1320px` e `padding-inline: clamp(24px, 5vw, 64px)` mantendo alinhamento rigoroso à esquerda e à direita em todas as seções.
- **Ritmo de Uma Seção por Tela (`One Section per Screen`):** Alternância rítmica entre fundo escuro (`#0F0F0E`) e fundo claro (`#F6F1EB`), com cada seção dimensionada para preencher a tela (`min-height: 100svh`) sem invadir visualmente a seção vizinha.
- **Camada de Micro-Interações Silenciosas:**
  - Botões sobem `-1px` no `:hover` e pressionam `translateY(1px) scale(0.985)` no `:active`.
  - Cards interativos sobem `-2px` no `:hover` com acentuação sutil da borda dourada.
  - Fotografias dentro de molduras escalam `scale(1.03)` em `600ms cubic-bezier(.2,.8,.2,1)` com `overflow: hidden`.
  - Links editoriais desenham sublinhado da esquerda para a direita e deslocam a seta `→` `3px` para a direita.

---

## 2. Análise Seção por Seção

1. **Cabeçalho + Seção 1 (`#inicio` — [secao-01-inicio.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-01-inicio.jpg)):**
   - Header fixo em `#0F0F0E` com barra inferior de `1px` dourada, logo oficial à esquerda, 7 âncoras centralizadas (`Início`, `O Ateliê`, `Projetos`, `Antes e Depois`, `Como Funciona`, `Materiais`, `Contatos`) e botão contornado `Agendar Visita` à direita.
   - Grid assimétrico `1.05fr 0.95fr`: coluna esquerda com eyebrow, H1 de 6 palavras, subtítulo, par de botões (`Solicitar um Projeto` preenchido em `#C5A56E` + `Agendar Visita ao Showroom` contornado) e nota discreta de atendimento; coluna direita com fotografia vertical/quadrada do living revestido em madeira natural e aparador escultural, sobreposta pelas linhas geométricas áureas do monograma "V" em SVG.

2. **Seção 2 (`#o-atelie` — [secao-02-o-atelie.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-02-o-atelie.jpg)):**
   - Fundo `#F6F1EB` dividido em split editorial (`54%` conteúdo à esquerda / `46%` fotografia full-height à direita com traçado geométrico "V" no canto superior direito).
   - Abaixo do link `Conhecer o showroom pessoalmente →`, grid de 3 colunas separado por filetes verticais de `1px` em bronze para `+15 anos`, `+420 projetos` e `Execução própria`.

3. **Seção 3 (`#projetos` — [secao-03-projetos.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-03-projetos.jpg)):**
   - Fundo `#0F0F0E`, cabeçalho centralizado com eyebrow `02 — PORTFÓLIO SELECIONADO`, H2, subtítulo e pílulas de filtro interativas (`[ Todos ]`, `Residencial`, `Corporativo`).
   - Grid `3x2` de cards emoldurados por filete de `1px` (`rgba(197,165,110,0.22)`), cada um com foto `16:10`, categoria, título em serif, especificação técnica e link dourado que seleciona automaticamente o ambiente no formulário da Seção 7.

4. **Seção 4 (`#antes-e-depois` — [secao-04-antes-e-depois.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-04-antes-e-depois.jpg)):**
   - Fundo `#F6F1EB`, cabeçalho centralizado (`03 — TRANSFORMAÇÃO ARQUITETÔNICA`), seguido por 2 cards comparativos lado a lado (`Living e Galeria de Entrada` e `Espaço Corporativo / Consultório`).
   - Cada card possui um **comparador interativo real (Before/After Range Slider)** com etiquetas `ANTES` e `DEPOIS`, botão circular central em bronze (`◄ ►`) arrastável pelo mouse ou toque, lista de especificações de Estado Inicial vs. Resultado Executado e botão central `Avaliar a transformação do meu espaço`.

5. **Seção 5 (`#como-funciona` — [secao-05-como-funciona.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-05-como-funciona.jpg)):**
   - Divisor superior com o monograma "V", fundo `#0F0F0E`, cabeçalho alinhado à esquerda (`04 — MÉTODO E ATENDIMENTO`) e 2 painéis arquitetônicos lado a lado com moldura dupla dourada.
   - Coluna 1 (`Modalidade 1: Para Clientes Finais`) com passos `01`, `02`, `03` e botão preenchido dourado `Quero desenvolver meu projeto com o Ateliê`.
   - Coluna 2 (`Modalidade 2: Para Arquitetos & Escritórios`) com passos `01`, `02`, `03` e botão contornado dourado `Já possuo projeto / Sou Arquiteto`.

6. **Seção 6 (`#materiais` — [secao-06-materiais.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-06-materiais.jpg)):**
   - Fundo `#F6F1EB`, cabeçalho centralizado (`05 — MATÉRIA-PRIMA E ENGENHARIA`), faixas horizontais de `1px` em bronze delimitando as 3 colunas sensoriais com divisórias verticais contínuas:
     - `01 Madeira Maciça e Lâminas Naturais`
     - `02 Acabamento Artesanal em Laca`
     - `03 Ferragens Importadas de Alta Performance`
   - Rodapé da seção com o link centralizado `Conhecer o mostruário de lâminas, lacas e ferragens no Showroom →`.

7. **Seção 7 (`#contatos` + Rodapé — [secao-07-contatos.jpg](file:///F:/Dev/atelier-veral/marca/layouts/secao-07-contatos.jpg)):**
   - Fundo `#0F0F0E`, layout em 2 colunas:
     - Esquerda: `06 — CONTATO E SHOWROOM`, H2, texto de apoio, dados completos de Taubaté, e-mails, Instagram e botão `Falar no WhatsApp Concierge`.
     - Direita: Card de formulário emoldurado em dourado com seletores de Objetivo (`[ Solicitar um Projeto ]` / `[ Agendar Visita ao Showroom ]`) e Perfil (`Cliente Final` / `Arquiteto / Designer`), campos de Nome, WhatsApp, E-mail, **Cidade do projeto**, **Ambiente principal**, Mensagem e botão `Enviar Solicitação ao Ateliê`.
   - Divisor inferior com losango central (`♦`) e barra de rodapé institucional.
