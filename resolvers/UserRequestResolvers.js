const sendEmailProgrammatically = require("../EmailConfuguration");
const sendSMSProgramatically = require("../EmailConfuguration");
const UserRequest = require("../models/UserRequest");
const userRequestResolvers = {
  Query: {
    getAllUsersRequested: async (_, args, context) => {
      try {
        const AllUsersRequested = UserRequest.find();
        if (!AllUsersRequested) {
          return [
            {
              data: "No User Requests Available",
            },
          ];
        } else {
          return AllUsersRequested;
        }
      } catch (error) {
        throw new Error(
          "There Was Other Problems of Fetching UserRequests Data"
        );
      }
    },

    getOneUserRequest: async (_, args, context) => {
      try {
        const { id } = args;
        const returnedOneUserRequest = UserRequest.findById(id);
        if (!returnedOneUserRequest) {
          return null;
        } else {
          return returnedOneUserRequest;
        }
      } catch (error) {
        throw Error(
          "Please Check well there was an Error in fetching one Record",
          error.message
        );
      }
    },
    getAllUsersRequestedPopulated: async (_, args, context) => {
      try {
        const AllUsersRequestedPopulated = UserRequest.find().populate();
        if (!AllUsersRequestedPopulated) {
          return [
            {
              data: "No User Requests Available",
            },
          ];
        } else {
          return AllUsersRequestedPopulated;
        }
      } catch (error) {
        throw new Error(
          "There Was Other Problems of Fetching UserRequests Data"
        );
      }
    },
  },

  Mutation: {
    createUserRequest: async (_, args, context) => {
      const { input } = args;
      const { fullName, email, message, telephone, house_id, user_id } = input;
      const newUserRequestToBeSaved = {
        fullName,
        email,
        message,
        telephone,
        house_id,
        user_id,
      };
      const newUserRequestSaved = await UserRequest.create(
        newUserRequestToBeSaved
      );
      console.log("=========================================");
      const userRequestCreatedAndPopulated = await UserRequest.findOne({
        _id: newUserRequestSaved._id,
      })
        .populate({ path: "house_id", select: "price size location" })
        .populate({ path: "user_id", select: "fullName email" });

      console.log("INSIDE REQUEST POPULATED: UP");
      console.log(userRequestCreatedAndPopulated);
      console.log("INSIDE REQUEST POPULATED: DOWN");
    
      // newUserRequestSaved.email,
      // newUserRequestSaved.fullName,
      sendEmailProgrammatically(
        "mhthodol@gmail.com",
        "Muheto Hodal",
        "Welcome to the rentHouse!",
        `We value yourinterest your Email in the houses we have, soon we will reach out to you in person!`
      );
      // sendSMSProgramatically("+250782439775");


      if (newUserRequestSaved) {
        console.log("Data Was Successfully Saved:", newUserRequestSaved);
        return newUserRequestSaved;
      } else {
        console.log("Nooooo Wrong in Saving Data");
      }
    },

    deleteUserRequest: async (_, { id }) => {
      try {
        const isUserExistToBeDeleted = UserRequest.findById(id);
        if (isUserExistToBeDeleted) {
          await UserRequest.findByIdAndDelete(id);
          return "User Requested deleted successfully";
        } else return " the User Requested ID Is not valid";
      } catch (error) {
        throw new Error("Error deleting house");
      }
    },
  },
};

module.exports = userRequestResolvers;
