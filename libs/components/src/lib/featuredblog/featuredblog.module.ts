import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ServiceModule } from './../services';
import { FeaturedblogComponent } from './featuredblog.component';

@NgModule({
  declarations: [FeaturedblogComponent],
  imports: [CommonModule, HttpClientModule, ServiceModule],
  exports: [FeaturedblogComponent],
})
export class FeaturedblogModule {}
