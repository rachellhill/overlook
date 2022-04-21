// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// ----------------- IMPORTS ----------------- //

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// import Customer from './classes/Customer'
import { customersPromise, bookingsPromise, roomsPromise } from "./apiCalls"

// ----------------- QUERY SELECTORS ----------------- //
let customerBookings = document.querySelector('.customer-reservations-container');


// ----------------- GLOBAL VARIABLES ----------------- //
let customersData = [];
let bookingsData = [];
let roomsData = [];

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => getApiData();

// ----------------- functions ----------------- //
const getApiData = () => {
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
    showData();
  });
};

const showData = () => {
  console.log("outside customers", customersData)
  console.log("outside bookings", bookingsData)
  console.log("outside rooms", roomsData)
}
//
// const renderBookings = () => {
//
// }
// need to access roomsBooked in the customer class and iterate over each to to create an HTML element for customerBookings
