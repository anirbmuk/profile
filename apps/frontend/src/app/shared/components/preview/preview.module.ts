import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '@frontend/components';
import { ExtractNamePipe, PreviewComponent } from '.';

@NgModule({
  declarations: [PreviewComponent, ExtractNamePipe],
  imports: [CommonModule, IconModule],
  exports: [PreviewComponent],
})
export class PreviewModule {}
