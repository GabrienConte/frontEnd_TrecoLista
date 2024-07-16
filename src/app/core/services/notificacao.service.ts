import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NotificacaoComponent } from '../../pages/notificacao/notificacao.component'
import { Notificacao } from '../interfaces/notificacao.interface';
import { Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificacaoService {
  private notifications: Notificacao[] = [];

  private apiUrl: string = environment.apiUrl
  
  constructor() { }

  getNotifications(): Observable<Notificacao[]> {
    return of(this.notifications);
  }

  addNotification(notificacao: Notificacao) {
    this.notifications.push(notificacao);
  }
}
