import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ProdutoService } from '../../core/services/produto.service';
import { ProdutoCard } from '../../core/interfaces/produto.interfaces';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, 
    MatButtonModule, 
    MatDividerModule,
    MatIconModule, 
    CardProductComponent,
    MatFormFieldModule,
    MatInputModule
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss',
})
export class ListComponent implements OnInit {
  @Input() variantList: 'otherProdutos' | 'myProdutos' | 'allProdutos' = 'allProdutos';
  @Input() variantLabel: 'Outros Produtos' | 'Meus Trecos' | 'Todos os Trecos' = 'Todos os Trecos';
  @Input() variantType: 'emLinha' | 'emGrade' = 'emLinha';
  produtos: ProdutoCard[] = [];
  produtosFiltrados: ProdutoCard[] = [];
  @ViewChild('produtoLista') produtoLista!: ElementRef<HTMLDivElement>;

  constructor( private serviceProduto: ProdutoService){

  }

  aplicarFiltro(termo: string): void {
    console.log(termo);
    termo = termo.trim().toLowerCase();
    this.produtosFiltrados = this.produtos.filter(produto =>
      produto.descricao.toLowerCase().includes(termo)
    );
  }

  scrollLeft() {
    if (this.produtoLista) {
      this.produtoLista.nativeElement.scrollBy({ left: -200, behavior: 'smooth' });
    }
  }

  scrollRight() {
    if (this.produtoLista) {
      this.produtoLista.nativeElement.scrollBy({ left: 200, behavior: 'smooth' });
    }
  }

  ngOnInit() {
    this.serviceProduto.carregarProdutosNaoFavoritados();
    this.serviceProduto.carregarProdutosFavoritados();
    switch (this.variantList) {
      case 'allProdutos':
        this.serviceProduto.produtosNaoFavoritados$.subscribe(produtos => {
          this.produtos = produtos;
          this.produtosFiltrados = produtos; // Inicialmente, produtos filtrados são os não favoritados
        });
      break;
      case 'myProdutos':
        this.serviceProduto.produtosFavoritados$.subscribe(produtos => {
          this.produtos = produtos;
          this.produtosFiltrados = produtos; // Inicialmente, produtos filtrados são os favoritados
        });
      break;
      case 'otherProdutos':
        this.serviceProduto.produtosNaoFavoritados$.subscribe(produtos => {
          this.produtos = produtos;
          this.produtosFiltrados = produtos; // Inicialmente, produtos filtrados são os não favoritados
        });
      break;
    }
  }

  trackByProdutoId(index: number, produto: ProdutoCard): number {
    return produto.produtoId; // Retorna o ID único do produto como identificador de rastreamento
  }
}