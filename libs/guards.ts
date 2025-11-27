import { HttpException } from '@nestjs/common';
import { isString } from 'es-toolkit';
import { has, isNumber, isObject } from 'es-toolkit/compat';

interface RpcException {
  status: number;
  message: string;
  error: string;
  type: 'RPC';
}

export const isRpcException = (arg: unknown): arg is RpcException => {
  return (
    isObject(arg) &&
    !Array.isArray(arg) &&
    has(arg, 'status') &&
    isNumber(arg.status) &&
    has(arg, 'message') &&
    isString(arg.message) &&
    has(arg, 'error') &&
    isString(arg.error) &&
    has(arg, 'type') &&
    arg.type === 'RPC' &&
    !(arg instanceof HttpException)
  );
};
