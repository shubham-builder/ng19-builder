
import { CommonModule } from '@angular/common';
import { Component, inject, RESPONSE_INIT } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Content, type BuilderContent } from '@builder.io/sdk-angular';

import { CUSTOM_COMPONENTS } from '../builder-registry';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [Content, CommonModule],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css'
})

export class LandingPageComponent {
  customComponents = CUSTOM_COMPONENTS;
  apiKey = 'bc692bc2e70e4774b3065ec0248cb7a9';
  model = 'page';
  content: BuilderContent | null = null;
  response = inject(RESPONSE_INIT, { optional: true })

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe((data: any) => {
      this.content = data.content;

      if (!data.content && this.response) {
        this.response.status = 404;
      }
    });
  }

}
