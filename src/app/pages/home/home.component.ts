import { Component, OnInit, ViewChild } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { ListComponent } from '../../feature/list/list.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { ActionContainerComponent } from '../../shared/components/action-container/action-container.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ContainerComponent, 
    ListComponent,
    ActionContainerComponent,
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

  @ViewChild('allProdutosComponent') allProdutosComponent!: ListComponent;
  @ViewChild('myProdutosComponent') myProdutosComponent!: ListComponent;

  aplicarFiltro(textoBusca: string): void {
    this.allProdutosComponent.aplicarFiltro(textoBusca);
    this.myProdutosComponent.aplicarFiltro(textoBusca);
  }
}
