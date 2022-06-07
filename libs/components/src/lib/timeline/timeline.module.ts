import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectiveModule } from './../directives/directive.module';
import { TimelineComponent } from './timeline.component';

@NgModule({
  declarations: [TimelineComponent],
  imports: [CommonModule, DirectiveModule],
  exports: [TimelineComponent],
})
export class TimelineModule {}
