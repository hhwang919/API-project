'use strict';

//const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Bookings";


//const bookings = [...Array(20)].map((booking) => (
  //{
    //spotId: faker.datatype.number({
    //  'min': 1,
    //  'max': 20
  //}),
    //userId: faker.datatype.number({
      //'min': 1,
      //'max': 10
  //}),
    //startDate: faker.date.future(),
    //endDate: faker.date.future(),
  //}
//))

const bookings =[
  {
    spotId: 19,
    userId: 8,
    startDate: '2023-05-21',
    endDate: '2023-07-03'
  },
  {
    spotId: 3,
    userId: 3,
    startDate: '2023-05-05',
    endDate: '2023-10-01'
  },
  {
    spotId: 19,
    userId: 10,
    startDate: '2023-05-09',
    endDate: '2023-07-18'
  },
  {
    spotId: 6,
    userId: 10,
    startDate: '2023-02-01',
    endDate: '2023-10-11'
  },
  {
    spotId: 9,
    userId: 7,
    startDate: '2023-02-18',
    endDate: '2023-05-13'
  },
  {
    spotId: 15,
    userId: 7,
    startDate: '2023-06-18',
    endDate: '2023-12-19'
  },
  {
    spotId: 8,
    userId: 8,
    startDate: '2023-05-31',
    endDate: '2023-12-02'
  },
  {
    spotId: 1,
    userId: 8,
    startDate: '2023-12-14',
    endDate: '2024-01-08'
  },
  {
    spotId: 6,
    userId: 10,
    startDate: '2023-06-17',
    endDate: '2023-07-03'
  },
  {
    spotId: 12,
    userId: 6,
    startDate: '2023-09-22',
    endDate: '2023-12-20'
  },
  {
    spotId: 5,
    userId: 3,
    startDate: '2023-11-03',
    endDate: '2024-01-02'
  },
  {
    spotId: 4,
    userId: 5,
    startDate: '2023-03-17',
    endDate: '2023-05-29'
  },
  {
    spotId: 20,
    userId: 5,
    startDate: '2023-03-01',
    endDate: '2023-09-12'
  },
  {
    spotId: 8,
    userId: 8,
    startDate: '2023-09-27',
    endDate: '2023-12-24'
  },
  {
    spotId: 14,
    userId: 4,
    startDate: '2023-08-11',
    endDate: '2023-12-07'
  },
  {
    spotId: 14,
    userId: 3,
    startDate: '2023-02-06',
    endDate: '2023-04-06'
  },
  {
    spotId: 16,
    userId: 8,
    startDate: '2023-10-25',
    endDate: '2024-02-13'
  },
  {
    spotId: 6,
    userId: 7,
    startDate: '2023-05-24',
    endDate: '2023-12-03'
  },
  {
    spotId: 9,
    userId: 9,
    startDate: '2023-05-04',
    endDate: '2024-01-24'
  },
  {
    spotId: 7,
    userId: 4,
    startDate: '2023-07-29',
    endDate: '2023-12-11'
  }
]

//console.log(bookings);

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
      return queryInterface.bulkInsert(options, bookings, {});
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
    return queryInterface.bulkDelete(options, bookings, {});
  }
};