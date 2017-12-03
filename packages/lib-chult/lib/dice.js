const randomInt = require('mathjs').randomInt;

const d4 = () => randomInt(1, 5);
const d20 = () => randomInt(1, 21);

module.exports = {
  d4,
  d20
}
