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
import { Plataforma } from '../../core/interfaces/plataforma.interface';
import { Categoria } from '../../core/interfaces/categoria.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../core/services/produto.service';
import { PlataformaService } from '../../core/services/plataforma.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { ImagemService } from '../../core/services/imagem.service';

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
  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];
  
  imagemUrl: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder, 
    private router: Router,
    private snackBar: MatSnackBar, 
    private produtoService: ProdutoService,
    private plataformaService: PlataformaService,
    private categoriaService: CategoriaService,
    private imagemService: ImagemService,
    private location: Location) 
  { 
    this.produtoForm = this.fb.group({
      link: ['', Validators.required],
      descricao: ['', Validators.required],
      plataforma: [null, Validators.required],
      categoria: ['', Validators.required],
      valor: ['', [Validators.required, Validators.min(0)]],
      prioridade: [0, [Validators.min(0), Validators.max(100)]],
      imagem: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.carregaCategorias();
    this.carregarPlataformas();
  }

  carregaCategorias() {
    this.categoriaService.carregarCategorias().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  carregarPlataformas() {
    this.plataformaService.carregarPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
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

  onLinkBlur() {
    const link = this.produtoForm.get('link')?.value;
    if (link) {
      this.produtoService.carregarProdutoDetalheScrap(link).subscribe((data) => {
        this.produtoForm.patchValue({
          descricao: data.descricao,
          plataforma: this.plataformas.find(plataforma => plataforma.descricao == data.plataforma) || null,
          valor: data.valorConvertido,
        });
        if (data.imagemPath) {
          this.imagemUrl = this.imagemService.getImagemUrl(data.imagemPath);
        }
      });
    }
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      console.log(this.produtoForm.value);
      // Implementar a lógica de envio do formulário
      this.snackBar.open("Sucesso ao criar o novo produto", "OK");
    }
  }

  cancelar() {
    this.produtoForm.reset();
    this.location.back();
  }
}
