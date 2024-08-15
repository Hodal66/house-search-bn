const MyHouse = require("../models/MyHouse");
// const nodemailer = require("nodemailer");

//configure nodemailer

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: "mhthodol@gmail.com",
//     pass: "Mhthodol@2024%",
//   },
// });

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
          user_id,
          request_id
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
          user_id,
          request_id
        };
        console.log(addMyHouseToBeSaved);
        const newHouse = await MyHouse.create(addMyHouseToBeSaved);
        // const mailOptions = {
        //   from: "mhthodol@gmail.com",
        //   to: "hodalmuheto@gmail.com",
        //   subject: "House Selection Confirmation",
        //   text: `Dear Client,\n\nYou have successfully selected a house located at ${location}. Here are the details:\n\nLocation: ${location}\nPrice: ${price}\nSize: ${size} sq ft\nNumber of Beds: ${numberOfBeds}\n\nThank you for choosing our services.\n\nBest regards,\nYour Company`,
        // };

        // await transporter.sendMail(mailOptions);
        return newHouse;
      } catch (error) {
        throw new Error("Error in Inserting the information of MyHouse");
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
