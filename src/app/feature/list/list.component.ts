import { HttpClient } from '@angular/common/http';
import { Component, Input, inject } from '@angular/core';
import { ProductsService } from '../../shared/services/products.service';
import { Product } from '../../shared/interfaces/product.interface';
import { CardComponent } from './components/card/card.component';
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
    CardComponent, 
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
  @Input() variant: 'otherProdutos' | 'myProdutos' | 'allProdutos' = 'allProdutos'
  products: Product[] = [];

  productsService = inject(ProductsService);

  searchProducts(event: Event) {
    const input = event.target as HTMLInputElement;
    // Lógica para buscar produtos
  }

  scrollLeft() {
    const container = document.querySelector('.product-list');
    container?.scrollBy({ left: -200, behavior: 'smooth' });
  }

  scrollRight() {
    const container = document.querySelector('.product-list');
    container?.scrollBy({ left: 200, behavior: 'smooth' });
  }

  ngOnInit() {
    switch (this.variant) {
      case 'allProdutos':
        this.productsService.getAll().subscribe((products) => {
          this.products = products
        });
      break;
      case 'myProdutos':

      break;
      case 'otherProdutos':

      break;
    }
  }
}
