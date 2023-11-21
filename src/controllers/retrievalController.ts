import { Context } from 'koa';
import { retrieveData } from '../services/retrievalService';
import { object, string } from 'zod';

interface RetrieveRequestBody {
    id: string;
    decryptionKey: string;
}

const retrieveReqSchema = object({
  id: string(),
  decryptionKey: string(),
});

export async function retrieveController(ctx: Context): Promise<void> {
  const validation = retrieveReqSchema.safeParse(ctx.request.body);
  if (!validation.success) {
    ctx.status = 400;
    ctx.body = { error: validation.error };
    return;
  }
  const { id, decryptionKey } = ctx.request.body as RetrieveRequestBody;
  const data = await retrieveData(id, decryptionKey);
  ctx.body = data;
}
