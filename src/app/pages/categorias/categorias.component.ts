import { Component, OnInit } from '@angular/core';
import { Categoria } from '../../core/interfaces/categoria.interface';
import { CategoriaService } from '../../core/services/categoria.service';
import {MatTableModule} from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from '../../shared/components/container/container.component';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    MatTableModule
  ],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent implements OnInit {
  
  categorias: Categoria[] = [];
  displayedColumns: string[] = ['descricao', 'ativo'];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit(): void {
    this.categoriaService.carregarCategorias().subscribe(categorias => {
      this.categorias = categorias;
    });
  }
}
