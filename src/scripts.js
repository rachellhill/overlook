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
let showAvailableRooms = document.querySelector(".show-available-rooms-section");
let filterRoomsBtn = document.querySelector('.room-filter');
let filterOptions = document.querySelector('.room-type-selection');


// ----------------- GLOBAL VARIABLES ----------------- //

let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;
let selectedDate;
let availableRooms;

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
  });
  console.log(currentCustomer.sortedBookings.length)
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const renderTotalCost = () => {
  currentCustomer.getCustomerBookings(bookingsData)
  let getCost = currentCustomer.calculateTotalSpent(roomsData)
  // let roundCost = getCost.toFixed(2)
  const totalDisplay = currencyFormatter.format(getCost)
  totalCost.innerHTML += `
    <h5 class="total-spend">${totalDisplay}</h5>`
};
// need to access roomsBooked in the customer class and iterate over each to create an HTML element for customerBookings
// function - find bidet

const instantiateCustomer = (id) => {
  let customerArg;
  customersData.forEach(customer => {
    if (customer.id === id) {
      customerArg = customer
    };
  });
  currentCustomer = new Customer(customerArg)
  return currentCustomer;
};

const findAvailableRooms = (bookingsData, roomsData) => {
  selectedDate = dateInput.value.replaceAll('-', '/')
  const bookedRooms = bookingsData.filter((booking) => {
    return booking.date === selectedDate
  }).map(booking => booking.roomNumber)
  console.log(bookedRooms)
  availableRooms = roomsData.filter(room => (!bookedRooms.includes(room.number)))
  console.log(availableRooms)

  availableRooms.forEach(availableRoom => {
    showAvailableRooms.innerHTML += `
    <button class="available-room" id="${availableRoom.number}">
      <h5>${availableRoom.roomType}</h5>
      <p>Bed Size: ${availableRoom.bedSize}</p>
      <p>Bed Size: ${availableRoom.costPerNight}</p>
    </button>
    `
  })
};

// if an option is selected, filter available rooms to show only one of those options?

// compare the joined option value to the classname and then if true, filter the array
// const renderFilteredData = () => {
//   let filter = event.target.className

  // e.target.classname
  // new array of smusheded roomTypes
  // forEach over available rooms roomTypes
    // if e.target.classname === to room.roomtype.join('')
      // push into a new array
  // iterate over available rooms and return room.type.includes(joined string)
// }

const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

setTimeout(() => {console.log(currentCustomer)}, 5000);
// will change on login iteration
  // match up id from login to the id in customersData and use that to set new customer object which will instantiate our current customer.
  // parseint to a number
// currentcustomer.allrooms = new Room()

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => getApiData();
showAvailableRoomsBtn.addEventListener("click", (e) => {
  findAvailableRooms(bookingsData, roomsData);
  showElement(filterRoomsBtn);
  hideElement(showAvailableRoomsBtn);
  // console.log("rooms data length", roomsData.length)
  event.preventDefault();
});

filterOptions.addEventListener("change", (e) => {
  let filterSelected = filterOptions.value;
  let availableRoomsByFilter = [];
  availableRooms.forEach(availableRoom => {
    if (availableRoom.roomType === filterSelected) {
      availableRoomsByFilter.push(availableRoom)
    };
  });
  showAvailableRooms.innerHTML = '';
  availableRoomsByFilter.forEach(room => {
    showAvailableRooms.innerHTML += `
      <button class="available-room" id="${room.number}">
        <h5>${room.roomType}</h5>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost: ${room.costPerNight}</p>
      </button>
    `
  })
// REFACTOR: make a function and pass in e as param
  // invoke function with e in event listener ln 168 - 175 in another function
  console.log(availableRoomsByFilter)
});

// click on room - give them the same classList
  // all injected room buttons have the same className
