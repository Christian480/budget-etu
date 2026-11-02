import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { DepenseCard } from './depense-card';

describe('DepenseCard', function() {
  it('affiche le libelle et le montant recu en input', async function() {
    await TestBed.configureTestingModule({
      imports: [DepenseCard],
      providers: [provideRouter([])]
    }).compileComponents();

    const fixture = TestBed.createComponent(DepenseCard);
    fixture.componentRef.setInput('depense', {
      id: '1',
      libelle: 'Loyer',
      montant: 420,
      date: '2026-10-05',
      categorie: 'Logement'
    });
    await fixture.whenStable();

    const texte = (fixture.nativeElement as HTMLElement).textContent;
    expect(texte).toContain('Loyer');
    expect(texte).toContain('420');
  });
});