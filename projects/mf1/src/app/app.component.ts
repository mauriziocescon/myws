import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>{{ status() }}</div>`,
})
export class AppComponent {
  status = signal('Mf1 loaded!');
}
