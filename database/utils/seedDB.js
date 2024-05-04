/*==================================================
/database/utils/seedDB.js

It seeds the database with several initial students and campuses.
==================================================*/
const { Campus, Student } = require('../models');  // Import database models

// Helper function to create random students
const createRandomStudents = async (num, campus) => {
    const firstNames = ["James", "Mary", "John", "Patricia", "Robert", "Jennifer", "Michael", "Linda", "William", "Elizabeth", "David", "Barbara", "Richard", "Susan", "Joseph", "Jessica", "Thomas", "Sarah", "Charles", "Karen"];
    const lastNames = ["Smith", "Johnson", "Williams", "Brown", "Jones", "Garcia", "Miller", "Davis", "Rodriguez", "Martinez", "Hernandez", "Lopez", "Gonzalez", "Wilson", "Anderson", "Thomas", "Taylor", "Moore", "Jackson", "Martin"];

    for (let i = 0; i < num; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const email = `${firstName.toLowerCase()}${lastName.toLowerCase()}${i}@gmail.com`;

        const student = await Student.create({
            firstname: firstName,
            lastname: lastName,
            email: email,
            imageUrl: "stu.jpg",
            gpa: (Math.random() * 2 + 2).toFixed(1) // GPA between 2.0 and 4.0
        });

        await student.setCampus(campus);
    }
};

// Seed database
const seedDB = async () => {
    // Create campuses
    const campuses = [
        { name: "Hunter College", address: "695 Park Ave, New York, NY 10065", description: "This is a public university located in Manhattan.", imageUrl: 'cam.jpg' },
        { name: "Queens College", address: "65-30 Kissena Blvd, Queens, NY 11367", description: "A public college in the Queens borough.", imageUrl: 'cam.jpg' },
        { name: "Brooklyn College", address: "2900 Bedford Ave, Brooklyn, NY 11210", description: "Part of the CUNY system, located in Brooklyn.", imageUrl: 'cam.jpg' },
        { name: "Columbia University", address: "116th St & Broadway, New York, NY 10027", description: "An Ivy League university in Manhattan.", imageUrl: 'cam.jpg' },
        { name: "NYU", address: "New York, NY 10003", description: "New York University, a private research university in Greenwich Village.", imageUrl: 'cam.jpg' },
        { name: "Fordham University", address: "441 E Fordham Rd, Bronx, NY 10458", description: "A private Jesuit university in the Bronx.", imageUrl: 'cam.jpg' },
        { name: "The New School", address: "66 W 12th St, New York, NY 10011", description: "A private university in Lower Manhattan known for its arts and design programs.", imageUrl: 'cam.jpg' },
        { name: "Baruch College", address: "55 Lexington Ave, New York, NY 10010", description: "A public college known for its business program.", imageUrl: 'cam.jpg' },
        { name: "St. John's University", address: "8000 Utopia Pkwy, Queens, NY 11439", description: "A private Roman Catholic university in Queens.", imageUrl: 'cam.jpg' },
        { name: "City College of New York", address: "160 Convent Ave, New York, NY 10031", description: "The oldest of the CUNY colleges, offering a wide range of degrees.", imageUrl: 'cam.jpg' }
    ];

    const createdCampuses = await Promise.all(campuses.map(campus => Campus.create(campus)));

    // Create students for each campus
    for (const campus of createdCampuses) {
        await createRandomStudents(20, campus);  // Assign 20 students to each college
    }

    console.log('Database seeded successfully!');
};

// Export the database seeding function
module.exports = seedDB;
