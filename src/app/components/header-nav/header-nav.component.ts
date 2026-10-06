import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChamberService } from '../../services/chamber.service';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-header-nav',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="bg-tetra-slate border-b-2 border-tetra-carmine/80 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          
          <!-- Logo & Lore Badge (Crimson Tile + Solar Core) -->
          <div class="flex items-center gap-3">
            <a routerLink="/camaras" class="flex items-center gap-2.5 group">
              <span class="w-4 h-4 bg-tetra-carmine flex items-center justify-center shadow-hard-sm border border-black group-hover:bg-tetra-solar transition-colors">
                <span class="w-1.5 h-1.5 bg-tetra-solar group-hover:bg-tetra-graphite"></span>
              </span>
              <span class="font-grotesk text-xl font-bold tracking-tight text-tetra-parchment group-hover:text-tetra-carmine transition-colors">
                TETRACHROMA
              </span>
            </a>
            <span class="hidden sm:inline-block text-[10px] font-mono uppercase px-2 py-0.5 border border-tetra-carmine/40 text-tetra-muted">
              THE FOURTH PROTOCOL
            </span>
          </div>

          <!-- Navigation Links with Active Highlighting (Carmine Dominant) -->
          <nav class="hidden md:flex items-center gap-1.5 font-mono text-xs uppercase">
            <a 
              routerLink="/camaras" 
              routerLinkActive="bg-tetra-carmine text-white font-bold shadow-hard-sm border-black"
              [routerLinkActiveOptions]="{ exact: false }"
              class="px-3 py-2 border border-transparent hover:border-tetra-carmine/50 text-tetra-parchment transition-colors"
            >
              [ 01 // CÂMARAS ]
            </a>

            <a 
              routerLink="/iniciar" 
              routerLinkActive="bg-tetra-carmine text-white font-bold shadow-hard-sm border-black"
              class="px-3 py-2 border border-transparent hover:border-tetra-carmine/50 text-tetra-parchment transition-colors"
            >
              [ 02 // INICIAÇÃO & RESERVA ]
            </a>

            <a 
              routerLink="/codex" 
              routerLinkActive="bg-tetra-carmine text-white font-bold shadow-hard-sm border-black"
              class="px-3 py-2 border border-transparent hover:border-tetra-carmine/50 text-tetra-parchment transition-colors"
            >
              [ 03 // CODEX & GLOSSÁRIO ]
            </a>

            @if (auth.logado() && auth.temRole('Admin')) {
              <a 
                routerLink="/admin" 
                routerLinkActive="bg-tetra-cobalt text-white font-bold shadow-hard-sm border-black"
                class="px-3 py-2 border border-tetra-cobalt/40 text-tetra-cobalt-light hover:border-tetra-cobalt transition-colors"
              >
                [ 04 // SUPERVISÃO ]
              </a>
            }
          </nav>

          <!-- Right Status & Auth Indicator -->
          <div class="flex items-center gap-3">
            
            <!-- ARG Secrets Status Indicator (Cobalt & Solar Accents) -->
            <div class="hidden lg:flex items-center gap-2 px-2.5 py-1 bg-tetra-slate-light border border-tetra-border text-xs font-mono">
              <span class="w-2 h-2 rounded-none bg-tetra-cobalt"></span>
              <span class="text-tetra-muted">CHAVES:</span>
              <span class="font-bold text-tetra-solar">
                {{ chamberService.unlockedSecrets().length }}
              </span>
            </div>

            <!-- Auth Status Area -->
            @if (auth.logado()) {
              <div class="flex items-center gap-2 font-mono text-xs">
                <span class="hidden sm:inline-block px-2.5 py-1 bg-tetra-graphite border border-tetra-border text-tetra-parchment truncate max-w-[150px]">
                  👤 {{ auth.usuario()?.nome }}
                </span>
                <button
                  type="button"
                  (click)="auth.logout()"
                  class="px-2.5 py-1 bg-tetra-graphite border border-tetra-border hover:border-tetra-carmine hover:text-tetra-carmine text-tetra-parchment text-[11px] font-bold uppercase transition-colors"
                  title="Encerrar sessão"
                >
                  [ SAIR ]
                </button>
              </div>
            } @else {
              <a
                routerLink="/login"
                routerLinkActive="border-tetra-carmine text-white bg-tetra-carmine"
                class="px-3 py-1.5 bg-tetra-carmine text-white border border-black shadow-hard-sm hover:bg-tetra-carmine-hover font-mono text-xs uppercase font-bold transition-all"
              >
                [ ENTRAR ]
              </a>
            }

            <!-- Mobile Toggle Button -->
            <button
              type="button"
              (click)="toggleMobileMenu()"
              class="md:hidden p-2 text-tetra-parchment border border-tetra-border hover:border-tetra-carmine"
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
            routerLinkActive="bg-tetra-carmine text-white font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            01 // CÂMARAS DE CONFINAMENTO
          </a>
          <a 
            routerLink="/iniciar" 
            (click)="closeMobileMenu()"
            routerLinkActive="bg-tetra-carmine text-white font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            02 // INICIAÇÃO & RESERVAS
          </a>
          <a 
            routerLink="/codex" 
            (click)="closeMobileMenu()"
            routerLinkActive="bg-tetra-carmine text-white font-bold"
            class="block px-3 py-2 border border-tetra-border text-tetra-parchment"
          >
            03 // CODEX & GLOSSÁRIO
          </a>

          @if (auth.logado() && auth.temRole('Admin')) {
            <a 
              routerLink="/admin" 
              (click)="closeMobileMenu()"
              routerLinkActive="bg-tetra-cobalt text-white font-bold"
              class="block px-3 py-2 border border-tetra-cobalt text-tetra-cobalt-light"
            >
              04 // SETOR DE SUPERVISÃO
            </a>
          }

          @if (auth.logado()) {
            <div class="pt-2 border-t border-tetra-border flex items-center justify-between">
              <span class="text-tetra-muted text-[11px]">Sessão: {{ auth.usuario()?.nome }}</span>
              <button 
                type="button" 
                (click)="auth.logout(); closeMobileMenu()" 
                class="px-3 py-1 bg-tetra-graphite border border-tetra-carmine text-tetra-carmine font-bold text-[11px]"
              >
                SAIR
              </button>
            </div>
          } @else {
            <a 
              routerLink="/login" 
              (click)="closeMobileMenu()"
              class="block px-3 py-2 border border-tetra-carmine bg-tetra-carmine text-white font-bold text-center"
            >
              [ ENTRAR NO SISTEMA ]
            </a>
          }
        </div>
      }
    </header>
  `
})
export class HeaderNavComponent {
  readonly chamberService = inject(ChamberService);
  readonly auth = inject(AuthService);
  readonly isMobileMenuOpen = signal<boolean>(false);

  toggleMobileMenu(): void {
    this.isMobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen.set(false);
  }
}
