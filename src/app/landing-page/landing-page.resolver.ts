import { inject, LOCALE_ID } from '@angular/core';
import type { ActivatedRouteSnapshot, ResolveFn } from '@angular/router';
import { fetchOneEntry, getBuilderSearchParams } from '@builder.io/sdk-angular';

export const catchAllResolver: ResolveFn<any> = (
  route: ActivatedRouteSnapshot
) => {
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
  });
};
