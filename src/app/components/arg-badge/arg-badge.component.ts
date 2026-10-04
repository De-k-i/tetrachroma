import { Component, input } from '@angular/core';

@Component({
  selector: 'app-arg-badge',
  standalone: true,
  template: `
    @if (unlocked()) {
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase bg-tetra-emerald/15 text-tetra-emerald border border-tetra-emerald/50">
        <span class="inline-block w-2 h-2 bg-tetra-emerald animate-pulse"></span>
        <span class="font-bold">ARG DECODIFICADO</span>
        <span class="bg-tetra-emerald text-tetra-graphite px-1 font-bold text-[10px]">-{{ discountPercent() }}%</span>
      </div>
    } @else {
      <div class="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-mono uppercase bg-tetra-cobalt/15 text-tetra-cobalt-light border border-tetra-cobalt/50">
        <span class="inline-block w-2 h-2 bg-tetra-cobalt"></span>
        <span>ENIGMA LATENTE [{{ code() }}]</span>
      </div>
    }
  `
})
export class ArgBadgeComponent {
  readonly code = input.required<string>();
  readonly unlocked = input<boolean>(false);
  readonly discountPercent = input<number>(0);
}
