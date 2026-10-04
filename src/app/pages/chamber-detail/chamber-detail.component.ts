import { Component, OnInit, inject, signal, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChamberService } from '../../services/chamber.service';
import { Chamber } from '../../models/chamber.model';
import { ArgBadgeComponent } from '../../components/arg-badge/arg-badge.component';

@Component({
  selector: 'app-chamber-detail',
  standalone: true,
  imports: [RouterLink, FormsModule, ArgBadgeComponent],
  template: `
    <div class="space-y-8">
      
      <!-- Breadcrumb navigation -->
      <nav class="flex items-center gap-2 font-mono text-xs uppercase text-tetra-muted">
        <a routerLink="/camaras" class="hover:text-tetra-solar transition-colors">
          &larr; RETORNAR AO CATÁLOGO GERAL
        </a>
        <span>/</span>
        <span class="text-tetra-parchment">DOSSIÊ {{ chamber()?.code ?? 'CARREGANDO...' }}</span>
      </nav>

      @if (loading()) {
        <div class="bg-tetra-slate border border-tetra-border p-12 text-center shadow-hard">
          <div class="inline-block w-8 h-8 border-4 border-tetra-border border-t-tetra-solar animate-spin mb-4"></div>
          <p class="font-mono text-sm uppercase tracking-widest text-tetra-solar">
            DESCRIPTOGRAFANDO ARQUIVO DE CONFINAMENTO...
          </p>
        </div>
      } @else if (error()) {
        <div class="bg-tetra-carmine/15 border-2 border-tetra-carmine p-6 shadow-hard">
          <h2 class="font-grotesk text-xl uppercase font-bold text-tetra-parchment mb-2">
            ACESSO NEGADO OU ARQUIVO CORROMPIDO
          </h2>
          <p class="font-mono text-xs text-tetra-parchment/80 mb-4">
            {{ error() }}
          </p>
          <a
            routerLink="/camaras"
            class="inline-block px-4 py-2 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold hover:bg-tetra-carmine/80 btn-brutalist"
          >
            VOLTAR AO PAINEL CENTRAL
          </a>
        </div>
      } @else {
        @if (chamber(); as currentChamber) {

        
        <!-- Header Dossier Block -->
        <header class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard bg-brutalist-grid relative">
          <div class="flex flex-wrap items-center justify-between gap-4 border-b border-tetra-border pb-4 mb-4">
            <div class="flex items-center gap-3">
              <span class="px-3 py-1 font-mono text-sm font-bold bg-tetra-solar text-tetra-graphite shadow-hard-sm">
                {{ currentChamber.code }}
              </span>
              <span class="font-mono text-xs uppercase text-tetra-cobalt-light border border-tetra-border px-2 py-1">
                {{ currentChamber.sectorLabel }}
              </span>
            </div>

            <!-- Bookmark toggle -->
            <button
              type="button"
              (click)="toggleBookmark()"
              class="px-3 py-1 text-xs font-mono uppercase border transition-colors"
              [class.bg-tetra-cobalt]="isBookmarked()"
              [class.text-white]="isBookmarked()"
              [class.border-tetra-cobalt]="isBookmarked()"
              [class.bg-tetra-slate-light]="!isBookmarked()"
              [class.text-tetra-parchment]="!isBookmarked()"
              [class.border-tetra-border]="!isBookmarked()"
            >
              {{ isBookmarked() ? '★ SANTUÁRIO PRIORITÁRIO' : '☆ MARCAR PRIORITÁRIO' }}
            </button>
          </div>

          <h1 class="font-grotesk text-2xl sm:text-4xl font-bold uppercase tracking-tight text-tetra-parchment mb-3">
            {{ currentChamber.name }}
          </h1>

          <p class="font-mono text-sm text-tetra-muted max-w-4xl leading-relaxed">
            {{ currentChamber.description }}
          </p>
        </header>

        <!-- Main Dossier Content & ARG Terminal Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Column 1: Tactical Protocol (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Ritual Lore Box -->
            <section class="bg-tetra-slate border border-tetra-border p-6 shadow-hard">
              <h2 class="font-grotesk text-lg uppercase font-bold text-tetra-solar mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-tetra-solar"></span>
                REGISTRO HISTÓRICO DO CONFINAMENTO
              </h2>

              <p class="font-mono text-xs text-tetra-parchment leading-relaxed mb-4">
                {{ currentChamber.ritualLore }}
              </p>

              <!-- Technical Constraints Grid -->
              <div class="grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-tetra-border pt-4 font-mono text-xs">
                <div class="bg-tetra-slate-light p-3 border border-tetra-border">
                  <span class="block text-[10px] text-tetra-muted uppercase">CAPACIDADE DO RITO</span>
                  <span class="font-bold text-tetra-parchment">
                    {{ currentChamber.minInitiates }} a {{ currentChamber.maxInitiates }} SÚDITOS
                  </span>
                </div>

                <div class="bg-tetra-slate-light p-3 border border-tetra-border">
                  <span class="block text-[10px] text-tetra-muted uppercase">HOROLOGIA (TEMPO)</span>
                  <span class="font-bold text-tetra-solar">
                    {{ currentChamber.timeLimitMinutes }} MINUTOS
                  </span>
                </div>

                <div class="bg-tetra-slate-light p-3 border border-tetra-border">
                  <span class="block text-[10px] text-tetra-muted uppercase">TAXA DE ESCAPE</span>
                  <span class="font-bold text-tetra-cobalt-light">
                    {{ currentChamber.escapeSuccessRate }}% SOBREVIVÊNCIA
                  </span>
                </div>
              </div>
            </section>

            <!-- Chamber Directive Instructions -->
            <section class="bg-tetra-slate border border-tetra-border p-6 shadow-hard font-mono text-xs space-y-3">
              <h3 class="font-grotesk text-sm uppercase font-bold text-tetra-parchment">
                [ CONDUTA DO INICIADO NA PROVAÇÃO ]
              </h3>
              <ul class="list-disc list-inside space-y-2 text-tetra-muted leading-relaxed">
                <li>Nenhum artefato exterior é permitido além do intelecto analítico da equipe.</li>
                <li>As engrenagens da câmara são impiedosas; falhas em cooperação acarretam penalidade de tempo.</li>
                <li>Para obter passe livre ou desconto sagrado, o código da câmara deve ser descriptografado no terminal ao lado.</li>
              </ul>
            </section>

            <!-- CTA Booking Box -->
            <section class="bg-tetra-slate border-2 border-tetra-solar p-6 shadow-hard-solar flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span class="block text-[10px] font-mono uppercase text-tetra-muted">TRIBUTO ESTIMADO</span>
                <span class="font-grotesk text-2xl font-bold text-tetra-solar">
                  R$ {{ currentChamber.pricePerInitiate.toFixed(2) }}
                  <span class="text-xs font-mono text-tetra-muted">/ iniciado</span>
                </span>
              </div>

              <a
                [routerLink]="['/iniciar']"
                [queryParams]="{ chamberId: currentChamber.id }"
                class="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase font-bold bg-tetra-solar text-tetra-graphite hover:bg-tetra-solar-hover border border-tetra-solar btn-brutalist shadow-hard text-center"
              >
                CONVOCAR EQUIPE PARA ESTE RITO &rarr;
              </a>
            </section>

          </div>

          <!-- Column 2: ARG Interactive Decryption Terminal (5 cols) -->
          <div class="lg:col-span-5">
            <section class="bg-tetra-slate border-2 border-tetra-cobalt p-6 shadow-hard-cobalt space-y-5">
              
              <div class="flex items-center justify-between border-b border-tetra-border pb-3">
                <div class="flex items-center gap-2">
                  <span class="w-2.5 h-2.5 bg-tetra-cobalt animate-pulse"></span>
                  <h2 class="font-grotesk text-sm uppercase font-bold text-tetra-cobalt-light tracking-wide">
                    TERMINAL ARG // SINAL OCULTO
                  </h2>
                </div>
                <span class="text-[10px] font-mono text-tetra-muted uppercase">SYS_REV_4.0</span>
              </div>

              <!-- Status Badge -->
              <div>
                <app-arg-badge
                  [code]="currentChamber.argSecretCode"
                  [unlocked]="isSecretUnlocked()"
                  [discountPercent]="currentChamber.argDiscountPercent"
                />
              </div>

              <!-- Pista Hermética -->
              <div class="bg-tetra-slate-light p-4 border border-tetra-border">
                <span class="block text-[10px] font-mono uppercase text-tetra-solar mb-1">
                  [ TRANSMISSÃO CRIPTOGRÁFICA INTERCEPTADA ]
                </span>
                <p class="font-mono text-xs text-tetra-parchment leading-relaxed italic">
                  "{{ currentChamber.argClue }}"
                </p>
                <div class="mt-2 text-[10px] font-mono text-tetra-muted">
                  Dica de busca: Observe atentamente o código do setor ou tente [{{ currentChamber.argSecretCode }}]
                </div>
              </div>

              <!-- Interactive Decryption Input -->
              <div class="space-y-3">
                <label for="cipher-input" class="block text-[10px] font-mono uppercase text-tetra-muted">
                  SUBMETER CÓDIGO DECIFRADO:
                </label>
                
                <div class="flex gap-2">
                  <input
                    id="cipher-input"
                    type="text"
                    [ngModel]="cipherInput()"
                    (ngModelChange)="cipherInput.set($event)"
                    (keyup.enter)="tryUnlock()"
                    placeholder="DIGITE O CÓDIGO..."
                    class="flex-1 px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs uppercase focus:outline-none focus:border-tetra-cobalt rounded-none"
                  />

                  <button
                    type="button"
                    (click)="tryUnlock()"
                    class="px-4 py-2 bg-tetra-cobalt text-white font-mono text-xs uppercase font-bold hover:bg-tetra-cobalt-light btn-brutalist shadow-hard-sm"
                  >
                    DECIFRAR
                  </button>
                </div>

                <!-- Feedback Messages -->
                @if (cipherFeedback() === 'SUCCESS') {
                  <div class="p-3 bg-tetra-emerald/15 border border-tetra-emerald text-tetra-emerald font-mono text-xs space-y-1">
                    <p class="font-bold uppercase">[ RITO DECODIFICADO COM SUCESSO! ]</p>
                    <p>A "Quarta Cor" se manifestou. Você conquistou <strong>{{ currentChamber.argDiscountPercent }}% de desconto</strong> para a reserva desta câmara!</p>
                    <div class="pt-2">
                      <a 
                        [routerLink]="['/iniciar']"
                        [queryParams]="{ chamberId: currentChamber.id, code: currentChamber.argSecretCode }"
                        class="inline-block px-3 py-1 bg-tetra-emerald text-tetra-graphite font-bold uppercase text-[10px]"
                      >
                        APLICAR DESCONTO NA RESERVA &rarr;
                      </a>
                    </div>
                  </div>
                } @else if (cipherFeedback() === 'ERROR') {
                  <div class="p-3 bg-tetra-carmine/15 border border-tetra-carmine text-tetra-carmine font-mono text-xs">
                    <p class="font-bold uppercase">[ FALHA DE DECIFRAÇÃO ]</p>
                    <p>A chave submetida foi rejeitada pela engrenagem de contenção. Reanalise a pista ritualística.</p>
                  </div>
                }
              </div>

            </section>
          </div>

        </div>

        }
      }
    </div>
  `
})
export class ChamberDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly chamberService = inject(ChamberService);

  // Opcional input binding do Angular 19
  readonly id = input<string>();

  readonly chamber = signal<Chamber | null>(null);
  readonly loading = signal<boolean>(true);
  readonly error = signal<string | null>(null);

  // ARG Cipher Terminal
  readonly cipherInput = signal<string>('');
  readonly cipherFeedback = signal<'IDLE' | 'SUCCESS' | 'ERROR'>('IDLE');

  ngOnInit(): void {
    const chamberId = Number(this.route.snapshot.paramMap.get('id') || this.id());
    if (chamberId) {
      this.fetchChamber(chamberId);
    } else {
      this.error.set('Identificador de câmara não fornecido.');
      this.loading.set(false);
    }
  }

  fetchChamber(id: number): void {
    this.loading.set(true);
    this.error.set(null);

    this.chamberService.getChamberById(id).subscribe({
      next: chamber => {
        this.chamber.set(chamber);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message || 'Erro ao carregar dossiê da câmara.');
        this.loading.set(false);
      }
    });
  }

  isBookmarked(): boolean {
    const c = this.chamber();
    if (!c) return false;
    return this.chamberService.bookmarkedChamberIds().includes(c.id);
  }

  toggleBookmark(): void {
    const c = this.chamber();
    if (c) {
      this.chamberService.toggleBookmark(c.id);
    }
  }

  isSecretUnlocked(): boolean {
    const c = this.chamber();
    if (!c) return false;
    return this.chamberService.unlockedSecrets().includes(c.argSecretCode.toUpperCase());
  }

  tryUnlock(): void {
    const val = this.cipherInput().trim().toUpperCase();
    if (!val) return;

    const current = this.chamber();
    if (current && (val === current.argSecretCode.toUpperCase() || this.chamberService.unlockSecret(val))) {
      this.chamberService.unlockSecret(val);
      this.cipherFeedback.set('SUCCESS');
    } else {
      this.cipherFeedback.set('ERROR');
    }
  }
}
