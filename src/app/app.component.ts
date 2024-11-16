import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    :host {
      display: block;
      min-height: 100vh;
      background: linear-gradient(135deg, #FFB3DE 0%, #D9B3FF 100%);
    }
    main {
      padding: 20px;
      min-height: calc(100vh - 64px);
    }
  `]
})
export class AppComponent {}