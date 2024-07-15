import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatSliderModule } from '@angular/material/slider';
import { CommonModule, Location } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ContainerComponent } from "../../shared/components/container/container.component";
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { Plataforma } from '../../core/interfaces/plataforma.interface';
import { Categoria } from '../../core/interfaces/categoria.interface';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProdutoService } from '../../core/services/produto.service';
import { PlataformaService } from '../../core/services/plataforma.service';
import { CategoriaService } from '../../core/services/categoria.service';
import { ActivatedRoute } from '@angular/router';
import { Produto, ProdutoFavoritado, ProdutoUpdate } from '../../core/interfaces/produto.interfaces';
import { FavoritoService } from '../../core/services/favorito.service';
import { Favorito } from '../../core/interfaces/favorito.interface';

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
        MatCheckboxModule,
        ContainerComponent
    ]
})
export class ProdutoFormComponent implements OnInit{
  @Input() acaoForm : 'Criar' | 'Editar' | 'Detalhes' = 'Criar';
  
  produtoForm!: FormGroup;
  categorias: Categoria[] = [];
  plataformas: Plataforma[] = [];
  produtoId: string | null = null;

  imagemUrl: string | ArrayBuffer | null = null;
  isOutraPlataforma: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private snackBar: MatSnackBar, 
    private produtoService: ProdutoService,
    private plataformaService: PlataformaService,
    private categoriaService: CategoriaService,
    private favoritoService: FavoritoService,
    private location: Location,
    private route: ActivatedRoute) 
  { 
    this.produtoForm = produtoService.criaForm();
  }

  ngOnInit(): void {
    this.carregaCategorias();
    this.carregarPlataformas();
    this.route.queryParams.subscribe(params => {
      this.acaoForm = params['acaoForm'] || 'Criar';
      if (this.acaoForm === 'Detalhes') {
        //this.produtoForm.disable();
      }
    });
    this.carregarProduto();
  }

  carregaCategorias() {
    this.categoriaService.carregarCategoriasAtivas().subscribe((categorias) => {
      this.categorias = categorias;
    });
  }

  carregarPlataformas() {
    this.plataformaService.carregarPlataformas().subscribe((plataformas) => {
      this.plataformas = plataformas;
    });
  }

  carregarProduto() {
    this.produtoId = this.route.snapshot.paramMap.get('id');
    if (this.produtoId) {
      if(this.acaoForm === 'Editar'){
        this.produtoService.carregarProdutoFavoritado(this.produtoId).subscribe({
          next: (produto: ProdutoFavoritado) => {
            this.atualizarFormulario(produto);
          },
          error: (error) => {
            console.error('Erro ao carregar produto:', error);
          }
        });
      }
      else if(this.acaoForm === 'Detalhes') {
        this.produtoService.carregarProduto(this.produtoId).subscribe({
          next: (produto: Produto) => {
            this.atualizarFormulario(produto);
          },
          error: (error) => {
            console.error('Erro ao carregar produto:', error);
          }
        });
      }
      
    }
  }

  toggleFavorite() {
    if (this.acaoForm === 'Editar') {
      // Desfavoritar o produto
      const favorito: Favorito = {
        produtoId: Number(this.produtoId),
        // Outros campos necessários para identificar o produto
      };

      this.favoritoService.desfavoritarProduto(favorito).subscribe(() => {
        this.snackBar.open('Produto desfavoritado!', "Ok");
        this.acaoForm = 'Detalhes';
      });
    } else if (this.acaoForm === 'Detalhes') {
      // Favoritar o produto
      const favorito: Favorito = {
        produtoId: Number(this.produtoId),
        // Outros campos necessários para identificar o produto
      };

      this.favoritoService.favoritarProduto(favorito).subscribe(() => {
        this.snackBar.open('Produto favoritado!', "Ok");
        this.acaoForm = 'Editar';
      });
    }  
  }

  atualizarFormulario(produto: Produto | ProdutoFavoritado) {
    this.produtoForm.patchValue({
      id: produto.id,
      descricao: produto.descricao,
      link: produto.link,
      valor: produto.valor,
      imagemPath: produto.imagemPath,
      categoria: this.categorias.find(categoria => categoria.id == produto.categoriaId) || null,
      plataforma: this.plataformas.find(plataforma => plataforma.id == produto.plataformaId) || null,
      prioridade: (produto as ProdutoFavoritado).prioridade || 0,
      isAvisado: (produto as ProdutoFavoritado).aviso || false
    });
    if (produto.imagemPath) {
      this.imagemUrl = produto.imagemPath;
    }
    this.updateFieldStates();
    this.disableFields();
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      const filePath = event.target.value;

      this.produtoForm.patchValue({
        imagemPath: filePath
      });

      reader.onload = () => {
        this.imagemUrl = reader.result;
      };

      reader.readAsDataURL(file);
    }
  }

  onPlataformaChange(event: any) {
    this.updateFieldStates();
  }

  updateFieldStates() {
    const selectedPlataforma = this.produtoForm.get('plataforma')?.value;
    this.isOutraPlataforma = selectedPlataforma && selectedPlataforma.descricao == 'Outra';
    console.log(this.isOutraPlataforma);
    if (!this.isOutraPlataforma) {
      this.produtoForm.get('imagem')?.reset();
    }
  }

  onLinkBlur() {
    const link = this.produtoForm.get('link')?.value;
    if (link && this.acaoForm === 'Criar') {
      this.produtoService.carregarProdutoDetalheScrap(link).subscribe((data) => {
        this.imagemUrl = "";
        this.produtoForm.patchValue({
          descricao: data.descricao,
          plataforma: this.plataformas.find(plataforma => plataforma.descricao == data.plataforma) || null,
          valor: data.valorConvertido,
          imagemPath: data.imagemPath
        });
        if (data.imagemPath) {
          this.imagemUrl = data.imagemPath;
        }
        this.updateFieldStates();
        this.disableFields();
      });
    }
  }

  formatValue(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  disableFields() {
    this.produtoForm.get('plataforma')?.disable();
    if(this.acaoForm !== 'Criar')
      this.produtoForm.get('categoria')?.disable();
  }

  onSubmit() {
    if (this.produtoForm.valid) {
      if(this.acaoForm === 'Criar') {
        const formData = new FormData();
        formData.append('link', this.produtoForm.get('link')?.value);
        formData.append('descricao', this.produtoForm.get('descricao')?.value);
        formData.append('plataformaId', this.produtoForm.get('plataforma')?.value.id);
        formData.append('categoriaId', this.produtoForm.get('categoria')?.value.id);
        formData.append('valor', this.formatValue(this.produtoForm.get('valor')?.value));
        formData.append('prioridade', this.produtoForm.get('prioridade')?.value);
        formData.append('isAvisado', this.produtoForm.get('isAvisado')?.value);
        formData.append('imagemPath', this.produtoForm.get('imagemPath')?.value);
  
        if (this.produtoForm.get('imagem')?.value) {
          formData.append('imagem', this.produtoForm.get('imagem')?.value);
        }
  
        this.produtoService.criarProduto(formData).subscribe({
          next: () => {
            this.snackBar.open("Sucesso ao criar o novo produto", "OK");
            this.cancelar();
          }, 
          error: () => {
            this.snackBar.open("Erro ao criar o produto", "OK");
          }
        });
      }  else if (this.acaoForm === 'Editar' && this.produtoId) {

        const produtoUpdate: ProdutoUpdate = {
          plataformaId: this.produtoForm.get('plataforma')?.value.id,
          prioridade: this.produtoForm.get('prioridade')?.value,
          isAvisado: this.produtoForm.get('isAvisado')?.value,
        };

        this.produtoService.atualizarProduto(this.produtoId, produtoUpdate).subscribe({
          next: () => {
            this.snackBar.open("Sucesso ao atualizar o novo produto", "OK");
            this.cancelar();
          }, 
          error: () => {
            this.snackBar.open("Erro ao atualizar o produto", "OK");
          }
        });
      }
    }
  }

  cancelar() {
    this.produtoForm.reset();
    this.location.back();
  }
}
