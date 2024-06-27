import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { UsuarioService } from '../../core/services/usuario.service';

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

constructor(private fb: FormBuilder, private usuarioService: UsuarioService){

}
  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      login: ['', Validators.required]
    });;
  }

  onCancel(){

  }
  
  onSubmit(){

  }
}
