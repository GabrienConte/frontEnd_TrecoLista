import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

import { Favorito } from '../interfaces/favorito.interface';
import { ProdutoService } from './produto.service';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private apiUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient, private produtoService: ProdutoService ) { }

  favoritarProduto(favorito: Favorito) : Observable<Favorito> {
    return this.httpClient.post<Favorito>(`${this.apiUrl}/favorito/favoritar`, favorito)
      .pipe(
        tap(() => {
          this.produtoService.carregarProdutosNaoFavoritados();
          this.produtoService.carregarProdutosFavoritados();
        })
      );
  }

  desfavoritarProduto(favorito: Favorito) : Observable<Favorito> {
    return this.httpClient.delete<Favorito>(`${this.apiUrl}/favorito/desfavoritar`, {body: favorito})
      .pipe(
        tap(() => {
          this.produtoService.carregarProdutosNaoFavoritados();
          this.produtoService.carregarProdutosFavoritados();
        })
      );
  }
}
