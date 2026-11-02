import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { signal } from '@angular/core';
import { DepenseList } from './depense-list';
import { DepensesService } from '../../core/depenses';
import { Depense } from '../../shared/depense';

describe('DepenseList', function() {
  const donneesTest: Depense[] = [
    { id: '1', libelle: 'Loyer', montant: 420, date: '2026-10-05', categorie: 'Logement' },
    { id: '2', libelle: 'Courses', montant: 80, date: '2026-10-12', categorie: 'Alimentation' },
    { id: '3', libelle: 'Cinema', montant: 15, date: '2026-09-20', categorie: 'Loisirs' }
  ];

  const fakeDepensesSignal = signal(donneesTest);

  const fakeService = {
    depenses: {
      value: fakeDepensesSignal,
      isLoading: signal(false),
      error: signal(null),
      hasValue: signal(true),
      reload: function() {}
    }
  };

  beforeEach(async function() {
    await TestBed.configureTestingModule({
      imports: [DepenseList],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: DepensesService, useValue: fakeService }
      ]
    }).compileComponents();
  });

  it('calcule correctement le total des depenses du mois', function() {
    const fixture = TestBed.createComponent(DepenseList);
    const comp = fixture.componentInstance;

    comp.mois.set('2026-10');
    comp.categorie.set('');

    expect(comp.total()).toBe(500);
  });
});