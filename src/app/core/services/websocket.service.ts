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
  private webSocket!: WebSocket;
  userSubscription!: Subscription;
  userId!: number;

  constructor(private usuarioService: UsuarioService, private notificacaoService: NotificacaoService) {
  }
  
  public start(): void {
    console.debug('Going to connect to the websockets server');
    this.userSubscription = this.usuarioService.retornaUser().subscribe(user => {
      this.connect(`${environment.wsUrl}?userId=${user?.usuario_id}`);
    });
  }
  
  public stop(): void {
    if (this.webSocket != null) {
      this.webSocket.close();
    }
  }
  
  private connect(url: string): void {
    this.webSocket = new WebSocket(url);
    
    this.webSocket.onopen = () => {
      console.info('WebSocket connection has been opened');
    };

    const onMessage = (event: MessageEvent) => {
      console.log('WebSocket message received:', event.data);
      const data = JSON.parse(event.data);
      const notification: Notificacao = {
        title: data.title,
        message: data.message
      };
      this.storeNotification(notification);
    }
    this.webSocket.onmessage = onMessage;

    this.webSocket.onerror =  () => {
      console.error('WebSocket error observed');
    };

    this.webSocket.onclose = () => {
      console.info('WebSocket connection has been closed');
    };
  }

  private storeNotification(notification: Notificacao) {
    this.notificacaoService.addNotification(notification);
  }
}
