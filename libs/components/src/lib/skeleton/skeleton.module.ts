import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FillNumberPipe, SkeletonComponent } from '.';

@NgModule({
  declarations: [SkeletonComponent, FillNumberPipe],
  imports: [CommonModule],
  exports: [SkeletonComponent],
})
export class SkeletonModule {}
