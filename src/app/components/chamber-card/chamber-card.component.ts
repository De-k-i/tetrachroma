import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chamber } from '../../models/chamber.model';
import { ArgBadgeComponent } from '../arg-badge/arg-badge.component';
import { ChamberGeometryComponent } from '../chamber-geometry/chamber-geometry.component';

@Component({
  selector: 'app-chamber-card',
  standalone: true,
  imports: [RouterLink, ArgBadgeComponent, ChamberGeometryComponent],
  host: {
    class: 'block h-full'
  },
  template: `
    <article 
      class="h-full group relative bg-tetra-slate border border-tetra-border hover:border-tetra-carmine transition-colors p-5 shadow-hard flex flex-col justify-between"
      [class.border-tetra-cobalt]="isBookmarked()"
    >
      <!-- Top Bar: Code, Sector & Bookmark -->
      <div>
        <div class="flex items-center justify-between gap-3 pb-3 mb-3 border-b border-tetra-border">
          <div class="flex items-center gap-2 min-w-0 flex-1">
            <span class="shrink-0 px-2 py-0.5 text-xs font-mono font-bold bg-tetra-slate-light text-tetra-carmine border border-tetra-carmine/40">
              {{ chamber().code }}
            </span>
            <span class="text-xs font-mono text-tetra-muted truncate uppercase" [title]="chamber().sectorLabel">
              {{ chamber().sectorLabel }}
            </span>
          </div>

          <button 
            type="button"
            (click)="onBookmarkClick($event)"
            title="Marcar câmara prioritária"
            class="shrink-0 whitespace-nowrap text-xs font-mono px-2.5 py-1 border transition-colors inline-flex items-center justify-center min-w-[5.5rem]"
            [class.bg-tetra-cobalt]="isBookmarked()"
            [class.text-white]="isBookmarked()"
            [class.border-tetra-cobalt]="isBookmarked()"
            [class.bg-tetra-slate-light]="!isBookmarked()"
            [class.text-tetra-muted]="!isBookmarked()"
            [class.border-tetra-border]="!isBookmarked()"
          >
            @if (isBookmarked()) {
              ★ PRIORITÁRIA
            } @else {
              ☆ MARCAR
            }
          </button>
        </div>

        <!-- Geometric Blueprint Wireframe Display (Matching Figma) -->
        <div class="mb-3">
          <app-chamber-geometry [code]="chamber().code" />
        </div>

        <!-- Rotation Season Tag -->
        <div class="mb-2.5">
          @if (chamber().status === 'ACTIVE') {
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase bg-tetra-emerald/15 text-tetra-emerald border border-tetra-emerald/40 font-bold">
              <span class="w-1.5 h-1.5 bg-tetra-emerald animate-pulse"></span>
              CICLO ATUAL // DISPONÍVEL
            </span>
          } @else {
            <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-mono uppercase bg-tetra-slate-light text-tetra-solar border border-tetra-border font-bold">
              <span class="w-1.5 h-1.5 bg-tetra-solar"></span>
              PRÓXIMA ROTAÇÃO // {{ chamber().rotationLabel || 'EM MONTAGEM' }}
            </span>
          }
        </div>

        <!-- Chamber Title -->
        <h3 class="text-lg font-grotesk font-bold text-tetra-parchment group-hover:text-tetra-carmine transition-colors mb-2 leading-tight min-h-[3.25rem] line-clamp-2">
          {{ chamber().name }}
        </h3>

        <!-- Description Block with Full Content Hover Reveal -->
        <div class="relative group/desc mb-4 cursor-help">
          <p class="text-xs text-tetra-muted font-mono leading-relaxed line-clamp-3 min-h-[3.6rem] border-b border-dotted border-tetra-border/60 group-hover/desc:border-tetra-solar/50 group-hover/desc:text-tetra-parchment transition-colors">
            {{ chamber().description }}
          </p>
          <span class="block mt-1 text-[9px] font-mono uppercase text-tetra-muted/70 group-hover/desc:text-tetra-solar transition-colors">
            [ 👁️ PASSE O MOUSE: CONTEÚDO NA ÍNTEGRA ]
          </span>

          <!-- Floating Brutalist HUD Popover on Hover -->
          <div 
            class="absolute left-0 bottom-full mb-2 w-full p-3.5 bg-tetra-graphite border border-tetra-border shadow-hard-lg opacity-0 pointer-events-none group-hover/desc:opacity-100 group-hover/desc:pointer-events-auto transition-opacity duration-150 z-30 font-mono text-left"
          >
            <div class="flex items-center justify-between border-b border-tetra-border pb-1.5 mb-2">
              <span class="text-[10px] uppercase font-bold text-tetra-solar flex items-center gap-1.5">
                <span class="w-1.5 h-1.5 bg-tetra-solar"></span>
                REGISTRO COMPLETO // {{ chamber().code }}
              </span>
              <span class="text-[9px] uppercase px-1.5 py-0.5 bg-tetra-slate border border-tetra-border text-tetra-muted">
                {{ chamber().sectorLabel }}
              </span>
            </div>

            <p class="text-xs text-tetra-parchment font-mono leading-relaxed mb-2">
              {{ chamber().description }}
            </p>

            <p class="text-[11px] text-tetra-muted font-mono leading-relaxed italic border-t border-tetra-border/50 pt-1.5">
              "{{ chamber().ritualLore }}"
            </p>

            <!-- Downward Arrow Indicator -->
            <span class="absolute top-full left-6 -mt-px border-4 border-transparent border-t-tetra-border block w-0 h-0"></span>
          </div>
        </div>
      </div>

      <!-- Center Metas: Difficulty, Time, Escape Rate -->
      <div class="mt-auto">
        <div class="grid grid-cols-3 gap-2 py-3 my-2 border-y border-tetra-border text-center bg-tetra-slate-light/60">
          <div>
            <span class="block text-[10px] uppercase font-mono text-tetra-muted">DIFICULDADE</span>
            <span 
              class="text-xs font-mono font-bold"
              [class.text-tetra-solar]="chamber().difficulty === 'INICIANTE'"
              [class.text-tetra-cobalt-light]="chamber().difficulty === 'PROVAÇÃO'"
              [class.text-tetra-carmine]="chamber().difficulty === 'LETAL' || chamber().difficulty === 'TETRACROMÁTICA'"
            >
              {{ chamber().difficulty }}
            </span>
          </div>

          <div>
            <span class="block text-[10px] uppercase font-mono text-tetra-muted">TEMPO LIMITE</span>
            <span class="text-xs font-mono font-bold text-tetra-parchment">
              {{ chamber().timeLimitMinutes }} MIN
            </span>
          </div>

          <div>
            <span class="block text-[10px] uppercase font-mono text-tetra-muted">TAXA ESCAPE</span>
            <span class="text-xs font-mono font-bold text-tetra-parchment">
              {{ chamber().escapeSuccessRate }}%
            </span>
          </div>
        </div>

        <!-- ARG Badge -->
        <div class="mt-3 mb-4">
          <app-arg-badge 
            [code]="chamber().argSecretCode"
            [unlocked]="chamber().isUnlocked ?? false"
            [discountPercent]="chamber().argDiscountPercent"
          />
        </div>

        <!-- Bottom Action Row -->
        <div class="flex items-center justify-between gap-3 pt-2">
          <div>
            <span class="block text-[10px] font-mono text-tetra-muted uppercase">TRIBUTO / PESSOA</span>
            <span class="text-base font-grotesk font-bold text-tetra-parchment">
              R$ {{ chamber().pricePerInitiate.toFixed(2) }}
            </span>
          </div>

          <a 
            [routerLink]="['/camaras', chamber().id]"
            class="px-3.5 py-1.5 text-xs font-mono uppercase font-bold bg-tetra-carmine text-white hover:bg-tetra-carmine-hover border border-black btn-brutalist shadow-hard-sm inline-flex items-center gap-1.5 transition-all"
          >
            DOSSIÊ COMPLETO &rarr;
          </a>
        </div>
      </div>
    </article>
  `
})
export class ChamberCardComponent {
  readonly chamber = input.required<Chamber>();
  readonly isBookmarked = input<boolean>(false);

  readonly bookmarkToggle = output<number>();

  onBookmarkClick(event: MouseEvent): void {
    event.stopPropagation();
    this.bookmarkToggle.emit(this.chamber().id);
  }
}
