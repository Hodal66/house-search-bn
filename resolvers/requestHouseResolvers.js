const RequestedHouses = require("../models/RequestedHouses");
const nodemailer = require("nodemailer");

// Configure nodemailer with Outlook
const transporter = nodemailer.createTransport({
  service: "hotmail", // Using "hotmail" for Outlook
  auth: {
    user: "hodalmuheto2@outlook.com",
    pass: "Mhthodol@2024%",
  },
});

const sendNotificationEmail = async (house, clientEmail) => {
  const mailOptions = {
    from: "hodalmuheto2@outlook.com",
    to: clientEmail, // Send to the client who requested the house
    subject: "Your House Request Has Been Received",
    text: `Thank you for requesting a house. Here are the details of your request:\n\nLocation: ${house.location}\nPrice: ${house.price}\nStatus: ${house.status}\nDescription: ${house.description}\n\nWe will contact you soon with more information.`,
  };

  try {
    // Send email to the client
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to client successfully");

    // Send a copy to the admin
    mailOptions.to = "hodalmuheto2@outlook.com";
    mailOptions.subject = "New House Request Received";
    mailOptions.text = `A new house request has been received:\n\nLocation: ${house.location}\nPrice: ${house.price}\nStatus: ${house.status}\nDescription: ${house.description}\n\nClient Info:\nName: ${house.clientInfo.name}\nEmail: ${house.clientInfo.email}\nPhone: ${house.clientInfo.phone}`;
    await transporter.sendMail(mailOptions);
    console.log("Notification email sent to admin successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

const requestHouseResolvers = {
  Query: {
    getRequestedHouses: async () => {
      try {
        return await RequestedHouses.find();
      } catch (error) {
        throw new Error("Requested House data are not coming!");
      }
    },

    getRequestedHouse: async (_, { id }) => {
      try {
        return await RequestedHouses.findById(id);
      } catch (error) {
        throw new Error("Requested House data are not coming!");
      }
    },
  },

  Mutation: {
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

        const newRequestedHouse = {
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

        const savedHouse = await RequestedHouses.create(newRequestedHouse);

        // Send notification email after successfully adding a requested house
        await sendNotificationEmail(savedHouse, clientInfo.email);

        return savedHouse;
      } catch (error) {
        throw new Error("Error in Inserting the information of RequestedHouse");
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
