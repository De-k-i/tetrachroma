import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="min-h-[60vh] flex items-center justify-center p-4">
      <div class="bg-tetra-slate border border-tetra-border p-8 sm:p-12 max-w-xl w-full shadow-hard text-center space-y-6">
        
        <div class="inline-block px-3 py-1 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold">
          ANOMALIA DE CONFINAMENTO // CÓDIGO 404
        </div>

        <h1 class="font-grotesk text-4xl sm:text-6xl font-bold uppercase tracking-tight text-tetra-parchment">
          CÂMARA LACRADA
        </h1>

        <p class="font-mono text-xs sm:text-sm text-tetra-muted leading-relaxed">
          O setor que você tentou acessar colapsou no tempo ou não pertence aos registros da ordem teocrática. 
          Nenhuma passagem segura foi detectada nestas coordenadas.
        </p>

        <div class="p-3 bg-tetra-graphite border border-tetra-border font-mono text-xs text-tetra-parchment text-left">
          <span class="text-tetra-carmine font-bold">> ERR_SECTOR_NOT_FOUND:</span> A escadaria se desfaz em abismo mineral.
        </div>

        <div class="pt-4">
          <a
            routerLink="/camaras"
            class="inline-block px-6 py-3 bg-tetra-carmine text-white font-mono text-xs uppercase font-bold hover:bg-tetra-carmine-hover border border-black btn-brutalist shadow-hard transition-all"
          >
            RETORNAR ÀS CÂMARAS CONHECIDAS &rarr;
          </a>
        </div>

      </div>
    </div>
  `
})
export class NotFoundComponent {}
