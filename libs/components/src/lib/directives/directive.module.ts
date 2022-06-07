import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HoverDirective } from './hover.directive';
import { TrackableDirective } from './trackable.directive';

@NgModule({
  declarations: [TrackableDirective, HoverDirective],
  imports: [CommonModule],
  exports: [TrackableDirective, HoverDirective],
})
export class DirectiveModule {}
