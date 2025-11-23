import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-despesa-create',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './despesa-create.page.html',
  styleUrls: ['./despesa-create.page.scss'],
})
export class DespesaCreatePage {

  nome: string = '';
  valor: number | null = null;
  vencimento: string = '';

  constructor(
    private router: Router
  ) { }

  salvar() {

    if (!this.nome || !this.valor || !this.vencimento) {
      alert("Preencha todos os campos!");
      return;
    }

    // 1. Buscar despesas existentes no localStorage
    const lista = JSON.parse(localStorage.getItem("despesas") || "[]");

    // 2. Criar nova despesa
    const novaDespesa = {
      id: lista.length + 1,
      nome: this.nome,
      valor: this.valor,
      vencimento: this.vencimento,
      pago: false
    };

    // 3. Adicionar no array
    lista.push(novaDespesa);

    // 4. Salvar no localStorage
    localStorage.setItem("despesas", JSON.stringify(lista));

    alert("Despesa salva com sucesso!");

    // 5. Redirecionar
    this.router.navigateByUrl('/despesas-list');
  }

  ionViewWillEnter() {
    this.nome = '';
    this.valor = null;
    this.vencimento = '';
  }


}
