import { Context } from 'koa';
import { storeData } from '../services/storageService';
import { object, string, unknown } from 'zod';

interface StoreRequestBody {
  id: string;
  encryptionKey: string;
  value: any;
}

const storeReqSchema = object({
  id: string().min(1),
  encryptionKey: string().min(1, "Key for aes-128-cbc algorithm is required"),
  value: unknown(),
});

export async function storeController(ctx: Context): Promise<void> {
  const validation = storeReqSchema.safeParse(ctx.request.body);
  if (!validation.success) {
    ctx.status = 400;
    ctx.body = { error: validation.error.errors };
    return;
  }

  const { id, encryptionKey, value } = ctx.request.body as StoreRequestBody;

  await storeData(id, encryptionKey, value);

  ctx.status = 200;
}
