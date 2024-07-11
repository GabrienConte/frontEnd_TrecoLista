import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Produto, ProdutoCard, ProdutoFavoritado, ProdutoScrap } from '../interfaces/produto.interfaces';
import { environment } from '../../../environments/environment';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  private produtosNaoFavoritadosSubject: BehaviorSubject<ProdutoCard[]> = new BehaviorSubject<ProdutoCard[]>([]);
  private produtosFavoritadosSubject: BehaviorSubject<ProdutoCard[]> = new BehaviorSubject<ProdutoCard[]>([]);

  private apiUrl: string = environment.apiUrl

  constructor(
    private httpClient: HttpClient,
    private fb: FormBuilder ) { 
    this.carregarProdutosNaoFavoritados();
    this.carregarProdutosFavoritados();
  }

  criaForm(){
    return this.fb.group({
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      plataforma: [null, Validators.required],
      categoria: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      prioridade: [0, [Validators.min(0), Validators.max(100)]],
      imagemPath: [''],
      isAvisado: [false]
    });
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

  carregarProduto (id: string): Observable<Produto> {
    return this.httpClient.get<Produto>(`${this.apiUrl}/produto/${id}`)
  }

  carregarProdutoFavoritado (id: string): Observable<ProdutoFavoritado> {
    return this.httpClient.get<ProdutoFavoritado>(`${this.apiUrl}/produto/${id}/favoritado`)
  }

  carregarProdutoDetalheScrap(link: string): Observable<ProdutoScrap> {
    return this.httpClient.post<ProdutoScrap>(`${this.apiUrl}/produto/produtoScrap`, { link } );
  }

  criarProduto(formData: FormData): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/produto`, formData);
  }
}
