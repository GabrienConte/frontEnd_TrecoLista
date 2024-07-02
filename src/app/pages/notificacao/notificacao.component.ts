import { Component, Inject, OnInit } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Notificacao } from '../../core/interfaces/notificacao.interface';
import { NotificacaoService } from '../../core/services/notificacao.service';

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
  notifications: Notificacao[] = [];

  constructor(private notificacaoService: NotificacaoService) { }

  ngOnInit(): void {
    this.notificacaoService.getNotifications().subscribe(notifications => {
      this.notifications = notifications;
    });
  }
}
