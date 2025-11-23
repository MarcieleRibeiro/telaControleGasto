import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  imports: [IonicModule, FormsModule]
})
export class LoginPage {

  email: string = '';
  senha: string = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {
    this.initMockUsers();
  }

  initMockUsers() {
    if (!localStorage.getItem("usuarios")) {
      const padrao = [
        { id: 1, email: "teste@teste.com", senha: "123456" }
      ];
      localStorage.setItem("usuarios", JSON.stringify(padrao));
    }
  }

  async login() {
    const lista = JSON.parse(localStorage.getItem("usuarios") || "[]");

    const usuario = lista.find((u: any) =>
      u.email === this.email && u.senha === this.senha
    );

    if (!usuario) {
      const alerta = await this.alertCtrl.create({
        header: 'Erro',
        message: 'Email ou senha inválidos',
        buttons: ['OK']
      });
      alerta.present();
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuario));

    this.router.navigateByUrl('/home', { replaceUrl: true });
  }

  goToRegister() {
    this.router.navigateByUrl('/register');
  }
}
