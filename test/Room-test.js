import chai from 'chai';
const expect = chai.expect;
import Room from '../src/classes/Room';
import { customers, roomSampleData, bookingSampleData } from './data.js'

describe('Room', () => {
  let rooms;
  let roomReservation1;
  let roomReservation2;

  beforeEach(() => {
    rooms = roomSampleData;
    roomReservation1 = new Room(rooms[0]);
    roomReservation2 = new Room(rooms[1]);
  })

  it('should be a function', () => {
    expect(Room).to.be.a('function');
  });

  it('should be an instance of a Room', () => {
    expect(roomReservation1).to.be.an.instanceof(Room);
    expect(roomReservation2).to.be.an.instanceof(Room);
  });

  it('should have a room number', () => {
    expect(roomReservation1.number).to.equal(12);
    expect(roomReservation2.number).to.equal(19);
  });

  it('should have a room type', () => {
    expect(roomReservation1.roomType).to.equal("single room");
    expect(roomReservation2.roomType).to.equal("single room");
  });

  it('should have know if it has a bidet or not', () => {
    expect(roomReservation1.bidet).to.equal(false);
    expect(roomReservation2.bidet).to.equal(false);
  });

  it('should know the number of beds the room has', () => {
    expect(roomReservation1.numBeds).to.equal(2);
    expect(roomReservation2.numBeds).to.equal(1);
  });

  it('should have a cost per night', () => {
    expect(roomReservation1.costPerNight).to.equal(172.09);
    expect(roomReservation2.costPerNight).to.equal(374.67);
  });
})
