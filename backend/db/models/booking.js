const moment = require('moment'); // require

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
        Booking.belongsTo(models.User, { foreignKey: 'userId' });
       
        Booking.belongsTo(models.Spot, { foreignKey: 'spotId' });
      
    }
  }
  Booking.init({
    spotId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER,
    startDate: {
      type: DataTypes.DATEONLY,
      validate: {
        isDate: true
      }
    },
endDate: {
   type: DataTypes.DATEONLY,
   validate: {
     isDate: true,
     startDateAfterEndDate() {
       const startDay = new Date(this.startDate);
       const endDay = new Date(this.endDate);
        if (endDay < startDay) {
    	      throw new Error('Start date must be before the end date.');
        }
      }
    }
}
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};