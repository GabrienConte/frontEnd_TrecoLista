import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:7213/api/v1/auth';
  httpClient = inject(HttpClient);

  login(credentials: { usernameOrEmail: string, password: string }): Observable<any> {
    return this.httpClient.post<any>(this.apiUrl, credentials, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
