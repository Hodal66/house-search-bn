const MyHouse = require("../models/MyHouse");
const nodemailer = require("nodemailer");

// Configure nodemailer with Outlook
const transporter = nodemailer.createTransport({
  service: "hotmail", // Using "hotmail" for Outlook
  auth: {
    user: "hodalmuheto2@outlook.com",
    pass: "Mhthodol@2024%",
  },
});

const sendNotificationEmail = async (house) => {
  const mailOptions = {
    from: "hodalmuheto2@outlook.com",
    to: "hodalmuheto@gmail.com",
    subject: "New House Added to the Listing",
    text: `A new house has been added to the listing:\n\nLocation: ${house.location}\nPrice: ${house.price}\nStatus: ${house.status}\nDescription: ${house.description}\n\nThank you!`,
  };

  try {
    // Send email to the receiver
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to receiver successfully");

    // Send a copy to the sender
    mailOptions.to = "hodalmuheto2@outlook.com";
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to sender successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const houseResolvers = {
  Query: {
    getMyHouses: async (_, { id }) => {
      console.log("coming from ID in the frontend")
      console.log(id)
      try {
        return await MyHouse.find();
      } catch (error) {
        throw new Error("Error fetching houses: " + error.message);
      }
    },

    getMyHouse: async (_, { id }) => {
      try {
        return await MyHouse.findById(id);
      } catch (error) {
        throw new Error("Error fetching house: " + error.message);
      }
    },

    getFilteredRentedHouses: async () => {
      try {
        return await MyHouse.find({ status: "rented" });
      } catch (error) {
        throw new Error("Error fetching rented houses: " + error.message);
      }
    },

    getFilteredUnRentedHouses: async () => {
      try {
        return await MyHouse.find({ status: "unRented" });
      } catch (error) {
        throw new Error("Error fetching unrented houses: " + error.message);
      }
    },

    getFilteredPendingHouses: async () => {
      try {
        return await MyHouse.find({ status: "pending" });
      } catch (error) {
        throw new Error("Error fetching pending houses: " + error.message);
      }
    },

    getFilteredByOwnerHouses: async (_, __, context) => {
      try {
        const filteredHouses = await MyHouse.find({ user_id: context.userId });
        return filteredHouses;
      } catch (error) {
        throw new Error("Error fetching houses by owner: " + error.message);
      }
    },
  },

  Mutation: {
    addMyHouse: async (_, { input }) => {
      try {
        console.log("looking into input coming from fronten to see if user id is coming!!!!")
        console.log(input.user_id);
        const newHouse = await MyHouse.create({
          ...input,
          status: "unRented", 
          // user_id:"6702fda6bfe8a2fcf193a973"// Automatically set the status to "unRented"
          // user_id: ["66c7cdcccb59836130c0047d"],Replace with actual user ID from context
        });

        // Send notification email after successfully adding a new house
        await sendNotificationEmail(newHouse);

        return newHouse;
      } catch (error) {
        throw new Error("Error adding house: " + error.message);
      }
    },

    deleteMyHouse: async (_, { id }) => {
      try {
        await MyHouse.findByIdAndDelete(id);
        return "House deleted successfully";
      } catch (error) {
        throw new Error("Error deleting house: " + error.message);
      }
    },
  },
};

module.exports = houseResolvers;
