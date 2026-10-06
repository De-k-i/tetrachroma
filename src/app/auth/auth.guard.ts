import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.logado()) {
    return true;
  }
  return router.createUrlTree(['/login']);
};

export const visitanteGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (!auth.logado()) {
    return true;
  }
  return router.createUrlTree(['/camaras']);
};

export const adminGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.logado() && auth.temRole('Admin')) {
    return true;
  }
  return router.createUrlTree(['/camaras']);
};
