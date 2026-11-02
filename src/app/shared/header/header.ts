import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  template: `
    <nav>
      <a routerLink="/depenses" routerLinkActive="actif">Dépenses</a>
      <a routerLink="/depenses/nouvelle" routerLinkActive="actif">Ajouter</a>
      <a routerLink="/stats" routerLinkActive="actif">Statistiques</a>
    </nav>
  `,
  styles: `
    .actif { font-weight: bold; color: #007bff; }
    nav { display: flex; gap: 20px; padding: 15px; background-color: #f8f9fa; border-bottom: 1px solid #ddd; }
    a { text-decoration: none; color: #333; }
  `
})
export class Header {}