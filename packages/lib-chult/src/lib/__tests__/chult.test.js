import { stub } from "sinon";
import * as chult from "../chult";

const identity = (v) => () => v;

describe('The rain in chult', () => {

  it('is sometimes dry', () => {
    [...Array(6).keys()].slice(1).forEach(i => {
      expect(chult.rain(identity(i))).toBe('None');
    });
  });

  it('is sometimes light rain', () => {
    expect(chult.rain(identity(6))).toBe('Light');
  });

  it('is sometimes heavy rain', () => {
    expect(chult.rain(identity(16))).toBe('Heavy');
  });

  it('is sometimes a tropical storm', () => {
    const roll = stub();
    roll.onCall(0).returns(20);
    roll.onCall(1).returns(1);

    expect(chult.rain(roll)).toBe('Tropical storm');
  });
});

describe('The wind in Chult', () => {
  it('is sometimes non-existent', () => {
    [...Array(13).keys()].slice(1).forEach(i => {
      expect(chult.wind(identity(i))).toEqual('None');
    });
  });

  it('is sometimes light', () => {
    [13, 14, 15, 16, 17].forEach(i => {
      expect(chult.wind(identity(i))).toEqual('Light');
    });
  });

  it('is sometimes strong', () => {
    [18, 19, 20].forEach(i => {
      expect(chult.wind(identity(i))).toBe('Strong');
    });
  });
});
