import { Component, OnInit } from '@angular/core';
import { ContainerComponent } from '../../shared/components/container/container.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriaService } from '../../core/services/categoria.service';
import { Categoria } from '../../core/interfaces/categoria.interface';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  imports: [
    ContainerComponent,
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule
  ],
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss'
})
export class CategoriaFormComponent implements OnInit {
  categoriaForm!: FormGroup;
  acaoForm: 'Criar' | 'Editar' = 'Criar';
  categoriaId?: number;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private categoriaService: CategoriaService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.categoriaForm = this.fb.group({
      descricao: ['', Validators.required],
      ativo: [false, Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.acaoForm = params['acaoForm'] || 'Criar';
      if (params['id']) {
        this.categoriaId = +params['id'];
        this.acaoForm = 'Editar';
        this.categoriaService.getCategoriaById(this.categoriaId).subscribe((categoria: Categoria) => {
          this.categoriaForm.patchValue(categoria);
        });
      }
    });
  }

  onSubmit() {
    if (this.categoriaForm.valid) {
      const categoria = this.categoriaForm.value;
      if (this.acaoForm === 'Criar') {
        this.categoriaService.criarCategoria(categoria).subscribe(() => {
          this.snackBar.open('Categoria criada com sucesso', 'OK');
          this.router.navigate(['/categoria']);
        });
      } else if (this.acaoForm === 'Editar' && this.categoriaId != null) {
        this.categoriaService.atualizarCategoria(this.categoriaId, categoria).subscribe(() => {
          this.snackBar.open('Categoria atualizada com sucesso', 'OK');
          this.router.navigate(['/categoria']);
        });
      }
    }
  }

  cancelar() {
    this.categoriaForm.reset();
    this.router.navigate(['/categoria']);
  }
}
