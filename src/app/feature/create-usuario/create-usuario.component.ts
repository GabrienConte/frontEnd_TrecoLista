import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../../core/interfaces/usuario.interface';
import { UsuarioService } from '../../core/services/usuario.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent implements OnInit{
  router = inject(Router);
  registroForm!: FormGroup;
  errorMessage: string = '';

  matSnackBar = inject(MatSnackBar);

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {}

  ngOnInit(): void {
    this.registroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      login: ['', Validators.required],
      tipoUsuario: ['cliente']
    });;
  }

  onSubmit(): void {
    if (this.registroForm.valid) {
      const usuario: Usuario = this.registroForm.value;
      this.usuarioService.register(usuario)
      .subscribe({
        next: () => {
          this.matSnackBar.open('Usuário cadastrado com sucesso!', "Ok");
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Registration failed', error);
          this.errorMessage = error.error.message || 'Registro falhou. Por Favor, tente de novo.';
        }
      });
    }
  }

  onCancel(): void {
    // Reset form and navigate back to login
    this.registroForm.reset();
    this.router.navigate(['/login']);
  }
}
