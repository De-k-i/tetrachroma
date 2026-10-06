# TETRACHROMA // The Fourth Protocol

> **Projeto Acadêmico:** *Da Capa para a Tela*  
> **Capa Escolhida:** *Polygondwanaland* (2017) — King Gizzard & the Lizard Wizard (Direção de Arte: Jason Galea)  
> **Framework:** Angular 19 (Signals & Control Flow Moderno) + Tailwind CSS Brutalista  
> **Status:** Concluído, Validado & Sem Erros de Compilação

---

## 🏛️ 1. O Conceito e a Ligação Funcional

* **Palavra-Conceito:** `Confinamento Ritualístico`
* **A Régua (Frase de Direção Funcional):**
  > *"Escolhi esta capa porque ela retrata o confinamento ritualístico de súditos em busca da quarta cor a mando de seu governante, e por isso meu site é uma plataforma de experiências imersivas de escape room com mecânicas de ARG (Alternate Reality Game) integradas na interface para decodificação de enigmas e liberação de acessos e descontos."*

* **A Filosofia de Rotação das Câmaras:**  
  Em vez de dezenas de salas genéricas de catálogo, o santuário opera no modelo realista de escape rooms de alta imersão: **4 câmaras canônicas** baseadas no ciclo de *Polygondwanaland*, organizadas em uma rotação de **2 salas ativas em operação presencial** e **2 salas em montagem para o próximo ciclo**, com valor de tributo padronizado (R$ 110,00 por iniciado).

---

## 📂 2. Documentos Oficiais do Projeto

Todos os arquivos teóricos e de direção de arte das Fases 1, 2 e 3 estão disponíveis na raiz do projeto:

* 📄 [CONCEITO.md](./CONCEITO.md) — Identificação da obra, links de domínio público, justificativa da palavra-conceito, ligação funcional e distinção entre decisões da IA vs. decisões autorais do desenvolvedor.
* 🎨 [MOODBOARD.md](./MOODBOARD.md) — Painel de clima com 16 referências distribuídas nos 4 grupos obrigatórios (Conceito, Cor e Luz, Textura e Forma, Interface) com termos de busca e justificativa individual.
* 📐 [IDENTIDADE_VISUAL.md](./IDENTIDADE_VISUAL.md) — Contrato visual com paleta 60-30-10 (`#121418`, `#1B1F26`, `#F2E205`, `#2175BF`, `#D90404`, `#10B981`), tipografia (*Space Grotesk* e *Space Mono*), formas estritamente retas (`rounded-none`), sombras secas ortogonais e wireframes estruturados de todas as telas.
* 📕 [Moodboard & Identidade Visual (PDF do Figma)](./docs/Moodboard_e_Identidade_Visual.pdf) — Prancha visual completa exportada em alta resolução contendo o Moodboard com as 16 referências catalogadas e o Guia de Identidade Visual com os mockups em escala desktop.

---

## ⚡ 3. Conformidade Rigorosa com os Requisitos Técnicos

| Requisito do Edital | Implementação no Projeto | Arquivo / Código de Referência |
| :--- | :--- | :--- |
| **Zero Tolerância: Proibido `*ngIf` e `*ngFor`** | **100% nova sintaxe Angular 17/18/19:** `@if`, `@else if`, `@else`, `@for (item of items; track item.id)` e `@empty`. | Em todos os templates HTML do projeto. Zero diretivas legadas. |
| **Zero Tolerância: Capa Proibida no Site** | A arte original da capa **não é exibida nem reproduzida** no site. Apenas sua essência conceitual, arquitetura e paleta de cores foram transportadas para a interface. | Atendido integralmente. |
| **Zero Tolerância: Nome do Álbum/Banda Proibido** | O projeto adota o nome autoral **TETRACHROMA**. | Atendido integralmente. |
| **Pelo menos 3 rotas ativas com menu e destaque** | 1. `/camaras` (Catálogo, rotação e filtros)<br>2. `/camaras/:id` (Dossiê tático e puzzle ARG)<br>3. `/iniciar` (Formulário de Iniciação & ViaCEP)<br>4. `/codex` (Manifesto, Léxico e Console Mestre)<br>5. `/login` & `/admin` (Autenticação JWT e Painel do Hierofante)<br>6. `**` (Câmara Proibida / 404 temática). Menu com `routerLinkActive`. | [`app.routes.ts`](src/app/app.routes.ts) & [`header-nav.component.ts`](src/app/components/header-nav/header-nav.component.ts) |
| **Rota com Parâmetro (`/algo/:id`)** | `/camaras/:id` carrega dinamicamente o dossiê da câmara correspondente com terminal de puzzle mecânico dedicado. | [`chamber-detail.component.ts`](src/app/pages/chamber-detail/chamber-detail.component.ts) |
| **Componentes Reutilizáveis com `input()`** | `ChamberCardComponent`, `ChamberPuzzleComponent`, `ArgBadgeComponent` e `LoreTermComponent` recebem propriedades reativas via `input()` e `input.required()`. | Diretório [`src/app/components/`](src/app/components/) |
| **Componente avisando o pai com `output()`** | `ChamberCardComponent` emite `(bookmarkToggle)` para favoritar salas, e `ChamberPuzzleComponent` emite `(unlocked)` ao resolver enigmas mecânicos. | [`chamber-card.component.ts`](src/app/components/chamber-card/chamber-card.component.ts) e [`chamber-puzzle.component.ts`](src/app/components/chamber-puzzle/chamber-puzzle.component.ts) |
| **Estado reativo 100% com `signal()`** | Todo dado mutável na aplicação é gerenciado por `signal()`. Nenhum dado derivado guardado em signal e recalculado manualmente. | [`chamber.service.ts`](src/app/services/chamber.service.ts), [`auth.service.ts`](src/app/auth/auth.service.ts) e páginas. |
| **Pelo menos 3 `computed()` com trabalho real** | 1. `filteredChambers = computed(...)` (filtro cruzado por texto, setor, ciclo e dificuldade)<br>2. `totalActiveChambers = computed(...)` (contagem de itens filtrados)<br>3. `averageEscapeRate = computed(...)` (cálculo dinâmico da taxa média de sobrevivência das câmaras filtradas)<br>4. `finalPrice = computed(...)` (cálculo do tributo: participantes × preço base menos desconto ARG conquistado). | [`chamber-list.component.ts`](src/app/pages/chamber-list/chamber-list.component.ts) & [`booking.component.ts`](src/app/pages/booking/booking.component.ts) |
| **Serviço com `inject()` consumindo API pública** | `ChamberService` usa `inject(HttpClient)` consumindo endpoint público local com tratamento de `loading()` e `error()`. O agendamento consome a API externa **ViaCEP**. | [`chamber.service.ts`](src/app/services/chamber.service.ts) & [`booking.component.ts`](src/app/pages/booking/booking.component.ts) |
| **Formulário com validação e botão desabilitado** | Formulário reativo de Iniciação (`/iniciar`) com validações de nome, e-mail, telefone, contingente (2 a 8), data, turno e consulta assíncrona ao **ViaCEP**. O botão permanece **rigorosamente desabilitado enquanto `bookingForm.invalid`**. | [`booking.component.ts`](src/app/pages/booking/booking.component.ts) |
| **Tailwind CSS + Brutalismo** | Cores customizadas (`tetra-graphite`, `tetra-slate`, `tetra-solar`, `tetra-cobalt`, `tetra-carmine`, `tetra-emerald`), cantos estritamente retos (`rounded-none`), divisórias duras de 1px e sombras ortogonais secas (`4px 4px 0px #000`). | [`tailwind.config.js`](tailwind.config.js) & [`styles.css`](src/styles.css) |

---

## 🧩 4. O Sistema de Puzzles ARG (Sem Muletas ou Spoilers)

Cada uma das 4 câmaras possui um desafio mecânico/lógico diferente, projetado segundo princípios autênticos de escape rooms: **o mecanismo é testado como um todo, sem indicar acertos parciais**:

1. **Câmara 1: O Cubo do Silêncio (`/camaras/1`) — *Geometria Espacial***
   - **Enigma:** Cofre mecânico de alvenaria com 3 mostradores (`▲ / ▼`).
   - **Dedução:** A soma geométrica dos elementos fundamentais do cubo: 6 faces + 8 vértices + 12 arestas = **26** (`[ 0 ] - [ 2 ] - [ 6 ]` ou chave `CUBE26`). Concede 10% de desconto.
2. **Câmara 2: Engrenagens da Horologia (`/camaras/2`) — *Ressonância Harmônica***
   - **Enigma:** 4 eixos mecânicos com pêndulos oscilando em tempo real, cada um calibrado por uma manivela de 4 entalhes.
   - **Dedução:** A cadência sagrada de 12 batimentos (`TIC-TAC-12`). O jogador calibra as 4 manivelas (`3 + 2 + 4 + 3 = 12`) e aciona a trava mestre. Se houver descompasso, o sistema falha em conjunto sem revelar quais eixos erraram. Concede 20% de desconto.
3. **Câmara 3: Provação de Lealdade (`/camaras/3`) — *Investigação DevTools / F12***
   - **Enigma:** A pista de lore indica que o segredo não foi gravado na pedra visível, mas nos alicerces do código-fonte.
   - **Dedução:** Inspecionar o código HTML (F12) para localizar o comentário secreto do Hierofante contendo a chave `LOYAL7`. Acessibilidade garantida com visor de código simulado para celulares. Concede 15% de desconto.
4. **Câmara 4: Castelo em Colapso (`/camaras/4`) — *Ótica e Síntese de Cores***
   - **Enigma:** Três prismas de quartzo (Amarelo Solar, Carmim, Azul Cobalto) com seletores de ângulo de refração (30°, 60°, 90°, 120°).
   - **Dedução:** A inscrição do salão hexagonal exige a tríade geométrica (Solar a 90°, Carmim a 120°, Cobalto a 60°). Ao disparar os feixes no zênite, a Quarta Cor se manifesta e autentica a chave mestre `TETRA-V4`. Concede 25% de desconto.

---

## 🔐 5. Autenticação & Painel Administrativo

O sistema possui controle de acesso com autenticação JWT simulada:
* **Rota Protegida:** `/admin` (requer perfil de Administrador).
* **Guards & Interceptors:** `AuthGuard` bloqueia acessos não autorizados e redireciona para `/login`; `AuthInterceptor` anexa automaticamente o token `Bearer` nas requisições HTTP.
* **Credenciais de Acesso para Avaliação:**
  - **Hierofante (Administrador):**  
    `iniciado@tetrachroma.com` / `hierofante123`
  - **Súdito Comum:**  
    `sudito@tetrachroma.com` / `sudito123`

---

## 🚀 6. Como Executar o Projeto Localmente

### Pré-requisitos
* Node.js (v18+) e NPM instalados.

### Passos:
```bash
# 1. Instalar as dependências do projeto
npm install

# 2. Iniciar o servidor de desenvolvimento
npm start
# ou
npx ng serve

# 3. Acessar a aplicação no navegador
# Abra http://localhost:4200
```

Para validar a integridade da build de produção:
```bash
npm run build
```

---
