import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-despesas-list',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './despesas-list.page.html',
  styleUrls: ['./despesas-list.page.scss'],
})
export class DespesasListPage {

  despesas: any[] = [];

  constructor(
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {
    this.carregarDespesas();
  }

  ionViewWillEnter() {
    this.carregarDespesas();
  }

  carregarDespesas() {
    const lista = JSON.parse(localStorage.getItem("despesas") || "[]");
    this.despesas = lista;
  }

  editar(id: number) {
    this.router.navigateByUrl('/despesa-edit/' + id);
  }

  async deletar(id: number) {

    const alerta = await this.alertCtrl.create({
      header: 'Confirmar exclusão',
      message: 'Deseja realmente excluir esta despesa?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Excluir',
          role: 'destructive',
          handler: () => {

            // 1️⃣ carregar lista
            const lista = JSON.parse(localStorage.getItem("despesas") || "[]");

            // 2️⃣ remover
            const novaLista = lista.filter((d: any) => d.id !== id);

            // 3️⃣ salvar de volta
            localStorage.setItem("despesas", JSON.stringify(novaLista));

            // 4️⃣ atualizar tela
            this.despesas = novaLista;
          }
        }
      ]
    });

    await alerta.present();
  }

  novaDespesa() {
    this.router.navigateByUrl('/despesa-create');
  }
}
