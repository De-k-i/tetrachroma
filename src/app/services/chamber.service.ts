import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { Chamber, ChamberDifficulty, ChamberSector } from '../models/chamber.model';

interface JsonPlaceholderPost {
  userId: number;
  id: number;
  title: string;
  body: string;
}

@Injectable({
  providedIn: 'root'
})
export class ChamberService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/posts';

  // Signals para gerenciamento de estado
  readonly chambers = signal<Chamber[]>([]);
  readonly loading = signal<boolean>(false);
  readonly error = signal<string | null>(null);

  // Lista de códigos ARG decodificados pelo usuário nesta sessão
  readonly unlockedSecrets = signal<string[]>([]);
  readonly bookmarkedChamberIds = signal<number[]>([]);

  // Dados temáticos complementares baseados na hierarquia de confinamento
  private readonly thematicLores = [
    {
      sector: 'INNER_CELL' as ChamberSector,
      sectorLabel: 'Câmara Interna (Subterrâneo)',
      difficulty: 'INICIANTE' as ChamberDifficulty,
      difficultyLevel: 2,
      timeLimitMinutes: 60,
      price: 89.0,
      secretCode: 'CELL44',
      clue: 'A soma das arestas do cubo de confinamento revelará a primeira chave.',
      discount: 10
    },
    {
      sector: 'LOYALTY' as ChamberSector,
      sectorLabel: 'Provação de Lealdade',
      difficulty: 'PROVAÇÃO' as ChamberDifficulty,
      difficultyLevel: 3,
      timeLimitMinutes: 75,
      price: 110.0,
      secretCode: 'LOYAL7',
      clue: 'Aquele que confia cegamente no companheiro de cela encontra a fresta dourada.',
      discount: 15
    },
    {
      sector: 'HOROLOGY' as ChamberSector,
      sectorLabel: 'Engrenagens da Horologia',
      difficulty: 'LETAL' as ChamberDifficulty,
      difficultyLevel: 4,
      timeLimitMinutes: 60,
      price: 135.0,
      secretCode: 'TIC-TAC-12',
      clue: 'O pêndulo não perdoa o atraso; cada minuto perdido consome a luz do santuário.',
      discount: 20
    },
    {
      sector: 'CRUMBLING_CASTLE' as ChamberSector,
      sectorLabel: 'Castelo em Colapso',
      difficulty: 'TETRACROMÁTICA' as ChamberDifficulty,
      difficultyLevel: 5,
      timeLimitMinutes: 90,
      price: 160.0,
      secretCode: 'TETRA-V4',
      clue: 'Olhe para onde o amarelo solar e o azul cerúleo convergem no zênite.',
      discount: 25
    }
  ];

  loadChambers(): void {
    this.loading.set(true);
    this.error.set(null);

    this.http.get<JsonPlaceholderPost[]>(`${this.apiUrl}?_limit=12`).pipe(
      map(posts => this.mapPostsToChambers(posts)),
      tap(chambers => {
        this.chambers.set(chambers);
        this.loading.set(false);
      }),
      catchError(err => {
        const errorMsg = 'Falha ao sincronizar arquivos de confinamento com a rede central teocrática.';
        this.error.set(errorMsg);
        this.loading.set(false);
        return throwError(() => new Error(errorMsg));
      })
    ).subscribe();
  }

  getChamberById(id: number): Observable<Chamber> {
    // Se já estiver em cache nos signals
    const cached = this.chambers().find(c => c.id === id);
    if (cached) {
      return of(cached);
    }

    // Caso o usuário acesse a rota direta /camaras/:id
    this.loading.set(true);
    return this.http.get<JsonPlaceholderPost>(`${this.apiUrl}/${id}`).pipe(
      map(post => this.mapSinglePostToChamber(post)),
      tap(chamber => {
        this.loading.set(false);
      }),
      catchError(err => {
        this.loading.set(false);
        const errorMsg = `Dossiê #${id} corrompido ou inexistente nos arquivos imperiais.`;
        this.error.set(errorMsg);
        return throwError(() => new Error(errorMsg));
      })
    );
  }

  unlockSecret(secretCode: string): boolean {
    const code = secretCode.trim().toUpperCase();
    const validChamber = this.chambers().find(c => c.argSecretCode.toUpperCase() === code);
    
    if (validChamber || code === 'TETRA-V4' || code === 'CELL44' || code === 'LOYAL7' || code === 'TIC-TAC-12') {
      if (!this.unlockedSecrets().includes(code)) {
        this.unlockedSecrets.update(prev => [...prev, code]);
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

  private mapPostsToChambers(posts: JsonPlaceholderPost[]): Chamber[] {
    return posts.map(post => this.mapSinglePostToChamber(post));
  }

  private mapSinglePostToChamber(post: JsonPlaceholderPost): Chamber {
    const themeIdx = (post.id - 1) % this.thematicLores.length;
    const theme = this.thematicLores[themeIdx];

    // Formatando nome elegante e brutalista baseado no título do post
    const cleanTitle = post.title.split(' ').slice(0, 3).join(' ').toUpperCase();
    const formattedName = `CÂMARA ${post.id}: ${cleanTitle}`;

    return {
      id: post.id,
      apiOriginalId: post.id,
      code: `SEC-${String(post.id).padStart(3, '0')}`,
      name: formattedName,
      sector: theme.sector,
      sectorLabel: theme.sectorLabel,
      difficulty: theme.difficulty,
      difficultyLevel: theme.difficultyLevel,
      description: `[TRANSMISSÃO #${post.id}] ${post.body.slice(0, 160)}...`,
      ritualLore: `${post.body}. Sob a vigilância do hierofante, os súditos são testados contra o esgotamento dos sentidos e a distorção do tempo cronometrado.`,
      timeLimitMinutes: theme.timeLimitMinutes,
      minInitiates: 2,
      maxInitiates: 6,
      escapeSuccessRate: Math.max(12, Math.min(88, 100 - (post.id * 7) % 85)),
      pricePerInitiate: theme.price,
      argSecretCode: theme.secretCode,
      argClue: theme.clue,
      argDiscountPercent: theme.discount,
      isUnlocked: this.unlockedSecrets().includes(theme.secretCode)
    };
  }
}
