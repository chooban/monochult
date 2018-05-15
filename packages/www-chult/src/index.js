'use strict';

import chult from "toa-chult";

export function http(request, response) {
  response.status(200).send(chult.day());
}

