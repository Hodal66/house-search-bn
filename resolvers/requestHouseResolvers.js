const RequestedHouses = require("../models/RequestedHouses");


const requestHouseResolvers = {
  Query: {
    // All About Query RequestedHouse Contents
    getRequestedHouses: async () => {
      try {
        return await RequestedHouses.find();
      } catch (error) {
        throw new Error("Requested House data are not comming!");
      }
    },
    getRequestedHouse: async (_, { id }) => {
      try {
        return await RequestedHouses.findById(id);
      } catch (error) {
        throw new Error("Requested House data are not comming!");
      }
    }
  },
    // All About Query ContactUsContent Contents

  Mutation: {
    // All About Mutation RequestedHouse Contents

    async addRequestedHouse(parent, args, context) {
      try {
        const { input } = args;
        const {
          location,
          description,
          price,
          status,
          size,
          numberOfBeds,
          images_url,
          image_cover,
          clientInfo,
        } = input;
        const addRequestedHouseToBeSaved = {
          location,
          description,
          price,
          status,
          size,
          numberOfBeds,
          images_url,
          image_cover,
          clientInfo,
        };
        console.log(addRequestedHouseToBeSaved);
        return await RequestedHouses.create(addRequestedHouseToBeSaved);
        
      } catch (error) {
        throw new error("Error in Inserting the information of RequestedHouse");
      }
    },

    deleteRequestedHouse: async (_, { id }) => {
      try {
        await RequestedHouses.findByIdAndDelete(id);
        return "Requested House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
},
};

module.exports = requestHouseResolvers;
