import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { tap } from 'rxjs';
import { API_URL } from '../api.config';
import { LoginRequest, LoginResponse, RegisterRequest, UsuarioToken } from './auth.models';

const CHAVE_TOKEN = 'auth_token';

// Claims compatíveis com ASP.NET Core Identity
const CLAIM_ROLE_LONG = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const CLAIM_NAME_LONG = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';
const CLAIM_ROLE_LONG_ALT = 'https://shcemas.microsoft/.../claims/role';
const CLAIM_NAME_LONG_ALT = 'https://shcemas.microsoft/.../claims/name';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private token = signal<string | null>(this.obterTokenArmazenado());

  readonly usuario = computed(() => this.decodificar(this.token()));

  readonly logado = computed(() => {
    const u = this.usuario();
    return u !== null && u.expiraEM.getTime() > Date.now();
  });

  private obterTokenArmazenado(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem(CHAVE_TOKEN);
    }
    return null;
  }

  /**
   * Realiza a autenticação consumindo a API.
   * O mockBackendInterceptor intercepta a chamada e valida contra a base public/data/users.json
   */
  login(dados: LoginRequest) {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/login`, dados)
      .pipe(tap(resposta => this.salvarToken(resposta.token)));
  }

  /**
   * Realiza o registro de um novo usuário na API.
   * O mockBackendInterceptor adiciona o usuário e retorna o token JWT de sessão.
   */
  registrar(dados: RegisterRequest) {
    return this.http
      .post<LoginResponse>(`${API_URL}/auth/register`, dados)
      .pipe(tap(resposta => this.salvarToken(resposta.token)));
  }

  salvarToken(token: string): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem(CHAVE_TOKEN, token);
    }
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token();
  }

  logout(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem(CHAVE_TOKEN);
    }
    this.token.set(null);
    this.router.navigate(['/login']);
  }

  temRole(role: string): boolean {
    const u = this.usuario();
    return u?.roles.includes(role) ?? false;
  }

  /**
   * Decodificador de JWT utilizando a biblioteca externa `jwt-decode`
   * em conformidade com a recomendação pedagógica de boas práticas.
   */
  private decodificar(token: string | null): UsuarioToken | null {
    if (!token) {
      return null;
    }

    try {
      const payload = jwtDecode<Record<string, unknown>>(token);

      const rolesBrutas =
        payload['role'] ??
        payload['roles'] ??
        payload[CLAIM_ROLE_LONG] ??
        payload[CLAIM_ROLE_LONG_ALT] ??
        [];

      const rolesArray = Array.isArray(rolesBrutas)
        ? (rolesBrutas as string[])
        : typeof rolesBrutas === 'string'
          ? [rolesBrutas]
          : [];

      const nomeBruto =
        payload['unique_name'] ??
        payload['name'] ??
        payload[CLAIM_NAME_LONG] ??
        payload[CLAIM_NAME_LONG_ALT] ??
        payload['email'] ??
        payload['sub'] ??
        'Operador';

      const expEpoch = typeof payload['exp'] === 'number' ? payload['exp'] : 0;
      const expiraEM = expEpoch > 0 ? new Date(expEpoch * 1000) : new Date(Date.now() + 86400000);

      return {
        nome: String(nomeBruto),
        roles: rolesArray,
        expiraEM
      };
    } catch {
      return null;
    }
  }

  simularLoginDemo(nome: string, role: string = 'Admin'): void {
    // Método auxiliar mantido para testes de unidade
    const exp = Math.floor(Date.now() / 1000) + 7200;
    const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' })).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    const payload = btoa(unescape(encodeURIComponent(JSON.stringify({
      unique_name: nome,
      name: nome,
      role: [role],
      exp
    })))).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_');
    this.salvarToken(`${header}.${payload}.DEMO_SIGNATURE`);
  }
}
