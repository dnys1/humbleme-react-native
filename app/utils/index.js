export const REMOVE_ME_LATER = '';

export const isEmpty = obj =>
  typeof obj === 'undefined' || Object.getOwnPropertyNames(obj).length === 0;
