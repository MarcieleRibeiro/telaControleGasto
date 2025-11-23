import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {
    this.initMockUsers();
  }

  // Usuário padrão para testes
  initMockUsers() {
    if (!localStorage.getItem("usuarios")) {
      const padrao = [
        { id: 1, nome: "Usuário Teste", email: "teste@teste.com", senha: "123456" }
      ];
      localStorage.setItem("usuarios", JSON.stringify(padrao));
    }
  }

  // LOGIN MOCK
  async login(email: string, senha: string) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuario = usuarios.find((u: any) =>
      u.email === email && u.senha === senha
    );

    if (!usuario) {
      throw new Error("Login inválido");
    }

    // Salva usuário logado
    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    return usuario;
  }

  // CADASTRO MOCK — agora aceita nome, email e senha
  async register(nome: string, email: string, senha: string) {
    const usuarios = JSON.parse(localStorage.getItem("usuarios") || "[]");

    if (usuarios.find((u: any) => u.email === email)) {
      throw new Error("Email já cadastrado");
    }

    const novoUsuario = {
      id: usuarios.length + 1,
      nome,
      email,
      senha
    };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    return novoUsuario;
  }

  // PEGAR USUÁRIO LOGADO
  getUsuarioLogado() {
    return JSON.parse(localStorage.getItem("usuarioLogado") || "null");
  }

  // SAIR
  logout() {
    localStorage.removeItem("usuarioLogado");
  }

  // VERIFICAR SE ESTÁ LOGADO
  estaLogado(): boolean {
    return localStorage.getItem("usuarioLogado") !== null;
  }
}
