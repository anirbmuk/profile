import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BlockComponent } from './block.component';

@NgModule({
  declarations: [BlockComponent],
  imports: [CommonModule],
  exports: [BlockComponent],
})
export class BlockModule {}
