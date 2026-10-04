import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChamberService } from '../../services/chamber.service';
import { Chamber, ChamberDifficulty, ChamberSector } from '../../models/chamber.model';
import { ChamberCardComponent } from '../../components/chamber-card/chamber-card.component';
import { ArgBadgeComponent } from '../../components/arg-badge/arg-badge.component';

@Component({
  selector: 'app-chamber-list',
  standalone: true,
  imports: [RouterLink, FormsModule, ChamberCardComponent],
  template: `
    <div class="space-y-8">
      
      <!-- Hero / Protocol Dossier Banner -->
      <section class="bg-tetra-slate border border-tetra-border p-6 sm:p-8 shadow-hard relative overflow-hidden bg-brutalist-grid">
        <div class="relative z-10 max-w-4xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 bg-tetra-slate-light border border-tetra-border text-xs font-mono uppercase text-tetra-solar mb-4">
            <span class="w-2 h-2 bg-tetra-solar"></span>
            DIRETRIZ DE CONFINAMENTO RITUALÍSTICO
          </div>

          <h1 class="font-grotesk text-3xl sm:text-5xl font-bold uppercase tracking-tight text-tetra-parchment mb-4 leading-none">
            CÂMARAS DE PROVAÇÃO & ASCENSÃO
          </h1>

          <p class="font-mono text-sm text-tetra-muted max-w-3xl leading-relaxed mb-6">
            Sob a vigilância do hierofante, súditos são isolados em câmaras herméticas. 
            Decodifique os enigmas impressos nas engrenagens do tempo para alcançar a quarta cor e garantir sua sobrevivência.
          </p>

          <!-- Quick Computed Stats Ribbon -->
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-tetra-border font-mono text-xs">
            <div class="bg-tetra-slate-light/80 p-3 border border-tetra-border">
              <span class="block text-tetra-muted uppercase text-[10px]">CÂMARAS ATIVAS</span>
              <span class="text-xl font-bold text-tetra-solar">{{ totalActiveChambers() }}</span>
            </div>

            <div class="bg-tetra-slate-light/80 p-3 border border-tetra-border">
              <span class="block text-tetra-muted uppercase text-[10px]">TAXA MÉDIA DE FUGA</span>
              <span class="text-xl font-bold text-tetra-parchment">{{ averageEscapeRate() }}%</span>
            </div>

            <div class="bg-tetra-slate-light/80 p-3 border border-tetra-border">
              <span class="block text-tetra-muted uppercase text-[10px]">SANTUÁRIOS MARCADOS</span>
              <span class="text-xl font-bold text-tetra-cobalt-light">{{ bookmarkedCount() }}</span>
            </div>

            <div class="bg-tetra-slate-light/80 p-3 border border-tetra-border">
              <span class="block text-tetra-muted uppercase text-[10px]">SEGREDOS ARG</span>
              <span class="text-xl font-bold text-tetra-emerald">{{ chamberService.unlockedSecrets().length }} ATIVOS</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Terminal Filter Bar -->
      <section class="bg-tetra-slate border border-tetra-border p-4 shadow-hard">
        <div class="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          <!-- Search Input -->
          <div class="md:col-span-5 relative">
            <label for="chamber-search" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
              [ PESQUISAR_REGISTRO: ARQUIVO / CÓDIGO ]
            </label>
            <div class="relative">
              <span class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-tetra-solar font-mono text-sm">
                >
              </span>
              <input
                id="chamber-search"
                type="text"
                [ngModel]="searchQuery()"
                (ngModelChange)="searchQuery.set($event)"
                placeholder="Ex: CÂMARA 1, INNER CELL, HOROLOGIA..."
                class="w-full pl-7 pr-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none placeholder:text-tetra-muted/50"
              />
            </div>
          </div>

          <!-- Sector Filter -->
          <div class="md:col-span-4">
            <label for="sector-filter" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
              [ SETOR DE CONFINAMENTO ]
            </label>
            <select
              id="sector-filter"
              [ngModel]="selectedSector()"
              (ngModelChange)="selectedSector.set($event)"
              class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
            >
              <option value="ALL">TODOS OS SETORES</option>
              <option value="INNER_CELL">CÂMARA INTERNA (SUBTERRÂNEO)</option>
              <option value="LOYALTY">PROVAÇÃO DE LEALDADE</option>
              <option value="HOROLOGY">ENGRENAGENS DA HOROLOGIA</option>
              <option value="CRUMBLING_CASTLE">CASTELO EM COLAPSO</option>
            </select>
          </div>

          <!-- Difficulty Filter -->
          <div class="md:col-span-3">
            <label for="difficulty-filter" class="block text-[10px] font-mono uppercase text-tetra-muted mb-1">
              [ GRAU DE DIFICULDADE ]
            </label>
            <select
              id="difficulty-filter"
              [ngModel]="selectedDifficulty()"
              (ngModelChange)="selectedDifficulty.set($event)"
              class="w-full px-3 py-2 bg-tetra-graphite border border-tetra-border text-tetra-parchment font-mono text-xs focus:outline-none focus:border-tetra-solar rounded-none"
            >
              <option value="ALL">TODAS AS GRAVIDADES</option>
              <option value="INICIANTE">INICIANTE</option>
              <option value="PROVAÇÃO">PROVAÇÃO</option>
              <option value="LETAL">LETAL</option>
              <option value="TETRACROMÁTICA">TETRACROMÁTICA</option>
            </select>
          </div>

        </div>
      </section>

      <!-- Status Handling: Loading, Error & Empty -->
      @if (chamberService.loading()) {
        <div class="bg-tetra-slate border border-tetra-border p-12 text-center shadow-hard">
          <div class="inline-block w-8 h-8 border-4 border-tetra-border border-t-tetra-solar animate-spin mb-4"></div>
          <p class="font-mono text-sm uppercase tracking-widest text-tetra-solar">
            SINCRONIZANDO COM OS ARQUIVOS DA TEOCRACIA...
          </p>
          <span class="text-xs font-mono text-tetra-muted">Consumindo base de dados central via API</span>
        </div>
      } @else if (chamberService.error()) {
        <div class="bg-tetra-carmine/15 border-2 border-tetra-carmine p-6 shadow-hard">
          <div class="flex items-start gap-3">
            <span class="text-tetra-carmine font-bold font-mono text-xl">[ ! ]</span>
            <div class="space-y-2">
              <h3 class="font-grotesk font-bold text-tetra-parchment uppercase">
                FALHA CRÍTICA DE COMUNICAÇÃO
              </h3>
              <p class="font-mono text-xs text-tetra-parchment/80">
                {{ chamberService.error() }}
              </p>
              <button
                type="button"
                (click)="retrySync()"
                class="px-3 py-1.5 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold hover:bg-tetra-carmine/80 btn-brutalist"
              >
                RECONECTAR AO TERMINAL
              </button>
            </div>
          </div>
        </div>
      } @else {
        <!-- Grid of Chambers -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          @for (chamber of filteredChambers(); track chamber.id) {
            <app-chamber-card 
              [chamber]="chamber"
              [isBookmarked]="isChamberBookmarked(chamber.id)"
              (inspect)="openQuickInspect($event)"
              (bookmarkToggle)="toggleBookmark($event)"
            />
          } @empty {
            <div class="col-span-full bg-tetra-slate border border-dashed border-tetra-border p-12 text-center">
              <p class="font-grotesk text-lg uppercase font-bold text-tetra-muted mb-2">
                NENHUMA CÂMARA CORRESPONDE AOS CRITÉRIOS DE SINDICÂNCIA
              </p>
              <p class="font-mono text-xs text-tetra-muted mb-4">
                Redefina os parâmetros de busca, setor ou nível de dificuldade para reabrir os arquivos.
              </p>
              <button
                type="button"
                (click)="resetFilters()"
                class="px-4 py-2 bg-tetra-solar text-tetra-graphite font-mono text-xs uppercase font-bold btn-brutalist shadow-hard-sm"
              >
                LIMPAR FILTROS
              </button>
            </div>
          }
        </div>
      }

      <!-- Quick Inspection Modal -->
      @if (inspectingChamber()) {
        <div class="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm">
          <div class="bg-tetra-slate border-2 border-tetra-solar max-w-lg w-full p-6 shadow-hard-solar">
            <div class="flex items-center justify-between border-b border-tetra-border pb-3 mb-4">
              <span class="font-mono text-xs uppercase text-tetra-solar font-bold">
                [ VISUALIZAÇÃO RÁPIDA: {{ inspectingChamber()?.code }} ]
              </span>
              <button
                type="button"
                (click)="closeQuickInspect()"
                class="text-tetra-parchment hover:text-tetra-solar font-mono text-sm"
              >
                [ X FECHAR ]
              </button>
            </div>

            <h3 class="font-grotesk text-xl font-bold uppercase text-tetra-parchment mb-2">
              {{ inspectingChamber()?.name }}
            </h3>

            <p class="font-mono text-xs text-tetra-muted mb-4 leading-relaxed">
              {{ inspectingChamber()?.ritualLore }}
            </p>

            <div class="bg-tetra-slate-light p-3 border border-tetra-border mb-4 font-mono text-xs space-y-1">
              <div><strong class="text-tetra-solar">PISTA ARG:</strong> {{ inspectingChamber()?.argClue }}</div>
              <div><strong class="text-tetra-cobalt-light">TRIBUTO:</strong> R$ {{ inspectingChamber()?.pricePerInitiate?.toFixed(2) }} por súdito</div>
            </div>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                (click)="closeQuickInspect()"
                class="px-3 py-1.5 font-mono text-xs uppercase border border-tetra-border text-tetra-parchment"
              >
                RETORNAR
              </button>
              <a
                [routerLink]="['/camaras', inspectingChamber()?.id]"
                (click)="closeQuickInspect()"
                class="px-4 py-1.5 font-mono text-xs uppercase font-bold bg-tetra-solar text-tetra-graphite"
              >
                ABRIR DOSSIÊ COMPLETO &rarr;
              </a>
            </div>
          </div>
        </div>
      }

    </div>
  `
})
export class ChamberListComponent implements OnInit {
  readonly chamberService = inject(ChamberService);

  // Signals para reatividade
  readonly searchQuery = signal<string>('');
  readonly selectedSector = signal<'ALL' | ChamberSector>('ALL');
  readonly selectedDifficulty = signal<'ALL' | ChamberDifficulty>('ALL');
  readonly inspectingChamberId = signal<number | null>(null);

  // Computeds cumprindo rigorosamente os critérios técnicos:
  // 1. Filtragem avançada cruzada
  readonly filteredChambers = computed(() => {
    const list = this.chamberService.chambers();
    const query = this.searchQuery().trim().toLowerCase();
    const sector = this.selectedSector();
    const difficulty = this.selectedDifficulty();

    return list.filter(chamber => {
      const matchesQuery = !query || 
        chamber.name.toLowerCase().includes(query) ||
        chamber.code.toLowerCase().includes(query) ||
        chamber.description.toLowerCase().includes(query);

      const matchesSector = sector === 'ALL' || chamber.sector === sector;
      const matchesDifficulty = difficulty === 'ALL' || chamber.difficulty === difficulty;

      return matchesQuery && matchesSector && matchesDifficulty;
    });
  });

  // 2. Contagem de câmaras ativas pós-filtro
  readonly totalActiveChambers = computed(() => {
    return this.filteredChambers().length;
  });

  // 3. Cálculo dinâmico da taxa média de fuga do conjunto filtrado
  readonly averageEscapeRate = computed(() => {
    const chambers = this.filteredChambers();
    if (chambers.length === 0) return 0;
    const sum = chambers.reduce((acc, c) => acc + c.escapeSuccessRate, 0);
    return Math.round(sum / chambers.length);
  });

  // 4. Contagem de favoritos/marcados
  readonly bookmarkedCount = computed(() => {
    return this.chamberService.bookmarkedChamberIds().length;
  });

  // 5. Objeto da câmara em inspeção rápida
  readonly inspectingChamber = computed(() => {
    const id = this.inspectingChamberId();
    if (!id) return null;
    return this.chamberService.chambers().find(c => c.id === id) ?? null;
  });

  ngOnInit(): void {
    if (this.chamberService.chambers().length === 0) {
      this.chamberService.loadChambers();
    }
  }

  isChamberBookmarked(id: number): boolean {
    return this.chamberService.bookmarkedChamberIds().includes(id);
  }

  toggleBookmark(id: number): void {
    this.chamberService.toggleBookmark(id);
  }

  openQuickInspect(id: number): void {
    this.inspectingChamberId.set(id);
  }

  closeQuickInspect(): void {
    this.inspectingChamberId.set(null);
  }

  resetFilters(): void {
    this.searchQuery.set('');
    this.selectedSector.set('ALL');
    this.selectedDifficulty.set('ALL');
  }

  retrySync(): void {
    this.chamberService.loadChambers();
  }
}
