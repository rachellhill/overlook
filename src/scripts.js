// ----------------- IMPORTS ----------------- //
import './css/styles.css';
import './images/turing-logo.png'
import Customer from './classes/Customer'
import { customersPromise, bookingsPromise, roomsPromise, addBooking, getAllBookings, getPromise } from "./apiCalls"

// ----------------- QUERY SELECTORS ----------------- //

let customerBookings = document.querySelector('.customer-reservations-container');
let totalCost = document.querySelector('.total-cost-container');
let dateInput = document.querySelector(".date-input");
let showAvailableRoomsBtn = document.querySelector(".show-rooms-btn");
let showAvailableRooms = document.querySelector(".show-available-rooms-section");
let filterRoomsBtn = document.querySelector('.room-filter');
let filterOptions = document.querySelector('.room-type-selection');
let confirmBookingBtn = document.querySelector(".submit-booking-btn");
let bookingConfirmationPage = document.querySelector(".show-booking-info");


// ----------------- GLOBAL VARIABLES ----------------- //

let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;
let selectedDate;
let selectedRoom;
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
    currentCustomer.getCustomerBookings(bookingsData)
    renderBookings();
    renderTotalCost();
    // will need to move this bc of login - will eventually be on the submit button when submitting username and password
  });
};

const renderBookings = () => {
  console.log("all bookings", currentCustomer.roomsBooked)
  console.log('all rooms', currentCustomer.allRooms)
  currentCustomer.getAllRooms(roomsData)
  currentCustomer.sortDates();
  console.log("SORTED", currentCustomer.sortedBookings)
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
};

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const renderTotalCost = () => {
  // currentCustomer.getCustomerBookings(bookingsData)
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
  availableRooms = roomsData.filter(room => (!bookedRooms.includes(room.number)))

  availableRooms.forEach(room => {
    showAvailableRooms.innerHTML += `
    <div class="available-room">
      <button id="${room.number}">
        <h5>${room.roomType}</h5>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Cost: ${room.costPerNight}</p>
      </button>
    </div>
    `
  })
};

const showSelectedBooking = (id) => {
  selectedRoom = availableRooms.find(room => {
    return id === room.number.toString();
  })
  console.log("SELECTED ROOM", selectedRoom)
  bookingConfirmationPage.innerHTML += `
    <h6>Your reservation details: ${selectedRoom.roomType}</h6>
      <p>Bed size: ${selectedRoom.bedSize}</p>
      <p>Bidet: ${selectedRoom.bidet}</p>
      <p>Number of Beds: ${selectedRoom.numBeds}</p>
    <h7>TOTAL: ${selectedRoom.costPerNight}</h7>
  `
}

const createBooking = () => {
  let newBooking = {
    userID: currentCustomer.id,
    date: selectedDate,
    roomNumber: selectedRoom.number
    // selectedRoom.number since selectedRoom is an object above
  };
  return newBooking
};

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

const showBookingDate = () => {
  showElement(showAvailableRoomsBtn);
  hideElement(showAvailableRooms);
  hideElement(confirmBookingBtn);
  hideElement(bookingConfirmationPage);
}

const refreshBookings = (id) => {
  Promise.all([
    getPromise('//localhost:3001/api/v1/bookings')
  ]).then(data => {
    console.log("BEFORE", bookingsData)
    bookingsData = []
    console.log("MIDDLE", bookingsData)
    data[0].bookings.forEach(booking => {
      bookingsData.push(booking);
    })
    refreshDataInstances(data, id)
    console.log("AFTER", bookingsData)
  });
};

const refreshDataInstances = (data, id) => {
  // console.log(data, id)
  const findCustomer = () => {
    customersData.forEach(customer => {
      if (customer.id === id) {
        currentCustomer.allRooms = [];
        currentCustomer.roomsBooked = [];
        currentCustomer.sortedBookings = [];
        currentCustomer.getCustomerBookings(bookingsData)
        // console.log("GET BOOKINGS", )
      };
    });
  };
  findCustomer();
};

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => {
  getApiData();
  hideElement(confirmBookingBtn);
}
showAvailableRoomsBtn.addEventListener("click", (e) => {
  findAvailableRooms(bookingsData, roomsData);
  showElement(filterRoomsBtn);
  hideElement(showAvailableRoomsBtn);
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
      <div class="available-room">
        <button id="${room.number}">
          <h5>${room.roomType}</h5>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost: ${room.costPerNight}</p>
        </button>
      </div>
    `
  });
});

showAvailableRooms.addEventListener('click', (e) => {
  event.preventDefault()
  if (e.target.parentElement.classList.contains("available-room")) {
    showSelectedBooking(e.target.id);
  };
  hideElement(showAvailableRooms);
  hideElement(filterRoomsBtn);
  showElement(confirmBookingBtn);
  // console.log("BEFORE", bookingsData)
});

confirmBookingBtn.addEventListener('click', (e) => {
  event.preventDefault();
  let booking = createBooking();
  hideElement(confirmBookingBtn);
  bookingConfirmationPage.innerHTML = '';
  bookingConfirmationPage.innerHTML +=
  `<h6>Your reservation is booked!<h6/>`
  addBooking(booking);
  console.log("before render bookings", bookingsData)
  setTimeout(() => {
    customerBookings.innerHTML = '';
    renderBookings();
    totalCost.innerHTML = '';
    renderTotalCost();
  }, 500);
  console.log("After-SORTED", currentCustomer.sortedBookings)
  // set timeout here
    // show date selection / hide everything else
  setTimeout(showBookingDate, 4000);

});
// invoking createBooking as arg;

export { refreshBookings, currentCustomer };
