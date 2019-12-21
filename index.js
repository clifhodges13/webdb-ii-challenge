const express = require("express");
const db = require("./data/db-config");

const server = express();

server.use(express.json());

const PORT = process.env.PORT || 4000;

// welcome
server.get('/', (req, res) => {
  res.send("<h1>Welcome to the Car Dealer Database API.")
})

// get all vehicles
server.get('/vehicles', (req, res) => {
  db('vehicles')
    .then(vehicles => res.status(200).json(vehicles))
    .catch(err => res.status(500).json({ message: 'There was a problem retrieving the vehicles from the database. Please try again later.' }))
})

// get vehicle by VIN
server.get('/vehicles/:vin', (req, res) => {
  const { vin } = req.params
  db('vehicles').where({ vin })
    .then(vehicle => {
      if(vehicle){
        res.status(200).json(vehicle)
      } else {
        res.status(404).json({ message: 'The vehicle with the specified VIN does not exist. Please check your entry and try again.' })
      }
    })
    .catch(err => res.status(500).json({ message: 'There was a problem retrieving the vehicle from the database. Please try again later.' }))
})

// add a vehicle to the database
server.post('/vehicles', (req, res) => {
  const { vin, make, model, mileage } = req.body
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ message: 'Please include a VIN, make, model, and mileage in your request body.' })
  } else {
    db('vehicles').insert({ vin, make, model, mileage })
      .then(newVehicle => res.status(201).json(newVehicle))
      .catch(err => res.status(500).json({ message: 'There was a problem adding the vehicle from the database. Please try again later.' }))
  }
})

// update a vehicle
server.put('/vehicles/:vin', (req, res) => {
  const { vin } = req.params
  const { newVin, make, model, mileage } = req.body
  if (!vin || !make || !model || !mileage) {
    res.status(400).json({ message: 'Please include a VIN, make, model, and mileage in your request body.' })
  } else {
    db('vehicles').where({ vin })
      .then(vehicle => {
        if (!vehicle.length) {
          res.status(404).json({ message: 'The vehicle with the specified VIN does not exist. Please check your entry and try again.' })
        } else {
          db('vehicles').where({ vin }).update({ newVin, make, model, mileage })
            .then(updateVehicle => res.status(200).json(updateVehicle))
            .catch(err => res.status(500).json({ message: 'There was a problem updating the vehicle. Please try again later.' }))
        }
      })
  }
})

// delete a vehicle
server.delete('/vehicles/:vin', (req, res) => {
  const { vin } = req.params
  db('vehicles').where({ vin }).del()
    .then(deleted => res.status(204).json(deleted))
    .catch(err => res.status(500).json({ message: 'There was a problem deleting the vehicle. Please try again later.' }))
})

server.listen(PORT, () => `Server is running at http://localhost:${PORT}.`);