import { stub, spy } from 'sinon';
import { http } from '../index';

describe('Getting a day in chult', () => {
  let status;
  let send;
  let res;

  beforeEach(() => {
    status = stub();
    send = spy();
    res = { status, send };
    status.returns(res);
  });

  it('returns the day', () => {
    http(null, res);
    expect(status.calledWith(200)).toBeTruthy();
    expect(send.calledOnce).toBeTruthy();
  });
});
