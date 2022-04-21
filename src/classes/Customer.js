class Customer {
  constructor(customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.roomsBooked = [];
    // rooms booked by customer
    this.allRooms = [];
    // all rooms in the data set from API so I can use it on the DOM
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
  // round method

  getAllRooms(roomData) {
    const result = this.roomsBooked.reduce((acc, booking) => {
      roomData.forEach((room) => {
        if (booking.roomNumber === room.number) {
          const roomObj = {
            number: room.number,
            roomType: room.roomType,
            bidet: room.bidet,
            bedSize: room.bedSize,
            numBeds: room.numBeds,
            costPerNight: room.costPerNight,
            date: booking.date
          }
          acc.push(roomObj)
        }
      })
      return acc
    }, []);
      this.allRooms = result
      return result;
  }
}


export default Customer;


//Any room bookings I have made (past or present/upcoming)
//The total amount I have spent on rooms
