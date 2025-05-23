import convict from 'convict';
import validator from 'convict-format-with-validator';

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER:string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
}

convict.addFormat(validator.ipaddress);

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_HOST: {
    doc: 'Database host name/IP',
    format: 'ipaddress',
    default: '127.0.0.1',
    env: 'DB_HOST',
  },
  DB_USER: {
    doc: 'User name to connect to data base',
    format: String,
    env: 'DB_USER',
    default: null,
  },
  DB_PASSWORD: {
    doc: 'Password to connect to data base',
    format: String,
    env: 'DB_PASSWORD',
    default: null,
  },
  DB_PORT: {
    doc: 'Port to connect to data base',
    format: 'port',
    env: 'DB_PORT',
    default: '27017',
  },
  DB_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_NAME',
    default: 'six-cities'
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null
  },
});
