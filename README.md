# TETRACHROMA // The Fourth Protocol

> **Projeto Acadêmico:** *Da Capa para a Tela*  
> **Capa Escolhida:** *Polygondwanaland* (2017) — King Gizzard & the Lizard Wizard (Direção de Arte: Jason Galea)  
> **Framework:** Angular 19 (Signals & Control Flow Moderno) + Tailwind CSS  
> **Status:** Concluído & Validado

---

## 🏛️ 1. O Conceito e a Ligação Funcional

* **Palavra-Conceito:** `Confinamento Ritualístico`
* **A Régua (Frase de Direção Funcional):**
  > *"Escolhi esta capa porque ela retrata o confinamento ritualístico de súditos em busca da quarta cor a mando de seu governante, e por isso meu site é uma plataforma de experiências imersivas de escape room com mecânicas de ARG (Alternate Reality Game) integradas na interface para decodificação de enigmas e liberação de acessos e descontos."*

---

## 📂 2. Documentação Oficial do Projeto
Todos os arquivos obrigatórios das Fases 1, 2 e 3 estão disponíveis na raiz do projeto:

* 📄 [CONCEITO.md](./CONCEITO.md) — Identificação da obra, links, justificativa da palavra-conceito, ligação funcional e distinção entre decisões da IA vs. decisões autorais do desenvolvedor.
* 🎨 [MOODBOARD.md](./MOODBOARD.md) — Painel de clima com 16 referências distribuídas nos 4 grupos obrigatórios (Conceito, Cor e Luz, Textura e Forma, Interface) com termos de busca e justificativa individual.
* 📐 [IDENTIDADE_VISUAL.md](./IDENTIDADE_VISUAL.md) — Contrato visual com paleta 60-30-10 (`#121418`, `#1B1F26`, `#F2E205`, `#2175BF`, `#D90404`, `#10B981`), tipografia (*Space Grotesk* e *Space Mono*), formas estritamente retas e wireframes estruturados.

---

## ⚡ 3. Conformidade Rigorosa com os Requisitos Técnicos

| Requisito do Edital | Implementação no Projeto | Arquivo / Código de Referência |
| :--- | :--- | :--- |
| **Zero Tolerância: Proibido `*ngIf` e `*ngFor`** | **100% nova sintaxe Angular 17/18/19:** `@if`, `@else if`, `@else`, `@for (item of items; track item.id)` e `@empty`. | Em todos os templates HTML. Zero diretivas legadas. |
| **Zero Tolerância: Capa Proibida no Site** | A arte original da capa **não é exibida nem reproduzida** no site. Apenas sua essência conceitual, geométrica e paleta de cores foram transportadas para a interface. | Atendido integralmente. |
| **Zero Tolerância: Nome do Álbum/Banda Proibido** | O projeto adota o nome autoral **TETRACHROMA**. | Atendido integralmente. |
| **Pelo menos 3 rotas ativas com menu e destaque** | 1. `/camaras` (Catálogo e filtros)<br>2. `/camaras/:id` (Dossiê detalhado com parâmetro)<br>3. `/iniciar` (Formulário de Convocação & ViaCEP)<br>4. `/codex` (Codex ARG & Console Mestre)<br>5. `**` (Câmara Proibida / 404 Temático). Menu com `routerLinkActive`. | [`app.routes.ts`](src/app/app.routes.ts) & [`header-nav.component.ts`](src/app/components/header-nav/header-nav.component.ts) |
| **Rota com Parâmetro (`/algo/:id`)** | `/camaras/:id` carrega o dossiê da câmara correspondente com terminal de decodificação ARG interativo. | [`chamber-detail.component.ts`](src/app/pages/chamber-detail/chamber-detail.component.ts) |
| **Componentes Reutilizáveis com `input()`** | `ChamberCardComponent` e `ArgBadgeComponent` recebem dados através da função reativa `input()` e `input.required()`. | [`chamber-card.component.ts`](src/app/components/chamber-card/chamber-card.component.ts) |
| **Componente avisando o pai com `output()`** | `ChamberCardComponent` emite eventos `(inspect)` e `(bookmarkToggle)` para o componente pai atualizar estado e disparar o modal de pré-visualização. | [`chamber-card.component.ts`](src/app/components/chamber-card/chamber-card.component.ts) |
| **Estado reativo 100% com `signal()`** | Todo dado mutável na tela é gerenciado por `signal()`. Nenhum dado derivado guardado em signal e recalculado manualmente. | [`chamber.service.ts`](src/app/services/chamber.service.ts) e páginas. |
| **Pelo menos 3 `computed()` com trabalho real** | 1. `filteredChambers = computed(...)` (filtro cruzado por texto, setor e dificuldade)<br>2. `totalActiveChambers = computed(...)` (contagem de itens filtrados)<br>3. `averageEscapeRate = computed(...)` (cálculo dinâmico da taxa média de sobrevivência das câmaras)<br>4. `finalPrice = computed(...)` (cálculo de preço * número de pessoas menos cupom ARG). | [`chamber-list.component.ts`](src/app/pages/chamber-list/chamber-list.component.ts) & [`booking.component.ts`](src/app/pages/booking/booking.component.ts) |
| **Serviço com `inject()` consumindo API pública** | `ChamberService` usa `inject(HttpClient)` consumindo API pública com estados de `loading()` e `error()` com botão de reconexão. | [`chamber.service.ts`](src/app/services/chamber.service.ts) |
| **Formulário com validação e botão desabilitado** | Formulário reativo de Iniciação (`/iniciar`) com validações de nome, e-mail, contingente, turno e consulta assíncrona ao **ViaCEP**. O botão permanece **rigorosamente desabilitado enquanto `bookingForm.invalid`**. | [`booking.component.ts`](src/app/pages/booking/booking.component.ts) |
| **Tailwind CSS + Brutalismo** | Cores customizadas (`tetra-graphite`, `tetra-slate`, `tetra-solar`, `tetra-cobalt`, `tetra-carmine`, `tetra-emerald`), cantos estritamente retos (`rounded-none`), linhas de 1px e sombras duras (`4px 4px 0px #000`). | [`tailwind.config.js`](tailwind.config.js) & [`styles.css`](src/styles.css) |

---

## 🚀 4. Como Executar o Projeto Localmente

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

Para gerar a build de produção:
```bash
npm run build
```

---

## 🎤 5. Guia Rápido para a Apresentação Oral (5 Minutos)

Se você for sorteado pelo professor, siga esta ordem cronológica de 5 etapas:

1. **Passo 1: Mostrar a Capa & Palavra-Conceito (1 min)**  
   * Exiba a capa de *Polygondwanaland*. Diga: *"A palavra-conceito é CONFINAMENTO RITUALÍSTICO. A capa retrata súditos aprisionados em celas subterrâneas, submetidos a provações hierárquicas e engrenagens de tempo por uma teocracia em busca da mística quarta cor."*
   * Fale a frase de direção funcional: *"Escolhi esta capa porque ela retrata o confinamento ritualístico de súditos em busca da quarta cor a mando de seu governante, e por isso meu site é uma plataforma de experiências imersivas de escape room com mecânicas de ARG integradas na interface para decodificação de enigmas e liberação de acessos e descontos."*

2. **Passo 2: Mostrar o Moodboard (45s)**  
   * Destaque 2 ou 3 achados: a arquitetura brutalista chanfrada dos monumentos Spomenik e o chiaroscuro dramático com feixes solares rasgando a escuridão.

3. **Passo 3: Mostrar a Identidade Visual (45s)**  
   * Mostre a paleta 60-30-10: base mineral grafite `#121418`, cards ardósia `#1B1F26`, destaque amarelo solar `#F2E205` e azul cerúleo `#2175BF` para a "quarta cor" (ARG). Ressalte a regra de cantos estritamente retos (`rounded-none`) e sombras secas sem blur.

4. **Passo 4: Navegar pela Aplicação (1m30s)**  
   * Navegue em `/camaras`: mostre os filtros em tempo real e os contadores dinâmicos calculados por `computed()`.
   * Abra a câmara com parâmetro de rota `/camaras/:id`: mostre o terminal ARG, digite o código de enigma (ex: `TETRA-V4` ou `CELL44`) e mostre o feedback em verde esmeralda com o voucher liberado.
   * Vá para `/iniciar`: digite um CEP válido (ex: `01001000`) para ver o endereço ser preenchido pela API ViaCEP. Mostre o botão desabilitado até preencher os campos válidos e conclua a reserva.
   * Digite uma URL inválida para demonstrar a página 404 temática da câmara colapsada.

5. **Passo 5: Trecho de Código que se Orgulha (1 min)**  
   * Abra [`chamber-list.component.ts`](src/app/pages/chamber-list/chamber-list.component.ts) nas linhas de `filteredChambers = computed(...)` e `averageEscapeRate = computed(...)`.
   * **Explicação para o professor:** *"Nenhum dado derivado foi guardado em signal nem recalculado manualmente. O `computed()` reage automaticamente e de forma pura quando a lista da API, a query de busca ou o seletor de dificuldade mudam. Além disso, utilizamos 100% da nova sintaxe `@if` e `@for` com `track`, sem nenhuma diretiva legada `*ngIf` ou `*ngFor`."*
