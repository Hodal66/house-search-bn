const { gql } = require("apollo-server");

const typeDefs = gql`
  # All About House Content Inputs and Types
  input HouseInput {
    location: String
    status: String
    price: Int!
    size: Int!
    description: String
    numberOfBeds: Int!
    images_url: [ImageToBeSaved!]
    date_created: String!
  }

  input ImageToBeSaved {
    url: String!
    filename: String!
  }
  type ImageToBeSavedReturned {
    url: String
    filename: String
  }

  type houseTobeReturned {
    id: ID!
    location: String
    status: String
    price: Int
    size: Int
    description: String
    numberOfBeds: Int
    images_url: [ImageToBeSavedReturned!]
  }

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
    id: ID!
    fullName: String!
    email: String!
    message: String!
  }
  # All About CMessage Inputs and Types
  input MessageInput {
    fullName: String!
    email: String!
    description: String!
    telephone: String!
  }
  input UpdateMessageInput {
    id: ID!
    fullName: String!
    email: String!
    description: String!
    telephone: String!
  }
  type MessageToBeReturned {
    id: ID!
    fullName: String
    email: String
    description: String
    telephone: String
  }
  # All About Users Inputs and Types
  input UserInput {
    id: ID!
    fullName: String!
    email: String!
    telephone: String!
    password: String!
  }

  type UserToBeReturned {
    id: ID!
    fullName: String
    email: String!
    telephone: String
    password: String
  }

  type AuthData {
    userId: ID!
    token: String!
    tokenExpiration: Int!
  }
  type Query {
    getHouses: [houseTobeReturned]
    getHouse(id: ID!): houseTobeReturned
    getContactUsContent(id: ID!): ContactUsTobeReturned
    getContactUsContents: [ContactUsTobeReturned]
    getMessages: [MessageToBeReturned]
    getMessage(id: ID!): MessageToBeReturned
    signIn(email: String!, password: String!): AuthData
  }

  type Mutation {
    # All Mutation About Houses
    addHouse(input: HouseInput): houseTobeReturned
    updateHouse(input: HouseInput): houseTobeReturned
    deleteHouse(id: ID!): String

    # Mutation About ContactUs
    addContactUsContent(input: AddContactUsInput): ContactUsTobeReturned
    updateContactUsContent(input: UpdateContactUsInput): ContactUsTobeReturned
    deleteContactUsContent(id: ID!): String

    # Mutation About Messages
    addMessage(input: MessageInput): MessageToBeReturned
    updateMessage(input: UpdateMessageInput): MessageToBeReturned
    deleteMessage(id: ID!): String

    # All Mutation About SignUp
    signUp(input: UserInput): UserToBeReturned
  }
`;
module.exports = typeDefs;
