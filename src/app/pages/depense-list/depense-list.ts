import { Component, inject, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { DepensesService } from '../../core/depenses';
import { DepenseCard } from '../../shared/depense-card/depense-card';
import { CATEGORIES } from '../../shared/depense';

@Component({
  selector: 'app-depense-list',
  imports: [DepenseCard, CurrencyPipe],
  templateUrl: './depense-list.html',
  styles: `
    .filtres { display: flex; gap: 15px; margin-bottom: 20px; align-items: center; }
    .total { font-size: 1.2em; font-weight: bold; margin-bottom: 20px; color: #d32f2f; }
  `
})
export class DepenseList {
  svc = inject(DepensesService);
  categories = CATEGORIES;

  mois = signal('2026-10');
  categorie = signal('');

  depensesFiltrees;
  total;

  constructor() {
    const self = this;

    this.depensesFiltrees = computed(function() {
      const liste = self.svc.depenses.value();
      if (!liste) {
        return [];
      }
      
      const copie = [...liste];
      
      return copie.filter(function(d) {
        const matchMois = d.date.startsWith(self.mois());
        const matchCat = self.categorie() === '' || d.categorie === self.categorie();
        return matchMois && matchCat;
      }).sort(function(a, b) {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      });
    });

    this.total = computed(function() {
      return self.depensesFiltrees().reduce(function(acc, d) {
        return acc + d.montant;
      }, 0);
    });
  }

  changerMois(event: Event) {
    const cible = event.target as HTMLInputElement;
    this.mois.set(cible.value);
  }

  changerCategorie(event: Event) {
    const cible = event.target as HTMLSelectElement;
    this.categorie.set(cible.value);
  }
}