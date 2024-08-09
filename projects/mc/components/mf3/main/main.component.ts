import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
    AComponent,
    BComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Main</div>
    <button (click)="goToMf()">Go to mf2</button>
    <hr>
    <router-outlet/>`,
})
export class MainComponent {
  private router = inject(Router);

  goToMf(): void {
    this.router.navigateByUrl('/mf2');
  }
}
