import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BadgeCategorie } from './badge-categorie';

describe('BadgeCategorie', () => {
  let component: BadgeCategorie;
  let fixture: ComponentFixture<BadgeCategorie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BadgeCategorie],
    }).compileComponents();

    fixture = TestBed.createComponent(BadgeCategorie);
    component = fixture.componentInstance;
    
    // Fournir la valeur obligatoire de l'input avant la stabilisation
    fixture.componentRef.setInput('categorie', 'Alimentation');
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});