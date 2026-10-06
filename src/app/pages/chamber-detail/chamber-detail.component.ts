import { Component, OnInit, inject, signal, input } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ChamberService } from '../../services/chamber.service';
import { Chamber } from '../../models/chamber.model';
import { ArgBadgeComponent } from '../../components/arg-badge/arg-badge.component';
import { ChamberPuzzleComponent } from '../../components/chamber-puzzle/chamber-puzzle.component';
import { LoreTermComponent } from '../../components/lore-term/lore-term.component';
import { ChamberGeometryComponent } from '../../components/chamber-geometry/chamber-geometry.component';

@Component({
  selector: 'app-chamber-detail',
  standalone: true,
  imports: [RouterLink, ArgBadgeComponent, ChamberPuzzleComponent, LoreTermComponent, ChamberGeometryComponent],
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
              <span class="px-3 py-1 font-mono text-sm font-bold bg-tetra-carmine text-white shadow-hard-sm">
                {{ currentChamber.code }}
              </span>
              <span class="font-mono text-xs uppercase text-tetra-cobalt-light border border-tetra-border px-2 py-1">
                {{ currentChamber.sectorLabel }}
              </span>
              @if (currentChamber.status === 'ACTIVE') {
                <span class="font-mono text-xs uppercase bg-tetra-emerald/15 text-tetra-emerald border border-tetra-emerald/40 px-2 py-1 font-bold inline-flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-tetra-emerald animate-pulse"></span>
                  CICLO ATUAL // EM OPERAÇÃO
                </span>
              } @else {
                <span class="font-mono text-xs uppercase bg-tetra-slate-light text-tetra-solar border border-tetra-border px-2 py-1 font-bold inline-flex items-center gap-1">
                  <span class="w-1.5 h-1.5 bg-tetra-solar"></span>
                  PRÓXIMA ROTAÇÃO // {{ currentChamber.rotationLabel || 'EM MONTAGEM' }}
                </span>
              }
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

          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <!-- Left Info -->
            <div class="md:col-span-8">
              <h1 class="font-grotesk text-2xl sm:text-4xl font-bold uppercase tracking-tight text-tetra-parchment mb-3">
                {{ currentChamber.name }}
              </h1>

              <p class="font-mono text-sm text-tetra-muted max-w-4xl leading-relaxed">
                {{ currentChamber.description }}
              </p>
            </div>

            <!-- Right Vector Blueprint (Matching Figma Screen 2) -->
            <div class="md:col-span-4 max-w-xs w-full mx-auto md:mx-0">
              <app-chamber-geometry [code]="currentChamber.code" />
            </div>
          </div>
        </header>

        <!-- Main Dossier Content & ARG Terminal Grid -->
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          <!-- Column 1: Tactical Protocol (7 cols) -->
          <div class="lg:col-span-7 space-y-6">
            
            <!-- Ritual Lore Box -->
            <section class="bg-tetra-slate border border-tetra-border p-6 shadow-hard">
              <h2 class="font-grotesk text-lg uppercase font-bold text-tetra-carmine mb-3 flex items-center gap-2">
                <span class="w-2 h-2 bg-tetra-carmine"></span>
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
                  <span class="block text-[10px] text-tetra-muted uppercase">
                    <app-lore-term key="horologia">HOROLOGIA (TEMPO)</app-lore-term>
                  </span>
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
                [ CONDUTA DO <app-lore-term key="sudito">INICIADO</app-lore-term> NA PROVAÇÃO ]
              </h3>
              <ul class="list-disc list-inside space-y-2 text-tetra-muted leading-relaxed">
                <li>Nenhum artefato exterior é permitido além do intelecto analítico da equipe.</li>
                <li>As engrenagens da câmara são impiedosas; falhas em cooperação acarretam penalidade de tempo.</li>
                <li>Para obter passe livre ou desconto sagrado, o código da câmara deve ser descriptografado no terminal ao lado.</li>
              </ul>
            </section>

            <!-- CTA Booking Box -->
            <section class="bg-tetra-slate border border-tetra-border p-6 shadow-hard flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span class="block text-[10px] font-mono uppercase text-tetra-muted">
                  <app-lore-term key="tributo">TRIBUTO ESTIMADO</app-lore-term>
                </span>
                <span class="font-grotesk text-2xl font-bold text-tetra-parchment">
                  R$ {{ currentChamber.pricePerInitiate.toFixed(2) }}
                  <span class="text-xs font-mono text-tetra-muted">/ iniciado</span>
                </span>
              </div>

              <a
                [routerLink]="['/iniciar']"
                [queryParams]="{ chamberId: currentChamber.id }"
                class="w-full sm:w-auto px-6 py-3 font-mono text-xs uppercase font-bold bg-tetra-carmine text-white hover:bg-tetra-carmine-hover border border-black btn-brutalist shadow-hard text-center transition-all"
              >
                {{ currentChamber.status === 'ACTIVE' ? 'CONVOCAR EQUIPE PARA ESTE RITO →' : 'RESERVA ANTECIPADA // PRÓXIMO CICLO →' }}
              </a>
            </section>

          </div>

          <!-- Column 2: ARG Interactive Provação & Puzzle Terminal (5 cols) -->
          <div class="lg:col-span-5 space-y-4">
            <app-arg-badge
              [code]="currentChamber.argSecretCode"
              [unlocked]="isSecretUnlocked()"
              [discountPercent]="currentChamber.argDiscountPercent"
            />

            <app-chamber-puzzle
              [chamber]="currentChamber"
              [isUnlocked]="isSecretUnlocked()"
              (unlocked)="onPuzzleUnlocked($event)"
            />
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

  onPuzzleUnlocked(code: string): void {
    this.chamberService.unlockSecret(code);
  }
}
