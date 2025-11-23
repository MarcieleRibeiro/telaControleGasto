import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage {

  usuario: any = {
    nome: '',
    email: ''
  };

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.carregarUsuario();
  }

  carregarUsuario() {
    const user = JSON.parse(localStorage.getItem("usuarioLogado") || "null");

    if (!user) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Caso você queira permitir nome futuramente
    this.usuario.email = user.email;
    this.usuario.nome = user.nome || "Usuário";
  }

  async logout() {
    // Remove o usuário logado
    localStorage.removeItem("usuarioLogado");

    const alerta = await this.alertCtrl.create({
      header: 'Sessão encerrada',
      message: 'Você saiu do aplicativo.',
      buttons: ['OK']
    });
    alerta.present();

    // Redireciona para login
    this.router.navigateByUrl('/login', { replaceUrl: true });
  }
}
