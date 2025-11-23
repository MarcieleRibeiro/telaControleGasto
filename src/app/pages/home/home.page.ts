import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  totalGasto: number = 0;
  totalPago: number = 0;
  totalAPagar: number = 0;

  constructor() {}

  ngAfterViewInit() {
    this.carregarDados();
  }

  carregarDados() {
    // 1️⃣ Carregar despesas do localStorage
    const despesas = JSON.parse(localStorage.getItem("despesas") || "[]");

    // 2️⃣ Calcular totais
    this.calcularValores(despesas);

    // 3️⃣ Renderizar gráfico
    this.renderGrafico(despesas);
  }

  calcularValores(despesas: any[]) {
    const hoje = new Date();

    this.totalGasto = despesas.reduce((acc, d) => acc + d.valor, 0);

    // Pago = vencimento anterior à data de hoje
    this.totalPago = despesas
      .filter(d => new Date(d.vencimento) < hoje)
      .reduce((acc, d) => acc + d.valor, 0);

    // A pagar = vencimento hoje ou depois
    this.totalAPagar = despesas
      .filter(d => new Date(d.vencimento) >= hoje)
      .reduce((acc, d) => acc + d.valor, 0);
  }

  renderGrafico(despesas: any[]) {
    const ctx = document.getElementById('grafico') as HTMLCanvasElement;

    // Soma dos valores por mês
    const meses = Array(12).fill(0);

    despesas.forEach(d => {
      const mes = new Date(d.vencimento).getMonth();
      meses[mes] += d.valor;
    });

    const nomesMeses = [
      'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
      'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
    ];

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: nomesMeses,
        datasets: [{
          label: 'Gastos por mês',
          data: meses,
          backgroundColor: 'rgba(50, 205, 50, 0.7)',
          borderRadius: 6,
        }]
      },
      options: {
        plugins: { legend: { display: false } },
        scales: {
          x: {
            ticks: { color: '#fff' },
            grid: { display: false }
          },
          y: {
            ticks: { color: '#fff' },
            grid: { color: '#333' }
          }
        }
      }
    });
  }
}
