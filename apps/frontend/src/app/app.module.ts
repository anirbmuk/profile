import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  BlockModule,
  IconModule,
  LinkModule,
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
import { PreviewModule, RatingModule } from './shared/components';

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
    PreviewModule,
    LinkModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
