import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient, httpResource } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { Chamber } from '../models/chamber.model';

@Injectable({
  providedIn: 'root'
})
export class ChamberService {
  private readonly http = inject(HttpClient);
  private readonly dataUrl = '/data/chambers.json';

  // Recurso Reativo Nativo do Angular (httpResource Signal API)
  private readonly chambersResource = httpResource<Chamber[]>(() => this.dataUrl);

  // Lista de códigos ARG decodificados pelo usuário nesta sessão (Signals)
  readonly unlockedSecrets = signal<string[]>([]);
  readonly bookmarkedChamberIds = signal<number[]>([]);

  // Computed Signals derivados diretamente do httpResource
  readonly chambers = computed<Chamber[]>(() => {
    const rawChambers = this.chambersResource.value() ?? [];
    return rawChambers.map(c => ({
      ...c,
      isUnlocked: this.unlockedSecrets().includes(c.argSecretCode)
    }));
  });

  // Câmaras em rotação ativa no ciclo presencial (2 salas)
  readonly activeChambers = computed<Chamber[]>(() => {
    return this.chambers().filter(c => c.status === 'ACTIVE');
  });

  // Câmaras da próxima temporada / em preparação (2 salas)
  readonly upcomingChambers = computed<Chamber[]>(() => {
    return this.chambers().filter(c => c.status === 'UPCOMING');
  });

  readonly loading = computed<boolean>(() => this.chambersResource.isLoading());

  readonly error = computed<string | null>(() => {
    const err = this.chambersResource.error();
    return err ? 'Falha ao sincronizar arquivos de confinamento com a rede central teocrática.' : null;
  });

  loadChambers(): void {
    this.chambersResource.reload();
  }

  getChamberById(id: number): Observable<Chamber> {
    const cached = this.chambers().find(c => c.id === id);
    if (cached) {
      return of(cached);
    }

    return this.http.get<Chamber[]>(this.dataUrl).pipe(
      map(list => {
        const found = list.find(c => c.id === id);
        if (!found) {
          throw new Error(`Dossiê #${id} corrompido ou inexistente nos arquivos imperiais.`);
        }
        return {
          ...found,
          isUnlocked: this.unlockedSecrets().includes(found.argSecretCode)
        };
      }),
      catchError(err => {
        const errorMsg = `Dossiê #${id} corrompido ou inexistente nos arquivos imperiais.`;
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  unlockSecret(secretCode: string): boolean {
    let code = secretCode.trim().toUpperCase();
    if (code === '026' || code === '26') {
      code = 'CUBE26';
    }
    const validChamber = this.chambers().find(c => c.argSecretCode.toUpperCase() === code);
    
    if (validChamber || code === 'TETRA-V4' || code === 'CUBE26' || code === 'LOYAL7' || code === 'TIC-TAC-12') {
      const canonical = validChamber?.argSecretCode ?? code;
      if (!this.unlockedSecrets().includes(canonical)) {
        this.unlockedSecrets.update(prev => [...prev, canonical]);
      }
      return true;
    }
    return false;
  }

  toggleBookmark(chamberId: number): void {
    this.bookmarkedChamberIds.update(current => {
      if (current.includes(chamberId)) {
        return current.filter(id => id !== chamberId);
      } else {
        return [...current, chamberId];
      }
    });
  }
}
