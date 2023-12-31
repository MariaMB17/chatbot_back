import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  ExecutionContext,
  HttpException,
} from '@nestjs/common';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  catch(
    exception:
      HttpException
      | PrismaClientKnownRequestError
      | PrismaClientValidationError,
    host: ArgumentsHost,
  ) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    const executionContext = host.switchToRpc().getContext<ExecutionContext>();

    let status = 500;
    let message: string = exception.message;

    if (exception instanceof HttpException) {
      status = exception.getStatus();
      const result = exception.getResponse();
      message = typeof result === 'string' ? result : JSON.stringify(result);
    } else if (
      exception.name === 'PrismaClientValidationError' ||
      exception.name === 'PrismaClientKnownRequestError'
    ) {
      status = 400;
      message = exception.message;
    }

    const errorResponse = {
      statusCode: status,
      path: request.url,
      error: message
        .substring(message.indexOf('\n'))
        .replace(/\n{2,}/g, '\n')
        .replace(/\n{1,}/g, '')
        .trim(),
      executionContext: executionContext, // Agregado al objeto de respuesta
    };
    response.status(status).json(errorResponse);
  }
}