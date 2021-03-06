import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule, PipeModule } from '@frontend/components';
import { RatingComponent } from './rating.component';

@NgModule({
  declarations: [RatingComponent],
  imports: [CommonModule, IconModule, PipeModule],
  exports: [RatingComponent],
})
export class RatingModule {}
