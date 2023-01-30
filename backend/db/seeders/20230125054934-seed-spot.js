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

const spots = [
{
  address: '732 Franey Lock',
  city: 'Silver Spring',
  state: 'Vermont',
  country: 'Djibouti',
  lat: '-81.3004358',
  lng: '75.5313327',
  name: "Archie O'Kon",
  description: 'Consequatur nesciunt sint fuga natus ipsum sit ipsam minima est.',
  price: '483.38',
  ownerId: 6
},
{
  address: '504 Wyatt Crest',
  city: 'Hampton',
  state: 'Florida',
  country: 'Colombia',
  lat: '63.5771247',
  lng: '104.5757216',
  name: 'Archie Parisian',
  description: 'Vitae praesentium veniam.',
  price: '624.39',
  ownerId: 4
},
{
  address: '6588 DuBuque Valley',
  city: 'South Isaiview',
  state: 'New Jersey',
  country: 'Israel',
  lat: '-14.9842022',
  lng: '-62.7070975',
  name: 'Shelley Schamberger',
  description: 'Pariatur odit repudiandae nobis perspiciatis animi optio.',
  price: '730.93',
  ownerId: 7
},
{
  address: '2484 Hauck Isle',
  city: 'Dublin',
  state: 'Tennessee',
  country: 'France',
  lat: '16.9107321',
  lng: '166.6806788',
  name: 'Vanessa Huels',
  description: 'At inventore iure natus iste rem.',
  price: '61.84',
  ownerId: 5
},
{
  address: '687 Griffin Summit',
  city: 'Brookline',
  state: 'Wisconsin',
  country: 'Yemen',
  lat: '-54.7284234',
  lng: '96.5523578',
  name: 'Bridget Rogahn',
  description: 'Sequi suscipit reiciendis aperiam quos.',
  price: '867.25',
  ownerId: 6
},
{
  address: '050 Elsa Haven',
  city: 'Lake Terrance',
  state: 'Indiana',
  country: 'Greenland',
  lat: '-36.5664608',
  lng: '-76.5673545',
  name: 'Terri Reilly',
  description: 'Aperiam ratione dignissimos vitae veniam necessitatibus quasi magnam harum.',
  price: '200.78',
  ownerId: 1
},
{
  address: '5038 Talon Bridge',
  city: 'New Bert',
  state: 'Missouri',
  country: 'Virgin Islands, British',
  lat: '-86.7872211',
  lng: '-0.6655354',
  name: 'Mrs. Carmen Bayer',
  description: 'Numquam impedit enim incidunt dolores doloribus adipisci cupiditate.',
  price: '693.13',
  ownerId: 8
},
{
  address: '996 Letha Cliffs',
  city: 'Abernathymouth',
  state: 'Rhode Island',
  country: 'Syrian Arab Republic',
  lat: '29.9861982',
  lng: '52.9130795',
  name: 'Maurice Hahn',
  description: 'Laborum eius mollitia doloremque sint sed.',
  price: '538.94',
  ownerId: 10
},
{
  address: '85588 Janae Stream',
  city: 'Lake Wilberborough',
  state: 'Louisiana',
  country: 'Kazakhstan',
  lat: '21.7411221',
  lng: '-176.0432537',
  name: 'Ana Pfannerstill',
  description: 'Mollitia voluptate magnam accusantium laborum adipisci.',
  price: '497.94',
  ownerId: 2
},
{
  address: '272 Maryse View',
  city: 'Oakland',
  state: 'Massachusetts',
  country: 'Mauritius',
  lat: '31.2931342',
  lng: '-164.8534809',
  name: 'Dr. Eric Mann',
  description: 'Reiciendis repudiandae nesciunt quasi quibusdam sunt facilis totam.',
  price: '449.81',
  ownerId: 1
},
{
  address: '838 Bernhard Land',
  city: 'Fort Amy',
  state: 'Maine',
  country: 'Venezuela',
  lat: '-60.5584677',
  lng: '-130.9858321',
  name: 'Diana Renner',
  description: 'Minima at ipsam illo minima ratione illum doloremque distinctio.',
  price: '564.54',
  ownerId: 10
},
{
  address: '606 Yadira Green',
  city: 'West Faeport',
  state: 'Massachusetts',
  country: 'Paraguay',
  lat: '-38.0908545',
  lng: '55.1803219',
  name: 'Jessie Trantow',
  description: 'Quasi eligendi saepe quibusdam incidunt molestias modi quia.',
  price: '229.04',
  ownerId: 2
},
{
  address: '1232 Mattie Rapids',
  city: 'South Orinmouth',
  state: 'Kansas',
  country: 'Finland',
  lat: '-58.2160721',
  lng: '33.5033591',
  name: 'Mamie Muller',
  description: 'Atque saepe aliquam illo eaque consequatur assumenda.',
  price: '209.48',
  ownerId: 10
},
{
  address: '19687 Braxton Corners',
  city: 'Port Savionmouth',
  state: 'Montana',
  country: 'Kyrgyz Republic',
  lat: '-62.8406921',
  lng: '-164.7551191',
  name: 'Dr. Lewis Rolfson',
  description: 'Corporis cumque delectus itaque doloremque nemo.',
  price: '312.52',
  ownerId: 4
},
{
  address: '2704 Tomas Crest',
  city: "O'Konmouth",
  state: 'Tennessee',
  country: 'Pitcairn Islands',
  lat: '-11.0051991',
  lng: '-50.2170026',
  name: 'Forrest Treutel',
  description: 'Impedit rerum dolores tempore exercitationem veritatis ratione.',
  price: '850.16',
  ownerId: 4
},
{
  address: '457 Padberg Rue',
  city: 'Wisozkshire',
  state: 'West Virginia',
  country: 'Libyan Arab Jamahiriya',
  lat: '33.2016345',
  lng: '102.8956123',
  name: 'Myron Braun',
  description: 'Iure dolores dolorem maiores distinctio corrupti quam excepturi maxime.',
  price: '738.66',
  ownerId: 9
},
{
  address: '620 Antonette Valley',
  city: 'North Kayleetown',
  state: 'Louisiana',
  country: 'Honduras',
  lat: '26.0571678',
  lng: '61.7808367',
  name: 'Kimberly Harvey',
  description: 'Vel pariatur enim.',
  price: '262.89',
  ownerId: 6
},
{
  address: '846 Catherine Burg',
  city: 'Jodymouth',
  state: 'Montana',
  country: 'Cook Islands',
  lat: '-30.7335246',
  lng: '-71.1057862',
  name: 'Lynne Douglas',
  description: 'Aliquid qui rem iste beatae doloremque unde.',
  price: '699.34',
  ownerId: 3
},
{
  address: '2385 Crystel Cape',
  city: 'East Rosemarystead',
  state: 'Pennsylvania',
  country: 'Paraguay',
  lat: '-66.5098101',
  lng: '-23.1611826',
  name: 'Pamela Conn',
  description: 'Itaque quasi neque eveniet dolor eveniet.',
  price: '73.47',
  ownerId: 9
},
{
  address: '0857 Audreanne Bridge',
  city: 'West Hartford',
  state: 'Rhode Island',
  country: 'Christmas Island',
  lat: '5.7979262',
  lng: '100.7286827',
  name: 'Dr. Janet Goodwin',
  description: 'Dignissimos earum ipsa soluta eos.',
  price: '232.47',
  ownerId: 7
}
];

console.log(spots)

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