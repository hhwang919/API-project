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

const reviews = [
  {
    spotId: 19,
    userId: 1,
    review: 'Aspernatur nobis aliquam debitis dignissimos sit illum harum laboriosam. Rem dolores accusamus beatae velit voluptatem labore iste. Beatae qui dolorem minus eos quae eum quis. Ipsam repellendus quis officiis ut quos. Ratione quibusdam voluptatem placeat molestiae.',
    stars: 2
  },
  {
    spotId: 7,
    userId: 6,
    review: 'Maiores labore fugit eveniet inventore ipsam non reprehenderit magnam beatae. Ab corporis magni dolorem consectetur enim. Alias a laboriosam facere. Quos hic provident maiores quisquam minus soluta assumenda culpa.',
    stars: 1
  },
  {
    spotId: 1,
    userId: 6,
    review: 'Repellendus at eum natus laudantium. Assumenda sunt explicabo maxime corporis officia itaque explicabo veniam amet. Ducimus porro eveniet quas. Delectus distinctio illo perspiciatis fugiat. Praesentium eveniet totam non praesentium nam ab quae soluta distinctio.',
    stars: 3
  },
  {
    spotId: 14,
    userId: 3,
    review: 'Ad at autem voluptatum voluptatem itaque nam aperiam eum. Nesciunt perferendis nostrum non minima dolores assumenda. Commodi aperiam aliquam unde cupiditate quos quaerat. Quisquam expedita et repellendus. Perspiciatis magnam animi eos provident fugit. Laborum neque tempora corrupti illo nostrum.',
    stars: 5
  },
  {
    spotId: 18,
    userId: 10,
    review: 'Laudantium hic fugiat ullam eligendi temporibus perspiciatis. Ratione libero animi praesentium fugit molestiae. Nemo optio dignissimos ipsam. Velit optio molestias molestias ducimus asperiores. Animi eligendi dolorum natus reprehenderit corrupti sapiente.',
    stars: 5
  },
  {
    spotId: 10,
    userId: 5,
    review: 'Id recusandae est magnam excepturi. Cum maxime excepturi. Veniam odit totam consequuntur similique dolorum.',
    stars: 4
  },
  {
    spotId: 17,
    userId: 4,
    review: 'Similique fugit numquam necessitatibus praesentium reiciendis perferendis molestias laborum placeat. Possimus corporis reprehenderit eum inventore blanditiis ratione. Quis ea neque enim vitae. Molestiae exercitationem incidunt mollitia vel.',
    stars: 5
  },
  {
    spotId: 16,
    userId: 3,
    review: 'Est quos molestiae suscipit. Eligendi inventore molestiae numquam officia quisquam iusto. Est praesentium earum delectus cumque. Optio labore dolore ab provident culpa minus. Atque laborum quo recusandae provident non distinctio illum dolorum accusantium. Ex sequi vero quo nostrum.',
    stars: 1
  },
  {
    spotId: 19,
    userId: 3,
    review: 'Ullam voluptas perferendis est accusamus maxime pariatur laudantium iure repellendus. Illo distinctio amet veniam et ipsa magnam laboriosam hic ad. Placeat deserunt pariatur provident nisi voluptatum vitae. Voluptatibus libero repudiandae provident. Dolores quia possimus aut ipsum officia sapiente voluptatem adipisci veritatis.',
    stars: 3
  },
  {
    spotId: 1,
    userId: 8,
    review: 'A nemo sit voluptatum error quibusdam consectetur. Quasi optio reiciendis eos possimus nobis cum consectetur adipisci architecto. Nemo beatae neque excepturi velit voluptate veniam ipsa sit. Repellendus delectus eaque magni odit.',
    stars: 3
  },
  {
    spotId: 18,
    userId: 10,
    review: 'Veritatis minima possimus voluptatibus magni sed in minima eligendi illum. Omnis accusamus suscipit id. Rem possimus harum.',
    stars: 2
  },
  {
    spotId: 8,
    userId: 3,
    review: 'Ad in ad iusto quidem maiores atque commodi. Quidem facere fugit porro odit nam. Voluptatibus iure rerum dignissimos ipsum eligendi. Illum officiis vel veritatis quos modi molestias dolorem nihil. Accusamus consectetur consequatur blanditiis fuga molestias corrupti.',
    stars: 4
  },
  {
    spotId: 7,
    userId: 7,
    review: 'Quibusdam laudantium in impedit repudiandae natus odit sequi ducimus. Laborum ducimus alias ipsa maiores. Vero labore magni. Maxime quisquam culpa illum ea ipsam repellendus impedit sapiente. Suscipit tempora omnis laboriosam.',
    stars: 3
  },
  {
    spotId: 8,
    userId: 4,
    review: 'Distinctio animi doloribus natus id corporis reprehenderit doloremque. Blanditiis totam dolorum aliquam tempore adipisci commodi recusandae officia. Harum eveniet laboriosam dolorem eveniet assumenda temporibus odio.',
    stars: 3
  },
  {
    spotId: 12,
    userId: 3,
    review: 'Fugit vitae animi libero. Odit suscipit quos. Veniam perspiciatis est sit. Eaque velit numquam ad beatae voluptatibus temporibus vitae repudiandae cumque. Quae voluptas saepe aliquid explicabo inventore.',
    stars: 5
  },
  {
    spotId: 5,
    userId: 8,
    review: 'Delectus est tenetur adipisci amet. Odio quibusdam porro possimus eum. Pariatur quisquam hic sed. Accusamus doloribus eaque minus harum explicabo.',
    stars: 3
  },
  {
    spotId: 3,
    userId: 3,
    review: 'Reiciendis debitis fugit enim repellendus sed. Molestiae tenetur iusto placeat aspernatur. Amet tempora ad iure hic eos. Dignissimos exercitationem eius molestias at. Ipsam magnam dolorum architecto illo quibusdam vel. Ut cupiditate esse sed.',
    stars: 1
  },
  {
    spotId: 19,
    userId: 2,
    review: 'Voluptas nesciunt adipisci quidem. Eum dolor voluptas beatae nesciunt eum inventore facilis illum nulla. Sint nulla nam exercitationem nulla odit at. Ipsum asperiores temporibus cumque reiciendis fuga debitis vel nihil sit. Incidunt doloremque ratione culpa voluptates. Iusto nisi vitae sint inventore esse praesentium.',
    stars: 4
  },
  {
    spotId: 1,
    userId: 2,
    review: 'Sequi asperiores eos. Nesciunt inventore dicta saepe aliquam vero saepe ipsum. Fugiat ipsa consectetur. Libero expedita quae possimus.',
    stars: 4
  },
  {
    spotId: 3,
    userId: 1,
    review: 'Tenetur quaerat quam soluta libero. Ut soluta illo. Consectetur error tempora necessitatibus ipsa. Placeat exercitationem animi nesciunt in illum commodi deleniti explicabo. Amet consequatur impedit minus accusamus atque sapiente maiores labore enim. Excepturi deserunt vitae.',
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