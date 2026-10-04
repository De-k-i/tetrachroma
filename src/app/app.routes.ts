import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'camaras',
    pathMatch: 'full'
  },
  {
    path: 'camaras',
    loadComponent: () => import('./pages/chamber-list/chamber-list.component').then(m => m.ChamberListComponent),
    title: 'TETRACHROMA | Câmaras de Confinamento'
  },
  {
    path: 'camaras/:id',
    loadComponent: () => import('./pages/chamber-detail/chamber-detail.component').then(m => m.ChamberDetailComponent),
    title: 'TETRACHROMA | Dossiê de Câmara'
  },
  {
    path: 'iniciar',
    loadComponent: () => import('./pages/booking/booking.component').then(m => m.BookingComponent),
    title: 'TETRACHROMA | Iniciação & Reserva'
  },
  {
    path: 'codex',
    loadComponent: () => import('./pages/codex/codex.component').then(m => m.CodexComponent),
    title: 'TETRACHROMA | Codex & Terminal ARG'
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(m => m.NotFoundComponent),
    title: 'TETRACHROMA | Setor Não Encontrado (404)'
  }
];
