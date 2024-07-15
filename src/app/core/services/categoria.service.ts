import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Categoria, CategoriaSalvar } from '../interfaces/categoria.interface';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  carregarCategoriasAtivas(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/categoria/ativas`);
  }

  carregarCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(`${this.apiUrl}/categoria`);
  }

  getCategoriaById(id: number): Observable<Categoria> {
    return this.httpClient.get<Categoria>(`${this.apiUrl}/categoria/${id}`);
  }

  criarCategoria(categoriaSalvar: CategoriaSalvar): Observable<Categoria> {
    return this.httpClient.post<Categoria>(`${this.apiUrl}/categoria`, categoriaSalvar);
  }

  atualizarCategoria(id: number, categoriaSalvar: CategoriaSalvar): Observable<CategoriaSalvar> {
    return this.httpClient.put<CategoriaSalvar>(`${this.apiUrl}/categoria/${id}`, categoriaSalvar);
  }
}
