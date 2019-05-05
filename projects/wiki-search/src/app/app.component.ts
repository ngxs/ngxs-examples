import { Component } from '@angular/core';

@Component({
  selector: 'one-root',
  template: `
    <one-search-article></one-search-article>
    <one-favorites></one-favorites>
    <one-content></one-content>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {}
