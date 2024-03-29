import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import { customers, roomSampleData, bookingSampleData } from './data.js'

describe('Customer', () => {

  let customer1;
  let customer2;
  let customer3;
  let customersData;
  let bookings;
  let rooms;

  beforeEach(() => {
    customersData = customers;
    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
    customer3 = new Customer(customersData[2]);
    bookings = bookingSampleData;
    rooms = roomSampleData;
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
    ]);
  });

  it('should let the customer know if they do not have any bookings', () => {
    expect(customer3.getCustomerBookings(bookings)).to.equal(`You do not have any reservations with the Overlook Hotel`);
  });

  it('should calculate total cost that a customer has spent on rooms at the Overlook', () => {
    customer1.getCustomerBookings(bookings)
    customer1.calculateTotalSpent(rooms)
    expect(customer1.totalSpent).to.equal(172.09);

    customer2.getCustomerBookings(bookings)
    customer2.calculateTotalSpent(rooms)
    expect(customer2.totalSpent).to.equal(575.06);
  });

  it('should return a total cost of 0 if a user has no bookings with the hotel', () => {
    customer3.getCustomerBookings(bookings)
    customer3.calculateTotalSpent(rooms)
    expect(customer3.totalSpent).to.equal(0);
  });

  it('should have a method that stores all of the rooms a customer has booked', () => {
    customer1.getCustomerBookings(bookings);
    customer1.getAllRooms(rooms);
    expect(customer1.allRooms).to.deep.equal([
      {
        number: 12,
        roomType: "single room",
        bidet: false,
        bedSize: "twin",
        numBeds: 2,
        costPerNight: 172.09,
        date: "2022/02/05"
      }
    ]);
  });

  it('should ensure that a customer that has no bookings has no rooms', () => {
    customer3.getCustomerBookings(bookings);
    customer3.getAllRooms(rooms);
    expect(customer3.allRooms).to.deep.equal([])
  });

  it('should sort dates of booked rooms', () => {
    customer2.getCustomerBookings(bookings);
    customer2.getAllRooms(rooms);
    customer2.sortDates();
    expect(customer2.sortedBookings).to.deep.equal([
      {
        number: 9,
        roomType: "single room",
        bidet: true,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 200.39,
        date: "2022/02/11"
      },
      {
        number: 19,
        roomType: "single room",
        bidet: false,
        bedSize: "queen",
        numBeds: 1,
        costPerNight: 374.67,
        date: "2022/01/24"
      }
    ]);
  });
});
