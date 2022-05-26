import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProfileComponent } from './sections/profile/profile.component';
import { TechstackComponent } from './sections/techstack/techstack.component';
import { GithubComponent } from './sections/github/github.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, ProfileComponent, TechstackComponent, GithubComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
