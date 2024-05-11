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
        { name: "Brooklyn College", address: "2900 Bedford Ave, Brooklyn, NY 11210", description: "Part of the CUNY system, located in Brooklyn.", imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/2016_Brooklyn_College_campus.jpg/800px-2016_Brooklyn_College_campus.jpg' },
        { name: "Columbia University", address: "116th St & Broadway, New York, NY 10027", description: "An Ivy League university in Manhattan.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fupload.wikimedia.org%2Fwikipedia%2Fcommons%2F3%2F35%2FColumbia_University_%252852009406881%2529.jpg&tbnid=sdaBYfQe2Z4cNM&vet=12ahUKEwjCi5rC54SGAxX5OlkFHXK_AiMQMygAegQIARBR..i&imgrefurl=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3AColumbia_University_(52009406881).jpg&docid=EUOFDGpiIFPffM&w=5184&h=3888&q=columbia%20university%20jpg&ved=2ahUKEwjCi5rC54SGAxX5OlkFHXK_AiMQMygAegQIARBR' },
        { name: "NYU", address: "New York, NY 10003", description: "New York University, a private research university in Greenwich Village.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fmedia.istockphoto.com%2Fid%2F545457404%2Fphoto%2Fnyu-new-york-university.jpg%3Fs%3D612x612%26w%3D0%26k%3D20%26c%3D6mjatWWhfcLMMvS9hT7gLUPy72VkNhKtCqods54oN08%3D&tbnid=vcOFoSoKuWOqCM&vet=12ahUKEwibjcX47ISGAxUCM1kFHeK1AlMQMygJegQIARBf..i&imgrefurl=https%3A%2F%2Fwww.istockphoto.com%2Fphotos%2Fnew-york-university&docid=HcsMgCtYUm5pfM&w=612&h=408&q=nyu%20jpg&ved=2ahUKEwibjcX47ISGAxUCM1kFHeK1AlMQMygJegQIARBf' },
        { name: "Fordham University", address: "441 E Fordham Rd, Bronx, NY 10458", description: "A private Jesuit university in the Bronx.", imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fen.m.wikipedia.org%2Fwiki%2FFile%3AFordham_University_02.JPG&psig=AOvVaw3iEihORceTR3cNJ27DFUqn&ust=1715531840982000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCLC3mfGDhoYDFQAAAAAdAAAAABAE' },
        { name: "The New School", address: "66 W 12th St, New York, NY 10011", description: "A private university in Lower Manhattan known for its arts and design programs.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fimages.adsttc.com%2Fmedia%2Fimages%2F5344%2F93dc%2Fc07a%2F80d9%2Fe300%2F0277%2Flarge_jpg%2FSOM_NewSchool_JamesEwing_0138_1.jpg%3F1397003187&tbnid=YFp1Kp4eQXnLFM&vet=12ahUKEwig6YrDhIaGAxUDMmIAHfIqCYgQMygBegQIARB1..i&imgrefurl=https%3A%2F%2Fwww.archdaily.com%2F494660%2Fthe-new-school-university-center-skidmore-owings-and-merrill&docid=_4H1alKFm3zCEM&w=1998&h=3000&q=the%20new%20school&hl=en&ved=2ahUKEwig6YrDhIaGAxUDMmIAHfIqCYgQMygBegQIARB1' },
        { name: "Baruch College", address: "55 Lexington Ave, New York, NY 10010", description: "A public college known for its business program.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fenrollmentmanagement.baruch.cuny.edu%2Fwp-content%2Fuploads%2Fsites%2F18%2F2020%2F07%2FVerticalCampus2_002.jpg&tbnid=nQgDRO3lk1_h9M&vet=12ahUKEwjStJbUhIaGAxWjEmIAHeYdB4kQMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fenrollmentmanagement.baruch.cuny.edu%2Fundergraduate-admissions%2Fdirections%2F&docid=3p_rkoPuoHgXmM&w=700&h=508&q=baruch&hl=en&ved=2ahUKEwjStJbUhIaGAxWjEmIAHeYdB4kQMygAegQIARBz' },
        { name: "St. John's University", address: "8000 Utopia Pkwy, Queens, NY 11439", description: "A private Roman Catholic university in Queens.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.stjohns.edu%2Fsites%2Fdefault%2Ffiles%2F2019-01%2FSJU_Spring2018-023_1600x900.jpg&tbnid=f7Kdg4vUMjZa0M&vet=12ahUKEwjAgd_uhIaGAxW4BGIAHbHfBWgQMygAegQIARBd..i&imgrefurl=https%3A%2F%2Fwww.stjohns.edu%2Fqueens-residential-campus&docid=ja6UUjDA6XLBTM&w=1600&h=900&q=st%20johns%20university%20queens&hl=en&ved=2ahUKEwjAgd_uhIaGAxW4BGIAHbHfBWgQMygAegQIARBd' },
        { name: "City College of New York", address: "160 Convent Ave, New York, NY 10031", description: "The oldest of the CUNY colleges, offering a wide range of degrees.", imageUrl: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.ccny.cuny.edu%2Fsites%2Fdefault%2Ffiles%2Fstyles%2Flarge%2Fpublic%2F2019-09%2Fabout_update.jpg%3Fitok%3DejGmlSLs&tbnid=Yxctr886rHgs-M&vet=12ahUKEwjRlsLzhIaGAxXIBVkFHSAaC-UQMygAegQIARBz..i&imgrefurl=https%3A%2F%2Fwww.ccny.cuny.edu%2Fabout&docid=s_Z9LjXj8HsKQM&w=480&h=270&q=ccny&hl=en&ved=2ahUKEwjRlsLzhIaGAxXIBVkFHSAaC-UQMygAegQIARBz' }
        
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
