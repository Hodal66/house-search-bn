const ContactUs = require("../models/ContactUs");
const House = require("../models/House");
const Message = require("../models/Message");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MyHouse = require("../models/MyHouse");

const resolvers = {
  Query: {
    // All About Query Houses Contents
    getHouses: async () => {
      try {
        return await House.find(); // find All Houses
      } catch (error) {
        throw new Error("Error fetching houses"); // When the Houses is not available
      }
    },
    getHouse: async (_, { id }) => {
      try {
        return await House.findById(id); // get one House by ID
      } catch (error) {
        throw new Error("Error fetching house"); // when the ID is not available
      }
    },

    // All About Query ContactUsContent Contents

    getContactUsContent: async (_, { id }) => {
      try {
        return await ContactUs.findById(id); // get one information abaout contact us
      } catch (error) {
        throw new Error(
          "Error in Fetching the content of Conte=act us information, may be deleted or moved here!"
        );
      }
    },

    getContactUsContents: async () => {
      try {
        return await ContactUs.find(); //it will return All Contactus information that are in the database
      } catch (error) {
        throw new Error(
          "Error In Fetching All Information related to Content of Contactus data"
        );
      }
    },
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

    // All About Query Messages Contents

    getMessages: async () => {
      try {
        return await Message.find({}); // Fetching All Messages and display them
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

    // All About Query SignIn Contents

    signIn: async (_, { email, password }) => {
      try {
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("User does not exist!");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if (!isEqual) {
          throw new Error("Password is incorrect!");
        }
        const token = jwt.sign(
          { userId: user.id, email: user.email },
          process.env.JWT_SECRET, // Use environment variable for the secret
          { expiresIn: "1h" }
        );
        return { userId: user.id, token, tokenExpiration: 1 };
      } catch (error) {
        throw new Error("Error signing in: " + error.message);
      }
    },
  },

  Mutation: {
    async addHouse(parent, args, context) {
      const { input } = args;
      const {
        location,
        status,
        price,
        size,
        description,
        numberOfBeds,
        images_url,
      } = input;
      const houseDataCapturedToBeSaved = {
        location,
        status,
        price,
        size,
        description,
        numberOfBeds,
        images_url,
      };
      //  return await House.create(houseDataCapturedToBeSaved);
      try {
        const newHouse = await House.create(houseDataCapturedToBeSaved);
        console.log("House created:", newHouse);
        return newHouse;
      } catch (error) {
        console.error("Error creating house:", error);
        throw new Error("Error adding house: " + error.message);
      }
    },

    // addHouse: async (
    //   _,
    //   {
    //     location,
    //     status,
    //     price,
    //     size,
    //     description,
    //     numberOfBeds,
    //     images_url
    //   }
    // ) => {
    //   try {
    //     const house = new House({
    //       location,
    //       status,
    //       price,
    //       size,
    //       description,
    //       numberOfBeds,
    //       images_url
    //     });
    //     return await house.save();
    //   } catch (error) {
    //     throw new Error("Error adding house");
    //   }
    // },

    // updateHouse: async (_, { house_id, ...args }) => {
    //   try {
    //     return await House.findByIdAndUpdate(house_id, ...args, { new: true }); // Find the house by id and update
    //   } catch (error) {
    //     throw new Error("Error updating house");
    //   }
    // },

    async updateHouse(parent, args, context) {
      const { input } = args;
      const {
        location,
        price,
        size,
        description,
        numberOfBeds,
        images_url,
        house_id,
      } = input;

      const houseDatacapturedToBeUpdated = {
        location,
        price,
        size,
        description,
        numberOfBeds,
        images_url,
      };

      const houseUpdatedData = await House.findByIdAndUpdate(
        house_id,
        houseDatacapturedToBeUpdated,
        { new: true }
      );
      return houseUpdatedData;
    },

    deleteHouse: async (_, { id }) => {
      try {
        await House.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
    // addContactUsContent: async (_, args) => {
    //   try {
    //     const newContactUsContent = new ContactUs(args);
    //     return await newContactUsContent.save();
    //   } catch (error) {
    //     throw new Error("Error in inserting Contact us Content");
    //   }
    // },

    async addContactUsContent(parent, args, context) {
      try {
        const { input } = args;
        const { fullName, message, email } = input;
        const addContactUsContentToBeSaved = { fullName, message, email };
        return await ContactUs.create(addContactUsContentToBeSaved);
      } catch (error) {
        throw new error(
          "Error in Inserting the information of ContactUs Content"
        );
      }
    },
    async updateContactUsContent(parent, args, context) {
      try {
        const { input } = args;
        const { id, fullName, email, message } = input;
        const ContactUsContentToBeUpdated = { fullName, email, message };
        return ContactUs.findByIdAndUpdate(id, ContactUsContentToBeUpdated, {
          new: true,
        });
      } catch (error) {
        throw new error(
          "Error in Updating the information of ContactUs Content"
        );
      }
    },
    deleteContactUsContent: async (_, { id }) => {
      try {
        ContactUs.findByIdAndDelete(id);
        return `The contet with Id : ${id} have been successfully deleted`;
      } catch (error) {
        throw new error(
          "Error in Deleting the information of ContactUs Content"
        );
      }
    },
    // All About Mutation MyHouse Contents

    async addMyHouse(parent, args, context) {
      try {
        const { input } = args;
        const { location,description} = input;
        const addMyHouseToBeSaved = { location, description};
        return await MyHouse.create(addMyHouseToBeSaved);
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
    // All About Mutation AddMessage Contents

    addMessage: async (_, args) => {
      try {
        const message = new Message(args);
        return await message.save();
      } catch (error) {
        return new Error("Error creating message");
      }
    },
    updateMessage: async (_, { id, ...args }) => {
      try {
        return await Message.findByIdAndUpdate(id, args, { new: true });
      } catch (error) {
        return new Error("Error updating message");
      }
    },
    deleteMessage: async (_, { id }) => {
      try {
        await Message.findByIdAndDelete(id);
        return "Message deleted successfully";
      } catch (error) {
        throw new Error("Error deleting message");
      }
    },

    // All About Mutation SignUp Contents

    signUp: async (_, { fullName, email, telephone, password }) => {
      try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          throw new Error("User already exists.");
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({
          fullName,
          email,
          telephone,
          password: hashedPassword,
          // Add email to the user object
        });
        const result = await user.save();
        return { ...result._doc, password: null, id: result.id };
      } catch (error) {
        throw new Error("Error signing up: " + error.message);
      }
    },
  },
};

module.exports = resolvers;
