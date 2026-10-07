import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/auth.service';

type AuthMode = 'LOGIN' | 'REGISTER';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  template: `
    <div class="max-w-md mx-auto font-mono">
      
      <!-- Terminal Header / Protocol Banner -->
      <div class="bg-tetra-slate border-2 border-tetra-border p-6 shadow-hard-lg">
        
        <div class="flex items-center justify-between border-b border-tetra-border pb-4 mb-6">
          <div class="flex items-center gap-2.5">
            <span class="w-3.5 h-3.5 bg-tetra-carmine flex items-center justify-center shadow-hard-sm border border-black">
              <span class="w-1.5 h-1.5 bg-tetra-solar"></span>
            </span>
            <h1 class="font-grotesk text-xl font-bold uppercase tracking-wide text-tetra-parchment">
              Terminal de Acesso
            </h1>
          </div>
          <span class="text-[10px] text-tetra-muted border border-tetra-border px-2 py-0.5">
            {{ mode() === 'LOGIN' ? 'ACESSO RESTRITO' : 'NOVO REGISTRO' }}
          </span>
        </div>

        <!-- Mode Selector Tabs (Entrar / Cadastrar) -->
        <div class="grid grid-cols-2 gap-2 mb-6 border-b border-tetra-border pb-4">
          <button
            type="button"
            (click)="setMode('LOGIN')"
            class="py-2 text-xs font-mono font-bold uppercase border transition-all text-center"
            [class.bg-tetra-carmine]="mode() === 'LOGIN'"
            [class.text-white]="mode() === 'LOGIN'"
            [class.border-black]="mode() === 'LOGIN'"
            [class.shadow-hard-sm]="mode() === 'LOGIN'"
            [class.bg-tetra-graphite]="mode() !== 'LOGIN'"
            [class.text-tetra-muted]="mode() !== 'LOGIN'"
            [class.border-tetra-border]="mode() !== 'LOGIN'"
          >
            [ 01 // ENTRAR ]
          </button>

          <button
            type="button"
            (click)="setMode('REGISTER')"
            class="py-2 text-xs font-mono font-bold uppercase border transition-all text-center"
            [class.bg-tetra-carmine]="mode() === 'REGISTER'"
            [class.text-white]="mode() === 'REGISTER'"
            [class.border-black]="mode() === 'REGISTER'"
            [class.shadow-hard-sm]="mode() === 'REGISTER'"
            [class.bg-tetra-graphite]="mode() !== 'REGISTER'"
            [class.text-tetra-muted]="mode() !== 'REGISTER'"
            [class.border-tetra-border]="mode() !== 'REGISTER'"
          >
            [ 02 // CADASTRAR ]
          </button>
        </div>

        <p class="text-xs text-tetra-muted mb-6 leading-relaxed">
          @if (mode() === 'LOGIN') {
            Identifique-se para acessar os terminais das câmaras e os protocolos operacionais do TETRACHROMA.
          } @else {
            Registre um novo perfil de operador na ordem para obter credencial de acesso aos setores de confinamento.
          }
        </p>

        <!-- Error Notification -->
        @if (erroMensagem()) {
          <div class="bg-tetra-carmine/20 border border-tetra-carmine text-tetra-parchment p-3 mb-6 text-xs flex flex-col gap-1">
            <div class="flex items-center gap-2 text-tetra-carmine font-bold">
              <span>[!] FALHA NA OPERAÇÃO:</span>
            </div>
            <p>{{ erroMensagem() }}</p>
          </div>
        }

        <!-- ================= LOGIN FORM ================= -->
        @if (mode() === 'LOGIN') {
          <form [formGroup]="loginForm" (ngSubmit)="entrar()" class="space-y-4">
            
            <!-- Email Input -->
            <div>
              <label for="login-email" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                Identificador / E-mail
              </label>
              <input
                id="login-email"
                type="email"
                formControlName="email"
                placeholder="supervisor@tetrachroma.org"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (loginForm.controls.email.invalid && loginForm.controls.email.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * E-mail válido obrigatório
                </span>
              }
            </div>

            <!-- Password Input -->
            <div>
              <label for="login-senha" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                Chave de Acesso / Senha
              </label>
              <input
                id="login-senha"
                type="password"
                formControlName="senha"
                placeholder="••••••••"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (loginForm.controls.senha.invalid && loginForm.controls.senha.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * Senha obrigatória
                </span>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="carregando()"
              class="w-full mt-4 bg-tetra-carmine text-white font-bold uppercase py-3 px-4 border border-black shadow-hard-md hover:bg-tetra-carmine-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs"
            >
              @if (carregando()) {
                <span class="animate-spin inline-block">↻</span>
                <span>VALIDANDO CREDENCIAIS...</span>
              } @else {
                <span>[ ACESSAR CONSOLE ]</span>
              }
            </button>

            <div class="pt-4 text-center">
              <button
                type="button"
                (click)="setMode('REGISTER')"
                class="text-xs text-tetra-muted hover:text-tetra-carmine transition-colors"
              >
                Novo por aqui? <strong>Criar Registro de Operador &rarr;</strong>
              </button>
            </div>
          </form>
        }

        <!-- ================= REGISTER FORM ================= -->
        @if (mode() === 'REGISTER') {
          <form [formGroup]="registerForm" (ngSubmit)="cadastrar()" class="space-y-4">
            
            <!-- Name Input -->
            <div>
              <label for="reg-nome" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                Nome do Operador
              </label>
              <input
                id="reg-nome"
                type="text"
                formControlName="nome"
                placeholder="Marcus de Voss"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (registerForm.controls.nome.invalid && registerForm.controls.nome.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * Nome obrigatório (mínimo 3 caracteres)
                </span>
              }
            </div>

            <!-- Email Input -->
            <div>
              <label for="reg-email" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                E-mail para Registro
              </label>
              <input
                id="reg-email"
                type="email"
                formControlName="email"
                placeholder="operador@tetrachroma.org"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (registerForm.controls.email.invalid && registerForm.controls.email.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * E-mail válido obrigatório
                </span>
              }
            </div>

            <!-- Password Input -->
            <div>
              <label for="reg-senha" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                Chave de Acesso (Senha)
              </label>
              <input
                id="reg-senha"
                type="password"
                formControlName="senha"
                placeholder="••••••••"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (registerForm.controls.senha.invalid && registerForm.controls.senha.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * Mínimo de 6 caracteres
                </span>
              }
            </div>

            <!-- Confirm Password Input -->
            <div>
              <label for="reg-confirma-senha" class="block text-xs font-bold uppercase tracking-wider text-tetra-parchment mb-1.5">
                Confirmar Chave de Acesso
              </label>
              <input
                id="reg-confirma-senha"
                type="password"
                formControlName="confirmaSenha"
                placeholder="••••••••"
                class="w-full bg-tetra-graphite border border-tetra-border px-3 py-2.5 text-xs text-tetra-parchment focus:border-tetra-carmine focus:outline-none focus:ring-1 focus:ring-tetra-carmine"
              />
              @if (registerForm.hasError('passwordsMismatch') && registerForm.controls.confirmaSenha.touched) {
                <span class="text-[11px] text-tetra-carmine mt-1 block">
                  * As senhas não conferem
                </span>
              }
            </div>

            <!-- Submit Button -->
            <button
              type="submit"
              [disabled]="carregando()"
              class="w-full mt-4 bg-tetra-carmine text-white font-bold uppercase py-3 px-4 border border-black shadow-hard-md hover:bg-tetra-carmine-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-xs"
            >
              @if (carregando()) {
                <span class="animate-spin inline-block">↻</span>
                <span>CRIANDO CREDENCIAL...</span>
              } @else {
                <span>[ CONFIRMAR REGISTRO & ACESSAR ]</span>
              }
            </button>

            <div class="pt-4 text-center">
              <button
                type="button"
                (click)="setMode('LOGIN')"
                class="text-xs text-tetra-muted hover:text-tetra-carmine transition-colors"
              >
                Já possui credencial? <strong>Acessar o Console &rarr;</strong>
              </button>
            </div>
          </form>
        }

        <!-- Back to Chambers link -->
        <div class="mt-6 pt-4 border-t border-tetra-border text-center">
          <a routerLink="/camaras" class="text-xs text-tetra-muted hover:text-tetra-carmine transition-colors">
            &larr; Retornar para as Câmaras
          </a>
        </div>

      </div>

    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  readonly auth = inject(AuthService);
  private router = inject(Router);

  readonly mode = signal<AuthMode>('LOGIN');
  readonly carregando = signal(false);
  readonly erroMensagem = signal<string | null>(null);

  readonly loginForm = this.fb.nonNullable.group({
    email: ['supervisor@tetrachroma.org', [Validators.required, Validators.email]],
    senha: ['123456', [Validators.required]]
  });

  readonly registerForm = this.fb.nonNullable.group({
    nome: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    senha: ['', [Validators.required, Validators.minLength(6)]],
    confirmaSenha: ['', [Validators.required]]
  });

  setMode(newMode: AuthMode): void {
    this.mode.set(newMode);
    this.erroMensagem.set(null);
  }

  entrar(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.carregando.set(true);
    this.erroMensagem.set(null);

    const credenciais = this.loginForm.getRawValue();

    this.auth.login(credenciais).subscribe({
      next: () => {
        this.carregando.set(false);
        const destination = this.auth.temRole('Admin') ? '/admin' : '/camaras';
        this.router.navigate([destination]);
      },
      error: (err) => {
        this.carregando.set(false);
        const mensagem = err.error?.message || err.message;
        if (mensagem) {
          this.erroMensagem.set(mensagem);
        } else if (err.status === 401) {
          this.erroMensagem.set('Credenciais não autorizadas. Verifique o identificador e a senha.');
        } else {
          this.erroMensagem.set('Falha na validação de acesso. Tente novamente.');
        }
      }
    });
  }

  cadastrar(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const { nome, email, senha, confirmaSenha } = this.registerForm.getRawValue();

    if (senha !== confirmaSenha) {
      this.erroMensagem.set('As senhas digitadas não coincidem.');
      return;
    }

    this.carregando.set(true);
    this.erroMensagem.set(null);

    this.auth.registrar({ nome, email, senha }).subscribe({
      next: () => {
        this.carregando.set(false);
        const destination = this.auth.temRole('Admin') ? '/admin' : '/camaras';
        this.router.navigate([destination]);
      },
      error: (err) => {
        this.carregando.set(false);
        const mensagem = err.error?.message || err.message;
        if (mensagem) {
          this.erroMensagem.set(mensagem);
        } else {
          this.erroMensagem.set('Falha ao processar novo registro. Verifique os dados informados.');
        }
      }
    });
  }
}
