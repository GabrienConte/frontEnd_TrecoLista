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
import { NotificacaoService } from '../../../core/services/notificacao.service';
import { Notificacao } from '../../../core/interfaces/notificacao.interface';
import { NotificacaoComponent } from "../../../pages/notificacao/notificacao.component";

@Component({
    selector: 'app-header',
    standalone: true,
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [
        CommonModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        MatMenuModule,
        MatDividerModule,
        RouterModule,
        NotificacaoComponent
    ]
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
