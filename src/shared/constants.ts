export const EMAIL_PATTERN = /^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
export const AVATAR_PATTERN = /(\W)(jpg|png)(\W)/;
export const MIN_USER_NAME_LENGTH = 1;
export const MAX_USER_NAME_LENGTH = 20;
export const MIN_PASSWORD_LENGTH = 6;
export const MAX_PASSWORD_LENGTH = 150;
export const DEFAULT_URI = 'mongodb://127.0.0.1:27018/six-cities';

export const DEFAULT_COMMENTS_COUNT = 50;
export enum SortType {
  Down = -1,
  Up = 1,
}

export const NUMBER_HALF_SEPARATOR = 2;
export const RATING_DECIMAL_PLACES_NUMBER = 1;
export const COMMENTS_INCREMENT = 1;
