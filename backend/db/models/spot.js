const { Spot, User, sequelize, SpotImage, Review } = require('../../db/models');


'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    // static async createPost({ address, lat, lng, ownerId }) {
    //   const spot = await Spot.create({
    //    address,
    //    lat,
    //    lng,
    //    ownerId
    //   });
    //   return await User.findByPk(user.id);
    // }

    static associate(models) {
      // define association here
      Spot.hasMany(models.Booking,{foreignKey:'spotId', onDelete:'CASCADE',hooks:true});
      Spot.hasMany(models.SpotImage,{foreignKey:'spotId', onDelete:'CASCADE',hooks:true});
      Spot.hasMany(models.Review,{foreignKey:'spotId', onDelete:'CASCADE',hooks:true});
      Spot.belongsTo(models.User,{foreignKey:'ownerId'})
    }
  }



  
  Spot.init({
    ownerId: {
      type:DataTypes.INTEGER,
      references:{
        model: 'User'
      },
      // allowNull:false,
    },
    address: {
      type:DataTypes.STRING,
      allowNull:false,
    },
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: {
      type:DataTypes.DECIMAL,
    //   validate:{
    //   // max: 180,
    //   // min: -180/
    // },
      allowNull:false,
    },
    lng:  {type:DataTypes.DECIMAL,
  //   validate:{
  //   // max: 90,
  //   // min: -90
  // },
    allowNull:false,
  },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
  });
  return Spot;
};