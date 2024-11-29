import { HttpClient } from '@angular/common/http';
import { inject, LOCALE_ID } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-angular';
import { firstValueFrom } from 'rxjs';

export const catchAllResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
  const http = inject(HttpClient);
  const locale = inject(LOCALE_ID);

  const urlPath = `/${route.url.join('/')}`;
  const searchParams = getBuilderSearchParams(route.queryParams);

  return fetchOneEntry({
    apiKey: 'bc692bc2e70e4774b3065ec0248cb7a9',
    model: 'page',
    locale,
    userAttributes: {
      urlPath,
    },
    options: searchParams,
    fetch: async (url, init: any) => {  // todo: change into utility function... `httpClientFetch(http)`
      const headers = init?.headers;
      const resp = await firstValueFrom(http.get(url, { observe: 'response', responseType: 'text', headers }));

      const headersInit: HeadersInit = {};
      resp.headers.keys().forEach((key) => {
        const val = resp.headers.get(key);
        if (val) {
          headersInit[key] = val;
        }
      });

      return new Response(resp.body, { status: resp.status, statusText: resp.statusText, headers: headersInit });
    }
  });
};
