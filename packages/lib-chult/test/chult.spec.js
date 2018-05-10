import { equal } from "assert";
import { stub } from "sinon";
import proxyquire from "proxyquire";

describe('The rain in chult', () => {
  var chult;
  var dieRoll;

  before(() => {
    chult = proxyquire('../src/lib/chult', {
      './dice': {
        d20: () => dieRoll
      }
    });
  });

  it('is sometimes dry', () => {
    [...Array(6).keys()].slice(1).forEach(i => {
      dieRoll = i;
      equal('None', chult.rain());
    });
  });

  it('is sometimes light rain', () => {
    dieRoll = 6;
    equal('Light', chult.rain());
  });

  it('is sometimes heavy rain', () => {
    dieRoll = 16;
    equal('Heavy', chult.rain());
  });

  it('is sometimes a tropical storm', () => {
    const die = stub();
    die
      .onFirstCall().returns(16)
      .onSecondCall().returns(5);

    const chult = proxyquire('../src/lib/chult', {
      './dice': {
        d20: die
      }
    });

    equal('Tropical storm', chult.rain());
  });
});

describe('The wind in Chult', () => {
  var chult;
  var dieRoll;

  before(() => {
    chult = proxyquire('../src/lib/chult', {
      './dice': {
        d20: () => dieRoll
      }
    });
  });

  it('is sometimes non-existent', () => {
    [...Array(13).keys()].slice(1).forEach(i => {
      dieRoll = i;
      equal('None', chult.wind());
    });
  });

  it('is sometimes light', () => {
    [13, 14, 15, 16, 17].forEach(i => {
      dieRoll = i;
      equal('Light', chult.wind());
    });
  });

  it('is sometimes strong', () => {
    [18, 19, 20].forEach(i => {
      dieRoll = i;
      equal('Strong', chult.wind());
    });
  });
});
