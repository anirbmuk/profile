import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FillNumberPipe } from './fill.pipe';

@NgModule({
  declarations: [FillNumberPipe],
  imports: [CommonModule],
  exports: [FillNumberPipe],
})
export class PipeModule {}
