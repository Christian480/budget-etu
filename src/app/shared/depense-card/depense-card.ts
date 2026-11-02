import { Component, input } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Depense } from '../depense';
import { BadgeCategorie } from '../badge-categorie/badge-categorie';

@Component({
  selector: 'app-depense-card',
  imports: [CurrencyPipe, DatePipe, BadgeCategorie, RouterLink],
  template: `
    <div class="card">
      <div class="info">
        <a [routerLink]="['/depenses', depense().id]"><strong>{{ depense().libelle }}</strong></a>
        <span class="date">{{ depense().date | date:'dd/MM/yyyy' }}</span>
      </div>
      <div class="montant-cat">
        <span class="montant">{{ depense().montant | currency:'EUR' }}</span>
        <app-badge-categorie [categorie]="depense().categorie"></app-badge-categorie>
      </div>
    </div>
  `,
  styles: `
    .card { display: flex; justify-content: space-between; padding: 15px; margin-bottom: 10px; border: 1px solid #ddd; border-radius: 8px; background: white; }
    .info, .montant-cat { display: flex; flex-direction: column; gap: 5px; }
    .montant-cat { align-items: flex-end; }
    .date { color: #666; font-size: 0.9em; }
    .montant { font-size: 1.2em; font-weight: bold; }
    a { text-decoration: none; color: #007bff; }
    a:hover { text-decoration: underline; }
  `
})
export class DepenseCard {
  depense = input.required<Depense>();
}