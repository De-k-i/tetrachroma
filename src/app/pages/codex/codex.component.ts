import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChamberService } from '../../services/chamber.service';
import { GlossaryService } from '../../services/glossary.service';
import { GlossaryCategory } from '../../models/glossary.model';

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-8">
      
      <!-- Banner -->
      <section class="bg-tetra-slate border-2 border-tetra-border p-6 sm:p-8 shadow-hard bg-brutalist-grid">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-tetra-slate-light border border-tetra-carmine/40 text-xs font-mono uppercase text-tetra-carmine mb-3">
          <span class="w-2 h-2 bg-tetra-carmine"></span>
          ARQUIVO CONFIDENCIAL DO HIEROFANTE
        </div>

        <h1 class="font-grotesk text-3xl sm:text-5xl font-bold uppercase tracking-tight text-tetra-parchment mb-4 leading-none">
          O MANIFESTO TETRACROMA
        </h1>

        <p class="font-mono text-xs sm:text-sm text-tetra-muted max-w-3xl leading-relaxed">
          Sob as ordens da teocracia autocrática, a humanidade é mantida em confinamento cego. 
          Apenas aqueles que sobrevivem às engrenagens do tempo e decifram os enigmas herméticos alcançam a visão tetracromática: a quarta cor primordial.
        </p>
      </section>

      <!-- The 4 Pillars of Initiation (Polygondwanaland Cycle) -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div class="bg-tetra-slate border border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-muted font-bold block mb-1">
            01 // INNER CELL (A CÂMARA INTERNA)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            O Aprisionamento Físico & Silêncio
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            As celas subterrâneas onde todo estímulo exterior é revogado. O teste consiste em extrair padrões matemáticos das imperfeições da alvenaria bruta e do gotejar de água mineral.
          </p>
        </div>

        <div class="bg-tetra-slate border border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-muted font-bold block mb-1">
            02 // LOYALTY (O TESTE DE LEALDADE)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            A Renúncia Individual
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            Ninguém escapa isolado. Os mecanismos exigem atuação simultânea em pontos opostos do santuário. A confiança no companheiro de cela é a única engrenagem que não range.
          </p>
        </div>

        <div class="bg-tetra-slate border border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-muted font-bold block mb-1">
            03 // HOROLOGY (O JULGAMENTO DO TEMPO)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            A Finitude Implacável
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            Os pêndulos de ferro não negociam segundos. O confinamento se fecha gradualmente à medida que o cronômetro descende rumo ao zero absoluto.
          </p>
        </div>

        <div class="bg-tetra-slate border border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-muted font-bold block mb-1">
            04 // TETRACHROMA (A QUARTA COR)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            A Transcendência da Escadaria
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            O ápice da pirâmide. O portal onde o amarelo solar, o azul cobalto e o carmim se fundem para desvelar a frequência proibida aos olhos comuns.
          </p>
        </div>

      </div>

      <!-- Central Master Cipher Console -->
      <section class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard space-y-6">
        <div class="flex items-center justify-between border-b border-tetra-border pb-3">
          <h2 class="font-grotesk text-lg uppercase font-bold text-tetra-carmine flex items-center gap-2">
            <span class="w-3 h-3 bg-tetra-solar animate-pulse"></span>
            CONSOLE CENTRAL DE DECODIFICAÇÃO ARG
          </h2>
          <span class="font-mono text-xs text-tetra-muted uppercase">SYS_CONSOLE_ROOT</span>
        </div>

        <p class="font-mono text-xs text-tetra-parchment leading-relaxed">
          Localizou um código nas entranhas das câmaras ou pistas do dossiê? 
          Insira abaixo para registrar nos arquivos mestres e conceder autorização para sua equipe:
        </p>

        <div class="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            [ngModel]="masterCode()"
            (ngModelChange)="masterCode.set($event)"
            (keyup.enter)="submitMasterCode()"
            placeholder="DIGITE A CHAVE DECIFRADA NO DOSSIÊ..."
            class="flex-1 px-4 py-2.5 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs uppercase focus:outline-none focus:border-tetra-carmine rounded-none"
          />

          <button
            type="button"
            (click)="submitMasterCode()"
            class="px-6 py-2.5 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold hover:bg-tetra-carmine-hover border border-black btn-brutalist shadow-hard transition-all"
          >
            AUTENTICAR CHAVE &rarr;
          </button>
        </div>

        @if (feedback()) {
          <div 
            class="p-4 font-mono text-xs border"
            [class]="feedbackType() === 'SUCCESS' ? 'p-4 font-mono text-xs border bg-tetra-emerald/15 border-tetra-emerald text-tetra-emerald' : 'p-4 font-mono text-xs border bg-tetra-carmine/15 border-tetra-carmine text-tetra-carmine'"
          >
            {{ feedback() }}
          </div>
        }

        <!-- Unlocked Secrets Summary -->
        <div class="pt-4 border-t border-tetra-border">
          <span class="block text-[10px] font-mono uppercase text-tetra-muted mb-2">
            CHAVES ATIVAS NESTA SESSÃO ({{ chamberService.unlockedSecrets().length }}):
          </span>
          <div class="flex flex-wrap gap-2">
            @for (secret of chamberService.unlockedSecrets(); track secret) {
              <span class="px-2.5 py-1 bg-tetra-emerald/20 border border-tetra-emerald text-tetra-emerald font-mono text-xs font-bold">
                ✓ {{ secret }}
              </span>
            } @empty {
              <span class="text-xs font-mono text-tetra-muted italic">
                Nenhuma chave decodificada ainda. Inspecione as câmaras para localizar enigmas.
              </span>
            }
          </div>
        </div>

      </section>

      <!-- ================= HERMETIC LEXICON / GLOSSARY ================= -->
      <section id="glossario" class="space-y-6 scroll-mt-20">
        
        <!-- Glossary Header -->
        <div class="bg-tetra-slate border-2 border-tetra-border p-6 sm:p-8 shadow-hard flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-3 h-3 bg-tetra-carmine shadow-hard-sm"></span>
              <h2 class="font-grotesk text-2xl font-bold uppercase tracking-tight text-tetra-parchment">
                LÉXICO HERMÉTICO // GLOSSÁRIO DA ORDEM
              </h2>
            </div>
            <p class="text-xs font-mono text-tetra-muted">
              Compêndio enciclopédico dos conceitos, hierarquias e engrenagens do ritual TETRACHROMA.
            </p>
          </div>

          <div class="font-mono text-xs text-tetra-muted">
            <span class="text-tetra-carmine font-bold">{{ glossaryService.filteredTerms().length }}</span> TERMOS REGISTRADOS
          </div>
        </div>

        <!-- Filter & Search Toolbar -->
        <div class="bg-tetra-slate border border-tetra-border p-4 shadow-hard flex flex-col sm:flex-row gap-4 justify-between items-center font-mono text-xs">
          
          <!-- Category Tabs -->
          <div class="flex flex-wrap gap-1.5 w-full sm:w-auto">
            @for (cat of categories; track cat) {
              <button
                type="button"
                (click)="glossaryService.selectedCategory.set(cat)"
                class="px-2.5 py-1 border transition-colors uppercase text-[11px]"
                [class.bg-tetra-carmine]="glossaryService.selectedCategory() === cat"
                [class.text-white]="glossaryService.selectedCategory() === cat"
                [class.border-black]="glossaryService.selectedCategory() === cat"
                [class.shadow-hard-sm]="glossaryService.selectedCategory() === cat"
                [class.bg-tetra-graphite]="glossaryService.selectedCategory() !== cat"
                [class.text-tetra-muted]="glossaryService.selectedCategory() !== cat"
                [class.border-tetra-border]="glossaryService.selectedCategory() !== cat"
              >
                {{ cat }}
              </button>
            }
          </div>

          <!-- Quick Search Input -->
          <div class="relative w-full sm:w-72">
            <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tetra-carmine font-mono text-sm">
              >
            </span>
            <input
              type="text"
              [ngModel]="glossaryService.searchQuery()"
              (ngModelChange)="glossaryService.searchQuery.set($event)"
              placeholder="Buscar termo no léxico..."
              class="w-full pl-7 pr-3 py-1.5 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-carmine rounded-none"
            />
          </div>

        </div>

        <!-- Terms Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          @for (term of glossaryService.filteredTerms(); track term.key) {
            <article class="bg-tetra-slate border border-tetra-border hover:border-tetra-carmine p-5 shadow-hard transition-colors flex flex-col justify-between">
              <div>
                <div class="flex items-center justify-between border-b border-tetra-border pb-2.5 mb-3">
                  <div class="flex items-center gap-2">
                    <span class="text-base">{{ term.referenceIcon }}</span>
                    <h3 class="font-grotesk text-base font-bold uppercase text-tetra-parchment">
                      {{ term.name }}
                    </h3>
                  </div>
                  <span class="text-[10px] font-mono px-2 py-0.5 bg-tetra-slate-light border border-tetra-border text-tetra-muted">
                    {{ term.category }}
                  </span>
                </div>

                <div class="mb-3 font-mono text-xs text-tetra-solar/95 font-medium leading-relaxed">
                  "{{ term.shortDefinition }}"
                </div>

                <p class="font-mono text-xs text-tetra-muted leading-relaxed">
                  {{ term.fullDefinition }}
                </p>
              </div>

              <div class="pt-3 mt-3 border-t border-tetra-border/50 text-right">
                <span class="text-[10px] font-mono text-tetra-muted uppercase">
                  IDENTIFICADOR: #{{ term.key }}
                </span>
              </div>
            </article>
          } @empty {
            <div class="col-span-full bg-tetra-slate border border-dashed border-tetra-border p-8 text-center font-mono text-xs text-tetra-muted">
              Nenhum termo hermético localizado para a busca informada.
            </div>
          }
        </div>

      </section>

    </div>
  `
})
export class CodexComponent {
  readonly chamberService = inject(ChamberService);
  readonly glossaryService = inject(GlossaryService);

  readonly categories: ('TODOS' | GlossaryCategory)[] = [
    'TODOS',
    'CÂMARAS',
    'MECÂNICAS',
    'HIERARQUIA',
    'MISTICISMO'
  ];

  readonly masterCode = signal<string>('');
  readonly feedback = signal<string | null>(null);
  readonly feedbackType = signal<'SUCCESS' | 'ERROR'>('SUCCESS');

  submitMasterCode(): void {
    const code = this.masterCode().trim().toUpperCase();
    if (!code) return;

    const ok = this.chamberService.unlockSecret(code);
    if (ok) {
      this.feedbackType.set('SUCCESS');
      this.feedback.set(`[AUTORIZADO] Chave ${code} validada nos arquivos centrais! Desconto disponível na reserva.`);
      this.masterCode.set('');
    } else {
      this.feedbackType.set('ERROR');
      this.feedback.set(`[REJEITADO] A chave ${code} não possui correspondência no cânone da Horologia.`);
    }
  }
}
