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
  private notifications: Notificacao[] = [
    { title: 'Nova Mensagem', message: 'O produto x mudou de preço.' },
    { title: 'Nova Mensagem', message: 'O produto y mudou de preço.' },
    { title: 'Nova Mensagem', message: 'O produto z mudou de preço.' }
  ];

  private apiUrl: string = environment.apiUrl
  
  constructor() { }

  getNotifications(): Observable<Notificacao[]> {
    return of(this.notifications);
  }

  addNotification(notificacao: Notificacao) {
    this.notifications.push(notificacao);
  }

  getMensagensStream(userId: number): Observable<Notificacao> {
    return new Observable<Notificacao>(observer => {
      const eventSource = new EventSource(`${this.apiUrl}/notificacao/${userId}/see-kafka`);
      
      eventSource.onmessage = event => {
        const notificacao: Notificacao = JSON.parse(event.data);
        observer.next(notificacao);
      };

      eventSource.onerror = error => {
        observer.error('Erro na conexão com Server-Sent Events.');
      };

      return () => eventSource.close();
    });
  }
}
