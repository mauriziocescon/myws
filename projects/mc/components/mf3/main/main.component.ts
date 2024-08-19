import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MfLoaderComponent } from '@mc/integration/mf-loader';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    RouterLink,
    MfLoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h3>Mf3</h3>
    <a class="link" [routerLink]="link()">Go to mf2</a>
    <hr>
    <mc-mf-loader [mf]="mf()"/>`,
  styles: `
    .link {
      padding: 0.3rem;
    }`,
})
export class MainComponent {
  link = signal('/mf2');
  mf = signal({ elementId: 'mf4', tag: 'mf4-v18' });
}
