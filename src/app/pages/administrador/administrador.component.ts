import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../core/services/produto.service';

@Component({
  selector: 'app-administrador',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    MatButtonModule
  ],
  templateUrl: './administrador.component.html',
  styleUrl: './administrador.component.scss'
})
export class AdministradorComponent {
  constructor(private produtoService: ProdutoService, private snackBar: MatSnackBar) { }

  atualizarPrecos() {
    this.produtoService.atualizaPrecoProdutosScrap().subscribe({
      next: (response) => {
        console.log('Success Response:', response);
        this.snackBar.open('Preços atualizados com sucesso!', 'OK');
      },
      error: (error) => {
        console.log('Error Response:', error);
        this.snackBar.open('Erro ao atualizar preços.', 'OK');
      }
    });
  }
}
