import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FillNumberPipe } from './fill.pipe';
import { TextShortenPipe } from './text-shorten.pipe';

@NgModule({
  declarations: [FillNumberPipe, TextShortenPipe],
  imports: [CommonModule],
  exports: [FillNumberPipe, TextShortenPipe],
})
export class PipeModule {}
