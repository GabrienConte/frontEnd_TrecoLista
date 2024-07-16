import { Injectable } from '@angular/core';
import { UsuarioService } from './usuario.service';
import { Subscription } from 'rxjs';
import { NotificacaoService } from './notificacao.service';
import { Notificacao } from '../interfaces/notificacao.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  userSubscription: Subscription;
  userId!: number;

  constructor(private usuarioService: UsuarioService, private notificacaoService: NotificacaoService) {
    this.userSubscription = this.usuarioService.retornaUser().subscribe(user => {
      if (user) {
        console.log(user);
        this.userId = user.usuario_id;
        const wsUrl = `${environment.wsUrl}?userId=${this.userId}`;
        this.socket = new WebSocket(wsUrl);
        this.socket.onopen = () => {
          console.log('WebSocket connection established');
        };

        this.socket.onmessage = this.onMessage.bind(this);

        this.socket.onerror = (error) => {
          console.error('WebSocket error:', error);
        };

        this.socket.onclose = (event) => {
          console.log('WebSocket connection closed:', event);
        };
      }
    });
  }

  private onMessage(event: MessageEvent) {
    console.log('WebSocket message received:', event.data);
    const data = JSON.parse(event.data);
    const notification: Notificacao = {
      title: data.title,
      message: data.message
    };
    this.storeNotification(notification);
  }

  private storeNotification(notification: Notificacao) {
    this.notificacaoService.addNotification(notification);
  }
}
