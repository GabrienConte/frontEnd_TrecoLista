import { Component, computed, input } from '@angular/core';
import { MatCardModule } from "@angular/material/card"
import { MatButtonModule } from "@angular/material/button"
import { MatIconModule } from '@angular/material/icon';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-card-product',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule],
  templateUrl: './card-product.component.html',
  styleUrl: './card-product.component.scss'
})
export class CardProductComponent {
  product = input.required<Product>();

  productTitle = computed(() => this.product().title)
}