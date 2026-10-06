import { HttpInterceptorFn, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';
import { API_URL } from '../api.config';
import { LoginRequest, RegisterRequest } from './auth.models';

const STORAGE_USERS_KEY = 'tetrachroma_mock_users';

// Claims compatíveis com APIs ASP.NET / Identity
const CLAIM_ROLE_LONG = 'http://schemas.microsoft.com/ws/2008/06/identity/claims/role';
const CLAIM_NAME_LONG = 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name';

interface MockUser {
  id?: number;
  nome: string;
  email: string;
  senha: string;
  role: string;
  cargo?: string;
}

// Usuários iniciais padrão sincronizados com public/data/users.json
const USUARIOS_PADRAO: MockUser[] = [
  {
    id: 1,
    nome: 'Dr. Victor Voss',
    email: 'supervisor@tetrachroma.org',
    senha: '123456',
    role: 'Admin',
    cargo: 'Supervisor Geral dos Setores de Confinamento'
  },
  {
    id: 2,
    nome: 'Operador Marcus',
    email: 'operador@tetrachroma.org',
    senha: '123456',
    role: 'Operador',
    cargo: 'Técnico de Monitoramento da Horologia'
  },
  {
    id: 3,
    nome: 'Iniciada Lyra',
    email: 'iniciado@ordem.org',
    senha: '123456',
    role: 'Operador',
    cargo: 'Analista de Sinais e Criptografia ARG'
  }
];

function obterUsuarios(): MockUser[] {
  if (typeof window !== 'undefined' && window.localStorage) {
    const salvo = localStorage.getItem(STORAGE_USERS_KEY);
    if (salvo) {
      try {
        const parsed = JSON.parse(salvo);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      } catch {
        // ignora erro de parse
      }
    }
    // Inicializa com a base padrão do JSON
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(USUARIOS_PADRAO));
  }
  return [...USUARIOS_PADRAO];
}

function salvarUsuario(usuario: MockUser): void {
  const lista = obterUsuarios();
  lista.push(usuario);
  if (typeof window !== 'undefined' && window.localStorage) {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(lista));
  }
}

function gerarJwt(nome: string, role: string, email: string): string {
  const exp = Math.floor(Date.now() / 1000) + 7200; // 2 horas de expiração
  const header = { alg: 'HS256', typ: 'JWT' };
  const payload = {
    unique_name: nome,
    name: nome,
    email: email,
    role: [role],
    [CLAIM_ROLE_LONG]: role,
    [CLAIM_NAME_LONG]: nome,
    exp: exp
  };

  const toBase64Url = (obj: object) =>
    btoa(unescape(encodeURIComponent(JSON.stringify(obj))))
      .replace(/=/g, '')
      .replace(/\+/g, '-')
      .replace(/\//g, '_');

  const encodedHeader = toBase64Url(header);
  const encodedPayload = toBase64Url(payload);
  const signature = 'TETRACHROMA_MOCK_SIGNATURE';

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

export const mockBackendInterceptor: HttpInterceptorFn = (req, next) => {
  const urlLogin = `${API_URL}/auth/login`;
  const urlRegister = `${API_URL}/auth/register`;

  // 1. Simulação da rota de Login
  if (req.method === 'POST' && req.url === urlLogin) {
    const body = req.body as LoginRequest;
    const usuarios = obterUsuarios();

    const usuario = usuarios.find(
      u => u.email.toLowerCase() === (body.email || '').trim().toLowerCase()
    );

    // Valida credenciais
    if (!usuario || (usuario.senha !== body.senha && body.senha !== '123456')) {
      return throwError(() =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          url: req.url,
          error: { message: 'Identificador ou chave de acesso inválida.' }
        })
      ).pipe(delay(400));
    }

    // Emite token JWT oficial compatível com jwt-decode
    const token = gerarJwt(usuario.nome, usuario.role, usuario.email);

    return of(
      new HttpResponse({
        status: 200,
        statusText: 'OK',
        url: req.url,
        body: { token }
      })
    ).pipe(delay(400));
  }

  // 2. Simulação da rota de Cadastro/Registro
  if (req.method === 'POST' && req.url === urlRegister) {
    const body = req.body as RegisterRequest;
    const usuarios = obterUsuarios();

    const emailExiste = usuarios.some(
      u => u.email.toLowerCase() === (body.email || '').trim().toLowerCase()
    );

    if (emailExiste) {
      return throwError(() =>
        new HttpErrorResponse({
          status: 400,
          statusText: 'Bad Request',
          url: req.url,
          error: { message: 'Este endereço de e-mail já está registrado na ordem.' }
        })
      ).pipe(delay(400));
    }

    const role = (body.email || '').toLowerCase().includes('admin') ||
                 (body.email || '').toLowerCase().includes('supervisor')
      ? 'Admin'
      : 'Operador';

    const novoUsuario: MockUser = {
      id: Date.now(),
      nome: body.nome,
      email: body.email,
      senha: body.senha,
      role,
      cargo: 'Operador de Campo'
    };

    salvarUsuario(novoUsuario);

    const token = gerarJwt(novoUsuario.nome, novoUsuario.role, novoUsuario.email);

    return of(
      new HttpResponse({
        status: 200,
        statusText: 'OK',
        url: req.url,
        body: { token }
      })
    ).pipe(delay(400));
  }

  // Caso seja qualquer outra requisição, segue o fluxo normal
  return next(req);
};
