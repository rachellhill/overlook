class Customer {
  constructor(customerInfo) {
    this.id = customerInfo.id;
    this.name = customerInfo.name;
    this.roomsBooked = [];
    this.allRooms = [];
    this.totalSpent = 0;
    this.sortedBookings = [];
  };

  getCustomerBookings(bookingData) {
    bookingData.forEach(booking => {
      if (this.id === booking.userID && !this.roomsBooked.includes(booking)) {
        this.roomsBooked.push(booking)
      };
    });
    if (!this.roomsBooked.length) {
      return `You do not have any reservations with the Overlook Hotel`;
    };
  };

  calculateTotalSpent(roomData) {
    this.totalSpent = this.roomsBooked.reduce((acc, roomBooked) => {
      let filterRooms = roomData.forEach(room => {
        if (roomBooked.roomNumber === room.number) {
          acc += room.costPerNight;
        }
      });
      return acc
    }, 0);
    return this.totalSpent;
  };

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
          };
          acc.push(roomObj)
        };
      });
      return acc
    }, []);
      this.allRooms = result
      return result;
  };

  sortDates() {
    let sortedDates = this.allRooms.reduce((acc, room) => {
      let parsedDate = Date.parse(room.date);
      acc.push(parsedDate);
      return acc
    }, []);
      sortedDates.sort((a, b) => {
        return b - a;
      });
      let result = sortedDates.reduce((acc, date) => {
        this.allRooms.forEach(room => {
          let bookingDate = Date.parse(room.date)
          if (date === bookingDate && !acc.includes(room)) {
            acc.push(room)
          }
        });
        return acc
      }, []);
      this.sortedBookings = result;
  };
};

export default Customer;
