class Room {
  constructor(roomsData) {
    this.number = roomsData.number;
    this.roomType = roomsData.roomType;
    this.bidet = roomsData.bidet;
    this.numBeds = roomsData.numBeds;
    this.costPerNight = roomsData.costPerNight;
  };
};

export default Room;
