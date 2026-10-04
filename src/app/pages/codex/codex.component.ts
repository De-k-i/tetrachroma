import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChamberService } from '../../services/chamber.service';

@Component({
  selector: 'app-codex',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="space-y-8 max-w-5xl mx-auto">
      
      <!-- Banner -->
      <section class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard bg-brutalist-grid">
        <div class="inline-flex items-center gap-2 px-3 py-1 bg-tetra-slate-light border border-tetra-border text-xs font-mono uppercase text-tetra-cobalt-light mb-3">
          <span class="w-2 h-2 bg-tetra-cobalt"></span>
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

      <!-- The 4 Pillars of Initiation -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="bg-tetra-slate border-l-4 border-tetra-solar border-y border-r border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-solar font-bold block mb-1">
            01 // INNER CELL (A CÂMARA INTERNA)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            O Aprisionamento Físico & Silêncio
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            As celas subterrâneas onde todo estímulo exterior é revogado. O teste consiste em extrair padrões matemáticos das imperfeições da alvenaria bruta e do gotejar de água mineral.
          </p>
        </div>

        <div class="bg-tetra-slate border-l-4 border-tetra-cobalt border-y border-r border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-cobalt-light font-bold block mb-1">
            02 // LOYALTY (O TESTE DE LEALDADE)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            A Renúncia Individual
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            Ninguém escapa isolado. Os mecanismos exigem atuação simultânea em pontos opostos do santuário. A confiança no companheiro de cela é a única engrenagem que não range.
          </p>
        </div>

        <div class="bg-tetra-slate border-l-4 border-tetra-carmine border-y border-r border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-carmine font-bold block mb-1">
            03 // HOROLOGY (O JULGAMENTO DO TEMPO)
          </span>
          <h3 class="font-grotesk text-lg font-bold uppercase text-tetra-parchment mb-2">
            A Finitude Implacável
          </h3>
          <p class="font-mono text-xs text-tetra-muted leading-relaxed">
            Os pêndulos de ferro não negociam segundos. O confinamento se fecha gradualmente à medida que o cronômetro descende rumo ao zero absoluto.
          </p>
        </div>

        <div class="bg-tetra-slate border-l-4 border-tetra-emerald border-y border-r border-tetra-border p-5 shadow-hard">
          <span class="font-mono text-xs uppercase text-tetra-emerald font-bold block mb-1">
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
      <section class="bg-tetra-slate border-2 border-tetra-solar p-6 sm:p-8 shadow-hard-solar space-y-6">
        <div class="flex items-center justify-between border-b border-tetra-border pb-3">
          <h2 class="font-grotesk text-lg uppercase font-bold text-tetra-solar flex items-center gap-2">
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
            placeholder="EX: TETRA-V4, CELL44, LOYAL7, TIC-TAC-12..."
            class="flex-1 px-4 py-2.5 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs uppercase focus:outline-none focus:border-tetra-solar rounded-none"
          />

          <button
            type="button"
            (click)="submitMasterCode()"
            class="px-6 py-2.5 bg-tetra-solar text-tetra-graphite font-mono text-xs uppercase font-bold hover:bg-tetra-solar-hover border border-tetra-solar btn-brutalist shadow-hard"
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

    </div>
  `
})
export class CodexComponent {
  readonly chamberService = inject(ChamberService);

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
