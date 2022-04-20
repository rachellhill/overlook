import chai from 'chai';
const expect = chai.expect;
import Customer from '../src/classes/Customer';
import Booking from '../src/classes/Booking';
import { customers, rooms, bookings } from './data.js'

describe('Customer', () => {

  let customer1;
  let customer2;
  let customer3;
  let customersData;

  beforeEach(() => {
    customersData = customers;
    customer1 = new Customer(customersData[0]);
    customer2 = new Customer(customersData[1]);
    customer3 = new Customer(customersData[2]);
  });

  it('should be a function', () => {
    expect(Customer).to.be.a('function');
  });

  it('should be an instance of a Customer', () => {
    expect(customer1).to.be.an.instanceof(Customer);
  });

  it('should have an id', () => {
    expect(customer1.id).to.equal(1);
  });

  it('should have a name', () => {
    expect(customer1.name).to.equal("Leatha Ullrich");
  })

  
})
