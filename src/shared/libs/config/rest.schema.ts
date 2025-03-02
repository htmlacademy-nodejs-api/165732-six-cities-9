import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB: string;
}

convict.addFormat(validator.ipaddress);

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  DB: {
    doc: 'Database host name/IP',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB',
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
});
