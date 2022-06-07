import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonModule } from '@frontend/components';
import { AboutComponent } from '.';

const aboutRoutes: Routes = [{ path: '', component: AboutComponent }];

@NgModule({
  declarations: [AboutComponent],
  imports: [CommonModule, RouterModule.forChild(aboutRoutes), SkeletonModule],
  exports: [RouterModule],
})
export class AboutModule {}
