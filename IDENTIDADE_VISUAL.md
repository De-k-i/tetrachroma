# GUIA DE IDENTIDADE VISUAL: TETRACHROMA

Este documento funciona como o contrato visual de todo o projeto. Todas as decisões de interface, estilização Tailwind e componentes obedecem estritamente às diretrizes abaixo.

---

## 1. Nome do Projeto
**TETRACHROMA**  
*(Subtítulo / Assinatura: The Fourth Protocol | Experiências Imersivas de Confinamento & ARG)*

*Origem:* Derivado da obsessão do culto pela tetracromacia — a habilidade mística e sensorial de enxergar além do espectro visível (a "quarta cor" procurada nas câmaras de provação).

---

## 2. Frase de Direção
> **"Bem detalhado, com cores vivas, mas que ainda assim passe um clima sombrio."**

*Regra de Decisão Rápida:* A hierarquia cromática obedece rigorosamente à arte de capa de *Polygondwanaland* (Jason Galea): a fundação mineral de pedra escura (grafite e ardósia) ganha vida através de detalhes e molduras **predominantemente vermelhos** (o título, a borda do quadro, os estandartes e a lava), seguidos por **azuis profundos** (o lago cósmico, as cascatas e a cela) e, por fim, **pontos focais amarelos solares** (o portal solar místico e chaves radiantes).

---

## 3. Paleta de Cores & Aplicação de Color Theory (Regra de Composição Polygondwanaland)

| Papel na Interface | Nome Conceitual | Hex | Proporção / Aplicação |
| :--- | :--- | :--- | :--- |
| **Fundo Principal (60%)** | Grafite Mineral Profundo | `#121418` | Base opressiva e mineral de todas as telas. Evita o preto absoluto (#000), conferindo profundidade atmosférica. |
| **Superfície / Containers (30%)** | Ardósia Escura | `#1B1F26` | Fundo de cards, caixas de terminal, painéis de filtros e modais, separados por bordas sólidas `#2E3542`. |
| **Texto Principal / Leitura** | Cinza Pergaminho Claro | `#E5E7EB` | Tipografia de alta legibilidade, contraste AAA contra o fundo mineral sem fadiga ocular. |
| **Texto Secundário / Apoio** | Cinza Fosco | `#9CA3AF` | Metadados, descrições técnicas, carimbos temporais e instruções secundárias. |
| **Destaque Predominante (Primário)** | Vermelho Carmim Sangue | `#D90404` | Acentos dominantes: moldura exterior da arte, botões principais (CTAs), rotas ativas na navegação, cabeçalhos de impacto e linhas de contenção. |
| **Destaque Secundário (Atmosfera)** | Azul Cobalto Profundo | `#2175BF` | Botões secundários, filtros de setor, cards de masmorra, badges de mistério e linhas de fluxo. |
| **Destaque Terciário (Ponto Focal Solar)** | Amarelo Solar Dourado | `#F2E205` | Ponto focal e luz mística: o sol central, indicadores pulsantes, ícones estelares, chaves reveladas do ARG. |
| **A Quarta Cor / Revelação** | Verde Esmeralda Mineral | `#10B981` | Enigma decodificado com sucesso, voucher ARG ativado, rito confirmado e resposta válida. |


---

## 4. Tipografia (Google Fonts)

* **Títulos e Cabeçalhos:** `Space Grotesk` (Pesos: 700 Bold, 600 SemiBold)  
  *Características:* Proporções geométricas brutais, cortes angulares e presença imponente, remetendo a monumentos e ordens imperiais.  
  *Hierarquia:*  
  - `H1`: 2.25rem (36px) a 3rem (48px) | Tracking: `-0.02em` | Caixa alta (UPPERCASE)
  - `H2`: 1.5rem (24px) a 1.875rem (30px) | Tracking: `-0.01em`
  - `H3`: 1.25rem (20px) | SemiBold

* **Corpo de Texto, Dados e Formulários:** `Space Mono` (Pesos: 400 Regular, 700 Bold)  
  *Características:* Tipografia monoespaçada técnica que simula terminais investigativos, relatórios criptografados e carimbos de arquivo confidencial.  
  *Hierarquia:*  
  - Corpo: 0.875rem (14px) a 1rem (16px) | Leading: `1.6`
  - Metadados / Badges / Código: 0.75rem (12px) | Uppercase | Tracking: `0.05em`

---

## 5. Forma, Bordas e Superfícies

* **Cantos:** Estritamente retos (`rounded-none` em todos os botões, cards, inputs, modais e badges). É proibido qualquer arredondamento de borda.
* **Bordas:** Linhas sólidas de 1px demarcatórias (`border border-tetra-border` ou `border-tetra-solar/40`). As divisórias reforçam os compartimentos rígidos de contenção.
* **Sombras:** Proibidas sombras suaves/difusas com gaussian blur (`box-shadow` suave). Utilizam-se exclusivamente **sombras duras ortogonais** com deslocamento seco (`shadow-[4px_4px_0px_0px_#000]` ou `shadow-[4px_4px_0px_0px_#F2E205]`), garantindo o impacto brutalista.
* **Textura:** Efeito sutil de linhas de varredura CRT (`scanlines`) e micro-grid ortogonal de 32px nos fundos vazados.

---

## 6. Arquitetura das Telas Desenhadas (Wireframe Estrutural)

### Tela 1: O Catálogo de Câmaras & Painel de Sindicância (`/camaras`)
* **Topo / Navbar:** Logotipo brutalista `[ TETRACHROMA // 0.4 ]` com indicador luminoso pulsante em amarelo solar. Menu de navegação indicando rota ativa com borda inferior de 2px e fundo realçado.
* **Barra de Controle & Filtros (Reativo com Signals e Computed):**
  - Campo de busca instantânea com prompt de terminal `[ BUSCAR_CAMARA: > ]`.
  - Seletor de Dificuldade, Ciclo de Rotação (`EM OPERAÇÃO` vs `PRÓXIMO CICLO`) e Setor: `[ CÂMARA INTERNA ]`, `[ PROVAÇÃO DE LEALDADE ]`, `[ HOROLOGIA ]`, `[ CASTELO EM COLAPSO ]`.
  - Contadores dinâmicos `computed()` exibindo: `CÂMARAS ATIVAS: X / TOTAL: Y | TAXA MÉDIA DE FUGA: Z% | PRIORITÁRIAS: W`.
* **Grade de Câmaras Canônicas do Ciclo Polygondwanaland (Cards com `input()` e `output()`):**
  - Cada card exibe código `#SEC-001`, nome do rito, nível de dificuldade, tempo limite de escape e tributo padronizado (R$ 110,00).
  - Hover Reveal HUD brutalista: passar o cursor sobre a descrição revela um popover com a íntegra da narrativa e ritualística hermética.
  - Botão de ação direta brutalista `[ DOSSIÊ COMPLETO → ]` que navega para o dossiê da sala, e botão `[ ☆ MARCAR ]` emitindo evento `(bookmarkToggle)`.

### Tela 2: Dossiê da Câmara & Terminal de Puzzles ARG (`/camaras/:id`)
* **Header da Câmara:** Código alfanumérico, classificação de setor, status de rotação e botão de favoritar.
* **Painel Central Dividido em 2 Colunas:**
  - **Coluna 1 (Dossiê Tático):** Descrição do confinamento, histórico ritualístico dos súditos, termos herméticos com tooltips interativos (`LoreTermComponent`), requisitos de contingente e botão de convocação para `/iniciar`.
  - **Coluna 2 (Terminal ARG com 4 Puzzles Únicos):**
    1. *Câmara 1 (Cubo do Silêncio):* Cofre de 3 dígitos com dedução da geometria do cubo (6 faces + 8 vértices + 12 arestas = 26 &rarr; `026` / `CUBE26`).
    2. *Câmara 2 (Horologia):* Ressonância harmônica de 4 pêndulos oscilantes sincronizados por 4 manivelas de escape (12 batimentos &rarr; `TIC-TAC-12`).
    3. *Câmara 3 (Espelho Polarizado):* Investigação no código-fonte HTML via DevTools / F12 &rarr; `LOYAL7`.
    4. *Câmara 4 (Escadaria Tetracromática):* Alinhador óptico dos 3 prismas refratores (90°, 120°, 60°) para síntese da Quarta Cor &rarr; `TETRA-V4`.
  - Todos os puzzles testam o conjunto completo sem muletas ou indicadores parciais de acerto. Ao resolver, emite evento `(unlocked)` e concede voucher com desconto sagrado (10% a 25%).

### Tela 3: Formulário de Iniciação & Validação de CEP (`/iniciar`)
* Formulário com campos validados: Nome do Súdito/Líder, E-mail, Quantidade de Infiltrados (2 a 8 pessoas), Turno da Horologia, Data do Rito e **CEP da Equipe/Santuário com preenchimento automático via API ViaCEP**.
* Validação de código ARG em tempo real com cálculo dinâmico de tributo total via `computed()`.
* Botão de confirmação rigorosamente desabilitado enquanto os campos obrigatórios não forem válidos (`bookingForm.invalid`).

### Tela 4: O Codex Hermético & Léxico da Ordem (`/codex`)
* **Manifesto Tetrachroma:** Os 4 Pilares da Iniciação e fundamentos da quarta cor.
* **Console Central de Decodificação ARG:** Terminal de comando mestre onde todas as chaves ativas na sessão são registradas e auditadas.
* **Léxico Hermético:** Glossário interativo categorizado (`CÂMARAS`, `MECÂNICAS`, `HIERARQUIA`, `MISTICISMO`) com busca instantânea e referências cruzadas em toda a aplicação.

### Tela 5: Painel de Controle do Hierofante (`/admin`)
* Protegido por `AuthGuard` com autenticação JWT simulada (`AuthService` + `AuthInterceptor`).
* Métricas operacionais do santuário: total de câmaras, taxa global de sobrevivência, segredos ARG ativos no ciclo e log de auditoria em tempo real.
