import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PipeModule } from '../pipes';
import { SkeletonComponent } from './skeleton.component';

@NgModule({
  declarations: [SkeletonComponent],
  imports: [CommonModule, PipeModule],
  exports: [SkeletonComponent],
})
export class SkeletonModule {}
