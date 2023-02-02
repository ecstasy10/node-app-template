'use strict';

export function capitalizeAndUnderscore (str) {
  return str.replace(/([A-Z])/g, '_$1').toUpperCase();
}

export function requestEntity (req) {
  return req.url.split('/')?.at(1).replace(/([A-Z])/g, '_$1').toUpperCase();
}