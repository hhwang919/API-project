'use strict';
//const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "SpotImages";

//const spotImages = [...Array(20)].map((SpotImage) => (
//  {
//    spotId: faker.datatype.number({'min': 1, 'max': 20 }),
//    url: faker.internet.url(),
//    preview: faker.datatype.boolean()
//  }
//))

const spotImages = [
  { spotId: 17, url: 'https://fancy-icy.com', preview: true },
  { spotId: 1, url: 'https://ultimate-accent.info', preview: false },
  { spotId: 17, url: 'http://personal-corporation.org', preview: true },
  { spotId: 17, url: 'http://wide-eyed-hyphenation.info', preview: false},
  { spotId: 11, url: 'http://kind-journal.biz', preview: true },
  { spotId: 15, url: 'https://unrealistic-affidavit.org', preview: true},
  { spotId: 11, url: 'http://voluminous-characterization.com', preview: false},
  { spotId: 7, url: 'https://third-gene.name', preview: false },
  { spotId: 13, url: 'http://entire-river.info', preview: false },
  { spotId: 12, url: 'https://large-grouper.info', preview: true },
  { spotId: 5, url: 'http://unknown-kamikaze.org', preview: false },
  { spotId: 1, url: 'https://adolescent-fen.biz', preview: true },
  { spotId: 13, url: 'http://spry-swing.com', preview: true },
  { spotId: 7, url: 'https://dramatic-semantics.name', preview: false },
  { spotId: 13, url: 'http://electric-manacle.org', preview: true },
  { spotId: 19, url: 'http://lavish-lunge.com', preview: false },
  { spotId: 16, url: 'http://nervous-editor.org', preview: true },
  { spotId: 19, url: 'http://bare-consulate.name', preview: true },
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