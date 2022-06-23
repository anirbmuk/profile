import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlurDirective } from './blur.directive';
import { HoverDirective } from './hover.directive';
import { TrackableDirective } from './trackable.directive';

@NgModule({
  declarations: [TrackableDirective, HoverDirective, BlurDirective],
  imports: [CommonModule],
  exports: [TrackableDirective, HoverDirective, BlurDirective],
})
export class DirectiveModule {}
