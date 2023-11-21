import { knex } from '../database';
import { decrypt } from './encryptionService';

export async function retrieveData(id: string, decryptionKey: string): Promise<any[]> {
  const result = await knex('secure_data').select('value').where('id', id);
  
  if (result.length === 0) {
    return [];
  }

  try {
    const decryptedValue = decrypt(result[0].value, decryptionKey);
    return [JSON.parse(decryptedValue)];
  } catch (error) {
    console.error(`Error decrypting data for id ${id}: ${(error as Error).message}`);
    return [];
  }
}
