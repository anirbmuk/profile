import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BlockModule,
  IconModule,
  PipeModule,
  SanitizerModule,
  SkeletonModule,
} from '@frontend/components';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { GithubComponent } from './sections/github/github.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { TechstackComponent } from './sections/techstack/techstack.component';
import { RatingModule } from './shared/components/rating';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProfileComponent,
    TechstackComponent,
    GithubComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    SkeletonModule,
    IconModule,
    SanitizerModule,
    BlockModule,
    PipeModule,
    RatingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
