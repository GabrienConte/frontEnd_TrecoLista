import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';
import { UsuarioUpdate } from '../../core/interfaces/usuario.interfaces';
import { TokenService } from '../../core/services/token.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-meu-perfil',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './meu-perfil.component.html',
  styleUrl: './meu-perfil.component.scss'
})
export class MeuPerfilComponent implements OnInit {
  router = inject(Router);
  perfilForm!: FormGroup;
  errorMessage: string = '';

  matSnackBar = inject(MatSnackBar);

  nomeUsuario = '';
  token = '';
  usuario!: UsuarioUpdate;

constructor(
  private fb: FormBuilder, 
  private usuarioService: UsuarioService,
  private tokenService: TokenService,
  private location: Location){

}
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required]
    });
    
    this.token = this.tokenService.retornarToken();
    
    this.usuarioService.buscarUsuarioUpdate().subscribe(usuario => {
      this.usuario = usuario;
      this.nomeUsuario = usuario.login;
      this.carregarFomulario();
    });
  }

  carregarFomulario() {
    this.perfilForm?.patchValue({
      email: this.usuario.email,
      login: this.usuario.login
    });
  }

  onCancel(){
    this.perfilForm.reset();
    this.location.back();
  }
  
  onSubmit(){
    if (this.perfilForm.valid) {
      const usuario: UsuarioUpdate = this.perfilForm.value;
      this.usuarioService.editarUsuario(usuario)
      .subscribe({
        next: () => {
          this.matSnackBar.open('Usuário atualizado com sucesso!', "Ok");
          this.location.back();
        },
        error: (error) => {
          this.errorMessage = error.error.message || 'Atualizar o usuário falhou. Por Favor, tente de novo.';
        }
      });
    }
  }
}
