import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import { customers, rooms, bookingSampleData } from './data.js'

describe('Customer', () => {

  let customer1;
  let customer2;
  let customer3;
  let customersData;
  let bookings;

  beforeEach(() => {
    customersData = customers;
    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
    customer3 = new Customer(customersData[2]);
    bookings = bookingSampleData;
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', () => {
    expect(customer1).to.be.an.instanceof(Customer);
    expect(customer2).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
    expect(customer2.name).to.equal("Rocio Schuster");
  })

  it('should be able show a customers bookings', () => {
    customer1.getCustomerBookings(bookings)
    expect(customer1.roomsBooked).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6t8",
        userID: 1,
        date: "2022/02/05",
        roomNumber: 12
      }
    ]);

    customer2.getCustomerBookings(bookings)
    expect(customer2.roomsBooked).to.deep.equal([
      {
        id: "5fwrgu4i7k55hl6uy",
        userID: 2,
        date: "2022/01/24",
        roomNumber: 19
      },
      {
        id: "5fwrgu4i7k55hl6vw",
        userID: 2,
        date: "2022/02/11",
        roomNumber: 9
      }
    ])
  })

  it('should let the customer know if they do not have any bookings', () => {
    expect(customer3.getCustomerBookings(bookings)).to.equal(`You do not have any reservations with the Overlook Hotel`);
  })
})
