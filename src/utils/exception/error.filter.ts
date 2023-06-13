import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

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
    const i18n = I18nContext.current(host);
    const response = host.switchToHttp().getResponse<any>();

    response.status(exception.getStatus()).json({
      statusCode: exception.getStatus(),
      message: i18n.t(exception.getResponse()['message'], {
        lang: i18n.lang,
        args: { property: exception.getResponse()['property'] },
      }),
      property: exception.getResponse()['property'],
    });
  }
}
