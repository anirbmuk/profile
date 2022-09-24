import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'feshorten',
})
export class TextShortenPipe implements PipeTransform {
  private readonly CARRIAGE_RETURN = '\n';
  private readonly WORD_COUNT_PER_CARRIAGE_RETURN = 60;
  private readonly MIN_CARRIAGE_RETURN_COUNT = 3;
  private readonly MAX_CARRIAGE_RETURN_COUNT = 9;

  transform(
    input: string | undefined,
    lengthToShortenTo = 100,
    ignoreCarriageReturn = true,
  ) {
    return this.getShortenedString(
      input,
      lengthToShortenTo,
      ignoreCarriageReturn,
    );
  }

  getShortenedString(
    input: string | undefined,
    lengthToShortenTo: number,
    ignoreCarriageReturn = true,
  ): string {
    if (!input) {
      return '';
    }
    if (!lengthToShortenTo) {
      return input;
    }
    let carriageReturnCount = 0;
    for (let i = 0; i < input.length; i++) {
      if (input.charAt(i) === this.CARRIAGE_RETURN) {
        carriageReturnCount++;
      }
    }
    const inputSize = input.length;
    if (carriageReturnCount > this.MAX_CARRIAGE_RETURN_COUNT) {
      carriageReturnCount = this.MAX_CARRIAGE_RETURN_COUNT;
    }

    // Assuming each carriage return substitutes for a min of 3 and max of 60 characters
    if (!ignoreCarriageReturn) {
      if (inputSize < carriageReturnCount * this.MIN_CARRIAGE_RETURN_COUNT) {
        lengthToShortenTo = carriageReturnCount * 2;
      } else {
        if (carriageReturnCount > 0) {
          carriageReturnCount = this.MIN_CARRIAGE_RETURN_COUNT;
        }
        lengthToShortenTo -=
          carriageReturnCount * this.WORD_COUNT_PER_CARRIAGE_RETURN;
      }
    }
    if (inputSize <= lengthToShortenTo) {
      return input;
    }
    return `${input.substring(0, lengthToShortenTo - 5)} ... `;
  }
}
