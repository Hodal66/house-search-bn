const House = require('../models/House');
const Message = require('../models/Message');
const resolvers = {
  Query: {
    getHouses: async () => {
      try {
        return await House.find(); //find All Houses
      } catch (error) {
        throw new Error("Error fetching houses"); //When the Houses is not available
      }
    },
    getHouse: async (_, { id }) => {
      try {
        return await House.findById(id); //get one House by ID
      } catch (error) {
        throw new Error("Error fetching house"); //when the ID is not availlable
      }
    },
    getMessages: async () => {
      try {
        return await Message.find({}); //Fettching All Messages and display them
      } catch (error) {
        throw new Error("Error Fetching Messages");
      }
    },
    getMessage: async (_, { id }) => {
      try {
        return await Message.findById(id); // Fetch One Message in Different Messages using the ID
      } catch (error) {
        return Error("Error Fetching Message");
      }
    },
  },
  Mutation: {
    //Help us to create and insert into Mongoose database
    addHouse: async (_, args) => {
      try {
        const house = new House(args);
        return await house.save(); //save data into database
      } catch (error) {
        throw new Error("Error adding house");
      }
    },
    updateHouse: async (_, { id, ...args }) => {
      //This function help us to Update House database
      try {
        return await House.findByIdAndUpdate(id, args, { new: true }); //Find the house by id and update
      } catch (error) {
        throw new Error("Error updating house");
      }
    },
    deleteHouse: async (_, { id }) => {
      //This function help us to delete the House
      try {
        await House.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },

    //All about The Message From the User
    addMessage: async (_, args) => {
      try {
        const message = new Message(args);
        return await message.save();
      } catch (error) {
        return new Error("creating Message Error");
      }
    },
    updateMessage: async (_, { id, ...args }) => {
      try {
        return await Message.findByIdAndUpdate(id, args, { new: true });
      } catch (error) {
        return new Error("Error in Updating the Message Please Try again!!");
      }
    },
    deleteMessage: async (_, { id }) => {
      //This function help us to delete the House
      try {
        await House.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
  
  },
};

module.exports = resolvers;
