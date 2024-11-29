import { ApplicationConfig, LOCALE_ID, Optional, provideZoneChangeDetection, REQUEST } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { Request } from 'express';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    {
      provide: LOCALE_ID,
      deps: [REQUEST],
      useFactory: (req: Request) => {
        // Server
        if (req) {
          const url = new URL(req.url);
          if (url.pathname.startsWith("/fr")) {
            return 'fr';
          }
        }

        // Client
        if (typeof window !== 'undefined' && window.location.pathname.startsWith("/fr")) {
          return "fr";
        }

        return "en";
      }
    }
  ]
};
