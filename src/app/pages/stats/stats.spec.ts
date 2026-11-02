import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Stats } from './stats';

describe('Stats', () => {
  it('should create', () => {
    TestBed.configureTestingModule({
      imports: [Stats],
      providers: [provideHttpClient(), provideHttpClientTesting()]
    });
    const fixture = TestBed.createComponent(Stats);
    expect(fixture.componentInstance).toBeTruthy();
  });
});
