import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { ListComponent } from '../../feature/list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent, 
    ListComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, 
    MatDividerModule,
    MatIconModule, 
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  searchProducts(event: Event) {
    const input = event.target as HTMLInputElement;
    // Lógica para buscar produtos
  }
}
