import { ErrorFactory } from './error.factory';

export function RpcQueryCatch() {
  return function <T>(
    target: T,
    propertyName: keyof T,
    descriptor: TypedPropertyDescriptor<(...args: any[]) => Promise<any>>,
  ): TypedPropertyDescriptor<(...args: any[]) => Promise<any>> | void {
    const originalMethod = descriptor.value;

    if (!originalMethod) {
      return descriptor;
    }

    descriptor.value = async function (
      this: any,
      ...args: any[]
    ): Promise<any> {
      try {
        return await originalMethod.apply(this, args);
      } catch (error: unknown) {
        throw ErrorFactory.switchTo(error, 'RPC');
      }
    };

    return descriptor;
  };
}
