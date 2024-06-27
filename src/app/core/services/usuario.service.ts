import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = environment.apiUrl;

  private userSubject = new BehaviorSubject<Usuario | null>(null);

  constructor(private httpClient: HttpClient, private tokenService: TokenService) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as Usuario;
    this.userSubject.next(user);
  }

  retornaUser() {
    return this.userSubject.asObservable();
  }

  salvarToken(token: string) {
    this.tokenService.salvarToken(token);
    this.decodificarJWT();
  }

  logout() {
    this.tokenService.removerToken();
    this.userSubject.next(null);
  }

  estaLogado() {
    return this.tokenService.possuiToken();
  }

  register(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/usuario`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
