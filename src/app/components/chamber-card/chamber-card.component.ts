import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Chamber } from '../../models/chamber.model';
import { ArgBadgeComponent } from '../arg-badge/arg-badge.component';

@Component({
  selector: 'app-chamber-card',
  standalone: true,
  imports: [RouterLink, ArgBadgeComponent],
  template: `
    <article 
      class="group relative bg-tetra-slate border border-tetra-border hover:border-tetra-solar transition-colors p-5 shadow-hard flex flex-col justify-between"
      [class.border-tetra-cobalt]="isBookmarked()"
    >
      <!-- Top Bar: Code, Sector & Bookmark -->
      <div>
        <div class="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-tetra-border">
          <div class="flex items-center gap-2">
            <span class="px-2 py-0.5 text-xs font-mono font-bold bg-tetra-slate-light text-tetra-solar border border-tetra-border">
              {{ chamber().code }}
            </span>
            <span class="text-xs font-mono text-tetra-muted truncate uppercase">
              {{ chamber().sectorLabel }}
            </span>
          </div>

          <button 
            type="button"
            (click)="onBookmarkClick($event)"
            title="Marcar câmara prioritária"
            class="text-xs font-mono px-2 py-1 border transition-colors"
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

        <!-- Chamber Title -->
        <h3 class="text-lg font-grotesk font-bold text-tetra-parchment group-hover:text-tetra-solar transition-colors mb-2 leading-tight">
          {{ chamber().name }}
        </h3>

        <!-- Description -->
        <p class="text-xs text-tetra-muted font-mono mb-4 line-clamp-3 leading-relaxed">
          {{ chamber().description }}
        </p>
      </div>

      <!-- Center Metas: Difficulty, Time, Escape Rate -->
      <div>
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
            <span class="text-base font-grotesk font-bold text-tetra-solar">
              R$ {{ chamber().pricePerInitiate.toFixed(2) }}
            </span>
          </div>

          <div class="flex items-center gap-2">
            <button
              type="button"
              (click)="onInspectClick()"
              class="px-2.5 py-1.5 text-xs font-mono uppercase bg-transparent text-tetra-parchment border border-tetra-border hover:border-tetra-parchment btn-brutalist"
            >
              PREVIEW
            </button>

            <a 
              [routerLink]="['/camaras', chamber().id]"
              class="px-3 py-1.5 text-xs font-mono uppercase font-bold bg-tetra-solar text-tetra-graphite hover:bg-tetra-solar-hover border border-tetra-solar btn-brutalist shadow-hard-sm inline-flex items-center gap-1"
            >
              DOSSIÊ &rarr;
            </a>
          </div>
        </div>
      </div>
    </article>
  `
})
export class ChamberCardComponent {
  readonly chamber = input.required<Chamber>();
  readonly isBookmarked = input<boolean>(false);

  readonly inspect = output<number>();
  readonly bookmarkToggle = output<number>();

  onInspectClick(): void {
    this.inspect.emit(this.chamber().id);
  }

  onBookmarkClick(event: MouseEvent): void {
    event.stopPropagation();
    this.bookmarkToggle.emit(this.chamber().id);
  }
}
