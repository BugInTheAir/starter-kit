import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { TranslateModule } from '@ngx-translate/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from '@env/environment';
import { RouteReusableStrategy, ApiPrefixInterceptor, ErrorHandlerInterceptor, SharedModule } from '@shared';
import { AuthModule } from '@app/auth';
import { HomeModule } from './home/home.module';
import { ShellModule } from './shell/shell.module';
import { AboutModule } from './about/about.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FileExplorerModule } from './file-explorer/file-explorer.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MsalModule,
  MsalService,
  MsalGuard,
  MsalInterceptor,
  MsalBroadcastService,
  MsalRedirectComponent,
} from '@azure/msal-angular';
import { PublicClientApplication, InteractionType, BrowserCacheLocation } from '@azure/msal-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { AuthInterceptor } from './@shared/http/auth.interceptor';

@NgModule({
  imports: [
    BrowserModule,
    ServiceWorkerModule.register('./ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    HttpClientModule,
    RouterModule,
    TranslateModule.forRoot(),
    NgbModule,
    SharedModule,
    ShellModule,
    FileExplorerModule,
    HomeModule,
    AboutModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    AuthModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    MsalModule.forRoot(
      new PublicClientApplication({
        // MSAL Configuration
        auth: {
          clientId: 'ad655c94-ed28-4751-ace6-d2c3c0973b22',
          authority: `https://login.microsoftonline.com/2dff09ac-2b3b-4182-9953-2b548e0d0b39`,
          redirectUri: 'http://localhost:4200/',
        },
        cache: {
          cacheLocation: BrowserCacheLocation.LocalStorage,
          storeAuthStateInCookie: true, // set to true for IE 11
        },
        system: {
          loggerOptions: {
            loggerCallback: () => {},
            piiLoggingEnabled: false,
          },
        },
      }),
      {
        interactionType: InteractionType.Redirect, // MSAL Guard Configuration
      },
      {
        interactionType: InteractionType.Redirect,
        protectedResourceMap: new Map([
          ['/api/*', ['api://ad655c94-ed28-4751-ace6-d2c3c0973b22/user_access']],
          ['http://localhost:4200/file-explorer/', null],
        ]),
      }
    ),
    AppRoutingModule, // must be imported as the last module as it contains the fallback route
  ],
  declarations: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
    {
      provide: RouteReuseStrategy,
      useClass: RouteReusableStrategy,
    },
    {
      provide: HTTP_INTERCEPTORS, // Provides as HTTP Interceptor
      useClass: MsalInterceptor,
      multi: true,
    },
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    MsalService,
    MsalGuard,
    MsalBroadcastService,
  ],
  bootstrap: [AppComponent, MsalRedirectComponent],
})
export class AppModule {}
