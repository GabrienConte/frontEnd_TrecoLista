import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProdutoCard } from '../interfaces/produto.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private apiUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient ) { }

  getProdutosFavortitados () : Observable<ProdutoCard[]> {
    return this.httpClient.get<ProdutoCard[]>(`${this.apiUrl}/produto/Favoritados`);
  }

  getProdutosNaoFavortitados () : Observable<ProdutoCard[]> {
    return this.httpClient.get<ProdutoCard[]>(`${this.apiUrl}/produto/NaoFavoritados`);
  }
}
