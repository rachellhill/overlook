import { currentCustomer, refreshBookings } from "./scripts"

const errorMessage = document.querySelector('.error-message');
const apiErrorMessage = document.querySelector('.api-error');

const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json())
    .catch(error => {
      apiErrorMessage.innerText = 'Error loading data. Please try again later.';
  });
};

const getAllBookings = () => {
  return fetch('//localhost:3001/api/v1/bookings')
    .then(response => response.json())
    .catch(error => {
      apiErrorMessage.innerText = 'Error loading data. Please try again later.';
  });
}

const getAllRooms = () => {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json())
    .catch(error => {
      apiErrorMessage.innerText = 'Error loading data. Please try again later.';
  });
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
  })
  .catch(error => {
    showError('There was an issue submitting your booking. Try again!')
  })
};

const showError = (message) => {
  errorMessage.innerText = message;
};

const getPromise = (url) => {
  return fetch(url)
  .then(response => response.json())
  .catch(err => cshowError('There was an issue submitting your booking. Try again!')
  );
};

let customersPromise = getAllCustomers();
let bookingsPromise = getAllBookings();
let roomsPromise = getAllRooms();

export { customersPromise, bookingsPromise, roomsPromise, addBooking, getAllBookings, getPromise };
