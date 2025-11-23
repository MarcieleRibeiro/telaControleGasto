import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss']
})
export class RegisterPage {

  nome: string = '';
  email: string = '';
  senha: string = '';
  confirmarSenha: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  async register() {

    if (!this.nome || !this.email || !this.senha || !this.confirmarSenha) {
      return this.showAlert("Preencha todos os campos.");
    }

    if (this.senha !== this.confirmarSenha) {
      return this.showAlert("As senhas não conferem.");
    }

    try {
      await this.authService.register(this.nome, this.email, this.senha);

      const alerta = await this.alertCtrl.create({
        header: 'Sucesso',
        message: 'Conta criada com sucesso! Faça login para continuar.',
        buttons: ['OK']
      });
      alerta.present();

      this.router.navigateByUrl('/login', { replaceUrl: true });

    } catch (error: any) {
      this.showAlert(error.message || "Erro ao criar conta. Email já cadastrado.");
    }
  }

  async showAlert(msg: string) {
    const alerta = await this.alertCtrl.create({
      header: 'Atenção',
      message: msg,
      buttons: ['OK']
    });
    alerta.present();
  }

  goToLogin() {
    this.router.navigateByUrl('/login');
  }
}
