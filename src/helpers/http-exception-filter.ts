import {
  Catch,
  ExceptionFilter,
  HttpException,
  ArgumentsHost,
} from '@nestjs/common';
import { ValidationError } from 'class-validator';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const message = exception.getResponse() as
        | string
        | { message: string; error: ValidationError[] };

      if (typeof message === 'string') {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message,
        });
      } else {
        response.status(status).json({
          statusCode: status,
          timestamp: new Date().toISOString(),
          path: request.url,
          message: message.message,
          error: message.error,
        });
      }
    }
    if (exception instanceof ValidationError) {
      const errors = exception['errors'];
      const messages = [];

      for (const key in errors) {
        if (errors.hasOwnProperty(key)) {
          for (const error of errors[key]) {
            messages.push(error);
          }
        }
      }

      response.status(400).json({
        statusCode: 400,
        message: 'Validation failed',
        errors: messages,
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    } else {
      const status = exception.getStatus();
      const exceptionResponse = exception.getResponse();

      response.status(status).json({
        statusCode: status,
        message: exceptionResponse['message'],
        timestamp: new Date().toISOString(),
        path: request.url,
      });
    }
  }
}
