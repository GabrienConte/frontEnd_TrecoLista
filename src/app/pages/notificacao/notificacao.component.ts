import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Notificacao } from '../../core/interfaces/notificacao.interface';
import { NotificacaoService } from '../../core/services/notificacao.service';
import { Subscription } from 'rxjs';
import { UsuarioService } from '../../core/services/usuario.service';

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
export class NotificacaoComponent implements OnInit, OnDestroy {
  notificacoes: Notificacao[] = [];
  notificacaoSubscription!: Subscription;
  userSubscription!: Subscription;
  userId!: number;

  constructor(private notificacaoService: NotificacaoService, private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.userSubscription = this.usuarioService.retornaUser().subscribe(user => {
      if (user) {
        this.userId = user.usuario_id;
        this.iniciarStreamMensagens();
      }
    });
  }

  iniciarStreamMensagens() {
    this.notificacaoSubscription = this.notificacaoService.getMensagensStream(this.userId)
      .subscribe(mensagem => {
        this.notificacoes.unshift(mensagem);
      });
  }

  ngOnDestroy(): void {
    if (this.notificacaoSubscription) {
      this.notificacaoSubscription.unsubscribe();
    }
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }
}
