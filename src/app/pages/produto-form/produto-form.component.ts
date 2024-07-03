import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { ContainerComponent } from "../../shared/components/container/container.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

interface Food {
  value: string;
  viewValue: string;
}

@Component({
    selector: 'app-produto-form',
    standalone: true,
    templateUrl: './produto-form.component.html',
    styleUrl: './produto-form.component.scss',
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatButtonModule,
        MatSliderModule,
        MatCardModule,
        MatIconModule,
        ContainerComponent
    ]
})
export class ProdutoFormComponent implements OnInit{
  @Input() acaoForm : 'Criar' | 'Editar' = 'Criar';
  produtoForm!: FormGroup;
  plataformas = ['Plataforma 1', 'Plataforma 2', 'Plataforma 3'];
  categorias = ['Categoria 1', 'Categoria 2', 'Categoria 3'];
  imagemUrl: string | ArrayBuffer | null = null;
  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  constructor(
    private fb: FormBuilder, 
    private router: Router, 
    private location: Location) 
  { }

  ngOnInit(): void {
    this.produtoForm = this.fb.group({
      link: ['', Validators.required],
      plataforma: ['', Validators.required],
      categoria: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      prioridade: [0, [Validators.min(0), Validators.max(100)]],
      imagem: [null, Validators.required]
    });
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.produtoForm.patchValue({
        imagem: file
      });

      reader.onload = () => {
        this.imagemUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
      // Implementar a lógica de envio do formulário
    }
  }

  cancelar() {
    this.produtoForm.reset();
    this.location.back();
  }
}
