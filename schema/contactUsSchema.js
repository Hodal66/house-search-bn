const { gql } = require("apollo-server");
const contactUsSchema = gql`
  # All About ContactUs Content Inputs and Types
  input AddContactUsInput {
    fullName: String!
    email: String!
    message: String!
  }
  input UpdateContactUsInput {
    id: ID!
    fullName: String
    email: String
    message: String
  }
  type ContactUsTobeReturned {
    id: ID
    fullName: String
    email: String
    message: String
  }

  type Query {
    getContactUsContent(id: ID!): ContactUsTobeReturned
    getContactUsContents: [ContactUsTobeReturned]
  }

  type Mutation {
    # Mutation About ContactUs
    addContactUsContent(input: AddContactUsInput): ContactUsTobeReturned
    updateContactUsContent(input: UpdateContactUsInput): ContactUsTobeReturned
    deleteContactUsContent(id: ID!): String

  }
`;
module.exports = contactUsSchema;
