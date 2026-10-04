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

*Regra de Decisão Rápida:* Se surgir dúvida entre suavizar ou endurecer um elemento, escolha sempre o corte ortogonal firme, a linha de 1px definida e o contraste nítido da luz solar amarela ou azul cobalto sobre a pedra mineral profunda.

---

## 3. Paleta de Cores & Aplicação de Color Theory (Regra 60-30-10)

| Papel na Interface | Nome Conceitual | Hex | Proporção / Aplicação |
| :--- | :--- | :--- | :--- |
| **Fundo Principal (60%)** | Grafite Mineral Profundo | `#121418` | Base opressiva e mineral de todas as telas. Evita o preto absoluto (#000), conferindo profundidade atmosférica. |
| **Superfície / Containers (30%)** | Ardósia Escura | `#1B1F26` | Fundo de cards, caixas de terminal, painéis de filtros e modais, separados por bordas sólidas `#2E3542`. |
| **Texto Principal / Leitura** | Cinza Pergaminho Claro | `#E5E7EB` | Tipografia de alta legibilidade, contraste AAA contra o fundo mineral sem fadiga ocular. |
| **Texto Secundário / Apoio** | Cinza Fosco | `#9CA3AF` | Metadados, descrições técnicas, carimbos temporais e instruções secundárias. |
| **Cor Primária de Ação (10%)** | Amarelo Solar | `#F2E205` | Botões principais (CTAs), rotas ativas no menu, sinalizadores de início de rito e estados ativos de foco. |
| **Cor de Apoio / "A Quarta Cor"** | Azul Cerúleo Cobalto | `#2175BF` | Pistas de ARG, links secundários, badges de mistério e enigmas aguardando decodificação. |
| **Cor de Alerta / Confinamento** | Vermelho Carmim | `#D90404` | Penalidades de tempo, cronômetro de confinamento, campos de formulário inválidos e erro de rede. |
| **Cor de Sucesso / Descoberta** | Verde Esmeralda Mineral | `#10B981` | Enigma decodificado com sucesso, desconto ARG liberado, rito confirmado e resposta válida. |

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
  - Seletor de Dificuldade / Setor: `[ TODAS ]`, `[ CÂMARA INTERNA ]`, `[ PROVAÇÃO DE LEALDADE ]`, `[ HOROLOGIA ]`.
  - Contador dinâmico `computed()` exibindo: `CÂMARAS ATIVAS: X / TOTAL: Y | TAXA DE LIBERAÇÃO: Z%`.
* **Grade de Câmaras (Cards Reutilizáveis com `input()` e `output()`):**
  - Cada card exibe código de identificação `#SEC-01`, nome do rito, nível de lealdade (estrelas/blocos de dificuldade), tempo limite de escape e badge de enigma ARG oculto.
  - Botão de ação brutalista `[ EXAMINAR DOSSIÊ -> ]` emitindo evento de inspeção.

### Tela 2: Dossiê da Câmara & Terminal de Decodificação ARG (`/camaras/:id`)
* **Header da Câmara:** Código alfanumérico, classificação de perigo com borda em vermelho carmim `#D90404`, e temporizador de contagem regressiva da Horologia.
* **Painel Central Dividido em 2 Colunas:**
  - **Coluna 1 (Dossiê Tático):** Descrição do confinamento, histórico dos súditos aprisionados, requisitos de sobrevivência e taxa de iniciação.
  - **Coluna 2 (Terminal ARG de Decodificação Interativa):** Console monoespaçado com mensagem criptografada. Campo para submissão de código de decifração. Se correto, dispara feedback visual em verde esmeralda mineral `#10B981` e desbloqueia um voucher com código de desconto exclusivo para o agendamento presencial.
* **Botão de Convocação:** Redireciona para o formulário de reserva em `/iniciar`, pré-preenchendo a câmara selecionada.

### Tela 3: Formulário de Iniciação & Validação de CEP (`/iniciar`)
* Formulário com campos validados: Nome do Súdito/Líder, E-mail, Quantidade de Infiltrados (2 a 8 pessoas), Data do Rito e **CEP da Equipe/Santuário com preenchimento automático via API ViaCEP**.
* Botão de confirmação desabilitado enquanto os campos obrigatórios não forem válidos, cumprindo o requisito técnico com rigor.
