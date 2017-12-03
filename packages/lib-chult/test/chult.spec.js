const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

describe('The rain in chult', () => {
  var chult;
  var dieRoll;

  before(() => {
    chult = proxyquire('../lib/chult', {
      './dice': {
        d20: () => dieRoll
      }
    });
  });

  it('is sometimes dry', () => {
    [...Array(6).keys()].slice(1).forEach(i => {
      dieRoll = i;
      assert.equal('None', chult.rain());
    });
  });

  it('is sometimes light rain', () => {
    dieRoll = 6;
    assert.equal('Light', chult.rain());
  });

  it('is sometimes heavy rain', () => {
    dieRoll = 16;
    assert.equal('Heavy', chult.rain());
  });

  it('is sometimes a tropical storm', () => {
    const die = sinon.stub();
    die
      .onFirstCall().returns(16)
      .onSecondCall().returns(5);

    const chult = proxyquire('../lib/chult', {
      './dice': {
        d20: die
      }
    });

    assert.equal('Tropical storm', chult.rain());
  });
});

describe('The wind in Chult', () => {
  var chult;
  var dieRoll;

  before(() => {
    chult = proxyquire('../lib/chult', {
      './dice': {
        d20: () => dieRoll
      }
    });
  });

  it('is sometimes non-existent', () => {
    [...Array(13).keys()].slice(1).forEach(i => {
      dieRoll = i;
      assert.equal('None', chult.wind());
    });
  });

  it('is sometimes light', () => {
    [13, 14, 15, 16, 17].forEach(i => {
      dieRoll = i;
      assert.equal('Light', chult.wind());
    });
  });

  it('is sometimes strong', () => {
    [18, 19, 20].forEach(i => {
      dieRoll = i;
      assert.equal('Strong', chult.wind());
    });
  });
});
