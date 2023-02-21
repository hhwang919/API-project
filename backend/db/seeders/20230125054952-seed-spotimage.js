'use strict';
//const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "SpotImages";

//const spotImages = [...Array(30)].map((SpotImage) => (
//  {
//    spotId: faker.datatype.number({'min': 1, 'max': 20 }),
//    url: faker.internet.url(),
//    preview: faker.datatype.boolean()
//  }
//))
// KEEP 20 spotImages EVERY SPOT HAS IMAGE-- two digit spotId -10 to one digit
// id = 7 spotid= 1 -> 10  id = 14 spottid 7 -> 4  id = 1 spotid 7 -> 1 id = 2 spotid 1 -> 8

const spotImages = [
  { spotId: 1, url: 'https://fancy-icy.com', preview: true },
  { spotId: 8, url: 'https://ultimate-accent.info', preview: true },
  { spotId: 7, url: 'http://personal-corporation.org', preview: true },
  { spotId: 7, url: 'http://wide-eyed-hyphenation.info', preview: false},
  { spotId: 1, url: 'http://kind-journal.biz', preview: false },
  { spotId: 5, url: 'https://unrealistic-affidavit.org', preview: true},
  { spotId: 10, url: 'http://voluminous-characterization.com', preview: true},
  { spotId: 7, url: 'https://third-gene.name', preview: false },
  { spotId: 3, url: 'http://entire-river.info', preview: true },
  { spotId: 2, url: 'https://large-grouper.info', preview: true },
  { spotId: 5, url: 'http://unknown-kamikaze.org', preview: false },
  { spotId: 1, url: 'https://adolescent-fen.biz', preview: false },
  { spotId: 3, url: 'http://spry-swing.com', preview: false },
  { spotId: 4, url: 'https://dramatic-semantics.name', preview: true },
  { spotId: 3, url: 'http://electric-manacle.org', preview: false },
  { spotId: 9, url: 'http://lavish-lunge.com', preview: true },
  { spotId: 6, url: 'http://nervous-editor.org', preview: true },
  { spotId: 9, url: 'http://bare-consulate.name', preview: false },
  { spotId: 5, url: 'http://dependent-discourse.com', preview: false },
  { spotId: 6, url: 'http://organic-sanction.info', preview: false }
]


//console.log(spotImages)

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
      return queryInterface.bulkInsert(options, spotImages, {});
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
     return queryInterface.bulkDelete(options, spotImages, {});
  }
};