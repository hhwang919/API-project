'use strict';
const { faker } = require("@faker-js/faker");

const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const users = [...Array(10)].map((user) => (
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: faker.internet.password(8),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
))


module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    return queryInterface.bulkInsert(options, users, {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, users, {});
  }
};