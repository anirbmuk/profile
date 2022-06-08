import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import {
  AccordionModule,
  BlockModule,
  DirectiveModule,
  IconModule,
  LinkModule,
  PipeModule,
  ServiceModule,
  SkeletonModule,
  TimelineModule,
} from '@frontend/components';
import { AppComponent } from './app.component';
import { ErrorComponent, ErrorResolver } from './error';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { CareerComponent } from './sections/career/career.component';
import { EducationComponent } from './sections/education/education.component';
import { GithubComponent } from './sections/github/github.component';
import { HeadshotComponent } from './sections/headshot/headshot.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { TechstackComponent } from './sections/techstack/techstack.component';
import { PreviewModule, RatingModule } from './shared/components';

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
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      initialNavigation: 'enabledBlocking',
      scrollPositionRestoration: 'top',
    }),
    SkeletonModule,
    IconModule,
    ServiceModule,
    BlockModule,
    PipeModule,
    RatingModule,
    PreviewModule,
    LinkModule,
    DirectiveModule,
    AccordionModule,
    TimelineModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
