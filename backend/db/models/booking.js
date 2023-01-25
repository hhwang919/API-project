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
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true
      }
    },
endDate: {
   type: Sequelize.DATEONLY,
   validate: {
     isDate: true,
     startDateAfterEndDate() {
        if (this.startDate.isAfter(this.endDate)) {
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