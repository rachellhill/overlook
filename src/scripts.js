// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// ----------------- IMPORTS ----------------- //

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
// import Customer from './classes/Customer'
import { customersPromise } from "./apiCalls"

// ----------------- QUERY SELECTORS ----------------- //
let customerBookings = document.querySelector('.customer-reservations-container');


// ----------------- GLOBAL VARIABLES ----------------- //
let customersData = [];

// ----------------- EVENT LISTENERS ----------------- //

window.onload = (event) => getApiData();

// ----------------- functions ----------------- //
const getApiData = () => {
  Promise.all(
    [customersPromise]
  ).then(jsonArray => {
    jsonArray[0].customers.forEach(customer => {
      customersData.push(customer)
    })
    showData();
  })
}

const showData = () => {
  console.log("outside", customersData)
}
//
// const renderBookings = () => {
//
// }
// need to access roomsBooked in the customer class and iterate over each to to create an HTML element for customerBookings
