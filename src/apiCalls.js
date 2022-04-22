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

let customersPromise = getAllCustomers();
let bookingsPromise = getAllBookings();
let roomsPromise = getAllRooms();

export { customersPromise, bookingsPromise, roomsPromise };
