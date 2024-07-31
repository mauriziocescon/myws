import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-routes',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Just a wildcard for mis-matches</div>`,
})
export class FallbackComponent {
}
