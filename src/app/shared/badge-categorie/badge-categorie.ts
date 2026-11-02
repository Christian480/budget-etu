import { Component, input } from '@angular/core';
import { Categorie } from '../depense';

@Component({
  selector: 'app-badge-categorie',
  template: `
    @switch (categorie()) {
      @case ('Alimentation') {
        <span class="badge alimentation">Alimentation</span>
      }
      @case ('Logement') {
        <span class="badge logement">Logement</span>
      }
      @case ('Transport') {
        <span class="badge transport">Transport</span>
      }
      @case ('Loisirs') {
        <span class="badge loisirs">Loisirs</span>
      }
      @case ('Études') {
        <span class="badge etudes">Études</span>
      }
    }
  `,
  styles: `
    .badge { padding: 4px 8px; border-radius: 12px; font-size: 0.8em; font-weight: bold; color: white; }
    .alimentation { background-color: #ff9800; }
    .logement { background-color: #4caf50; }
    .transport { background-color: #2196f3; }
    .loisirs { background-color: #9c27b0; }
    .etudes { background-color: #607d8b; }
  `
})
export class BadgeCategorie {
  categorie = input.required<Categorie>();
}