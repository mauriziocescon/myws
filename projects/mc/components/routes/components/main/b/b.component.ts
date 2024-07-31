import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-b',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h5>BComponent</h5>
    <button (click)="goToB()">Go to a</button>
    <button (click)="goToMf1()">Go to mf4</button>`,
})
export class BComponent {
  private router = inject(Router);

  goToB(): void {
    this.router.navigateByUrl('/mf3/a');
  }

  goToMf1(): void {
    this.router.navigateByUrl('/mf4');
  }
}
