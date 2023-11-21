import { Context, Next } from 'koa';

export async function errorMiddleware(ctx: Context, next: Next): Promise<void> {
  try {
    await next();
  } catch (error ) {
    console.error('Error:', error);

    ctx.status = 500;
    ctx.body = {
      error: {
        message: (error as Error).message || 'Internal Server Error',
      },
    };
  }
}
