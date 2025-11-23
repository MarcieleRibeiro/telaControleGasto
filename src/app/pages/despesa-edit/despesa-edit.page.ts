import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-despesa-edit',
  standalone: true,
  imports: [CommonModule, IonicModule, FormsModule],
  templateUrl: './despesa-edit.page.html',
  styleUrls: ['./despesa-edit.page.scss'],
})
export class DespesaEditPage {

  id!: number;
  nome: string = '';
  valor: number | null = null;
  vencimento: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // 1️⃣ Pega o ID da URL
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    // 2️⃣ Carrega todas despesas do localStorage
    const lista = JSON.parse(localStorage.getItem("despesas") || "[]");

    // 3️⃣ Busca a despesa específica
    const despesa = lista.find((d: any) => d.id === this.id);

    if (!despesa) {
      alert("Despesa não encontrada!");
      this.router.navigateByUrl('/despesas-list');
      return;
    }

    // 4️⃣ Preenche o formulário
    this.nome = despesa.nome;
    this.valor = despesa.valor;
    this.vencimento = despesa.vencimento;
  }

  salvar() {

    if (!this.nome || !this.valor || !this.vencimento) {
      alert("Preencha todos os campos!");
      return;
    }

    // 1️⃣ Carrega despesas
    const lista = JSON.parse(localStorage.getItem("despesas") || "[]");

    // 2️⃣ Encontra e atualiza
    const index = lista.findIndex((d: any) => d.id === this.id);

    if (index === -1) {
      alert("Erro: despesa não encontrada para editar.");
      return;
    }

    lista[index] = {
      id: this.id,
      nome: this.nome,
      valor: this.valor,
      vencimento: this.vencimento,
      pago: lista[index].pago // mantém o valor original
    };

    // 3️⃣ Salva de volta
    localStorage.setItem("despesas", JSON.stringify(lista));

    alert("Despesa atualizada com sucesso!");
    this.router.navigateByUrl('/despesas-list');
  }
}
