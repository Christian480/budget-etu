import { Injectable, signal, effect } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Depense } from '../shared/depense';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DepensesService {
  constructor(private http: HttpClient) {
    // Récupération de la valeur sauvegardée dans le localStorage au démarrage
    const saved = localStorage.getItem('budgetMensuel');
    if (saved) {
      this.budgetMensuel.set(Number(saved));
    }

    // Sauvegarde automatique à chaque modification du signal grâce à un effect
    const self = this;
    effect(function() {
      const budget = self.budgetMensuel();
      localStorage.setItem('budgetMensuel', budget.toString());
    });
  }

  budgetMensuel = signal(700);

  depenses = httpResource<Depense[]>(function() {
    return 'http://localhost:3000/depenses';
  });

  async ajouter(d: Omit<Depense, 'id'>) {
    await this.http.post('http://localhost:3000/depenses', d).toPromise();
    this.depenses.reload();
  }

  async supprimer(id: string) {
    await this.http.delete('http://localhost:3000/depenses/' + id).toPromise();
    this.depenses.reload();
  }
}