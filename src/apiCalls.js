const getAllCustomers = () => {
  return fetch('http://localhost:3001/api/v1/customers')
    // add if statement? response.ok?
    .then(response => response.json())
    .catch(error => console.log(error))
}

let customersPromise = getAllCustomers();



export { customersPromise };
