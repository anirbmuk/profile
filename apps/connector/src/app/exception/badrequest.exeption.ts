import { HttpException, HttpStatus } from '@nestjs/common';
import { BAD_REQUEST } from './message';

export class BadRequestException extends HttpException {
  constructor(customMessage?: string) {
    const message = customMessage
      ? `${BAD_REQUEST}: ${customMessage.trim()}`
      : BAD_REQUEST;
    super(message, HttpStatus.BAD_REQUEST);
  }
}
