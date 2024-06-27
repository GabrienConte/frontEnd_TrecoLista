export interface Usuario {
  email: string;
  senha: string;
  login: string;
  tipoUsuario: string;
}

export interface UsuarioUpdate {
  email: string;
  login: string;
}