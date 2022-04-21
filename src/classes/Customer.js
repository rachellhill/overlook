class Customer {
  constructor(customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.roomsBooked = [];
    this.totalSpent = 0;
    // this.previousTrips = [];
    // this.upcomingTrips = [];
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

  calculateTotalSpent(roomData) {
    this.totalSpent = this.roomsBooked.reduce((acc, roomBooked) => {
      let filterRooms = roomData.forEach(room => {
        if (roomBooked.roomNumber === room.number) {
          acc += room.costPerNight;
        }
      })
      return acc
    }, 0)
    return this.totalSpent;
  }

  // getPreviousTrips() {
  //   const today = Date.now()
  //   console.log(today);
  // }

  // getUpcomingTrips() {
  //
  // }
}


export default Customer;


//Any room bookings I have made (past or present/upcoming)
//The total amount I have spent on rooms
