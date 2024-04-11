/*==================================================
/database/models/Student.js

It defines the student model for the database.
==================================================*/
const Sequelize = require('sequelize');  // Import Sequelize
const db = require('../db');  // Import Sequelize database instance called "db"

const Student = db.define("student", {
  firstname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  lastname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
    isEmail: true // Ensures that the value is a valid email address
    }
  },
  imageUrl: {
    type: Sequelize.STRING,
    allowNull: true, // Allowing null/empty values
    defaultValue: 'stu.jpg' // Default value
  },
  gpa: {
    type: Sequelize.DECIMAL(3, 1), // Decimal with 3 digits in total and 1 digit after the decimal point
    allowNull: true, // Allowing null/empty values
    validate: {
      min: 0.0,
      max: 4.0
    }
  }
});

// Export the student model
module.exports = Student;