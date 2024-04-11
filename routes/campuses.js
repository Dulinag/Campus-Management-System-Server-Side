/*==================================================
/routes/campuses.js

It defines all the campuses-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL CAMPUSES: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let campuses = await Campus.findAll({include: [Student]});
//     res.status(200).json(campuses);
//   } 
//   catch(err) {
//     next(err);
//   }
// });
/* ADD NEW CAMPUS */
router.post('/', ash(async(req, res) => {
  try {
    // Create a new campus with the data from the request body
    let newCampus = await Campus.create(req.body);
    
    // Send the newly created campus as a JSON response
    res.status(201).json(newCampus); // Status code 201 Created - successful creation of a resource
  } catch (error) {
    // If there's an error during campus creation, send an error response
    res.status(400).json({ error: 'Failed to create campus' }); // Status code 400 Bad Request
  }
}));

/* GET ALL CAMPUSES */
router.get('/', ash(async(req, res) => {
  let campuses = await Campus.findAll({include: [Student]});  // Get all campuses and their associated students
  res.status(200).json(campuses);  // Status code 200 OK - request succeeded
}));

/* GET CAMPUS BY ID */
/* GET CAMPUS BY ID INCLUDING STUDENTS */
router.get('/:id', ash(async(req, res) => {
  // Find campus by Primary Key and include associated students information
  let campus = await Campus.findByPk(req.params.id, { include: [Student] });
  
  // Check if the campus exists
  if (!campus) {
    return res.status(404).json({ error: 'Campus not found' }); // Status code 404 Not Found
  }
  
  // Send the retrieved campus with associated students information as a JSON response
  res.status(200).json(campus); // Status code 200 OK - request succeeded
}));


/* DELETE CAMPUS */
router.delete('/:id', ash(async(req, res) => {
  await Campus.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json("Deleted a campus!");
}));

/* ADD NEW CAMPUS */
router.post('/', ash(async(req, res) => {
  let newCampus = await Campus.create(req.body);
  res.status(200).json(newCampus);  // Status code 200 OK - request succeeded
}));

/* EDIT CAMPUS */
router.put('/:id', ash(async(req, res) => {
  await Campus.update(req.body, {
    where: {
      id: req.params.id
    }
  });
  // Find campus by Primary Key
  let campus = await Campus.findByPk(req.params.id, {include: [Student]});  // Get the campus and its associated students
  res.status(201).json(campus);  // Status code 201 Created - successful creation of a resource
}))

/* EDIT CAMPUS */
// router.put('/:id', ash(async(req, res) => {
//   try {
//     // Update the campus's information based on the provided ID
//     await Campus.update(req.body, {
//       where: { id: req.params.id }
//     });
    
//     // Find the updated campus by Primary Key
//     let updatedCampus = await Campus.findByPk(req.params.id, { include: [Student] });
    
//     // Send the updated campus as a JSON response
//     res.status(200).json(updatedCampus); // Status code 200 OK - request succeeded
//   } catch (error) {
//     // If there's an error during campus update, send an error response
//     res.status(400).json({ error: 'Failed to update campus' }); // Status code 400 Bad Request
//   }
// }));


// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;