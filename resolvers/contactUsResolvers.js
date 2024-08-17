const ContactUs = require("../models/ContactUs");


const contactUsResolvers = {
  Query: {
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
  },

  Mutation: {

    // All About Mutation ContactUsContent Contents
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
  },
};

module.exports = contactUsResolvers;
