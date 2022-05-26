import { Pipe } from '@angular/core';
import { PipeTransform } from '@nestjs/common';

@Pipe({
  name: 'feFillPipe',
})
export class FillNumberPipe implements PipeTransform {
  transform(value = 1): number[] {
    return (Array(value) as number[]).fill(value);
  }
}
