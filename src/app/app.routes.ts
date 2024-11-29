import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { catchAllResolver } from './landing-page/landing-page.resolver';

export const routes: Routes = [
  {
    path: '**',
    component: LandingPageComponent,
    resolve: { content: catchAllResolver }
  },
];
