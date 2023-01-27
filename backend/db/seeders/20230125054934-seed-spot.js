'use strict';
const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Spots";

const spots = [...Array(20)].map((spot) => (
  {
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    country: faker.address.country(),
    lat: faker.address.latitude(),
    lng: faker.address.longitude(),
    name: faker.name.fullName(),  
    description: faker.lorem.sentence(),
    price: faker.finance.amount(),
    ownerId: faker.datatype.number({
      'min': 1,
      'max': 10
  })
  }
))

// const spots = [
//     {
//       ownerId: 8,
//       address: '4615 Effertz Skyway',
//       city: 'Liamborough',
//       state: 'Arkansas',
//       country: 'China',
//       lat: 42.6928,
//       lng: -29.2330,
//       name: 'Harold Ernser MD',
//       description: 'Quos cum beatae qui aspernatur.',
//       price: 955.35
//     },
    // {
    //   address: '9127 Ziemann Streets',
    //   city: 'Torphyboro',
    //   state: 'Idaho',
    //   country: 'French Guiana',
    //   lat: '75.7322',
    //   lng: '101.9266',
    //   name: 'Mindy Fadel',
    //   description: 'Tempora nihil quia beatae beatae nulla.',
    //   price: '175.79',
    //   ownerId: 7
    // },
    // {
    //   address: '364 Goldner Streets',
    //   city: 'Abrahamville',
    //   state: 'Iowa',
    //   country: 'Iceland',
    //   lat: '-0.9480',
    //   lng: '173.6409',
    //   name: 'Craig Monahan',
    //   description: 'Quisquam odit laboriosam saepe placeat.',
    //   price: '158.94',
    //   ownerId: 4
    // },
    // {
    //   address: '43619 Aric Fort',
    //   city: 'Kingmouth',
    //   state: 'Nebraska',
    //   country: 'Germany',
    //   lat: '-65.8934',
    //   lng: '97.6533',
    //   name: 'Roger Kulas',
    //   description: 'Omnis sequi molestias tenetur sequi id mollitia vero.',
    //   price: '469.56',
    //   ownerId: 8
    // },
    // {
    //   address: '90537 Kulas Groves',
    //   city: 'Bolingbrook',
    //   state: 'Georgia',
    //   country: 'Samoa',
    //   lat: '33.3447',
    //   lng: '153.3229',
    //   name: 'Myra Hoeger',
    //   description: 'Temporibus pariatur doloremque quod nostrum accusamus autem eius.',
    //   price: '154.04',
    //   ownerId: 7
    // },
    // {
    //   address: '0011 Leannon Overpass',
    //   city: 'Oletaberg',
    //   state: 'Colorado',
    //   country: 'Fiji',
    //   lat: '89.8966',
    //   lng: '102.2506',
    //   name: 'Mr. Emanuel Rosenbaum PhD',
    //   description: 'Corporis voluptatem rem labore ab quaerat nobis.',
    //   price: '943.17',
    //   ownerId: 6
    // },
    // {
    //   address: '40998 Witting Dam',
    //   city: 'Jerdemouth',
    //   state: 'Nebraska',
    //   country: 'Saint Helena',
    //   lat: '-69.0501',
    //   lng: '-113.4498',
    //   name: 'Marion Okuneva',
    //   description: 'Doloribus consectetur aliquam vitae ratione libero facere fugiat.',
    //   price: '947.48',
    //   ownerId: 5
    // },
    // {
    //   address: '2043 Sallie Green',
    //   city: 'Gulgowskifield',
    //   state: 'Ohio',
    //   country: 'Oman',
    //   lat: '-61.0384',
    //   lng: '40.3544',
    //   name: 'Ms. Kirk Hackett',
    //   description: 'Ipsum cum corporis nisi doloribus similique sunt reprehenderit facere.',
    //   price: '153.07',
    //   ownerId: 5
    // },
    // {
    //   address: '7659 Wisozk Garden',
    //   city: 'Florissant',
    //   state: 'Idaho',
    //   country: 'Djibouti',
    //   lat: '-79.8187',
    //   lng: '-124.8651',
    //   name: 'Candice Kshlerin',
    //   description: 'Sit beatae odit amet.',
    //   price: '110.07',
    //   ownerId: 4
    // },
    // {
    //   address: '845 Tromp Rest',
    //   city: 'North Carlee',
    //   state: 'Ohio',
    //   country: 'Tuvalu',
    //   lat: '-85.0689',
    //   lng: '-34.7943',
    //   name: 'Dixie Abshire III',
    //   description: 'Nihil rerum dicta ad animi.',
    //   price: '701.47',
    //   ownerId: 8
    // }
// ]

// console.log(spots)

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
   try {
    return queryInterface.bulkInsert(options, spots, {});
   } catch (err) {
    console.log(err);
   }
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete(options, spots, {});
  }
};
