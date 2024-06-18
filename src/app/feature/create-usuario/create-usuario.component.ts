import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Usuario } from '../../shared/interfaces/usuario.interface';
import { UsuarioService } from '../../shared/services/usuario.service';

@Component({
  selector: 'app-create-usuario',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule
  ],
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.scss']
})
export class CreateUsuarioComponent {
  router = inject(Router);
  registerForm: FormGroup;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private usuarioService: UsuarioService) {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      login: ['', Validators.required],
      tipoUsuario: ['cliente']
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      const usuario: Usuario = this.registerForm.value;
      this.usuarioService.register(usuario)
      .subscribe(
        response => {
          console.log('Registration successful', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Registration failed', error);
          this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        }
      );
    }
  }

  onCancel(): void {
    // Reset form and navigate back to login
    this.registerForm.reset();
    this.router.navigate(['/login']);
  }
}
