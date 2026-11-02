import { Component, inject, signal, computed } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DepensesService } from '../../core/depenses';
import { CATEGORIES, Categorie } from '../../shared/depense';

@Component({
  selector: 'app-depense-ajout',
  imports: [FormsModule],
  templateUrl: './depense-ajout.html',
  styles: `
    form { display: flex; flex-direction: column; gap: 15px; max-width: 400px; }
    label { display: flex; flex-direction: column; gap: 5px; font-weight: bold; }
    input, select { padding: 8px; font-size: 1em; }
    .error { color: #d32f2f; font-size: 0.85em; }
    button { padding: 10px; background: #007bff; color: white; border: none; border-radius: 4px; cursor: pointer; }
    button:disabled { background: #ccc; cursor: not-allowed; }
  `
})
export class DepenseAjout {
  svc = inject(DepensesService);
  router = inject(Router);
  categories = CATEGORIES;

  // Récupération de la date du jour au format YYYY-MM-DD pour la limite max
  dateDuJour = new Date().toISOString().split('T')[0];

  modele = signal({
    libelle: '',
    montant: 0,
    date: this.dateDuJour,
    categorie: 'Alimentation' as Categorie
  });

  touche = signal({
    libelle: false,
    montant: false,
    date: false
  });

  f;

  constructor() {
    const self = this;

    this.f = computed(function() {
      const m = self.modele();
      const t = self.touche();

      const libelleInvalid = m.libelle.trim().length < 2;
      const montantInvalid = m.montant < 0.01;
      // Vérification que la date n'est pas vide et ne dépasse pas la date du jour
      const dateInvalid = !m.date || m.date > self.dateDuJour;

      return {
        libelle: {
          touched: t.libelle,
          invalid: libelleInvalid
        },
        montant: {
          touched: t.montant,
          invalid: montantInvalid
        },
        date: {
          touched: t.date,
          invalid: dateInvalid
        },
        invalid: libelleInvalid || montantInvalid || dateInvalid
      };
    });
  }

  marquerLibelleTouche() {
    const t = this.touche();
    this.touche.set({ ...t, libelle: true });
  }

  marquerMontantTouche() {
    const t = this.touche();
    this.touche.set({ ...t, montant: true });
  }

  marquerDateTouche() {
    const t = this.touche();
    this.touche.set({ ...t, date: true });
  }

  majLibelle(event: Event) {
    const cible = event.target as HTMLInputElement;
    const m = this.modele();
    this.modele.set({ ...m, libelle: cible.value });
  }

  majMontant(event: Event) {
    const cible = event.target as HTMLInputElement;
    const m = this.modele();
    this.modele.set({ ...m, montant: Number(cible.value) });
  }

  majDate(event: Event) {
    const cible = event.target as HTMLInputElement;
    const m = this.modele();
    this.modele.set({ ...m, date: cible.value });
  }

  majCategorie(event: Event) {
    const cible = event.target as HTMLSelectElement;
    const m = this.modele();
    this.modele.set({ ...m, categorie: cible.value as Categorie });
  }

  async enregistrer(event: Event) {
    event.preventDefault();
    if (this.f().invalid) {
      return;
    }
    await this.svc.ajouter(this.modele());
    this.router.navigate(['/depenses']);
  }
}