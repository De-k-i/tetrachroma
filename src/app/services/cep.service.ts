import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of, throwError } from 'rxjs';
import { ViaCepResponse } from '../models/cep.model';

@Injectable({
  providedIn: 'root'
})
export class CepService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'https://viacep.com.br/ws';

  buscarCep(cep: string): Observable<ViaCepResponse> {
    const cleanCep = cep.replace(/\D/g, '');
    
    if (cleanCep.length !== 8) {
      return throwError(() => new Error('CEP deve conter exatamente 8 dígitos numéricos.'));
    }

    return this.http.get<ViaCepResponse>(`${this.baseUrl}/${cleanCep}/json/`).pipe(
      map(response => {
        if (response.erro) {
          throw new Error('Santuário não localizado para o CEP informado.');
        }
        return response;
      }),
      catchError(err => {
        return throwError(() => new Error(err.message || 'Falha ao consultar CEP no oráculo ViaCEP.'));
      })
    );
  }
}
