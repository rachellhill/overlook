let customers = [
  {
    id: 1,
    name: "Leatha Ullrich"
  },
  {
    id: 2,
    name: "Rocio Schuster"
  },
  {
    id: 3,
    name: "Kelvin Schiller"
  }
];

let bookingSampleData = [
  {
    id: "5fwrgu4i7k55hl6t8",
    userID: 1,
    date: "2022/02/05",
    roomNumber: 12
  },
  {
    id: "5fwrgu4i7k55hl6uy",
    userID: 2,
    date: "2022/01/24",
    roomNumber: 19
  },
  {
    id: "5fwrgu4i7k55hl6vw",
    userID: 2,
    date: "2022/02/11",
    roomNumber: 9
  }
];

let roomSampleData = [
  {
    number: 12,
    roomType: "single room",
    bidet: false,
    bedSize: "twin",
    numBeds: 2,
    costPerNight: 172.09
  },
  {
    number: 19,
    roomType: "single room",
    bidet: false,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 374.67
  },
  {
    number: 9,
    roomType: "single room",
    bidet: true,
    bedSize: "queen",
    numBeds: 1,
    costPerNight: 200.39
  }
]

export { customers, roomSampleData, bookingSampleData };
