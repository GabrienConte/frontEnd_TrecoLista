import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Notificacao } from '../../core/interfaces/notificacao.interface';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../core/services/usuario.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notificacao',
  standalone: true,
  imports: [
    CommonModule,
    MatDialogModule,
    MatListModule,
    MatButtonModule
  ],
  templateUrl: './notificacao.component.html',
  styleUrl: './notificacao.component.scss'
})
export class NotificacaoComponent implements OnInit {
  notificacoes: Notificacao[] = [];

  constructor(private notificacaoService: NotificacaoService, private usuarioService: UsuarioService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.notificacaoService.getNotifications().subscribe(notifications => {
      this.notificacoes = notifications;
      if(this.notificacoes.length > 0)
        this.snackBar.open('Você tem uma nova notificação!', 'ok');
    });
  }
}
