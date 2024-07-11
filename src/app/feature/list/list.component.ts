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
  @Input() variantLabel: 'Outros Produtos' | 'Meus Produtos' | 'Todos os Produtos' = 'Todos os Produtos';
  @Input() variantType: 'emLinha' | 'emGrade' = 'emLinha';
  produtos: ProdutoCard[] = [];
  @ViewChild('produtoLista') produtoLista!: ElementRef<HTMLDivElement>;

  constructor( private serviceProduto: ProdutoService){

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
    switch (this.variantList) {
      case 'allProdutos':
        this.serviceProduto.produtosNaoFavoritados$.subscribe(produtos => this.produtos = produtos);
      break;
      case 'myProdutos':
        this.serviceProduto.produtosFavoritados$.subscribe(produtos => this.produtos = produtos);
      break;
      case 'otherProdutos':
        this.serviceProduto.produtosNaoFavoritados$.subscribe(produtos => this.produtos = produtos);
      break;
    }
  }
}