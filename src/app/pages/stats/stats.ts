import { Component, inject, computed } from '@angular/core';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DepensesService } from '../../core/depenses';

@Component({
  selector: 'app-stats',
  imports: [CurrencyPipe, DecimalPipe, FormsModule],
  templateUrl: './stats.html',
  styles: `
    .stats-container { display: flex; flex-direction: column; gap: 20px; max-width: 500px; background: white; padding: 20px; border-radius: 8px; border: 1px solid #ddd; }
    .card-stat { padding: 15px; background: #f8f9fa; border-radius: 6px; border: 1px solid #eee; }
    .progress-bar-container { background: #e0e0e0; border-radius: 4px; height: 20px; width: 100%; overflow: hidden; margin-top: 10px; }
    .progress-bar { height: 100%; background: #4caf50; transition: width 0.3s ease; }
    .progress-bar.depasse { background: #d32f2f; }
    .alerte { color: #d32f2f; font-weight: bold; margin-top: 10px; }
    label { display: flex; flex-direction: column; gap: 5px; font-weight: bold; }
    input { padding: 8px; font-size: 1em; width: 150px; }
    .cat-stat-item { margin-top: 10px; }
    .cat-label { display: flex; justify-content: space-between; font-size: 0.9em; margin-bottom: 3px; }
    .cat-bar-bg { background: #e0e0e0; border-radius: 4px; height: 10px; width: 100%; overflow: hidden; }
    .cat-bar-fill { height: 100%; background: #2196f3; }
  `
})
export class Stats {
  svc = inject(DepensesService);

  moisActuel = '2026-10';

  totalMois;
  resteADepenser;
  pourcentageBudget;
  pourcentageBrut;
  categoriePlusCouteuse;
  totauxParCategorie;

  constructor() {
    const self = this;

    this.totalMois = computed(function() {
      const liste = self.svc.depenses.value();
      if (!liste) return 0;
      return liste
        .filter(function(d) { return d.date.startsWith(self.moisActuel); })
        .reduce(function(acc, d) { return acc + d.montant; }, 0);
    });

    this.resteADepenser = computed(function() {
      return self.svc.budgetMensuel() - self.totalMois();
    });

    this.pourcentageBudget = computed(function() {
      const budget = self.svc.budgetMensuel();
      if (budget <= 0) return 0;
      return Math.min(Math.round((self.totalMois() / budget) * 100), 100);
    });

    this.pourcentageBrut = computed(function() {
      const budget = self.svc.budgetMensuel();
      if (budget <= 0) return 0;
      return (self.totalMois() / budget) * 100;
    });

    this.categoriePlusCouteuse = computed(function() {
      const liste = self.svc.depenses.value();
      if (!liste) return 'Aucune';
      
      const depensesMois = liste.filter(function(d) { return d.date.startsWith(self.moisActuel); });
      if (depensesMois.length === 0) return 'Aucune';

      const TotauxParCat: Record<string, number> = {};
      for (const d of depensesMois) {
        TotauxParCat[d.categorie] = (TotauxParCat[d.categorie] || 0) + d.montant;
      }

      let catMax = '';
      let max = -1;
      for (const cat in TotauxParCat) {
        if (TotauxParCat[cat] > max) {
          max = TotauxParCat[cat];
          catMax = cat;
        }
      }
      return catMax;
    });

    this.totauxParCategorie = computed(function() {
      const liste = self.svc.depenses.value();
      if (!liste) return [];

      const depensesMois = liste.filter(function(d) { return d.date.startsWith(self.moisActuel); });
      const totaux: Record<string, number> = {};
      let totalGlobal = 0;
      
      for (const d of depensesMois) {
        totaux[d.categorie] = (totaux[d.categorie] || 0) + d.montant;
        totalGlobal += d.montant;
      }

      return Object.keys(totaux).map(function(cle) {
        return {
          categorie: cle,
          total: totaux[cle],
          pourcentage: totalGlobal > 0 ? (totaux[cle] / totalGlobal) * 100 : 0
        };
      });
    });
  }

  changerBudget(event: Event) {
    const cible = event.target as HTMLInputElement;
    this.svc.budgetMensuel.set(Number(cible.value));
  }
}