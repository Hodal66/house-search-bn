const ContactUs = require("../models/ContactUs");
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

const contactUsResolvers = {
  Query: {
    // All About Query ContactUsContent Contents
    getContactUsContent: async (_, { id }) => {
      try {
        return await ContactUs.findById(id); // get one information abaout contact us
      } catch (error) {
        throw new Error(
          "Error in Fetching the content of Contact us information, it may be deleted or moved!"
        );
      }
    },

    getContactUsContents: async () => {
      try {
        return await ContactUs.find(); // it will return All ContactUs information that are in the database
      } catch (error) {
        throw new Error(
          "Error In Fetching All Information related to the content of ContactUs data"
        );
      }
    },
  },

  Mutation: {
    // All About Mutation ContactUsContent Contents
    async addContactUsContent(parent, args, context) {
      try {
        const { input } = args;
        const { fullName, message, email } = input;
        const addContactUsContentToBeSaved = { fullName, message, email };
        const newContactUsContent = await ContactUs.create(addContactUsContentToBeSaved);

        // Send confirmation email to the user who contacted you
        await sendEmail(
          email,
          "Thank you for contacting us!",
          `Dear ${fullName},\n\nThank you for reaching out to us. We have received your message and will get back to you shortly.\n\nBest regards,\nYour Company Name`
        );

        // Send notification email to the admin
        await sendEmail(
          "hodalmuheto2@outlook.com",
          "New Contact Us Message Received",
          `A new message has been received from the Contact Us form:\n\nFull Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`
        );

        return newContactUsContent;
      } catch (error) {
        throw new Error("Error in inserting the information of ContactUs Content: " + error.message);
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
        throw new Error("Error in updating the information of ContactUs Content: " + error.message);
      }
    },

    deleteContactUsContent: async (_, { id }) => {
      try {
        await ContactUs.findByIdAndDelete(id);
        return `The content with Id: ${id} has been successfully deleted`;
      } catch (error) {
        throw new Error("Error in deleting the information of ContactUs Content: " + error.message);
      }
    },
  },
};

module.exports = contactUsResolvers;
