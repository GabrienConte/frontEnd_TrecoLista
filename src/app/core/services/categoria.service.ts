import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  carregarCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/categoria`);
  }
}
