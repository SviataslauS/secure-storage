import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import dotenv from 'dotenv';
import { storeController } from './controllers/storageController';
import { retrieveController } from './controllers/retrievalController';
import { errorMiddleware } from './middlewares/errorMiddleware';
import { knex } from './database';

function uncaughtErrorListener(errorName: string): NodeJS.UncaughtExceptionListener {
  return (error: Error): void => {
    console.error(errorName, error.message);
    process.exit(1);
  };
}
function subscribeToUncaughtErrors(): void {
  process.on('uncaughtException', uncaughtErrorListener('Uncaught Exception:'));
  process.on('unhandledRejection', uncaughtErrorListener('Unhandled Rejection:'));
}

dotenv.config();
subscribeToUncaughtErrors();

const app = new Koa();
const router = new Router();

router.post('/store', storeController);
router.post('/retrieve', retrieveController);

app.use(bodyParser());
app.use(errorMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await knex.migrate.latest();
  console.log(`Server running on port ${PORT}`);
});
