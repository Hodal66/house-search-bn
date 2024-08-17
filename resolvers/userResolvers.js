const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const userResolvers = {
  Query: {
    // All About Query SignIn Contents

    getAllUsers: async()=>{
      try {
        return await User.find({}); // Fetching All Messages and display them
      } catch (error) {
        throw new Error("Error Fetching Users");
      }
    },

  },

  Mutation: {
    // All About Mutation SignUp Contents
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

    signUp: async (_, args, context) => {
      try {
        const {input} = args;
        const { fullName, email, telephone, password, role} = input;
        console.log("You are trying to insert :" , input);
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
          role,
          // Add email to the user object
        });
        const result = await user.save();
        console.log("Saved Datas are:",result);
        return { ...result._doc, password: null, id: result.id };
      } catch (error) {
        throw new Error("Error signing up: " + error.message);
      }
    },
    deleteUser: async (_, { id }) => {
      try {
        await User.findByIdAndDelete(id);
        return `User with id: ${id} was deleted successfully`;
      } catch (error) {
        throw new Error("Error deleting User");
      }
    },
  },
};

module.exports = userResolvers;
