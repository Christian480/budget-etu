import { Component, input, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { httpResource } from '@angular/common/http';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { DepensesService } from '../../core/depenses';
import { Depense } from '../../shared/depense';
import { BadgeCategorie } from '../../shared/badge-categorie/badge-categorie';

@Component({
  selector: 'app-depense-detail',
  imports: [CurrencyPipe, DatePipe, BadgeCategorie, RouterLink],
  templateUrl: './depense-detail.html',
  styles: `
    .detail-card { max-width: 500px; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background: #fff; }
    .actions { margin-top: 20px; display: flex; gap: 15px; align-items: center; }
    .btn-danger { background-color: #d32f2f; color: white; padding: 8px 12px; border: none; border-radius: 4px; cursor: pointer; }
    a { color: #007bff; text-decoration: none; }
  `
})
export class DepenseDetail {
  id = input.required<string>();
  svc = inject(DepensesService);
  router = inject(Router);

  depense = httpResource<Depense>(this.genererUrl.bind(this));

  genererUrl() {
    return 'http://localhost:3000/depenses/' + this.id();
  }

  async supprimerDepense() {
    if (confirm('Voulez-vous vraiment supprimer cette dépense ?')) {
      await this.svc.supprimer(this.id());
      this.router.navigate(['/depenses']);
    }
  }
}