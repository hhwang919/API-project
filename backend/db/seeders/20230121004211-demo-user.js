'use strict';
//const { faker } = require("@faker-js/faker");

//const bcrypt = require('bcryptjs');

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//const users = [...Array(10)].map((user) => (
//  {
//    username: faker.internet.userName(),
//    email: faker.internet.email(),
//    hashedPassword: bcrypt.hashSync('password'),
//    firstName: faker.name.firstName(),
//    lastName: faker.name.lastName()
//  }
//))

const users = [
  {
    username: 'demo123',
    email: 'demo@login.com',
    hashedPassword: '$2a$10$aC9P20noSo6JvOyIUYfiDOoGZY/S4vE.OYgNdDQJjh88rFo7IbChm',
    firstName: 'demo',
    lastName: 'name'
  },
  {
    username: 'Bret94',
    email: 'Quinten.Volkman@hotmail.com',
    hashedPassword: '$2a$10$pR3isbPZNXgc6OvT7UiPiOWijJrVv9CZedsTQY5yfYtKeKVCf6yRS',
    firstName: 'Misael',
    lastName: 'Kuphal'
  },
  {
    username: 'Marlen75',
    email: 'Carissa95@yahoo.com',
    hashedPassword: '$2a$10$FZfwmEdncqH91j9PlWNJaeOUlLHW0pjkNB8SuRNAFgfe.bMA9vnqO',
    firstName: 'Verner',
    lastName: 'Blick'
  },
  {
    username: 'Erick.Rau',
    email: 'Etha_Kuhn35@hotmail.com',
    hashedPassword: '$2a$10$cW7QuGXL51/OSpDBVZ1aWuSN.aMR7FhkEQFK/nt/JPT1ZxqFfaDEu',
    firstName: 'Tyrell',
    lastName: 'Stoltenberg'
  },
  {
    username: 'Sally_Heathcote',
    email: 'Alden92@gmail.com',
    hashedPassword: '$2a$10$YFwgFFHaOMvS9zy50ywCkeYM6TRCiEyfht6LdK0shKkYfcmZNnu0e',
    firstName: 'Orpha',
    lastName: 'Weimann'
  },
  {
    username: 'Melyssa_Murphy',
    email: 'Muhammad_Walsh69@gmail.com',
    hashedPassword: '$2a$10$fAIBi5AUcl/FudAKc6pvxuMojAVGZTdv.BA.TAHt4AnLv0c0vU5gu',
    firstName: 'Lyla',
    lastName: 'Wisoky'
  },
  {
    username: 'Clark.Weissnat2',
    email: 'Guiseppe.Bruen@hotmail.com',
    hashedPassword: '$2a$10$85IWCFvC8bpi1FcVCxqQQuHA6gi4UVMYAs4T2ePqtSaO8vpDSFrYy',
    firstName: 'Magdalen',
    lastName: 'Dietrich'
  },
  {
    username: 'Osbaldo31',
    email: 'Cleveland43@gmail.com',
    hashedPassword: '$2a$10$HV00Fg.fBtcpkMj/dxHlce7Qy1tZe3cEMtCFVE3eQcKMYy8HrxXCS',
    firstName: 'Rowan',
    lastName: 'Bartoletti'
  },
  {
    username: 'Andreane16',
    email: 'Rollin77@gmail.com',
    hashedPassword: '$2a$10$vNd.xFmT5a0Z3HGnoEjJfeDyqKkd8ArGP4iKQ5wFsk7zc.zToe.TW',
    firstName: 'Adolph',
    lastName: 'Lang'
  },
  {
    username: 'Keira53',
    email: 'Evans.Vandervort@hotmail.com',
    hashedPassword: '$2a$10$gRz8C5/zrNbXeX4GPYNMquMujmEdHWtVvm4trgtVsUh1nP1X3Q9AO',
    firstName: 'Verda',
    lastName: 'Bashirian'
  }
];

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