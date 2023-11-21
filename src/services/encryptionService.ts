import crypto from 'crypto';

const algorithm = 'aes-128-cbc';
const key1 = crypto.createHash('sha256').update(String("secret")).digest('base64').slice(0, 16)
console.error(key1)
export function encrypt(data: string, key: string): string {
  const iv = crypto.randomBytes(16); // Generate a random initialization vector
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(data, 'utf-8', 'hex');
  encrypted += cipher.final('hex');
  return `${iv.toString('hex')}:${encrypted}`;
}

export function decrypt(encryptedData: string, key: string): string {
  const [ivHex, encryptedText] = encryptedData.split(':');
  const iv = Buffer.from(ivHex, 'hex');
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), iv);
  let decrypted = decipher.update(encryptedText, 'hex', 'utf-8');
  decrypted += decipher.final('utf-8');
  return decrypted;
}
