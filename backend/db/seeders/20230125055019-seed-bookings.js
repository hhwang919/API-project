'use strict';

const { faker } = require('@faker-js/faker');

/** @type {import('sequelize-cli').Migration} */


let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Bookings";

// const bookings = [
//   {
//     spotId: 6,
//     userId: 2,
//     startDate: '2023-05-09',
//     endDate: '2023-03-15'
//   }
// ]

const bookings = [...Array(10)].map((booking) => (
  {
    spotId: faker.datatype.number({
      'min': 1,
      'max': 10
  }),
    userId: faker.datatype.number({
      'min': 1,
      'max': 10
  }),
    startDate: faker.date.future(),
    endDate: faker.date.future(),
  }
))

console.log(bookings)
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
