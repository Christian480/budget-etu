import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './shared/header/header';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header],
  template: `
    <app-header></app-header>
    <main style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {}
