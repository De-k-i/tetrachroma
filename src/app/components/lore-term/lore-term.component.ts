import { Component, ElementRef, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GlossaryService } from '../../services/glossary.service';

@Component({
  selector: 'app-lore-term',
  standalone: true,
  imports: [RouterLink],
  template: `
    <span
      class="relative inline-block group"
      [class.z-30]="isOpen()"
      (mouseenter)="show()"
      (mouseleave)="hide()"
      (focusin)="show()"
      (focusout)="hide()"
      tabindex="0"
    >
      <!-- Visible Trigger Word -->
      <span class="border-b border-dotted border-tetra-carmine hover:border-tetra-solar cursor-help text-tetra-parchment hover:text-white transition-colors font-medium">
        <ng-content>{{ term()?.name }}</ng-content>
      </span>

      <!-- Floating Brutalist HUD Tooltip Popover -->
      @if (isOpen() && term()) {
        <span
          class="absolute w-72 p-3.5 bg-tetra-slate border border-tetra-border shadow-hard-lg z-50 pointer-events-auto block text-left font-mono"
          [class.top-full]="placement() === 'below'"
          [class.mt-2.5]="placement() === 'below'"
          [class.bottom-full]="placement() === 'above'"
          [class.mb-2.5]="placement() === 'above'"
          [class.left-1/2]="align() === 'center'"
          [class.-translate-x-1/2]="align() === 'center'"
          [class.left-0]="align() === 'left'"
          [class.right-0]="align() === 'right'"
        >
          <!-- Tooltip Header -->
          <span class="flex items-center justify-between border-b border-tetra-border pb-1.5 mb-2">
            <span class="flex items-center gap-1.5 font-grotesk font-bold text-xs uppercase text-tetra-parchment">
              <span>{{ term()?.referenceIcon }}</span>
              <span>{{ term()?.name }}</span>
            </span>
            <span class="text-[9px] uppercase px-1.5 py-0.5 bg-tetra-slate-light border border-tetra-border text-tetra-muted">
              {{ term()?.category }}
            </span>
          </span>

          <!-- Tooltip Body -->
          <span class="block text-[11px] text-tetra-parchment/90 leading-relaxed mb-2.5">
            {{ term()?.shortDefinition }}
          </span>

          <!-- Tooltip Footer Link -->
          <span class="block text-right pt-1.5 border-t border-tetra-border">
            <a
              routerLink="/codex"
              fragment="glossario"
              class="text-[10px] text-tetra-solar hover:text-white uppercase font-bold inline-flex items-center gap-1 transition-colors"
            >
              Consultar no Léxico &rarr;
            </a>
          </span>

          <!-- Indicator arrow pointing towards trigger word -->
          @if (placement() === 'above') {
            <span
              class="absolute top-full border-4 border-transparent border-t-tetra-border block w-0 h-0"
              [class.left-1/2]="align() === 'center'"
              [class.-translate-x-1/2]="align() === 'center'"
              [class.left-4]="align() === 'left'"
              [class.right-4]="align() === 'right'"
            ></span>
          } @else {
            <span
              class="absolute bottom-full border-4 border-transparent border-b-tetra-border block w-0 h-0"
              [class.left-1/2]="align() === 'center'"
              [class.-translate-x-1/2]="align() === 'center'"
              [class.left-4]="align() === 'left'"
              [class.right-4]="align() === 'right'"
            ></span>
          }
        </span>
      }
    </span>
  `
})
export class LoreTermComponent {
  private readonly glossaryService = inject(GlossaryService);
  private readonly el = inject(ElementRef<HTMLElement>);

  readonly key = input.required<string>();
  readonly isOpen = signal<boolean>(false);
  readonly placement = signal<'above' | 'below'>('below');
  readonly align = signal<'center' | 'left' | 'right'>('center');

  private hideTimeout?: ReturnType<typeof setTimeout>;

  readonly term = () => this.glossaryService.getTerm(this.key());

  show(): void {
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = undefined;
    }

    if (typeof window !== 'undefined') {
      const rect = this.el.nativeElement.getBoundingClientRect();

      // The header is sticky at top-0 (h-16 / 64px). Tooltip is ~180px high.
      // If rect.top is < 260px, opening above will clip into or behind the sticky header.
      // Opening below guarantees the tooltip stays fully visible in the open page space.
      if (rect.top < 260) {
        this.placement.set('below');
      } else {
        this.placement.set('above');
      }

      // Horizontal boundary detection (w-72 is 288px)
      const halfWidth = 144;
      const center = rect.left + rect.width / 2;

      if (center - halfWidth < 16) {
        this.align.set('left');
      } else if (center + halfWidth > window.innerWidth - 16) {
        this.align.set('right');
      } else {
        this.align.set('center');
      }
    }

    this.isOpen.set(true);
  }

  hide(): void {
    this.hideTimeout = setTimeout(() => {
      this.isOpen.set(false);
    }, 120);
  }
}
