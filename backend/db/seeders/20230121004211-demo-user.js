'use strict';
const { faker } = require("@faker-js/faker");

const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

const users = [...Array(10)].map((user) => (
  {
    username: faker.internet.userName(),
    email: faker.internet.email(),
    hashedPassword: bcrypt.hashSync('password'),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName()
  }
))
// console.log(users)   

module.exports = {
  up: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    let user = {
      username: 'demo123',
      email: 'demo@login.com',
      hashedPassword: bcrypt.hashSync('password'),
      firstName:'demo',
      lastName: 'name'
    }
    return queryInterface.bulkInsert(options, [user,...users], {});
  },

  down: async (queryInterface, Sequelize) => {
    options.tableName = 'Users';
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, users, {});
  }
};