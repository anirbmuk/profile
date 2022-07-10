import { HttpException, HttpStatus } from '@nestjs/common';
import { GENERIC_ERROR } from './message';

export class GenericException extends HttpException {
  constructor(customMessage?: string) {
    const message = customMessage
      ? `${GENERIC_ERROR}: ${customMessage.trim()}`
      : GENERIC_ERROR;
    super(message, HttpStatus.INTERNAL_SERVER_ERROR);
  }
}
