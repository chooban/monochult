import { d4, d20 } from './dice';

const lookup = (table, roll) => table
  .reduceRight((acc, cur) => {
    if (acc) {
      return acc;
    }
    return roll >= cur[0] ? cur[1] : undefined;
  }, undefined);

const rain = (roll = d20) => {
  const precipitationTable = [
    [1, 'None'],
    [6, 'Light'],
    [11, 'Medium'],
    [16, 'Heavy']
  ];

  if (roll() >= 16) {
    return roll() <= 5 ? 'Tropical storm' : 'Heavy';
  }
  return lookup(precipitationTable, roll());
};

const wind = (roll = d20) => {
  const windTable = [
    [1, 'None'],
    [13, 'Light'],
    [18, 'Strong']
  ];
  return lookup(windTable, roll());
};

// eslint-disable-next-line
const raincatcher = (rainLevel) => {
  const table = {
    None: 'None',
    Light: '0.1 gallon per hour',
    Medium: '1 gallon per hour',
    Heavy: '2 gallons per hour',
    'Tropical storm': '2 gallons per hour (might break)'
  };
  return table[rainLevel];
};

const temperature = () => {
  // eslint-disable-next-line
  const base = Math.round(32 + (d4() % 2 == 0 ? -1 : 1) * d4() / 2);
  const variance = d20();

  if (variance <= 14) {
    return base;
  }
  return (variance <= 16)
    ? base - (d4() * 3)
    : base + (d4() * 3);
};

const day = () => {
  const rainfall = rain();
  return {
    wind: wind(),
    rainfall,
    // raincatcher: raincatcher(rainfall),
    temperature: temperature()
  };
};

export {
  rain,
  wind,
  temperature,
  day
};
