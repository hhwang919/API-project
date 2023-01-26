'use strict';
const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Reviews";

const reviews = [...Array(20)].map((review) => (
  {
    spotId: faker.datatype.number({'min': 1, 'max': 10 }),
    userId: faker.datatype.number({'min': 1, 'max': 10 }),
    review: faker.lorem.paragraph(),
    stars: faker.datatype.number({'min': 1, 'max': 5 })
  }
))

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
      return queryInterface.bulkInsert(options, reviews, {});
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
     return queryInterface.bulkDelete(options, reviews, {});
  }
};