import NodeRsa from 'node-rsa';
import config from '@/config';

const encryptor = new NodeRsa(config.publicKey);

export default function asymmetricEncrypt (str) {
  return encryptor.encrypt(str, 'base64', 'utf8');
}
