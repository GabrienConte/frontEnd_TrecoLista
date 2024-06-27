import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://localhost:7213/api/v1/usuario';
  httpClient = inject(HttpClient);

  register(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
