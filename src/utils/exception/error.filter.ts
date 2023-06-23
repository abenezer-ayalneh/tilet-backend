import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

export class ErrorCustomException extends HttpException {
  constructor(message: string, statusCode: HttpStatus, property: string) {
    super(
      {
        message,
        property,
      },
      statusCode,
    );
  }
}

@Catch(ErrorCustomException)
export class ErrorExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse<any>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: exception.getResponse()['message'],
      property: exception.getResponse()['property'],
    });
  }
}
