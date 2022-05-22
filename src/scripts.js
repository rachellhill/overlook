// ----------------- IMPORTS ----------------- //
import './css/styles.css';
import Customer from './classes/Customer';
import { customersPromise, bookingsPromise, roomsPromise, addBooking, getAllBookings, getPromise } from "./apiCalls";
import './images/hotel-image.jpg';

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
let username = document.querySelector(".username");
let password = document.querySelector(".password");
let loginBtn = document.querySelector(".login-btn");
let customerDashboard = document.querySelector(".dashboard");
let welcomeMessage = document.querySelector(".welcome-message-container");
let loginError = document.querySelector(".login-error-message");
let loginPage = document.querySelector(".login-page-container");
let clearFilterBtn = document.querySelector('.clear-filters');

// ----------------- GLOBAL VARIABLES ----------------- //

let customersData = [];
let bookingsData = [];
let roomsData = [];
let currentCustomer;
let selectedDate = '';
let selectedRoom;
let availableRooms;

// ----------------- FUNCTIONS ----------------- //
const showElement = (element) => {
  element.classList.remove('hidden');
};

const hideElement = (element) => {
  element.classList.add('hidden');
};

const getApiData = () => {
  Promise.all(
    [customersPromise, bookingsPromise, roomsPromise]
  ).then(jsonArray => {
    jsonArray[0].customers.forEach(customer => {
      customersData.push(customer)
    });
    jsonArray[1].bookings.forEach(booking => {
      bookingsData.push(booking)
    });
    jsonArray[2].rooms.forEach(room => {
      roomsData.push(room)
    });
  });
};

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

const refreshBookings = (id) => {
  Promise.all([
    getPromise('//localhost:3001/api/v1/bookings')
  ]).then(data => {
    bookingsData = []
    data[0].bookings.forEach(booking => {
      bookingsData.push(booking);
    })
    refreshDataInstances(data, id)
  });
};

const refreshDataInstances = (data, id) => {
  const findCustomer = () => {
    customersData.forEach(customer => {
      if (customer.id === id) {
        currentCustomer.allRooms = [];
        currentCustomer.roomsBooked = [];
        currentCustomer.sortedBookings = [];
        currentCustomer.getCustomerBookings(bookingsData)
      };
    });
  };
  findCustomer();
};

const renderBookings = () => {
  currentCustomer.getAllRooms(roomsData)
  currentCustomer.sortDates();
  currentCustomer.sortedBookings.forEach(room => {
    const total = currencyFormatter.format(room.costPerNight);
    customerBookings.innerHTML += `
    <section class="booking-card">
    <p class="date">Date Booked: ${room.date}</p>
    <h4 class="reservation-info">You booked a ${room.roomType} with additional features below:</p>
    <ul class="room-features">
      <li class="feature-list">Room size: ${room.bedSize}</li>
      <li class="feature-list">Number of beds: ${room.numBeds}</li>
      <li class="feature-list">Bidet: ${room.bidet}</li>
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
  let getCost = currentCustomer.calculateTotalSpent(roomsData)
  const totalDisplay = currencyFormatter.format(getCost)
  totalCost.innerHTML += `
    <h3 class="total-spend">${totalDisplay}</h3>`
};

const findAvailableRooms = (bookingsData, roomsData) => {
  showAvailableRooms.innerHTML = '';
  selectedDate = dateInput.value.replaceAll('-', '/')
  const bookedRooms = bookingsData.filter((booking) => {
    return booking.date === selectedDate;
  }).map(booking => booking.roomNumber)
  availableRooms = roomsData.filter(room => (!bookedRooms.includes(room.number)));

  if (selectedDate) {
    availableRooms.forEach(room => {
      showAvailableRooms.innerHTML += `
      <div class="available-room">
        <button class="available-room-btn" id="${room.number}">
          <h5>${room.roomType}</h5>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost: ${room.costPerNight}</p>
        </button>
      </div>
      `
    });
    showElement(filterRoomsBtn);
    showElement(showAvailableRooms);
  } else {
    showAvailableRooms.innerHTML += `<h5 class="date-error">Please select a valid date</h5>`
    setTimeout(() => {
      showElement(showAvailableRoomsBtn);
      showAvailableRooms.innerHTML = '';
    }, 2000);
  };
};

const showSelectedBooking = (id) => {
  selectedRoom = availableRooms.find(room => {
    return id === room.number.toString();
  });
  bookingConfirmationPage.innerHTML += `
    <h6>Your reservation details: ${selectedRoom.roomType}</h6>
      <p>Bed size: ${selectedRoom.bedSize}</p>
      <p>Bidet: ${selectedRoom.bidet}</p>
      <p>Number of Beds: ${selectedRoom.numBeds}</p>
    <h7>TOTAL: ${selectedRoom.costPerNight}</h7>
  `
};

const createBooking = () => {
  let newBooking = {
    userID: currentCustomer.id,
    date: selectedDate,
    roomNumber: selectedRoom.number
  };
  return newBooking
};

const verifyUsername = (customersData) => {
  const usernameEntered = username.value;
  const getLetters = usernameEntered.slice(0, usernameEntered.search(/\d/))
  const userID = Number(usernameEntered.replace(getLetters, ''))
  return userID;
};

const verifyPassword = () => {
  const passwordEntered = password.value;
  if (passwordEntered === "overlook2021") {
    return true;
  } else {
    return false;
  };
};

const verifyLoginCredentials = (customersData) => {
  const userID = verifyUsername();
  customersData.forEach(customer => {
    if (userID === customer.id && verifyPassword()) {
      instantiateCustomer(userID);
      currentCustomer.getCustomerBookings(bookingsData)
      renderBookings();
      renderTotalCost();
      showElement(customerDashboard);
      showElement(welcomeMessage);
      hideElement(loginError);
      hideElement(loginPage);
      loginError.innerText = '';
      welcomeMessage.innerText = `Welcome, ${currentCustomer.name}!`
    } else {
      showElement(loginError);
      loginBtn.disabled = true;
      setTimeout(() => {
        hideElement(loginError)
        loginBtn.disabled = false;
      }, 2000);
    };
  });
};

const showBookingDate = () => {
  showElement(showAvailableRoomsBtn);
  hideElement(showAvailableRooms);
  hideElement(confirmBookingBtn);
  hideElement(bookingConfirmationPage);
};

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => {
  getApiData();
  hideElement(confirmBookingBtn);
};

showAvailableRoomsBtn.addEventListener("click", (e) => {
  findAvailableRooms(bookingsData, roomsData);
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
        <button class="available-room-btn" id="${room.number}">
          <h5>${room.roomType}</h5>
          <p>Bed Size: ${room.bedSize}</p>
          <p>Number of Beds: ${room.numBeds}</p>
          <p>Cost: ${room.costPerNight}</p>
        </button>
      </div>
    `
  });
  showElement(clearFilterBtn);
});

clearFilterBtn.addEventListener('click', (e) => {
  event.preventDefault();
  findAvailableRooms(bookingsData, roomsData);
});

showAvailableRooms.addEventListener('click', (e) => {
  event.preventDefault()
  if (!e.target.parentElement.classList.contains("available-room")) {
    return
  } else if (e.target.parentElement.classList.contains("available-room")) {
    bookingConfirmationPage.innerHTML = '';
    showSelectedBooking(e.target.id);
  };
  hideElement(showAvailableRooms);
  hideElement(filterRoomsBtn);
  showElement(bookingConfirmationPage);
  showElement(confirmBookingBtn);
});

confirmBookingBtn.addEventListener('click', (e) => {
  event.preventDefault();
  let booking = createBooking();
  hideElement(confirmBookingBtn);
  bookingConfirmationPage.innerHTML = '';
  bookingConfirmationPage.innerHTML +=
  `<h6 class"booking-confirmation-notification">Your reservation is booked!<h6/>`
  addBooking(booking);
  setTimeout(() => {
    customerBookings.innerHTML = '';
    renderBookings();
    totalCost.innerHTML = '';
    renderTotalCost();
  }, 500);
  setTimeout(showBookingDate, 4000);
  refreshBookings(currentCustomer.id)
  dateInput.value = '';
});

loginBtn.addEventListener('click', (e) => {
  verifyLoginCredentials(customersData);
});

export { refreshBookings, currentCustomer };
