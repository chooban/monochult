const dice = require('./dice');

const lookup = (table, roll) => {
  return table
    .reduceRight((acc, cur) => {
      if (acc) {
        return acc;
      }
      return roll >= cur[0] ? cur[1] : undefined
    }, undefined);

};

const rain = () => {
  const precipitationTable = [
    [1, 'None'],
    [6, 'Light'],
    [11, 'Medium'],
    [16, 'Heavy']
  ];
  const roll = dice.d20();

  if (roll >= 16) {
    return dice.d20() <= 5 ? 'Tropical storm' : 'Heavy'
  }
  return lookup(precipitationTable, roll);
};

const wind = () => {
  const windTable = [
    [1, 'None'],
    [13, 'Light'],
    [18, 'Strong']
  ];
  return lookup(windTable, dice.d20());
};

const raincatcher = (rain) => {
  const table = {
    'None': 'None',
    'Light': '0.1 gallon per hour',
    'Medium': '1 gallon per hour',
    'Heavy': '2 gallons per hour',
    'Tropical storm': '2 gallons per hour (might break)'
  };
  return table[rain];
};

const temperature = () => {
  const base = Math.round(32 + (dice.d4() % 2 == 0 ? -1 : 1) * dice.d4() / 2);
  const variance = dice.d20();

  if (variance <= 14) {
    return base;
  }
  return (variance <= 16)
    ? base - dice.d4() * 3
    : base + dice.d4() * 3;
};

const day = () => {
  const rainfall = rain();
  return {
    wind: wind(),
    rainfall: rainfall,
    //raincatcher: raincatcher(rainfall),
    temperature: temperature()
  };
};

module.exports = {
  rain,
  wind,
  temperature,
  day
};
