import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChamberService } from '../../services/chamber.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-tetra-slate border-b border-tetra-border sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo & Lore Badge -->
          <div class="flex items-center gap-3">
            <a routerLink="/camaras" class="flex items-center gap-2 group">
              <span class="w-3 h-3 bg-tetra-solar inline-block shadow-hard-sm group-hover:bg-tetra-cobalt transition-colors"></span>
              <span class="font-grotesk text-xl font-bold tracking-tight text-tetra-parchment group-hover:text-tetra-solar transition-colors">
                TETRACHROMA
              </span>
            </a>
            <span class="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 border border-tetra-border text-tetra-muted">
              THE FOURTH PROTOCOL
            </span>
          </div>

          <!-- Navigation Links with Active Highlighting -->
          <nav class="hidden md:flex items-center gap-1 font-mono text-xs uppercase">
            <a 
              routerLink="/camaras" 
              routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold shadow-hard-sm"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 border border-transparent hover:border-tetra-border text-tetra-parchment transition-colors"
            >
              [ 01 // CÂMARAS ]
            </a>

            <a 
              routerLink="/iniciar" 
              routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold shadow-hard-sm"
              class="px-3 py-2 border border-transparent hover:border-tetra-border text-tetra-parchment transition-colors"
            >
              [ 02 // INICIAÇÃO & RESERVA ]
            </a>

            <a 
              routerLink="/codex" 
              routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold shadow-hard-sm"
              class="px-3 py-2 border border-transparent hover:border-tetra-border text-tetra-parchment transition-colors"
            >
              [ 03 // CODEX ARG ]
            </a>
          </nav>

          <!-- ARG Secrets Status Indicator -->
          <div class="flex items-center gap-3">
            <div class="flex items-center gap-2 px-2.5 py-1 bg-tetra-slate-light border border-tetra-border text-xs font-mono">
              <span class="w-2 h-2 rounded-none bg-tetra-emerald animate-pulse"></span>
              <span class="text-tetra-muted hidden sm:inline">ARG STATUS:</span>
              <span class="font-bold text-tetra-solar">
                {{ chamberService.unlockedSecrets().length }} CHAVE(S)
              </span>
            </div>

            <!-- Mobile Toggle Button -->
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 text-tetra-parchment border border-tetra-border hover:border-tetra-solar"
              aria-label="Abrir Menu"
            >
              <span class="font-mono text-sm font-bold">
                {{ isMobileMenuOpen() ? '[ X ]' : '[ MENU ]' }}
              </span>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Dropdown Menu -->
      @if (isMobileMenuOpen()) {
        <div class="md:hidden border-t border-tetra-border bg-tetra-slate px-4 py-3 space-y-2 font-mono text-xs uppercase">
          <a 
            routerLink="/camaras" 
            (click)="closeMobileMenu()"
            routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            01 // CÂMARAS DE CONFINAMENTO
          </a>
          <a 
            routerLink="/iniciar" 
            (click)="closeMobileMenu()"
            routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            02 // INICIAÇÃO & RESERVAS (VIA CEP)
          </a>
          <a 
            routerLink="/codex" 
            (click)="closeMobileMenu()"
            routerLinkActive="bg-tetra-solar text-tetra-graphite font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            03 // CODEX & TERMINAL ARG
          </a>
        </div>
      }
    </header>
  `
})
export class HeaderNavComponent {
  readonly chamberService = inject(ChamberService);
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
