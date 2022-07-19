import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DirectiveModule, IconModule } from '@frontend/components';
import { ArrayNamePipe } from './array-name.pipe';
import { ExtractNamePipe } from './extract-name.pipe';
import { PreviewComponent } from './preview.component';

@NgModule({
  declarations: [PreviewComponent, ExtractNamePipe, ArrayNamePipe],
  imports: [CommonModule, IconModule, DirectiveModule],
  exports: [PreviewComponent],
})
export class PreviewModule {}
