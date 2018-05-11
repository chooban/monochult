import { randomInt } from 'mathjs';

const d4 = () => randomInt(1, 5);
const d20 = () => randomInt(1, 21);

export {
  d4,
  d20
};
