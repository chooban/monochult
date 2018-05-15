import { http } from '../index'
import { stub, spy } from 'sinon'

describe("Getting a day in chult", () => {
  let status, send, res;
  
  beforeEach(() => {
    status = stub()
    send = spy()
    res = { status, send }
    status.returns(res)
  })
 
  it("returns the day", () => {
    http(null, res)
    expect(status.calledWith(200)).toBeTruthy()
    expect(send.calledOnce).toBeTruthy()
  })
})
