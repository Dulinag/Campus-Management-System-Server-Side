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
            imageUrl: "https://t4.ftcdn.net/jpg/02/19/63/31/360_F_219633151_BW6TD8D1EA9OqZu4JgdmeJGg4JBaiAHj.jpg",
            gpa: (Math.random() * 2 + 2).toFixed(1) // GPA between 2.0 and 4.0
        });

        await student.setCampus(campus);
    }
};

// Seed database
const seedDB = async () => {
    // Create campuses
    const campuses = [
        { name: "Hunter College", address: "695 Park Ave, New York, NY 10065", description: "This is a public university located in Manhattan.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGaexjWcGj0GXkU4DMqNTwRmm3OutwfQCr9lfYEyGIVg&s' },
        { name: "Queens College", address: "65-30 Kissena Blvd, Queens, NY 11367", description: "A public college in the Queens borough.", imageUrl: 'https://www.qc.cuny.edu/vr/wp-content/uploads/sites/60/2021/04/queens-college-campus.jpg' },
        { name: "Brooklyn College", address: "2900 Bedford Ave, Brooklyn, NY 11210", description: "Part of the CUNY system, located in Brooklyn.", imageUrl: 'https://www.brooklyn.cuny.edu/web/com_homepage_2022/210902_UGOH_1400x788.jpg' },
        { name: "Columbia University", address: "116th St & Broadway, New York, NY 10027", description: "An Ivy League university in Manhattan.", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/ColumbiaUniversity.jpg/800px-ColumbiaUniversity.jpg' },
        { name: "NYU", address: "New York, NY 10003", description: "New York University, a private research university in Greenwich Village.", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/NYU_Stern_School_of_Business_-_Plaza_Level_%2848072762417%29.jpg/800px-NYU_Stern_School_of_Business_-_Plaza_Level_%2848072762417%29.jpg' },
        { name: "Fordham University", address: "441 E Fordham Rd, Bronx, NY 10458", description: "A private Jesuit university in the Bronx.", imageUrl: 'https://cdn.britannica.com/54/117954-004-066215F5/Keating-Hall-Fordham-University-NY-Bronx.jpg' },
        { name: "The New School", address: "66 W 12th St, New York, NY 10011", description: "A private university in Lower Manhattan known for its arts and design programs.", imageUrl: 'https://blogs.newschool.edu/pressroom/files/2021/09/Resized-20170405_Street_Seats-204.jpg' },
        { name: "Baruch College", address: "55 Lexington Ave, New York, NY 10010", description: "A public college known for its business program.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXaOj3Vl7uSCFsb3aqxFxYM0Ib0-2FkUjEyezuY_dO1w&s' },
        { name: "St. John's University", address: "8000 Utopia Pkwy, Queens, NY 11439", description: "A private Roman Catholic university in Queens.", imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpEs7APGIteVTzdis3YN8c0BC4ffulNoZmHmO2hW7pAQ&s' },
        { name: "City College of New York", address: "160 Convent Ave, New York, NY 10031", description: "The oldest of the CUNY colleges, offering a wide range of degrees.", imageUrl: 'https://www.ccny.cuny.edu/sites/default/files/styles/large/public/2019-09/about_update.jpg?itok=ejGmlSLs' }
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