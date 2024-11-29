import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div>Path not matching any predefined route</div>`,
})
export class PageNotFound {
}
