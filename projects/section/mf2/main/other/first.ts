import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [
    RouterLink,
  ],
  template: `
    <div class="sub-page">
      <span class="sub-badge">MF2 / First</span>
      <a class="link" [routerLink]="link()">Go to mf1</a>
      <a class="link" [routerLink]="link2()">Go to mf2/b</a>
    </div>
  `,
  styles: `
    .sub-page {
      border-left: 3px solid #388e3c;
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      background: #e8f5e9;
      border-radius: 0 4px 4px 0;
    }

    .sub-badge {
      display: inline-block;
      background: #388e3c;
      color: #fff;
      font-weight: bold;
      font-size: 0.7rem;
      padding: 0.15rem 0.4rem;
      border-radius: 3px;
      margin-right: 0.5rem;
    }

    .link {
      padding: 0.3rem;
      color: #388e3c;
    }
  `,
})
export class First {
  protected readonly link = signal('/mf1');
  protected readonly link2 = signal('/mf2/b');
}
