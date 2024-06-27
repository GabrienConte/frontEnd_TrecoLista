import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { AuthData } from '../interfaces/auth.data.interface';
import { environment } from '../../../environments/environment';
import { UsuarioService } from './usuario.service';

interface AuthResponse {
  access_token: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl =environment.apiUrl;
  
  constructor(
    private http: HttpClient,
    private usuarioService: UsuarioService  
  ) { }

  login(authData: AuthData): 
  Observable<HttpResponse<AuthResponse>> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`,
      authData,
    {observe: 'response'}).pipe(
      tap((response) => {
        const authtoken = response.body?.access_token || '';
        this.usuarioService.salvarToken(authtoken);
      })
    );
  }
}
