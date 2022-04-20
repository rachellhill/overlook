// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';
// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import Customer from './classes/Customer'

// ----------------- QUERY SELECTORS ----------------- //
let customerBookings = document.querySelector('.customer-reservations-container');


// ----------------- GLOBAL VARIABLES ----------------- //
// fetch api? to create the data instance?
// let currentCustomer = new Customer()

// ----------------- functions ----------------- //
// const getApiData = () => {
//   Promise.(getFetch())
// }
//
// const renderBookings = () => {
//
// }
// need to access roomsBooked in the customer class and iterate over each to to create an HTML element for customerBookings
