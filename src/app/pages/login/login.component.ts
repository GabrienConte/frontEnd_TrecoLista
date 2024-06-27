import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { AuthData } from '../../shared/interfaces/auth.data.interface';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    RouterLink,
    CommonModule 
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  erroLogin = false;

  matSnackBar = inject(MatSnackBar);

  constructor(
    private authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.loginForm = this.formBuilder.group({
      emailOuLogin: ['', [Validators.required]],
      senha: ['', [Validators.required]]
    });
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const authData: AuthData = {
      emailOuLogin: this.loginForm.value.emailOuLogin,
      senha: this.loginForm.value.senha
    };

    this.authService.login(authData).subscribe(
      response => {
        this.matSnackBar.open('Usuário Logado!', "Ok");
        this.router.navigate(['/']); // Navega para a rota principal após o login
      },
      error => {
        this.matSnackBar.open("Error, usuário ou senha inválido", "Ok");
        this.erroLogin = true;
      }
    );
  }

  get form() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value)
      .subscribe(
        response => {
          this.matSnackBar.open('Usuário Logado!', "Ok");
        },
        error => {
          this.matSnackBar.open(error.error, "Ok");
        }
      );
    }
  }
}
