class Customer {
  constructor(customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.roomsBooked = [];
  }

  getCustomerBookings(bookingData) {
    bookingData.forEach(booking => {
      if (this.id === booking.userID) {
        this.roomsBooked.push(booking)
      }
    })
    if (!this.roomsBooked.length) {
      return `You do not have any reservations with the Overlook Hotel`;
    }
  }
  // create a method that takes in the bookings array and iterate over it to check if the bookingID for user matches this users ID, if they equal eachother, push that trip into an array which should be a property of this class
    // how do I get the booking data? can I just import it into this file and check it/ iterate over it?
}


export default Customer;


//Any room bookings I have made (past or present/upcoming)
//The total amount I have spent on rooms
