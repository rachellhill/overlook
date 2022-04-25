class Customer {
  constructor(customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.roomsBooked = [];
    // rooms booked by customer
    this.allRooms = [];
    // all rooms in the data set from API so I can use it on the DOM
    this.totalSpent = 0;
    this.sortedBookings = [];
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

  sortDates() {
    // let today = new Date()
    // let dd = String(today.getDate()).padStart(2, '0');
    // let mm = String(today.getMonth() + 1).padStart(2, '0');
    // let yr = today.getFullYear();
    // let date = `${yr}/${mm}/${dd}`
    // let currentDate = Date.parse(date);
    let sortedDates = this.allRooms.reduce((acc, room) => {
      let parsedDate = Date.parse(room.date);
      acc.push(parsedDate);
      return acc
    }, [])
      sortedDates.sort((a, b) => {
        return b - a;
      })
      let result = sortedDates.reduce((acc, date) => {
        this.allRooms.forEach(room => {
          let bookingDate = Date.parse(room.date)
          if (date === bookingDate) {
            acc.push(room)
          }
        })
        return acc
      }, [])
      this.sortedBookings = result;
      // referencing order of sorted dates. in all rooms booked, does this date match
        // if yes - return an array of ordered dates
    // this.allRooms.sort((a, b) => {
    //   let bookingDate = Date.parse(room.date);
    //   return b.bookingDate - a.bookingDate
  }
  // reduce over allRooms to get a list of sorted and parsed dates
    // iterate over the result array and look at each date in the allRooms array
      // inside of it were going to another reduce and a forEach within
        // external is iterating over sorted and parsed days
        // forEach iterating over all roomSampleData
          // if the parsed date matches === parsed date
            // push it

  // get dates of each booking and sort through from biggest to least (past to present)
    // all dates in booking go year / month / day
}


export default Customer;


//Any room bookings I have made (past or present/upcoming)
//The total amount I have spent on rooms
