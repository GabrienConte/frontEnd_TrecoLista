import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Usuario, UsuarioToken, UsuarioUpdate } from '../interfaces/usuario.interfaces';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = environment.apiUrl;

  private userSubject = new BehaviorSubject<UsuarioToken | null>(null);

  constructor(private httpClient: HttpClient, private tokenService: TokenService, private router: Router) {
    if(this.tokenService.possuiToken()) {
      this.decodificarJWT();
    }
  }

  decodificarJWT() {
    const token = this.tokenService.retornarToken();
    const user = jwtDecode(token) as UsuarioToken;
    this.userSubject.next(user);
  }

  retornaUser(): Observable<UsuarioToken | null> {
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

  isAdmin(): boolean {
    const user = this.userSubject.value;
    return user?.tipo_usuario === 'ADMIN';
  }

  canActivateAdmin(): boolean {
    if (this.isAdmin()) {
      return true;
    } else {
      this.router.navigate(['/unauthorized']);
      return false;
    }
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(`${this.apiUrl}/usuario`, usuario);
  }

  buscarUsuario(): Observable<Usuario> {
    return this.httpClient.get<Usuario>(`${this.apiUrl}/usuario`);
  }

  buscarUsuarioUpdate(): Observable<UsuarioUpdate> {
    return this.httpClient.get<UsuarioUpdate>(`${this.apiUrl}/usuario/update`);
  }

  editarUsuario(usuario: UsuarioUpdate): Observable<UsuarioUpdate> {
    return this.httpClient.put<UsuarioUpdate>(`${this.apiUrl}/usuario`, usuario);
  }

}
