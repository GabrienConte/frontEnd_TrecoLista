import { Component, inject } from '@angular/core';
import { MatIconModule} from '@angular/material/icon';
import { MatButtonModule} from '@angular/material/button';
import { MatToolbarModule } from "@angular/material/toolbar"
import { MatMenuModule} from '@angular/material/menu';
import {MatSnackBar} from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatIconModule, 
    MatButtonModule,
    MatMenuModule, 
    MatDividerModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  router = inject(Router);

  matSnackBar = inject(MatSnackBar);

  constructor(public usuarioService: UsuarioService) {}

  logout() {
    this.usuarioService.logout();
    this.matSnackBar.open("Deslogado com sucesso!", "Ok");
    this.router.navigate(['/login']);
  }
}
