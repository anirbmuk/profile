import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feArrayNamePipe',
})
export class ArrayNamePipe implements PipeTransform {
  transform(value: string[] | undefined): string {
    if (!value) {
      ('');
    }
    return value?.join(', ') ?? '';
  }
}
