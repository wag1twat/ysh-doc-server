import { z } from 'zod/v4';

const rpcException = z.object({
  status: z.number(),
  message: z.string(),
  error: z.string(),
  type: z.literal('RPC'),
  timestamp: z.string(),
});

type RpcException = z.infer<typeof rpcException>;

export const isRpcException = (arg: unknown): arg is RpcException => {
  const { success } = rpcException.safeParse(arg);

  return success;
};
