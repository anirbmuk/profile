import { Pipe } from '@angular/core';
import { PipeTransform } from '@nestjs/common';

@Pipe({
  name: 'feExtractNamePipe',
})
export class ExtractNamePipe implements PipeTransform {
  transform(value: string | undefined): string | undefined {
    if (!value) {
      return;
    }
    const urlParts = value.split('/');
    const repo = urlParts?.pop();
    const author = urlParts?.pop();
    return `${author}/${repo}`;
  }
}
