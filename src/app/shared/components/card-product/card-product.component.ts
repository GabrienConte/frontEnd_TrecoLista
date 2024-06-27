import { Component, computed, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../../core/interfaces/product.interface';
import { ProdutoCard } from '../../../core/interfaces/produto.interfaces';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  produto = input.required<ProdutoCard>();

  produtoId = computed(() => this.produto().produtoId)
  produtoDescricao = computed(() => this.produto().descricao)
  produtoValor = computed(() => this.produto().valor)
  produtoImagemPath = computed(() => this.produto().imagemPath)
  produtoIsFavoritado = computed(() => this.produto().isFavoritado)

  toggleFavorite() {
    this.produtoIsFavoritado = computed(() => !this.produtoIsFavoritado);
  }
}