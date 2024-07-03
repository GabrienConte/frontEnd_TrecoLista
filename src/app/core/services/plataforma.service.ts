import { Injectable } from '@angular/core';
import { Plataforma } from '../interfaces/plataforma.interface';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PlataformaService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  carregarPlataformas(): Observable<Plataforma[]> {
    return this.httpClient.get<Plataforma[]>(`${this.apiUrl}/plataforma`);
  }
}
