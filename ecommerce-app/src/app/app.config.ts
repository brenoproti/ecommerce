import {ApplicationConfig, importProvidersFrom} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi} from "@angular/common/http";
import {HeaderInterceptor} from "./core/auth.interceptor";

export const appConfig: ApplicationConfig = {
  providers: [
      provideRouter(routes),
      importProvidersFrom([BrowserAnimationsModule]),
      provideHttpClient(withInterceptorsFromDi()),
      {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
  ]
};
