import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from '@angular/material/icon';
import {MatSnackBar} from '@angular/material/snack-bar';
import { ProdutoCard } from '../../../core/interfaces/produto.interfaces';
import { FavoritoService } from '../../../core/services/favorito.service';
import { Favorito } from '../../../core/interfaces/favorito.interface';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  @Input() produto: ProdutoCard;

  matSnackBar = inject(MatSnackBar);

  constructor(private favoritoService: FavoritoService) {
    this.produto = {} as ProdutoCard; // Inicializa produto como um objeto vazio
  }

  toggleFavorite() {
    if (this.produto.isFavoritado) {
      // Desfavoritar o produto
      const favorito: Favorito = {
        produtoId: this.produto.produtoId,
        // Outros campos necessários para identificar o produto
      };

      this.favoritoService.desfavoritarProduto(favorito).subscribe(() => {
        this.matSnackBar.open('Produto desfavoritado!', "Ok");
      });
    } else {
      // Favoritar o produto
      const favorito: Favorito = {
        produtoId: this.produto.produtoId,
        // Outros campos necessários para identificar o produto
      };

      this.favoritoService.favoritarProduto(favorito).subscribe(() => {
        this.matSnackBar.open('Produto favoritado!', "Ok");
      });
    }  
  }
}