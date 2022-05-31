import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LinkComponent } from '.';

@NgModule({
  declarations: [LinkComponent],
  imports: [CommonModule, RouterModule],
  exports: [LinkComponent],
})
export class LinkModule {}
