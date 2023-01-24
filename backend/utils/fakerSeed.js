const { faker } = require('@faker-js/faker');
const bcrypt = require('bcryptjs');

//simple random number generator
const rNum = (num) => Math.floor(Math.random() * Math.floor(num) + 1)


const seedUsers = (num) => {
    let users = new Array(num).fill('')

for (const i in users) {
    users[i] = {
        username: faker.internet.userName(),
        email: faker.internet.email() ,
        hasedPassword: bcrypt.hashSync(faker.internet.password())
    }
    while(users[i].username.length > 30){
        users[i] = {
            username: faker.internet.username(),
            email: faker.internet.email(),
            hashedPassword: bcrypt.hashSync(faker.internet.password())
        }
    }
}

return users
}

// const seedbookings = (num)  => {
//     let bookings = new Array(num).fill('');

//     for(const i in bookings){
//         bookings[i] = {
//             startdate
//             enddate


//         }

//     }

// }


module.exports ={

    seedUsers

}



//// lets uers seedUsers(100)