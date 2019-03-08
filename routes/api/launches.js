const express = require('express');
const router = express.Router();
const axios = require('axios');
const CircularJSON = require('circular-json');
const Launches = require('../../models/Launches');

// Get list of all launches
router.get('/', (req, res) => {
  axios.get('https://api.spacexdata.com/v3/launches').then(response => {
    let json = CircularJSON.stringify(response);
    res.send(json);
  });
});

// Save individual launches
router.post('/save', (req, res) => {
  const newLaunch = new Launches({
    badge: req.body.badge,
    missionName: req.body.missionName,
    rocketName: req.body.rocketName,
    flightNumber: req.body.flightNumber,
    rocketType: req.body.rocketType,
    launchDate: req.body.launchDate,
    photo: req.body.photo,
  });
  newLaunch
    .save()
    .then(launchItem => res.json(launchItem))
    .catch(err => console.log(err));
});

// Get list of all saved launches
router.get('/getsaved', (req, res) => {
  Launches.find({}, (err, savedLaunches) => {
    res.send(savedLaunches);
  });
});

// Delete all documents in Launches model
router.delete('/delete', (req, res, next) => {
  Launches.deleteMany({}, err => {
    console.log('Deleted documents');
  });
});

// Get individual launches by flight number
router.get('/launch/:flight_number', (req, res) => {
  let flight_number = req.params.flight_number;
  console.log(flight_number);
  axios
    .get(`https://api.spacexdata.com/v3/launches/${flight_number}`)
    .then(response => {
      // Need to use CircularJSON or we get a CircularJSON error
      let singleFlight = CircularJSON.stringify(response.data);
      res.send(singleFlight);
    });
});

module.exports = router;
