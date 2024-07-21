const ContactUs = require("../models/ContactUs");
const House = require("../models/House");
const Message = require("../models/Message");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

    addHouse: async (
      _,
      {
        location,
        status,
        price,
        size,
        description,
        numberOfBeds,
        images_url
      }
    ) => {
      try {
        const house = new House({
          location,
          status,
          price,
          size,
          description,
          numberOfBeds,
          images_url
        });
        return await house.save();
      } catch (error) {
        throw new Error("Error adding house");
      }
    },
    updateHouse: async (_, { id, ...args }) => {
      try {
        return await House.findByIdAndUpdate(id, args, { new: true }); // Find the house by id and update
      } catch (error) {
        throw new Error("Error updating house");
      }
    },
    deleteHouse: async (_, { id }) => {
      try {
        await House.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
    addContactUsContent: async (_, args) => {
      try {
        const newContactUsContent = new ContactUs(args);
        return await newContactUsContent.save();
      } catch (error) {
        throw new Error("Error in inserting Contact us Content");
      }
    },

    updateContactUsContent: async (_, { id, ...args }) => {
      try {
        return ContactUs.findByIdAndUpdate(id, args, { new: true });
      } catch (error) {
        throw new Errow(
          "Error in Updating the information of ContactUs Content"
        );
      }
    },
    deleteContactUsContent: async (_, { id }) => {
      try {
        ContactUs.findByIdAndDelete(id);
        return `The contet with Id : ${id} have been successfully deleted`;
      } catch (error) {
        throw new Errow(
          "Error in Deleting the information of ContactUs Content"
        );
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
