import { Pipe } from '@angular/core';
import { PipeTransform } from '@nestjs/common';

@Pipe({
  name: 'feFillPipe',
})
export class FillNumberPipe implements PipeTransform {
  transform(value: number | string = 1): number[] {
    return isNaN(+value) ? [] : (Array(+value) as number[]).fill(+value);
  }
}
