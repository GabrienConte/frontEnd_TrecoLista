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

export interface UsuarioToken {
  usuario_id: number;
  tipo_usuario: string
}