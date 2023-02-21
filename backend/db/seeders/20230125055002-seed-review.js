'use strict';
//const { faker } = require("@faker-js/faker");
// const { User } = require('../models');

let options = {};
if (process.env.NODE_ENV === 'production') {
 options.schema = process.env.SCHEMA; // define your schema in options object
}
options.tableName = "Reviews";

//const reviews = [...Array(20)].map((review) => (
  //{
    //spotId: faker.datatype.number({'min': 1, 'max': 20 }),
    //userId: faker.datatype.number({'min': 1, 'max': 10 }),
    //review: faker.lorem.paragraph(),
    //stars: faker.datatype.number({'min': 1, 'max': 5 })
  //}
//))

// KEEP 20 spotImages EVERY SPOT HAS IMAGE-- two digit spotId -10 to one digit
// id = 5 spotid= 8 -> 10  id =  spottid  ->   id =  spotid  ->  id =  spotid  -> 


const reviews = [
  {
    spotId: 6,
    userId: 1,
    review: 'When we first stumbled upon this flat on AirBnB, it seemed almost too good to be true. There must be a catch! But everything was as perfect as it seemed online.',
    stars: 2
  },
  {
    spotId: 7,
    userId: 6,
    review: 'Very tidy and lovely AirBnb apartment equipped with everything you need. A good bed and nice bathroom. App Academy is a great host and there when you need him, Very nice and wants to share all hé know about the area. We had a great stay.',
    stars: 1
  },
  {
    spotId: 1,
    userId: 6,
    review: 'The apartment was clean, comfortable, and in a great location. He communicates quickly and is very accommodating. Thanks again!',
    stars: 3
  },
  {
    spotId: 4,
    userId: 3,
    review: 'Tyrell was a great host and his home in Toronto was among the best Airbnb stays I have ever had.',
    stars: 5
  },
  {
    spotId: 10,
    userId: 10,
    review: 'We had an amazing time at Verner beautiful home and would love to visit again in the future.',
    stars: 5
  },
  {
    spotId: 10,
    userId: 5,
    review: 'When we first stumbled upon this flat on AirBnB, it seemed almost too good to be true. There must be a catch! But everything was as perfect as it seemed online.',
    stars: 4
  },
  {
    spotId: 7,
    userId: 4,
    review: 'If you are reading this, just book this amazing Airbnb. Every little detail is perfectly thought out and the space could not be more perfect. We are already planning our next trip back!',
    stars: 5
  },
  {
    spotId: 6,
    userId: 3,
    review: 'A very relaxing stay in a quiet and quaint neighborhood in Wisozkshire.',
    stars: 1
  },
  {
    spotId: 9,
    userId: 3,
    review: 'I really enjoyed my stay here and think it is a great way to enjoy East Rosemarystead from the comfort of a place that feels like home.',
    stars: 3
  },
  {
    spotId: 2,
    userId: 8,
    review: 'Great place in a great location with excellent views. Walking distance to tons of cool stuff and in a really great neighborhood.',
    stars: 3
  },
  {
    spotId: 8,
    userId: 10,
    review: 'Great apartment in a wonderful location for exploring Jodymouth. We appreciated the personal greeting and tips on how to spend our week.',
    stars: 2
  },
  {
    spotId: 8,
    userId: 3,
    review: 'This place is great! Easy to walk to good food and good coffee. Very cute. Very clean. It has everything you need for a trip to Syrian Arab Republic',
    stars: 4
  },
  {
    spotId: 7,
    userId: 7,
    review: 'Lovely apartment, really homely feel and beautiful touches. Rowan was quick to respond and helpful! Location was just out of the city centre in a very cosy area avoiding the main bustle. Thank you Rowan!',
    stars: 3
  },
  {
    spotId: 8,
    userId: 4,
    review: 'This is a retreat! Stunning home, has everything you will need, amazing hosts and a lot of privacy. Everything is close by if you know how to get there.',
    stars: 3
  },
  {
    spotId: 2,
    userId: 3,
    review: 'Misael was a fantastic host. He was very accommodating, helpful and friendly. He gave us some superb recommendations on where to eat, places to shop and sights to see.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 8,
    review: 'This apartment was located in an incredible part of town. I was literally walking distance to everything. It was just as pictured, very clean, and very private.',
    stars: 3
  },
  {
    spotId: 3,
    userId: 3,
    review: ' I had a wonderful time in South Isaiview! The apartment is beautifully furnished with particular attention to all the details for the best comfort.c eos. Dignissimos exercitationem eius molestias at.',
    stars: 1
  },
  {
    spotId: 9,
    userId: 2,
    review: 'We loved our stay! We felt very comfortable, safe, and it was very clean. The location was great, too. We just loved every minute of our visit.',
    stars: 4
  },
  {
    spotId: 1,
    userId: 2,
    review: 'A pleasure to host. Communicated well, warm and friendly, kept the place in great shape! We would welcome Cindi back anytime!',
    stars: 4
  },
  {
    spotId: 3,
    userId: 1,
    review: 'A beautiful and sunny place near enough facilities needed for a relaxing holiday. Safe, friendly place near a most beautiful church and plenty of restaurants and cafes.',
    stars: 3
  }
];

//console.log(reviews);

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