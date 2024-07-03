import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProdutoCard, ProdutoScrap } from '../interfaces/produto.interfaces';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosNaoFavoritadosSubject: BehaviorSubject<ProdutoCard[]> = new BehaviorSubject<ProdutoCard[]>([]);
  private produtosFavoritadosSubject: BehaviorSubject<ProdutoCard[]> = new BehaviorSubject<ProdutoCard[]>([]);

  private apiUrl: string = environment.apiUrl

  constructor(private httpClient: HttpClient ) { 
    this.carregarProdutosNaoFavoritados();
    this.carregarProdutosFavoritados();
  }

  get produtosNaoFavoritados$(): Observable<ProdutoCard[]> {
    return this.produtosNaoFavoritadosSubject.asObservable()
    
  }

  get produtosFavoritados$(): Observable<ProdutoCard[]> {
    return this.produtosFavoritadosSubject.asObservable();
  }

  carregarProdutosFavoritados () {
    this.httpClient.get<ProdutoCard[]>(`${this.apiUrl}/produto/Favoritados`)
      .subscribe(produtos => this.produtosFavoritadosSubject.next(produtos));
  }

  carregarProdutosNaoFavoritados () {
    return this.httpClient.get<ProdutoCard[]>(`${this.apiUrl}/produto/NaoFavoritados`)
      .subscribe(produtos => this.produtosNaoFavoritadosSubject.next(produtos));;
  }

  carregarProdutoDetalheScrap(link: string): Observable<ProdutoScrap> {
    return this.httpClient.post<ProdutoScrap>(`${this.apiUrl}/produto/produtoScrap`, { link } );
  }
}
