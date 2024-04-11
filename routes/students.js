/*==================================================
/routes/students.js

It defines all the students-related routes.
==================================================*/
// Import Express module
const express = require('express');
// Create an Express router function called "router"
const router = express.Router();
// Import database models
const { Student, Campus } = require('../database/models');

// Import a middleware to replace "try and catch" for request handler, for a concise coding (fewer lines of code)
const ash = require('express-async-handler');

/* GET ALL STUDENTS: async/await using "try-catch" */
// router.get('/', async (req, res, next) => {
//   try {
//     let students = await Student.findAll({include: [Campus]});
//     res.status(200).json(students);
//   } 
//   catch(err) {
//     next(err);
//   }
// });

/* GET ALL STUDENTS: async/await using express-async-handler (ash) */
// Automatically catches any error and sends to Routing Error-Handling Middleware (app.js)
// It is the same as using "try-catch" and calling next(error)
router.get('/', ash(async(req, res) => {
  let students = await Student.findAll({include: [Campus]});
  res.status(200).json(students);  // Status code 200 OK - request succeeded
}));

/* GET STUDENT BY ID */
/* GET STUDENT BY ID INCLUDING CAMPUS */
router.get('/:id', ash(async(req, res) => {
  // Find student by Primary Key and include associated campus information
  let student = await Student.findByPk(req.params.id, { include: [Campus] });
  
  // Check if the student exists
  if (!student) {
    return res.status(404).json({ error: 'Student not found' }); // Status code 404 Not Found
  }
  
  // Send the retrieved student with associated campus information as a JSON response
  res.status(200).json(student); // Status code 200 OK - request succeeded
}));

/* ADD NEW STUDENT */
router.post('/', function(req, res, next) {
  Student.create(req.body)
    .then(createdStudent => res.status(200).json(createdStudent))
    .catch(err => next(err));
});

/* DELETE STUDENT */
router.delete('/:id', function(req, res, next) {
  Student.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => res.status(200).json("Deleted a student!"))
    .catch(err => next(err));
});

/* EDIT STUDENT */
router.put('/:id', ash(async(req, res) => {
  await Student.update(req.body,
        { where: {id: req.params.id} }
  );
  // Find student by Primary Key
  let student = await Student.findByPk(req.params.id);
  res.status(201).json(student);  // Status code 201 Created - successful creation of a resource
}));

/* EDIT STUDENT */
// router.put('/:id', ash(async(req, res) => {
//   try {
//     // Update the student's information based on the provided ID
//     await Student.update(req.body, { where: { id: req.params.id } });
    
//     // Find the updated student by Primary Key
//     let updatedStudent = await Student.findByPk(req.params.id);
    
//     // Send the updated student as a JSON response
//     res.status(200).json(updatedStudent); // Status code 200 OK - request succeeded
//   } catch (error) {
//     // If there's an error during student update, send an error response
//     res.status(400).json({ error: 'Failed to update student' }); // Status code 400 Bad Request
//   }
// }));


// Export router, so that it can be imported to construct the apiRouter (app.js)
module.exports = router;