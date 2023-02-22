'use strict';
//const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Spots";

//const spots = [...Array(20)].map((spot) => (
//  {
//    address: faker.address.streetAddress(),
//    city: faker.address.city(),
//    state: faker.address.state(),
//    country: faker.address.country(),
//    lat: faker.address.latitude(),
//    lng: faker.address.longitude(),
//    name: faker.name.fullName(),  
//    description: faker.lorem.sentence(),
//    price: faker.finance.amount(),
//    ownerId: faker.datatype.number({
//      'min': 1,
//      'max': 10
//  })
//  }
//))

// reduce to 10 records, change ownerId=1 for id=1, ownerid=6, id=10

const spots = [
{
  address: '123 Disney Lane',
  city: 'San Francisco',
  state: 'California',
  country: 'United States of America',
  lat: 37.7645358,
  lng: -122.4730327,
  name: "App Academy",
  description: 'Place where web developers are created.',
  price: 123,
  ownerId: 1
},
{
  address: '504 Wyatt Crest',
  city: 'Hampton',
  state: 'Florida',
  country: 'United States of America',
  lat: 63.5771247,
  lng: 104.5757216,
  name: 'Archie Parisian',
  description: 'Vitae praesentium veniam.',
  price: 624.39,
  ownerId: 4
},
{
  address: '6588 DuBuque Valley',
  city: 'South Isaiview',
  state: 'New Jersey',
  country: 'United States of America',
  lat: -14.9842022,
  lng: -62.7070975,
  name: 'Shelley Schamberger',
  description: 'Pariatur odit repudiandae nobis perspiciatis animi optio.',
  price: 730.93,
  ownerId: 7
},
{
  address: '2484 Hauck Isle',
  city: 'Dublin',
  state: 'Tennessee',
  country: 'United States of America',
  lat: 16.9107321,
  lng: 166.6806788,
  name: 'Vanessa Huels',
  description: 'At inventore iure natus iste rem.',
  price: 61.84,
  ownerId: 5
},
{
  address: '687 Griffin Summit',
  city: 'Brookline',
  state: 'Wisconsin',
  country: 'United States of America',
  lat: -54.7284234,
  lng: 96.5523578,
  name: 'Bridget Rogahn',
  description: 'Sequi suscipit reiciendis aperiam quos.',
  price: 867.25,
  ownerId: 6
},
{
  address: '050 Elsa Haven',
  city: 'Lake Terrance',
  state: 'Indiana',
  country: 'United States of America',
  lat: -36.5664608,
  lng: -76.5673545,
  name: 'Terri Reilly',
  description: 'Aperiam ratione dignissimos vitae veniam necessitatibus quasi magnam harum.',
  price: 200.78,
  ownerId: 1
},
{
  address: '5038 Talon Bridge',
  city: 'New Bert',
  state: 'Missouri',
  country: 'United States of America',
  lat: -86.7872211,
  lng: -0.6655354,
  name: 'Mrs. Carmen Bayer',
  description: 'Numquam impedit enim incidunt dolores doloribus adipisci cupiditate.',
  price: 693.13,
  ownerId: 8
},
{
  address: '996 Letha Cliffs',
  city: 'Abernathymouth',
  state: 'Rhode Island',
  country: 'United States of America',
  lat: 29.9861982,
  lng: 52.9130795,
  name: 'Maurice Hahn',
  description: 'Laborum eius mollitia doloremque sint sed.',
  price: 538.94,
  ownerId: 10
},
{
  address: '85588 Janae Stream',
  city: 'Lake Wilberborough',
  state: 'Louisiana',
  country: 'United States of America',
  lat: 21.7411221,
  lng: -176.0432537,
  name: 'Ana Pfannerstill',
  description: 'Mollitia voluptate magnam accusantium laborum adipisci.',
  price: 497.94,
  ownerId: 2
},
{
  address: '272 Maryse View',
  city: 'Oakland',
  state: 'Massachusetts',
  country: 'United States of America',
  lat: 31.2931342,
  lng: -164.8534809,
  name: 'Dr. Eric Mann',
  description: 'Reiciendis repudiandae nesciunt quasi quibusdam sunt facilis totam.',
  price: 449.81,
  ownerId: 6
}
];

//console.log(spots)

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