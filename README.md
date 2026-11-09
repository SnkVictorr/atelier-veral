# Atelier Veral — Marcenaria fictícia de Móveis de Luxo Sob Medida

Site institucional e de conversão em formato *Single-Page* desenvolvido para o **Atelier Veral**, marcenaria especializada na concepção e execução de mobiliário sob medida de alto padrão em Taubaté – SP e região (Vale do Paraíba, Serra da Mantiqueira e Litoral Norte).

O projeto foi desenhado para conduzir tanto **clientes finais** (proprietários de residências e espaços corporativos) quanto **arquitetos e designers de interiores** a **solicitar um projeto/orçamento** ou **agendar uma visita exclusiva ao showroom**, combinando direção de arte editorial, micro-interações refinadas e alta performance no Google Lighthouse Mobile (**99 em Performance e 100 em Acessibilidade, Boas Práticas e SEO**).

---

## Tecnologias Utilizadas

### Frontend & Design System
- **HTML5 Semântico:** Estrutura de página única acessível (`ARIA`, navegação por teclado e metadados otimizados para SEO).
- **CSS3 Custom Properties (Design System Próprio):**
  - Paleta oficial da marca (`#0F0F0E` Preto Obsidiana, `#181715` Carvão, `#F6F1EB` Marfim Quente, `#C5A56E` Dourado Escovado e `#9E7D45` Bronze Nobre).
  - Tipografia editorial com **Cormorant Garamond** (títulos e monograma) e **Plus Jakarta Sans / Montserrat** (interface e leitura).
  - Responsividade completa para Desktop (`1440px+`), Tablet (`1024px` / `768px`) e Mobile (`390px`), com animações de *scroll reveal*, contadores progressivos, *lightbox* técnico de projetos, seletor interativo de amostras e comparador *Antes e Depois* arrastável.
- **JavaScript Vanilla (ES6+):** Interações de interface sem dependências pesadas no navegador (`0 ms` de *Total Blocking Time*).

### Backend & Integração de E-mail (Zoho Mail)
- **Node.js + Express:** Servidor web leve com compressão nativa **Brotli (`br`) / Gzip** (`zlib`), minificação em memória de CSS/JS e rota `POST /api/contato`.
- **Nodemailer:** Integração SMTP preparada para o **Zoho Mail** (`smtp.zoho.com`), montando automaticamente o assunto do e-mail com o **Ambiente** e a **Cidade** informados pelo visitante.
- **Dotenv:** Gerenciamento seguro de credenciais via variáveis de ambiente (`.env`), com **modo de simulação automático no terminal** enquanto as variáveis não estiverem preenchidas.

---

## Estrutura de Pastas

```text
atelier-veral/
├── marca/                          # Documentação e ativos oficiais da marca
│   ├── layouts/                    # Referências visuais aprovadas das 7 seções (16:9 desktop)
│   ├── GUIA-DA-MARCA.md            # Diretrizes de posicionamento, cores, tipografia e tom de voz
│   ├── icone-do-site.png           # Monograma "V" oficial
│   ├── logo-horizontal-escuro.png  # Logotipo horizontal sobre fundo escuro
│   ├── logo-horizontal.png         # Logotipo horizontal sobre fundo claro
│   ├── logo-principal-escuro.png   # Logotipo completo versão escura
│   ├── logo-principal.png          # Logotipo completo versão clara
│   └── logo-simples-escuro.png     # Variação simplificada escura
├── public/                         # Arquivos públicos servidos pelo Express
│   ├── assets/
│   │   ├── images/                 # Fotografias otimizadas dos projetos, ateliê, antes/depois e materiais
│   │   └── marca/                  # Ícones e logotipos otimizados para carregamento rápido na web
│   ├── index.html                  # Página única com as 7 seções e modal técnico de projetos
│   ├── styles.css                  # Folha de estilos completa, tokens visuais e micro-interações
│   └── app.js                      # Lógica de filtros, sliders antes/depois, lightbox e envio do formulário
├── .env.example                    # Exemplo de variáveis de ambiente para configuração do Zoho Mail
├── ANALISE-VISUAL.md               # Especificação técnica e visual extraída dos layouts aprovados
├── CONTEUDO.md                     # Textos oficiais de todas as seções do site
├── PRODUCT.md                      # Arquitetura de produto e objetivos de conversão seção por seção
├── package.json                    # Dependências e scripts do projeto Node.js
├── server.js                       # Servidor Express + endpoint de e-mail Zoho SMTP / fallback no terminal
└── README.md                       # Documentação geral do projeto
```

---

## Como Executar Localmente

### Pré-requisitos
- [Node.js](https://nodejs.org/) (versão 18 ou superior recomendada)
- `npm` (instalado junto com o Node.js)

### 1. Instalar as dependências
Na pasta raiz do projeto (`atelier-veral`), execute:

```bash
npm install
```

### 2. Iniciar o servidor
Execute o comando abaixo para subir o servidor na porta `3000`:

```bash
npm start
```

Acesse no navegador:
```text
http://localhost:3000
```

---


## Licença

Este projeto e todos os elementos de identidade visual do **Atelier Veral** são de uso exclusivo da marca. Todos os direitos reservados © Atelier Veral.
