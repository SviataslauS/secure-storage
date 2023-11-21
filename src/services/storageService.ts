import { knex } from '../database';
import { encrypt } from './encryptionService';

export async function storeData(id: string, encryptionKey: string, value: any): Promise<void> {
  const encryptedValue = encrypt(JSON.stringify(value), encryptionKey);

  await knex('secure_data').insert({
    id,
    value: encryptedValue,
  })
  .onConflict('id')
  .merge();
}
