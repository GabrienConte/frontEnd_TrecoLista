import { Injectable } from '@angular/core';

const KEY = 'token'

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  salvarToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  removerToken() {
    localStorage.removeItem(KEY);
  }

  retornarToken() {
    return localStorage.getItem(KEY) ?? "";
  }

  possuiToken() {
    return !!this.retornarToken();
  }
}
