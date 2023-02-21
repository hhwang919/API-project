'use strict';
//const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "ReviewImages";

//const reviewImages = [...Array(30)].map((reviewImage) => (
  //{
    //reviewId: faker.datatype.number({'min': 1, 'max': 20 }),
    //url: faker.internet.url()
  //}
//))
// Add 10 to make 30 so every revie hase image

const reviewImages = [
  { reviewId: 1, url: 'https://distant-camp.org' },
  { reviewId: 13, url: 'http://dependable-fondue.com' },
  { reviewId: 12, url: 'https://expert-tea.net' },
  { reviewId: 20, url: 'http://elderly-ranger.info' },
  { reviewId: 10, url: 'https://ideal-evocation.info' },
  { reviewId: 2, url: 'https://lawful-toilet.com' },
  { reviewId: 6, url: 'https://nervous-hovercraft.name' },
  { reviewId: 7, url: 'https://subtle-hassock.name' },
  { reviewId: 12, url: 'https://identical-influx.info' },
  { reviewId: 18, url: 'http://willing-jewel.name' },
  { reviewId: 10, url: 'http://unruly-shed.org' },
  { reviewId: 14, url: 'https://constant-fax.org' },
  { reviewId: 11, url: 'https://spiffy-garb.com' },
  { reviewId: 17, url: 'https://playful-keeper.net' },
  { reviewId: 17, url: 'https://pointed-scene.biz' },
  { reviewId: 14, url: 'https://old-priesthood.name' },
  { reviewId: 18, url: 'http://frequent-ship.com' },
  { reviewId: 5, url: 'https://grimy-timeout.net' },
  { reviewId: 8, url: 'https://imperfect-abbey.com' },
  { reviewId: 10, url: 'https://paltry-fur.biz' },
  { reviewId: 5, url: 'https://dimwitted-present.net'},
  { reviewId: 10, url: 'https://total-sardine.net'},
  { reviewId: 9, url: 'https://secret-engineering.info'},
  { reviewId: 3, url: 'http://costly-carnation.org'},
  { reviewId: 15, url: 'https://valuable-corporal.net'},
  { reviewId: 3, url: 'http://mushy-trapdoor.net'},
  { reviewId: 16, url: 'http://general-antler.net'},
  { reviewId: 1, url: 'http://dependable-scarf.name'},
  { reviewId: 4, url: 'http://mortified-terrarium.info'},
  { reviewId: 19, url: 'http://lively-blouse.com'}
];

//console.log(reviewImages);

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
      return queryInterface.bulkInsert(options, reviewImages, {});
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
     return queryInterface.bulkDelete(options, reviewImages, {});
  }
};