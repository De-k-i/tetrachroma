import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { AuthService } from './auth.service';

describe('AuthService with jwt-decode', () => {
  let service: AuthService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([])
      ]
    });
    service = TestBed.inject(AuthService);
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('deve inicializar deslogado quando não há token', () => {
    expect(service.logado()).toBeFalse();
    expect(service.usuario()).toBeNull();
    expect(service.getToken()).toBeNull();
  });

  it('deve decodificar token JWT e extrair dados usando a biblioteca jwt-decode', () => {
    service.simularLoginDemo('Dr. Voss', 'Admin');

    expect(service.logado()).toBeTrue();
    const usuario = service.usuario();
    expect(usuario).not.toBeNull();
    expect(usuario?.nome).toBe('Dr. Voss');
    expect(usuario?.roles).toContain('Admin');
    expect(service.temRole('Admin')).toBeTrue();
    expect(service.temRole('Visitante')).toBeFalse();
  });

  it('deve limpar token e deslogar ao chamar logout()', () => {
    service.simularLoginDemo('Agente 42', 'Operador');
    expect(service.logado()).toBeTrue();

    service.logout();
    expect(service.logado()).toBeFalse();
    expect(service.usuario()).toBeNull();
    expect(service.getToken()).toBeNull();
  });
});
