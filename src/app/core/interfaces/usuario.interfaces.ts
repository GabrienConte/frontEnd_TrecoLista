export interface Usuario {
  email: string;
  senha: string;
  login: string;
  tipoUsuario: string;
}

export interface UsuarioUpdate {
  id: number;
  email: string;
  login: string;
}