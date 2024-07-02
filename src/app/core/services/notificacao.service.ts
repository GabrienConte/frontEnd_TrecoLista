import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoComponent } from '../../pages/notificacao/notificacao.component'
import { Notificacao } from '../interfaces/notificacao.interface';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private notifications: Notificacao[] = [
    { title: 'Nova Mensagem', message: 'Você recebeu uma nova mensagem.' },
    { title: 'Atualização Disponível', message: 'Uma nova atualização está disponível.' },
    { title: 'Aviso de Segurança', message: 'Alteração de senha recomendada.' }
  ];

  constructor() { }

  getNotifications(): Observable<Notificacao[]> {
    return of(this.notifications);
  }
}
