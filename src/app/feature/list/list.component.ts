import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { Product } from '../../core/interfaces/product.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { CardProductComponent } from '../../shared/components/card-product/card-product.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';


@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    RouterLink, 
    MatButtonModule, 
    MatDividerModule,
    MatIconModule, 
    CardProductComponent,
    MatFormFieldModule,
    MatInputModule
    ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() variantList: 'otherProdutos' | 'myProdutos' | 'allProdutos' = 'allProdutos'
  @Input() variantLabel: 'Outros Produtos' | 'Meus Produtos' | 'Todos os Produtos' = 'Todos os Produtos'
  products: Product[] = [];

  productsService = inject(ProductsService);

  scrollLeft() {
    const container = document.querySelector('.product-list');
    container?.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.product-list');
    container?.scrollBy({ left: 200, behavior: 'smooth' });
  }

  ngOnInit() {
    switch (this.variantList) {
      case 'allProdutos':
        this.productsService.getAll().subscribe((products) => {
          this.products = products
        });
      break;
      case 'myProdutos':
        this.productsService.getAll().subscribe((products) => {
          this.products = products
        });
      break;
      case 'otherProdutos':

      break;
    }
  }
}
