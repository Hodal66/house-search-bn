const MyHouse = require("../models/MyHouse");

const houseResolvers = {
  Query: {
    // All About Query MyHouse Contents
    getMyHouses: async () => {
      try {
        return await MyHouse.find();
      } catch (error) {
        throw new Error("My House data are not comming!");
      }
    },
    getMyHouse: async (_, { id }) => {
      try {
        return await MyHouse.findById(id);
      } catch (error) {
        throw new Error("My House data are not comming!");
      }
    },
    getFilteredRentedHouses: async () => {
      try {
        return await MyHouse.find({ status: "rented" });
      } catch (error) {
        throw new Error("My Rented House data are not coming!");
      }
    },
    getFilteredUnRentedHouses: async () => {
      try {
        return await MyHouse.find({ status: "unRented" });
      } catch (error) {
        throw new Error("My Rented House data are not coming!");
      }
    },
    getFilteredPendingHouses: async () => {
      try {
        return await MyHouse.find({ status: "pending" });
      } catch (error) {
        throw new Error("My pending House data are not coming!");
      }
    },
  },
    // All About Query ContactUsContent Contents

  Mutation: {
    // All About Mutation MyHouse Contents

    async addMyHouse(parent, args, context) {
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
        } = input;
        const addMyHouseToBeSaved = {
          location,
          description,
          price,
          status,
          size,
          numberOfBeds,
          images_url,
          image_cover,
        };
        console.log(addMyHouseToBeSaved);
        return await MyHouse.create(addMyHouseToBeSaved);
        
        //  const myHouse = await MyHouse.create(addMyHouseToBeSaved);
        //  console.log("My House on Backend Side: ", myHouse);
        //  return myHouse;
      } catch (error) {
        throw new error("Error in Inserting the information of MyHouse");
      }
    },

    deleteMyHouse: async (_, { id }) => {
      try {
        await MyHouse.findByIdAndDelete(id);
        return "My House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
},
};

module.exports = houseResolvers;
