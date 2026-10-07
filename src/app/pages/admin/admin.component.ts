import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterLink, DatePipe],
  template: `
    <div class="space-y-8 font-mono">
      
      <!-- Admin Header / Protocol Banner -->
      <div class="bg-tetra-slate border-2 border-tetra-border p-6 sm:p-8 shadow-hard bg-brutalist-grid">
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-tetra-border pb-4 mb-6">
          <div>
            <div class="flex items-center gap-2 mb-1">
              <span class="w-3 h-3 bg-tetra-carmine shadow-hard-sm"></span>
              <h1 class="font-grotesk text-2xl sm:text-3xl font-bold uppercase tracking-wide text-tetra-parchment">
                Setor de Supervisão // Terminal 04
              </h1>
            </div>
            <p class="text-xs text-tetra-muted">
              Acesso restrito ao monitoramento operacional e protocolos de confinamento.
            </p>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-tetra-emerald/20 border border-tetra-emerald text-tetra-emerald text-xs font-bold uppercase">
              STATUS: AUTORIZADO
            </span>
            <button
              type="button"
              (click)="auth.logout()"
              class="px-3 py-1 bg-tetra-graphite border border-tetra-border hover:border-tetra-carmine text-tetra-parchment text-xs font-bold uppercase transition-colors"
            >
              [ ENCERRAR SESSÃO ]
            </button>
          </div>
        </div>

        <!-- Token Payload Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          
          <div class="bg-tetra-graphite border border-tetra-border p-4 space-y-2">
            <span class="text-tetra-muted block text-[11px] uppercase">// OPERADOR RESPONSÁVEL</span>
            <div class="text-base font-bold text-tetra-parchment">
              {{ auth.usuario()?.nome || 'Operador não identificado' }}
            </div>
            <div class="text-[11px] text-tetra-muted">
              Registro ativo no sistema de segurança
            </div>
          </div>

          <div class="bg-tetra-graphite border border-tetra-border p-4 space-y-2">
            <span class="text-tetra-muted block text-[11px] uppercase">// NÍVEL DE AUTORIZAÇÃO</span>
            <div class="flex flex-wrap gap-1.5">
              @for (role of auth.usuario()?.roles; track role) {
                <span class="px-2 py-0.5 bg-tetra-slate border border-tetra-border text-tetra-solar font-bold">
                  {{ role }}
                </span>
              } @empty {
                <span class="text-tetra-muted italic">Padrão</span>
              }
            </div>
            <div class="text-[11px] text-tetra-muted">
              Privilégios validados pelo protocolo
            </div>
          </div>

          <div class="bg-tetra-graphite border border-tetra-border p-4 space-y-2">
            <span class="text-tetra-muted block text-[11px] uppercase">// EXPIRAÇÃO DA SESSÃO</span>
            <div class="font-bold text-tetra-parchment">
              {{ auth.usuario()?.expiraEM | date:'dd/MM/yyyy HH:mm:ss' }}
            </div>
            <div class="text-[11px] text-tetra-muted">
              Sessão segura ativa com renovação automática sob solicitação.
            </div>
          </div>

        </div>

        <!-- Session Key Preview -->
        <div class="mt-6 pt-6 border-t border-tetra-border">
          <span class="text-tetra-muted block mb-2 text-[11px] uppercase">
            // CHAVE DE SESSÃO CRIPTOGRAFADA:
          </span>
          <pre class="bg-tetra-graphite border border-tetra-border p-3 text-[10px] text-tetra-muted overflow-x-auto break-all whitespace-pre-wrap font-mono">{{ auth.getToken() }}</pre>
        </div>

      </div>

      <!-- Quick Navigation Back -->
      <div class="flex justify-between items-center text-xs">
        <a routerLink="/camaras" class="text-tetra-muted hover:text-tetra-carmine transition-colors">
          &larr; Retornar para as Câmaras
        </a>
      </div>

    </div>
  `
})
export class AdminComponent {
  readonly auth = inject(AuthService);
}
