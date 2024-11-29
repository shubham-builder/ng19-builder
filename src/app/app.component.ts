import { DOCUMENT } from '@angular/common';
import { Component, inject, LOCALE_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
})
export class AppComponent {
  document = inject(DOCUMENT);
  locale = inject(LOCALE_ID);
  title = 'ngbuilder';

  ngOnInit() {
    // Set the lang attribute on the html element
    this.document.documentElement.lang = this.locale;
  }
}
