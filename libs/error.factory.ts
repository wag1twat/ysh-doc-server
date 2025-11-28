import { HttpException, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { has } from 'es-toolkit/compat';
import { isRpcException } from './guards';
import { QueryFailedError } from 'typeorm';
import { isString } from 'es-toolkit';

export class ErrorFactory {
  static errors = {
    400: 'Bad Request',
    401: 'Unauthorized',
    402: 'Payment Required',
    403: 'Forbidden',
    404: 'Not Found',
    405: 'Method Not Allowed',
    406: 'Not Acceptable',
    407: 'Proxy Authentication Required',
    408: 'Request Timeout',
    409: 'Conflict',
    410: 'Gone',
    411: 'Length Required',
    412: 'Precondition Failed',
    413: 'Payload Too Large',
    414: 'URI Too Long',
    415: 'Unsupported Media Type',
    416: 'Range Not Satisfiable',
    417: 'Expectation Failed',
    418: "I'm a teapot",
    421: 'Misdirected Request',
    422: 'Unprocessable Entity',
    423: 'Locked',
    424: 'Failed Dependency',
    425: 'Too Early',
    426: 'Upgrade Required',
    428: 'Precondition Required',
    429: 'Too Many Requests',
    431: 'Request Header Fields Too Large',
    451: 'Unavailable For Legal Reasons',
    500: 'Internal Server Error',
    501: 'Not Implemented',
    502: 'Bad Gateway',
    503: 'Service Unavailable',
    504: 'Gateway Timeout',
    505: 'HTTP Version Not Supported',
    506: 'Variant Also Negotiates',
    507: 'Insufficient Storage',
    508: 'Loop Detected',
    510: 'Not Extended',
    511: 'Network Authentication Required',
  };

  static messages = {
    INVALID_CREDENTIALS: 'Invalid credentials',
    EMPTY_BODY: 'Empty body',
  };

  static switchTo(error: unknown, type: 'HTTP'): HttpException;
  static switchTo(error: unknown, type: 'RPC'): RpcException;
  static switchTo(
    error: unknown,
    type: 'HTTP' | 'RPC',
  ): HttpException | RpcException {
    const response: { status: HttpStatus; message: string } = {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Unhandled Rejection',
    };

    const ret = () => {
      switch (type) {
        case 'HTTP':
          return this.http(response.status as never, response.message);
        case 'RPC':
          return this.rpc(response.status as never, response.message);
        default:
          return this.http(response.status as never, response.message);
      }
    };

    if (error instanceof RpcException) {
      const ex = error.getError();

      console.log(ex);

      if (isRpcException(ex)) {
        response.status = ex.status;
        response.message = ex.message;
        return ret();
      }
    }

    if (isRpcException(error)) {
      response.status = error.status;
      response.message = error.message;
      return ret();
    }

    if (error instanceof QueryFailedError) {
      response.status = HttpStatus.BAD_REQUEST;
      response.message =
        has(error, 'detail') && isString(error.detail)
          ? error.detail
          : this.errors[HttpStatus.BAD_REQUEST];

      return ret();
    }

    if (error instanceof HttpException) {
      const ex = error.getResponse();

      if (has(ex, 'statusCode') && has(ex, 'message')) {
        response.status = ex.statusCode;
        response.message = ex.message as never;
        return ret();
      }

      if (has(ex, 'status') && has(ex, 'message')) {
        response.status = ex.status
          ? ex.status
          : HttpStatus.INTERNAL_SERVER_ERROR;
        response.message = ex.message as never;
        return ret();
      }
    }
    if (error instanceof Error) {
      response.status = HttpStatus.INTERNAL_SERVER_ERROR;
      response.message = error.message;
      return ret();
    }
    return ret();
  }

  static http(code: keyof (typeof ErrorFactory)['errors'], message: unknown) {
    const response = this.factoryResponse(code, message);
    return new HttpException(
      {
        ...response,
        type: 'HTTP',
      },
      response.status,
    );
  }

  static rpc(code: keyof (typeof ErrorFactory)['errors'], message: unknown) {
    const response = this.factoryResponse(code, message);
    return new RpcException({
      ...response,
      type: 'RPC',
    });
  }

  private static factoryResponse(
    code: keyof (typeof ErrorFactory)['errors'],
    message: unknown,
  ) {
    return {
      status: code,
      error: this.errors[code] || `${code}`,
      message,
      timestamp: this.timestamp(),
    };
  }

  private static timestamp() {
    return new Date().toISOString();
  }
}
