import { Component, input } from '@angular/core';

@Component({
  selector: 'app-chamber-geometry',
  standalone: true,
  template: `
    <div class="relative w-full aspect-[16/10] bg-tetra-graphite border border-tetra-border overflow-hidden flex items-center justify-center p-3 select-none">
      <!-- Background Technical Orthogonal Grid -->
      <div 
        class="absolute inset-0 opacity-20 pointer-events-none" 
        style="background-image: linear-gradient(to right, #2E3542 1px, transparent 1px), linear-gradient(to bottom, #2E3542 1px, transparent 1px); background-size: 14px 14px;"
      ></div>

      <!-- Sector & Class Micro-label in Top Left/Right -->
      <div class="absolute top-1.5 left-2 font-mono text-[9px] uppercase tracking-wider text-tetra-muted/70 flex items-center gap-1">
        <span class="w-1 h-1 bg-current"></span>
        <span>PLANO // {{ code() }}</span>
      </div>
      <div class="absolute top-1.5 right-2 font-mono text-[9px] uppercase tracking-wider text-tetra-muted/70">
        CANAL 04
      </div>

      <!-- Center Vector SVG according to Chamber Code -->
      <svg 
        class="relative w-full h-full max-h-[140px] drop-shadow-sm transition-transform duration-300 group-hover:scale-105" 
        viewBox="0 0 200 130" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        @switch (code()) {
          @case ('SEC-001') {
            <!-- SEC-001: Cubo do Silêncio (Orthogonal Wireframe Cube - Carmine) -->
            <!-- Back Face -->
            <rect x="75" y="20" width="85" height="70" stroke="#D90404" stroke-width="1.75" opacity="0.6" stroke-dasharray="2 2" />
            <!-- Depth Connectors (Edges) -->
            <line x1="40" y1="45" x2="75" y2="20" stroke="#D90404" stroke-width="2" />
            <line x1="125" y1="45" x2="160" y2="20" stroke="#D90404" stroke-width="2" />
            <line x1="40" y1="115" x2="75" y2="90" stroke="#D90404" stroke-width="2" />
            <line x1="125" y1="115" x2="160" y2="90" stroke="#D90404" stroke-width="2" />
            <!-- Front Face -->
            <rect x="40" y="45" width="85" height="70" stroke="#D90404" stroke-width="2.25" fill="#D90404" fill-opacity="0.04" />
          }
          @case ('SEC-002') {
            <!-- SEC-002: Horologia (Concentric Quad Frame with Angle Ray - Carmine) -->
            <!-- Outer Box -->
            <rect x="30" y="15" width="140" height="100" stroke="#D90404" stroke-width="2" />
            <!-- Inner Box -->
            <rect x="55" y="32" width="90" height="66" stroke="#D90404" stroke-width="1.75" />
            <!-- Central Crossaxes -->
            <line x1="100" y1="15" x2="100" y2="115" stroke="#D90404" stroke-width="1.5" />
            <line x1="30" y1="65" x2="170" y2="65" stroke="#D90404" stroke-width="1.5" />
            <!-- Diagonal Time Ray (Horology) -->
            <line x1="100" y1="65" x2="145" y2="32" stroke="#D90404" stroke-width="2.5" />
            <!-- Center Pivot -->
            <circle cx="100" cy="65" r="3" fill="#D90404" />
          }
          @case ('SEC-003') {
            <!-- SEC-003: Espelho Polarizado (Reflected Dihedral / T-Plane - Cobalt Blue) -->
            <!-- Left Wing Box -->
            <rect x="35" y="20" width="55" height="45" stroke="#2175BF" stroke-width="2" />
            <!-- Right Wing Box -->
            <rect x="110" y="20" width="55" height="45" stroke="#2175BF" stroke-width="2" />
            <!-- Central Stem -->
            <line x1="100" y1="20" x2="100" y2="115" stroke="#2175BF" stroke-width="1.75" />
            <!-- Reflected Diagonal Vectors to Base -->
            <line x1="35" y1="20" x2="100" y2="115" stroke="#2175BF" stroke-width="2" />
            <line x1="165" y1="20" x2="100" y2="115" stroke="#2175BF" stroke-width="2" />
            <!-- Top Horizontal Bridge -->
            <line x1="90" y1="65" x2="110" y2="65" stroke="#2175BF" stroke-width="2" />
          }
          @case ('SEC-004') {
            <!-- SEC-004: Escadaria Tetracromática (Orthogonal Stepwise Ascending Profile - Carmine) -->
            <!-- Step Staircase Vector -->
            <path 
              d="M 45 95 L 75 95 L 75 75 L 105 75 L 105 55 L 135 55 L 135 30 L 165 30" 
              stroke="#D90404" 
              stroke-width="2.5" 
              stroke-linecap="square"
            />
            <!-- Dual Counterstep Line -->
            <path 
              d="M 60 105 L 90 105 L 90 85 L 120 85 L 120 65 L 150 65" 
              stroke="#D90404" 
              stroke-width="1.5" 
              opacity="0.6"
              stroke-linecap="square"
            />
          }
          @default {
            <!-- Generic Brutalist Geometry Fallback -->
            <polygon points="100,20 160,110 40,110" stroke="#F2E205" stroke-width="2" />
            <circle cx="100" cy="70" r="22" stroke="#F2E205" stroke-width="1.5" />
          }
        }
      </svg>

      <!-- Bottom Status Hash -->
      <div class="absolute bottom-1.5 left-2 font-mono text-[8px] uppercase tracking-widest text-tetra-muted/50">
        GEOMETRIA VETORIAL // RITO
      </div>
      <div class="absolute bottom-1.5 right-2 font-mono text-[8px] uppercase tracking-widest text-tetra-muted/50">
        0.4
      </div>
    </div>
  `
})
export class ChamberGeometryComponent {
  code = input.required<string>();
}
