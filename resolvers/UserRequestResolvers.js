const UserRequest = require("../models/UserRequest");
const nodemailer = require("nodemailer");

// Configure nodemailer with Outlook
const transporter = nodemailer.createTransport({
  service: "hotmail", // Using "hotmail" for Outlook
  auth: {
    user: "hodalmuheto2@outlook.com",
    pass: "Mhthodol@2024%",
  },
});

// Function to send emails
const sendEmail = async (to, subject, text) => {
  const mailOptions = {
    from: "hodalmuheto2@outlook.com",
    to: to,
    subject: subject,
    text: text,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to", to);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const userRequestResolvers = {
  Query: {
    getAllUsersRequested: async (_, args, context) => {
      try {
        const AllUsersRequested = await UserRequest.find();
        if (!AllUsersRequested.length) {
          return [{ data: "No User Requests Available" }];
        }
        return AllUsersRequested;
      } catch (error) {
        throw new Error(
          "There Was Other Problems of Fetching UserRequests Data"
        );
      }
    },

    getOneUserRequest: async (_, args, context) => {
      try {
        const { id } = args;
        const returnedOneUserRequest = await UserRequest.findById(id);
        if (!returnedOneUserRequest) {
          return null;
        }
        return returnedOneUserRequest;
      } catch (error) {
        throw new Error(
          "Please Check well there was an Error in fetching one Record: " +
            error.message
        );
      }
    },

    getAllUsersRequestedPopulated: async (_, args, context) => {
      try {
        const AllUsersRequestedPopulated = await UserRequest.find()
          .populate({ path: "house_id", select: "price size location" })
          .populate({ path: "user_id", select: "fullName email" });
        if (!AllUsersRequestedPopulated.length) {
          return [{ data: "No User Requests Available" }];
        }
        return AllUsersRequestedPopulated;
      } catch (error) {
        throw new Error(
          "There Was Other Problems of Fetching UserRequests Data"
        );
      }
    },
  },

  Mutation: {
    createUserRequest: async (_, args, context) => {
      try {
        const { input } = args;
        const { fullName, email, message, telephone, house_id, user_id } =
          input;

        // Create a new user request
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

        // Populate the house and user details
        const userRequestCreatedAndPopulated = await UserRequest.findOne({
          _id: newUserRequestSaved._id,
        })
          .populate({ path: "house_id", select: "price size location" })
          .populate({ path: "user_id", select: "fullName email" });

        console.log("Populated User Request:", userRequestCreatedAndPopulated);

        // Check if house_id is populated correctly
        if (!userRequestCreatedAndPopulated.house_id) {
          console.log("house_id is not populated correctly");
          throw new Error("House details could not be populated.");
        }

        const houseDetails = `House Details:\nPrice: ${userRequestCreatedAndPopulated.house_id.price}\nSize: ${userRequestCreatedAndPopulated.house_id.size}\nLocation: ${userRequestCreatedAndPopulated.house_id.location}`;
        // Send notification email to the user
        await sendEmail(
          newUserRequestSaved.email,
          "Welcome to RentHouse!",
          `We value your interest in the houses we have. Soon, we will reach out to you in person!\n\nDetails:\nFull Name: ${fullName}\nTelephone: ${telephone}\n\n${houseDetails}`
        );

        // Send notification email to the admin
        await sendEmail(
          "hodalmuheto2@outlook.com",
          "New User Request Received",
          `A new user request has been received:\n\nFull Name: ${fullName}\nEmail: ${email}\nTelephone: ${telephone}\nMessage: ${message}\n\n${houseDetails}`
        );

        console.log("Data Was Successfully Saved:", newUserRequestSaved);
        return userRequestCreatedAndPopulated;
      } catch (error) {
        console.error("Error in Creating the User Request:", error.message);
        throw new Error("Error in Creating the User Request: " + error.message);
      }
    },

    deleteUserRequest: async (_, { id }) => {
      try {
        const isUserExistToBeDeleted = await UserRequest.findById(id);
        if (isUserExistToBeDeleted) {
          await UserRequest.findByIdAndDelete(id);
          return "User Request deleted successfully";
        } else {
          return "The User Request ID is not valid";
        }
      } catch (error) {
        throw new Error("Error deleting user request");
      }
    },
  },
};

module.exports = userRequestResolvers;
