import { Component, input, output, signal, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Chamber } from '../../models/chamber.model';

@Component({
  selector: 'app-chamber-puzzle',
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
    <!-- 
      ========================================================================================
      [ARQUIVO CONFIDENCIAL DA ORDEM TETRACROMA // ARQUIVO DO HIEROFANTE]
      VOCÊ DESVELOU OS ALICERCES DO DOCUMENTO DIGITAL. A VISÃO ALÉM DO VÉU FOI CONCEDIDA.
      A CHAVE SAGRADA DE LEALDADE DO ESPELHO POLARIZADO É: LOYAL7
      INSIRA NO TERMINAL DA CÂMARA PARA DESTRANCAR SEU DESCONTO DE 15%.
      ========================================================================================
    -->
    <div 
      id="hierophant-mirror-inscription" 
      class="hidden" 
      data-arcane-secret="LOYAL7" 
      data-lore-protocol="THE_MIRROR_SEES_ALL" 
      aria-hidden="true"
    >
      SEGREDO_HERMETICO: LOYAL7
    </div>

    <section class="bg-tetra-slate border border-tetra-border p-6 shadow-hard space-y-6">
      
      <!-- Terminal Header -->
      <div class="flex items-center justify-between border-b border-tetra-border pb-3">
        <div class="flex items-center gap-2">
          <span 
            class="w-2.5 h-2.5" 
            [class]="isUnlocked() ? 'bg-tetra-emerald animate-pulse' : 'bg-tetra-solar animate-pulse'"
          ></span>
          <h2 class="font-grotesk text-sm uppercase font-bold text-tetra-parchment tracking-wide">
            TERMINAL ARG // PROVAÇÃO DO INICIADO
          </h2>
        </div>
        <span class="text-[10px] font-mono text-tetra-muted uppercase">SYS_REV_4.0</span>
      </div>

      <!-- State: Already Unlocked Success Banner -->
      @if (isUnlocked()) {
        <div class="p-4 bg-tetra-emerald/15 border-2 border-tetra-emerald text-tetra-emerald font-mono text-xs space-y-3">
          <div class="flex items-center gap-2">
            <span class="text-base font-bold">✓</span>
            <span class="font-bold uppercase tracking-wider text-sm">[ PROVAÇÃO CONCLUÍDA COM SUCESSO ]</span>
          </div>
          <p class="text-tetra-parchment leading-relaxed">
            A frequência secreta da câmara foi validada. O tributo da sua equipe foi reduzido em 
            <strong class="text-tetra-emerald">{{ chamber().argDiscountPercent }}%</strong> nos arquivos da Ordem.
          </p>
          <div class="pt-2">
            <a 
              [routerLink]="['/iniciar']"
              [queryParams]="{ chamberId: chamber().id, code: chamber().argSecretCode }"
              class="inline-block px-4 py-2 bg-tetra-emerald text-tetra-graphite font-bold uppercase text-xs btn-brutalist shadow-hard-sm hover:brightness-110 transition-all"
            >
              APLICAR DESCONTO NA RESERVA &rarr;
            </a>
          </div>
        </div>
      } @else {

        <!-- Puzzles Switcher based on Chamber ID -->

        <!-- ================= PUZZLE 1: O CUBO DO SILÊNCIO (COFRE DE 3 DÍGITOS) ================= -->
        @if (chamber().id === 1) {
          <div class="space-y-4">
            <div class="bg-tetra-slate-light p-3.5 border border-tetra-border">
              <span class="block text-[10px] font-mono uppercase text-tetra-solar mb-1 font-bold">
                [ MECANISMO: O COFRE DE ALVENARIA DO CUBO ]
              </span>
              <p class="font-mono text-xs text-tetra-muted leading-relaxed">
                {{ chamber().argClue }}
              </p>
            </div>

            <!-- Vault 3-digit combination tumbler -->
            <div class="bg-tetra-graphite border border-tetra-border p-4 text-center space-y-3">
              <span class="text-[10px] font-mono text-tetra-muted uppercase block">
                COMBINAÇÃO DAS TRÊS ENGRENAGENS:
              </span>

              <div class="flex items-center justify-center gap-3">
                @for (d of vaultDigits; track $index; let i = $index) {
                  <div class="flex flex-col items-center">
                    <button 
                      type="button" 
                      (click)="changeDigit(i, 1)"
                      class="px-2 py-1 text-tetra-muted hover:text-tetra-solar font-mono text-xs border border-tetra-border hover:border-tetra-solar bg-tetra-slate mb-1"
                      title="Incrementar dígito"
                    >
                      ▲
                    </button>
                    <div class="w-12 h-14 bg-tetra-slate border-2 border-tetra-border flex items-center justify-center font-grotesk text-2xl font-bold text-tetra-parchment shadow-hard-sm">
                      {{ vaultDigits[i] }}
                    </div>
                    <button 
                      type="button" 
                      (click)="changeDigit(i, -1)"
                      class="px-2 py-1 text-tetra-muted hover:text-tetra-solar font-mono text-xs border border-tetra-border hover:border-tetra-solar bg-tetra-slate mt-1"
                      title="Decrementar dígito"
                    >
                      ▼
                    </button>
                  </div>
                }
              </div>

              <div class="pt-2">
                <button
                  type="button"
                  (click)="testVaultCombination()"
                  class="w-full sm:w-auto px-6 py-2.5 bg-tetra-cobalt text-white font-mono text-xs uppercase font-bold hover:bg-tetra-cobalt-light btn-brutalist shadow-hard-sm"
                >
                  🔓 TESTAR COMBINAÇÃO DO COFRE
                </button>
              </div>
            </div>

            <!-- Hierophant Progressive Hints (Sem respostas prontas) -->
            <div class="border border-tetra-border/70 p-3 bg-tetra-slate-light/60 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase text-tetra-solar font-bold">
                  ORIENTAÇÕES DO HIEROFANTE
                </span>
                <button
                  type="button"
                  (click)="revealNextHint()"
                  class="text-[10px] font-mono uppercase text-tetra-parchment hover:text-tetra-solar underline"
                >
                  {{ hintLevel() < 2 ? '[ + PEDIR PISTA (' + (hintLevel() + 1) + '/2) ]' : '[ TODAS AS PISTAS REVELADAS ]' }}
                </button>
              </div>

              @if (hintLevel() >= 1) {
                <p class="text-xs font-mono text-tetra-muted border-l-2 border-tetra-solar pl-2">
                  <strong>Pista 1:</strong> Observe a estrutura geométrica do cubo de confinamento: o número total de suas faces, de seus vértices e de suas arestas.
                </p>
              }
              @if (hintLevel() >= 2) {
                <p class="text-xs font-mono text-tetra-muted border-l-2 border-tetra-solar pl-2">
                  <strong>Pista 2:</strong> Um cubo perfeito possui 6 faces, 8 vértices e 12 arestas. Some essas três grandezas geométricas para encontrar a combinação de 3 dígitos (6 + 8 + 12).
                </p>
              }
            </div>
          </div>
        }

        <!-- ================= PUZZLE 2: ENGRENAGENS DA HOROLOGIA (4 PÊNDULOS HARMÔNICOS) ================= -->
        @else if (chamber().id === 2) {
          <div class="space-y-4">
            <div class="bg-tetra-slate-light p-3.5 border border-tetra-border">
              <span class="block text-[10px] font-mono uppercase text-tetra-solar mb-1 font-bold">
                [ MECANISMO: RESSONÂNCIA HARMÔNICA DOS 4 PÊNDULOS DE FERRO ]
              </span>
              <p class="font-mono text-xs text-tetra-muted leading-relaxed">
                {{ chamber().argClue }}
              </p>
            </div>

            <!-- 4 Pendulums & Calibration Cranks Grid -->
            <div class="bg-tetra-graphite border border-tetra-border p-4 space-y-4">
              
              <div class="flex items-center justify-between text-[10px] font-mono text-tetra-muted border-b border-tetra-border/60 pb-2">
                <span>CADÊNCIA MECÂNICA DOS QUATRO EIXOS</span>
                <span class="text-tetra-parchment">SOMA TOTAL ALVO: 12 BATIMENTOS</span>
              </div>

              <!-- 4 Pendulums Track Cards (Sem pistas individuais ou bordas verdes) -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
                @for (p of pendulums; track $index; let i = $index) {
                  <div class="bg-tetra-slate border border-tetra-border p-3 flex flex-col justify-between items-center transition-all">
                    
                    <!-- Axis Header -->
                    <div class="w-full flex items-center justify-between text-[10px] font-mono border-b border-tetra-border/50 pb-1 mb-2">
                      <span class="font-bold text-tetra-parchment">{{ p.name }}</span>
                      <span class="text-[9px] text-tetra-muted">{{ p.desc }}</span>
                    </div>

                    <!-- Oscillating Track Visual (Cor neutra constante) -->
                    <div class="relative w-full h-24 bg-tetra-graphite border border-tetra-border overflow-hidden my-1 flex items-center">
                      <div class="absolute inset-y-0 left-1/2 w-px bg-tetra-border/60 border-dashed"></div>

                      <!-- Oscillating Bob -->
                      <div 
                        class="absolute top-1 bottom-1 w-2.5 bg-tetra-carmine transition-none shadow-hard-sm"
                        [style.left.%]="pendulumPositions()[i]"
                      ></div>
                    </div>

                    <!-- Calibration Crank Controls -->
                    <div class="w-full pt-2 text-center space-y-1">
                      <span class="block text-[9px] font-mono uppercase text-tetra-muted">
                        MANIVELA (ENTALHE):
                      </span>
                      <div class="flex items-center justify-center gap-1.5">
                        <button 
                          type="button" 
                          (click)="changeNotch(i, -1)"
                          class="px-2 py-0.5 text-xs font-mono bg-tetra-graphite border border-tetra-border hover:border-tetra-solar text-tetra-parchment"
                          title="Diminuir entalhe"
                        >
                          -
                        </button>
                        <span class="w-7 text-center font-grotesk font-bold text-sm text-tetra-parchment">
                          {{ currentNotches()[i] }}
                        </span>
                        <button 
                          type="button" 
                          (click)="changeNotch(i, 1)"
                          class="px-2 py-0.5 text-xs font-mono bg-tetra-graphite border border-tetra-border hover:border-tetra-solar text-tetra-parchment"
                          title="Aumentar entalhe"
                        >
                          +
                        </button>
                      </div>
                    </div>

                  </div>
                }
              </div>

              <!-- Master Resonance Lock CTA (Sempre visível para testar o conjunto) -->
              <div class="pt-2 text-center space-y-2">
                <button
                  type="button"
                  (click)="testHorologyMechanism()"
                  class="w-full sm:w-auto px-6 py-2.5 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold hover:bg-tetra-carmine-hover btn-brutalist shadow-hard"
                >
                  ⚙️ TESTAR SINCRONIA DAS ENGRENAGENS
                </button>
                <p class="text-[10px] font-mono text-tetra-muted italic">
                  Calibre as 4 manivelas para equilibrar a cadência dos 12 batimentos e acione a trava mestre.
                </p>
              </div>

            </div>

            <!-- Horology Progressive Hints -->
            <div class="border border-tetra-border/70 p-3 bg-tetra-slate-light/60 space-y-2">
              <div class="flex items-center justify-between">
                <span class="text-[10px] font-mono uppercase text-tetra-solar font-bold">
                  ARQUIVOS DE HOROLOGIA // PISTAS DO HIEROFANTE
                </span>
                <button
                  type="button"
                  (click)="revealHorologyHint()"
                  class="text-[10px] font-mono uppercase text-tetra-parchment hover:text-tetra-solar underline"
                >
                  {{ horologyHintLevel() < 2 ? '[ + PEDIR PISTA (' + (horologyHintLevel() + 1) + '/2) ]' : '[ TODAS AS PISTAS REVELADAS ]' }}
                </button>
              </div>

              @if (horologyHintLevel() >= 1) {
                <p class="text-xs font-mono text-tetra-muted border-l-2 border-tetra-solar pl-2">
                  <strong>Pista 1:</strong> A chave do santuário é TIC-TAC-12. A soma dos entalhes das 4 manivelas de escape deve totalizar exatamente 12 rotações harmônicas.
                </p>
              }
              @if (horologyHintLevel() >= 2) {
                <p class="text-xs font-mono text-tetra-muted border-l-2 border-tetra-solar pl-2">
                  <strong>Pista 2:</strong> As coroas das extremidades (I e IV) operam com a mesma carga ímpar de 3 entalhes, enquanto o Eixo III requer a carga máxima disponível (4 entalhes).
                </p>
              }
            </div>

          </div>
        }

        <!-- ================= PUZZLE 3: PROVAÇÃO DE LEALDADE (DEVTOOLS / HTML EASTER EGG) ================= -->
        @else if (chamber().id === 3) {
          <div class="space-y-4">
            <div class="bg-tetra-slate-light p-3.5 border border-tetra-border">
              <span class="block text-[10px] font-mono uppercase text-tetra-solar mb-1 font-bold">
                [ MECANISMO: O ESPELHO POLARIZADO ALÉM DO VÉU ]
              </span>
              <p class="font-mono text-xs text-tetra-muted leading-relaxed">
                {{ chamber().argClue }}
              </p>
            </div>

            <!-- Inscription Container -->
            <div class="bg-tetra-graphite border border-tetra-border p-5 space-y-4 text-center">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-tetra-slate border border-tetra-border text-[10px] font-mono text-tetra-muted">
                <span>🔍 PISTA RITUALÍSTICA:</span>
                <span class="text-tetra-parchment">PRESSIONE F12 / INSPECIONAR ELEMENTO NESTA PÁGINA</span>
              </div>

              <p class="font-mono text-xs text-tetra-muted max-w-md mx-auto leading-relaxed">
                A chave não foi impressa na pedra visível, mas nos alicerces ocultos do documento HTML. 
                Procure pelo comentário de código confidencial gravado pelo Hierofante.
              </p>

              <!-- Mobile / Accessibility Fallback Inspector (Sem destacar a resposta em amarelo) -->
              <div>
                <button
                  type="button"
                  (click)="showDevToolsSim.set(!showDevToolsSim())"
                  class="text-[10px] font-mono uppercase text-tetra-cobalt-light hover:underline"
                >
                  {{ showDevToolsSim() ? '[-] OCULTAR SIMULADOR DE CÓDIGO-FONTE' : '[+] DISPOSITIVO MÓVEL OU SEM F12? ABRIR VISOR DO DOCUMENTO' }}
                </button>

                @if (showDevToolsSim()) {
                  <div class="mt-3 p-3 bg-black border border-tetra-border text-left font-mono text-[11px] text-green-400 overflow-x-auto space-y-1">
                    <span class="text-gray-500">&lt;!-- [ARQUIVO CONFIDENCIAL DA ORDEM TETRACROMA] --&gt;</span><br />
                    <span class="text-gray-400">&lt;!-- A chave sagrada de lealdade do espelho polarizado é: LOYAL7 --&gt;</span><br />
                    <span class="text-gray-600">&lt;div id="hierophant-mirror-inscription" data-arcane-secret="LOYAL7"&gt;&lt;/div&gt;</span>
                  </div>
                }
              </div>
            </div>
          </div>
        }

        <!-- ================= PUZZLE 4: CASTELO EM COLAPSO (SÍNTESE DA QUARTA COR) ================= -->
        @else if (chamber().id === 4) {
          <div class="space-y-4">
            <div class="bg-tetra-slate-light p-3.5 border border-tetra-border">
              <span class="block text-[10px] font-mono uppercase text-tetra-solar mb-1 font-bold">
                [ MECANISMO: O ALINHADOR DE PRISMAS TETRACROMÁTICOS ]
              </span>
              <p class="font-mono text-xs text-tetra-muted leading-relaxed">
                {{ chamber().argClue }}
              </p>
            </div>

            <!-- Optical Prism Chamber Interface -->
            <div class="bg-tetra-graphite border border-tetra-border p-5 space-y-5">
              
              <!-- 3 Interactive Optical Prisms with Refraction Angles -->
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                
                <!-- Prism 1: Solar Yellow -->
                <div class="bg-tetra-slate border border-tetra-border p-3 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="font-bold text-tetra-solar">PRISMA I: SOLAR</span>
                    <span class="text-tetra-muted">{{ prismSolarAngle() }}°</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1">
                    @for (angle of prismAngles; track angle) {
                      <button
                        type="button"
                        (click)="prismSolarAngle.set(angle)"
                        class="py-1 text-[10px] font-mono border transition-all"
                        [class]="prismSolarAngle() === angle ? 'bg-tetra-solar text-black font-bold border-tetra-solar' : 'bg-tetra-graphite text-tetra-muted border-tetra-border hover:border-tetra-solar'"
                      >
                        {{ angle }}°
                      </button>
                    }
                  </div>
                </div>

                <!-- Prism 2: Carmine Red -->
                <div class="bg-tetra-slate border border-tetra-border p-3 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="font-bold text-tetra-carmine">PRISMA II: CARMIM</span>
                    <span class="text-tetra-muted">{{ prismCarmineAngle() }}°</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1">
                    @for (angle of prismAngles; track angle) {
                      <button
                        type="button"
                        (click)="prismCarmineAngle.set(angle)"
                        class="py-1 text-[10px] font-mono border transition-all"
                        [class]="prismCarmineAngle() === angle ? 'bg-tetra-carmine text-white font-bold border-tetra-carmine' : 'bg-tetra-graphite text-tetra-muted border-tetra-border hover:border-tetra-carmine'"
                      >
                        {{ angle }}°
                      </button>
                    }
                  </div>
                </div>

                <!-- Prism 3: Cobalt Blue -->
                <div class="bg-tetra-slate border border-tetra-border p-3 space-y-2">
                  <div class="flex items-center justify-between text-[10px] font-mono">
                    <span class="font-bold text-tetra-cobalt-light">PRISMA III: COBALTO</span>
                    <span class="text-tetra-muted">{{ prismCobaltAngle() }}°</span>
                  </div>
                  <div class="grid grid-cols-4 gap-1">
                    @for (angle of prismAngles; track angle) {
                      <button
                        type="button"
                        (click)="prismCobaltAngle.set(angle)"
                        class="py-1 text-[10px] font-mono border transition-all"
                        [class]="prismCobaltAngle() === angle ? 'bg-tetra-cobalt text-white font-bold border-tetra-cobalt' : 'bg-tetra-graphite text-tetra-muted border-tetra-border hover:border-tetra-cobalt'"
                      >
                        {{ angle }}°
                      </button>
                    }
                  </div>
                </div>

              </div>

              <!-- Optical Inscription Clue -->
              <div class="p-3 bg-tetra-slate-light border border-tetra-border/70 text-[10px] font-mono text-tetra-muted space-y-1">
                <span class="text-tetra-solar font-bold block uppercase">[ INSCRIÇÃO DO SALÃO HEXAGONAL // 360° ]</span>
                <p>
                  "A convergência no zênite exige a tríade geométrica: o feixe solar em ângulo reto (90°), o carmim na base obtusa (120°) e o azul cobalto na aresta triangular (60°)."
                </p>
              </div>

              <!-- Central Convergence Trigger Button -->
              <div class="text-center pt-1">
                <button
                  type="button"
                  (click)="testPrismConvergence()"
                  class="w-full sm:w-auto px-6 py-2.5 bg-tetra-solar text-black font-mono text-xs uppercase font-bold hover:brightness-110 btn-brutalist shadow-hard"
                >
                  🔮 DISPARAR CONVERGÊNCIA NO ZÊNITE
                </button>
              </div>

            </div>
          </div>
        }

        <!-- Manual Input / Universal Fallback Bar -->
        <div class="pt-4 border-t border-tetra-border/60 space-y-3">
          <label for="universal-cipher-input" class="block text-[10px] font-mono uppercase text-tetra-muted">
            OU SUBMETER CHAVE MANUALMENTE NO TERMINAL:
          </label>
          
          <div class="flex gap-2">
            <input
              id="universal-cipher-input"
              type="text"
              [ngModel]="cipherInput()"
              (ngModelChange)="cipherInput.set($event)"
              (keyup.enter)="tryUnlock()"
              placeholder="DIGITE A CHAVE DECIFRADA..."
              class="flex-1 px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs uppercase focus:outline-none focus:border-tetra-cobalt rounded-none"
            />

            <button
              type="button"
              (click)="tryUnlock()"
              class="px-5 py-2 bg-tetra-cobalt text-white font-mono text-xs uppercase font-bold hover:bg-tetra-cobalt-light btn-brutalist shadow-hard-sm"
            >
              AUTENTICAR
            </button>
          </div>

          <!-- Feedback messages -->
          @if (feedbackMessage()) {
            <div 
              class="p-3 font-mono text-xs border"
              [class]="feedbackType() === 'SUCCESS' ? 'bg-tetra-emerald/15 border-tetra-emerald text-tetra-emerald' : 'bg-tetra-carmine/15 border-tetra-carmine text-tetra-carmine'"
            >
              {{ feedbackMessage() }}
            </div>
          }
        </div>

      }

    </section>
  `
})
export class ChamberPuzzleComponent implements OnInit, OnDestroy {
  readonly chamber = input.required<Chamber>();
  readonly isUnlocked = input<boolean>(false);

  readonly unlocked = output<string>();

  // Universal terminal input
  readonly cipherInput = signal<string>('');
  readonly feedbackMessage = signal<string | null>(null);
  readonly feedbackType = signal<'SUCCESS' | 'ERROR'>('SUCCESS');

  // --- Puzzle 1: Vault combination ---
  readonly vaultDigits = [0, 0, 0];
  readonly hintLevel = signal<number>(0);

  // --- Puzzle 2: 4 Harmonic Pendulums ---
  readonly pendulums = [
    { name: 'EIXO I', desc: 'Coroa Alpha' },
    { name: 'EIXO II', desc: 'Coroa Beta' },
    { name: 'EIXO III', desc: 'Coroa Gamma' },
    { name: 'EIXO IV', desc: 'Coroa Delta' }
  ];
  readonly targetNotches = [3, 2, 4, 3]; // Sum is 12 -> TIC-TAC-12
  readonly currentNotches = signal<number[]>([1, 4, 2, 1]); // Initial desynchronized values
  readonly pendulumPositions = signal<number[]>([50, 50, 50, 50]);
  readonly horologyHintLevel = signal<number>(0);

  private pendulumTimer: any = null;
  private animTime = 0;

  // --- Puzzle 3: DevTools inspector simulation ---
  readonly showDevToolsSim = signal<boolean>(false);

  // --- Puzzle 4: Optical Prisms ---
  readonly prismAngles = [30, 60, 90, 120];
  readonly prismSolarAngle = signal<number>(30);
  readonly prismCarmineAngle = signal<number>(60);
  readonly prismCobaltAngle = signal<number>(120);

  ngOnInit(): void {
    if (this.chamber().id === 2) {
      this.startPendulums();
    }
  }

  ngOnDestroy(): void {
    this.stopPendulums();
  }

  // --- Puzzle 1: Vault Methods ---
  changeDigit(index: number, delta: number): void {
    this.vaultDigits[index] = (this.vaultDigits[index] + delta + 10) % 10;
  }

  revealNextHint(): void {
    if (this.hintLevel() < 2) {
      this.hintLevel.update(h => h + 1);
    }
  }

  testVaultCombination(): void {
    const combination = `${this.vaultDigits[0]}${this.vaultDigits[1]}${this.vaultDigits[2]}`;
    if (combination === '026' || combination === '26') {
      this.emitSuccess('CUBE26', `[COFRE ABERTO] A soma geométrica das faces (6) + vértices (8) + arestas (12) totalizou 26 e destrancou o cubo!`);
    } else {
      this.emitError(`[COMBINAÇÃO INCORRETA] As travas permaneceram seladas para a combinação ${combination}.`);
    }
  }

  // --- Puzzle 2: 4 Harmonic Pendulums Methods ---
  changeNotch(index: number, delta: number): void {
    const notches = [...this.currentNotches()];
    notches[index] = Math.max(1, Math.min(4, notches[index] + delta));
    this.currentNotches.set(notches);
  }

  revealHorologyHint(): void {
    if (this.horologyHintLevel() < 2) {
      this.horologyHintLevel.update(h => h + 1);
    }
  }

  testHorologyMechanism(): void {
    const notches = this.currentNotches();
    const isCorrect = notches.every((n, i) => n === this.targetNotches[i]);

    if (isCorrect) {
      this.emitSuccess(
        'TIC-TAC-12',
        '[RESSONÂNCIA HARMÔNICA CONCLUÍDA] As quatro manivelas estabilizaram os pêndulos na cadência de 12 batimentos! O teto mecânico foi travado e a chave TIC-TAC-12 autenticada.'
      );
    } else {
      this.emitError(
        '[FALHA DE CADÊNCIA] As engrenagens do teto continuam descompassadas. O mecanismo não travou.'
      );
    }
  }

  private startPendulums(): void {
    this.pendulumTimer = setInterval(() => {
      this.animTime += 0.055;
      const notches = this.currentNotches();
      const isHarmonic = notches.every((n, i) => n === this.targetNotches[i]);

      const newPos = notches.map((notch, i) => {
        if (isHarmonic) {
          // All swing in unison once resonance is achieved
          return 50 + 38 * Math.sin(this.animTime * 1.8);
        } else {
          // Desynchronized phase and frequency based on crank notch
          const freq = 0.5 + notch * 0.45;
          const phase = i * 1.4;
          return 50 + 38 * Math.sin(this.animTime * freq + phase);
        }
      });
      this.pendulumPositions.set(newPos);
    }, 30);
  }

  private stopPendulums(): void {
    if (this.pendulumTimer) {
      clearInterval(this.pendulumTimer);
      this.pendulumTimer = null;
    }
  }

  // --- Puzzle 4: Prisms Methods ---
  testPrismConvergence(): void {
    const solar = this.prismSolarAngle();
    const carmine = this.prismCarmineAngle();
    const cobalt = this.prismCobaltAngle();

    // Target: Solar = 90° (Right angle), Carmine = 120° (Obtuse base), Cobalt = 60° (Equilateral triangle)
    if (solar === 90 && carmine === 120 && cobalt === 60) {
      this.emitSuccess(
        'TETRA-V4',
        '[TRANSCENDÊNCIA ÓTICA] Os três feixes colidiram com perfeição no foco do zênite e despertaram a Quarta Cor! Chave mestre TETRA-V4 autenticada.'
      );
    } else {
      this.emitError(
        '[DISPERSÃO ÓTICA] Os feixes não colidiram no foco central do zênite. A Quarta Cor não se manifestou.'
      );
    }
  }

  // --- Universal Manual Unlock ---
  tryUnlock(): void {
    const inputCode = this.cipherInput().trim().toUpperCase();
    if (!inputCode) return;

    if (
      inputCode === this.chamber().argSecretCode.toUpperCase() ||
      (this.chamber().id === 1 && (inputCode === '026' || inputCode === '26' || inputCode === 'CUBE26'))
    ) {
      this.emitSuccess(this.chamber().argSecretCode, `[AUTORIZADO] Chave ${inputCode} validada com sucesso!`);
      this.cipherInput.set('');
    } else {
      this.emitError(`[REJEITADO] A chave ${inputCode} não possui correspondência nesta câmara.`);
    }
  }

  private emitSuccess(code: string, message: string): void {
    this.feedbackType.set('SUCCESS');
    this.feedbackMessage.set(message);
    this.unlocked.emit(code);
  }

  private emitError(message: string): void {
    this.feedbackType.set('ERROR');
    this.feedbackMessage.set(message);
  }
}
