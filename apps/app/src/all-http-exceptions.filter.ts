import { Catch, ExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Response } from 'express';
import { ErrorFactory } from 'libs/error.factory';

@Catch()
export class AllHttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const normalized = ErrorFactory.switchTo(exception, 'HTTP');

    return response
      .status(normalized.getStatus())
      .json(normalized.getResponse());
  }
}
