import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Main</div>
    <button (click)="goToMf()">Go to mf4</button>`,
})
export class MainComponent {
  private router = inject(Router);

  goToMf(): void {
    this.router.navigateByUrl('/mf4');
  }
}
