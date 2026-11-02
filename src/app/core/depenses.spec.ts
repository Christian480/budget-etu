import { TestBed } from '@angular/core/testing';
import { DepensesService } from './depenses';
import { provideHttpClient } from '@angular/common/http';

describe('DepensesService', function() {
  let service: DepensesService;

  beforeEach(function() {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), DepensesService]
    });
    service = TestBed.inject(DepensesService);
  });

  it('initialise le budget mensuel a 700', function() {
    expect(service.budgetMensuel()).toBe(700);
  });
});