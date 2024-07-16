import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { Categoria } from '../../core/interfaces/categoria.interface';
import { CategoriaService } from '../../core/services/categoria.service';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { ActionContainerComponent } from '../../shared/components/action-container/action-container.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIcon } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    MatTableModule,
    ActionContainerComponent,
    MatPaginatorModule,
    MatIcon
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements AfterViewInit  {
  
  categorias: Categoria[] = [];
  dataSource = new MatTableDataSource<Categoria>();
  displayedColumns: string[] = ['descricao', 'ativo', 'acoes'];
  router = inject(Router);

  constructor(private categoriaService: CategoriaService) { }

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.carregarCategorias();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  carregarCategorias(): void {
    this.categoriaService.carregarCategorias().subscribe({
      next: (categorias) => {
        this.dataSource.data = categorias;
      },
      error: (error) => {
        console.error('Erro ao carregar categorias', error);
      }
    });
  }

  editarCategoria(id: number) {
    this.router.navigate(['/categoria-form', id], { queryParams: { acaoForm: 'Editar'} });
  }

  aplicarFiltro(textoBusca: string): void {
    console.log('Filtrando por:', textoBusca);
    this.dataSource.filter = textoBusca.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
