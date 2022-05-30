import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SkeletonComponent } from '.';
import { PipeModule } from '../pipes';

@NgModule({
  declarations: [SkeletonComponent],
  imports: [CommonModule, PipeModule],
  exports: [SkeletonComponent],
})
export class SkeletonModule {}
