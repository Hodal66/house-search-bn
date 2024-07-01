const House = require('../models/House');

const resolvers = {
  Query: {
    getHouses: async () => {
      try {
        return await House.find();//find All Houses
      } catch (error) {
        throw new Error('Error fetching houses');//When the Houses is not available
      }
    },
    getHouse: async (_, { id }) => {
      try {
        return await House.findById(id);//get one House by ID
      } catch (error) {
        throw new Error('Error fetching house'); //when the ID is not availlable
      }
    },
  },
  Mutation: { //Help us to create and insert into Mongoose database
    addHouse: async (_, args) => {
      try {
        const house = new House(args);
        return await house.save(); //save data into database
      } catch (error) {
        throw new Error('Error adding house');
      }
    },
    updateHouse: async (_, { id, ...args }) => { //This function help us to Update House database
      try {
        return await House.findByIdAndUpdate(id, args, { new: true });//Find the house by id and update
      } catch (error) {
        throw new Error('Error updating house');
      }
    },
    deleteHouse: async (_, { id }) => { //This function help us to delete the House
      try {
        await House.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error('Error deleting house');
      }
    },
  },
};

module.exports = resolvers;
