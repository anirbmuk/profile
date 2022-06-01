import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { TrackableDirective } from './trackable.directive';

@NgModule({
  declarations: [TrackableDirective],
  imports: [CommonModule],
  exports: [TrackableDirective],
})
export class DirectiveModule {}
