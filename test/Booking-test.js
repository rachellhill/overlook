import chai from 'chai';
const expect = chai.expect;
import Booking from '../src/classes/Booking';
import { customers, roomSampleData, bookingSampleData } from './data.js'

describe('Booking', () => {
  let bookings;
  let booking1;
  let booking2;

  beforeEach(() => {
    bookings = bookingSampleData
    booking1 = new Booking(bookings[0])
    booking2 = new Booking(bookings[1])
  });

  it('should be a function', () => {
    expect(Booking).to.be.a('function');
  });

  it('should be an instance of a Booking', () => {
    expect(booking1).to.be.an.instanceof(Booking);
    expect(booking2).to.be.an.instanceof(Booking);
  });

  it('should have an id', () => {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6t8");
    expect(booking2.id).to.equal("5fwrgu4i7k55hl6uy");
  });

  it('should have an user id', () => {
    expect(booking1.userID).to.equal(1);
    expect(booking2.userID).to.equal(2);
  });

  it('should have a date', () => {
    expect(booking1.date).to.equal("2022/02/05");
    expect(booking2.date).to.equal("2022/01/24");
  });

  it('should have a room number', () => {
    expect(booking1.roomNumber).to.equal(12);
    expect(booking2.roomNumber).to.equal(19);
  });

});
