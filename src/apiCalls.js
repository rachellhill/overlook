import { currentCustomer, refreshBookings } from "./scripts"

const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    // add if statement? response.ok?
    .then(response => response.json())
    .catch(error => console.log(error))
}

const getAllBookings = () => {
  return fetch('//localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => console.log(error))
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => console.log(error))
}

const addBooking = (newBooking) => {
  fetch('//localhost:3001/api/v1/bookings', {
    method: 'POST',
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(newBooking)
  })
  .then(response => {
    if (!response.ok) {
      throw Error()
    } else {
      return response.json(response.statusText)
    }
  })
  .then(response => {
    let id = currentCustomer.id;
    refreshBookings(id)
    console.log('success')
  })
  .catch(error => {
    console.log(error)
    // showError('There was an issue submitting your booking. Try again!')
  })
};

const getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => showError('There was an issue submitting your booking. Try again!')
  );
};

let customersPromise = getAllCustomers();
let bookingsPromise = getAllBookings();
let roomsPromise = getAllRooms();

export { customersPromise, bookingsPromise, roomsPromise, addBooking, getAllBookings, getPromise };
