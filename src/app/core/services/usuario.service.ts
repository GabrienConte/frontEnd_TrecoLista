import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, UsuarioUpdate } from '../interfaces/usuario.interfaces';
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

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.apiUrl}/usuario`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  buscarUsuario(token: string): Observable<Usuario> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.get<Usuario>(`${this.apiUrl}/usuario`, {headers});
  }

  editarUsuario(usuario: UsuarioUpdate,token: string): Observable<UsuarioUpdate> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.httpClient.put<UsuarioUpdate>(`${this.apiUrl}/usuario`, usuario ,{headers});
  }

}
