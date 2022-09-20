import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';
import {
  AccordionModule,
  BlockModule,
  DirectiveModule,
  FeaturedblogModule,
  IconModule,
  LinkModule,
  PipeModule,
  ProgressBarModule,
  ScrollModule,
  ServiceModule,
  TimelineModule,
} from '@frontend/components';
import { TransferHttpCacheModule } from '@nguniversal/common';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { ErrorComponent, ErrorResolver } from './error';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home';
import { NotFoundComponent } from './not-found/not-found.component';
import { CareerComponent } from './sections/career/career.component';
import { EducationComponent } from './sections/education/education.component';
import { GithubComponent } from './sections/github/github.component';
import { HeadshotComponent } from './sections/headshot/headshot.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { TechstackComponent } from './sections/techstack/techstack.component';
import { PreviewModule, RatingModule } from './shared/components';
import { RequestInterceptor } from './shared/services';
import { BlogComponent } from './sections/blog/blog.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    pathMatch: 'full',
  },
  {
    path: 'about',
    loadChildren: () => import('./about').then((module) => module.AboutModule),
  },
  {
    path: 'error',
    component: ErrorComponent,
    resolve: {
      errorData: ErrorResolver,
    },
  },
  { path: 'notfound', component: NotFoundComponent },
  { path: '**', redirectTo: '/notfound', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    ErrorComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    TechstackComponent,
    GithubComponent,
    NotFoundComponent,
    HomeComponent,
    EducationComponent,
    HeadshotComponent,
    CareerComponent,
    BlogComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    TransferHttpCacheModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'top',
    }),
    ProgressBarModule,
    IconModule,
    ServiceModule.forRoot({
      gtmId: environment.gtmId,
    }),
    BlockModule,
    PipeModule,
    RatingModule,
    PreviewModule,
    LinkModule,
    DirectiveModule,
    AccordionModule,
    TimelineModule,
    ScrollModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    FeaturedblogModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
