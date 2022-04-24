// ----------------- IMPORTS ----------------- //
import './css/styles.css';
import './images/turing-logo.png'
import Customer from './classes/Customer'
import { customersPromise, bookingsPromise, roomsPromise } from "./apiCalls"

// ----------------- QUERY SELECTORS ----------------- //

let customerBookings = document.querySelector('.customer-reservations-container');
let totalCost = document.querySelector('.total-cost-container');
let dateInput = document.querySelector(".date-input");
let showAvailableRoomsBtn = document.querySelector(".show-rooms-btn");


// ----------------- GLOBAL VARIABLES ----------------- //

let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;
let selectedDate;

// ----------------- functions ----------------- //
const getApiData = () => {
  // promise all can be outside of the function and set to a variable
  Promise.all(
    [customersPromise, bookingsPromise, roomsPromise]
  ).then(jsonArray => {
    jsonArray[0].customers.forEach(customer => {
      customersData.push(customer)
    })
    jsonArray[1].bookings.forEach(booking => {
      bookingsData.push(booking)
    })
    jsonArray[2].rooms.forEach(room => {
      roomsData.push(room)
    })
    // showData();
    instantiateCustomer(50)
    renderBookings();
    renderTotalCost();
    // will need to move this bc of login - will eventually be on the submit button when submitting username and password
  });
};

// const showData = () => {
//   console.log("outside customers", customersData)
//   console.log("outside bookings", bookingsData)
//   console.log("outside rooms", roomsData)
// }

// showAvailable rooms
// get the date from query selector -> date input
// ensure the min of today's date -> use get date and set today as min in HTML element
// replaceAll('-', '/') -> dates are diff

//check booking date - iterate over bookingsData to check if date input !== booking.date -> filter

// reduce over filtered array and forEach over roomData to check if booking.room === room.numer && filtered array does not already include that room, then push to acc

// if dates match, room is not available
  // if room numbers match, remove from acc (pop?)

const findAvailableRooms = (bookingsData, roomsData) => {
  selectedDate = dateInput.value.replaceAll('-', '/')

  const bookedRooms = bookingsData.filter((booking) => {
    return booking.date === selectedDate
  }).map(booking => booking.roomNumber)
  // console.log(bookedRooms)

  const availableRooms = roomsData.filter(room => (!bookedRooms.includes(room.number)))
  console.log(availableRooms)
}


const renderBookings = () => {
  currentCustomer.getCustomerBookings(bookingsData)
  currentCustomer.getAllRooms(roomsData)
  currentCustomer.sortDates();
  currentCustomer.sortedBookings.forEach(room => {
    const total = currencyFormatter.format(room.costPerNight);
    customerBookings.innerHTML += `
    <section class="booking-card">
    <p class="date">${room.date}</p>
    <h4 class="reservation-info">You booked a ${room.roomType} with additional features below:</p>
    <ul class="room-features">
      <li class="feature-list">Room size: ${room.bedSize}</li>
      <li class="feature-list">Number of beds: ${room.numBeds}</li>
      <li class="feature-list">Bidet: ${room.bidet}</li>
      <li class="feature-list">Bidet: ${room.number}</li>
    </ul>
    <p class="room-cost">Cost per night: ${total}</p>
    </section>
    `
  })
  console.log(currentCustomer.sortedBookings.length)
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
})

const renderTotalCost = () => {
  currentCustomer.getCustomerBookings(bookingsData)
  let getCost = currentCustomer.calculateTotalSpent(roomsData)
  // let roundCost = getCost.toFixed(2)
  const totalDisplay = currencyFormatter.format(getCost)
  totalCost.innerHTML += `
    <h5 class="total-spend">${totalDisplay}</h5>`
}
// need to access roomsBooked in the customer class and iterate over each to create an HTML element for customerBookings
// function - find bidet

const instantiateCustomer = (id) => {
  let customerArg;
  customersData.forEach(customer => {
    if (customer.id === id) {
      customerArg = customer
    }
  })
  currentCustomer = new Customer(customerArg)
  return currentCustomer;
};
// eventually when api is incorporated, this will move into the .then

setTimeout(() => {console.log(currentCustomer)}, 5000);

// will change on login iteration
  // match up id from login to the id in customersData and use that to set new customer object which will instantiate our current customer.
  // parseint to a number
// currentcustomer.allrooms = new Room()

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => getApiData();
showAvailableRoomsBtn.addEventListener("click", (e) => {
  // console.log(bookingsData)
  findAvailableRooms(bookingsData, roomsData);
  console.log("rooms data length", roomsData.length)
  event.preventDefault();
})
