import chult from '@chooban/toa-chult';

export function http(request, response) {
  response.status(200).send(chult.day());
}

