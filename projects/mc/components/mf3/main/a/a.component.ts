import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-a',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>AComponent</h5>
    <button (click)="goToB()">Go to b</button>
    <button (click)="goToMf()">Go to mf2</button>`,
})
export class AComponent {
  private router = inject(Router);

  goToB(): void {
    this.router.navigateByUrl('/mf3/b');
  }

  goToMf(): void {
    this.router.navigateByUrl('/mf2');
  }
}
