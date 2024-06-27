import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  register(usuario: Usuario): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/usuario`, usuario, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

}
