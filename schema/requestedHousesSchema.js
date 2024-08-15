const { gql } = require("apollo-server");
const requestedHouseSchema = gql`
  # All Requested House Inputs and Types
  input AddRequestedHouseInput {
    location: String!
    description: String!
    status: String!
    price: Int!
    size: Int!
    numberOfBeds: Int!
    image_cover: [ImageToBeSaved!]
    images_url: [ImageToBeSaved!]
    clientInfo:[ClientInfoToBeSaved!]
  }
  type RequestedHouseInputTobeReturned {
    _id: ID
    location: String
    description: String
    status: String
    price: Int
    size: Int
    numberOfBeds: Int
    image_cover: [ImageToBeSavedReturned!]
    images_url: [ImageToBeSavedReturned!]
    clientInfo:[ClientInfoToBeSavedReturned!]
  }

  input ImageToBeSaved {
    url: String!
    filename: String!
  }
  type ImageToBeSavedReturned {
    url: String
    filename: String
  }
  input ClientInfoToBeSaved{
    fullName:String!
    email:String!
    message:String!
  }
  type ClientInfoToBeSavedReturned{
    fullName:String
    email:String
    message:String
  }
  # All About ContactUs Content Inputs and Types
  type Query {
    getRequestedHouse(id: ID!): RequestedHouseInputTobeReturned
    getRequestedHouses: [RequestedHouseInputTobeReturned]
  }

  type Mutation {
    # Mutation About RequestedHouse
    addRequestedHouse(input: AddRequestedHouseInput): RequestedHouseInputTobeReturned
    # updateRequestedHouse(input: UpdateRequestedHouseInput): RequestedHouseInputTobeReturned
    deleteRequestedHouse(id: ID!): String
  }
`;
module.exports = requestedHouseSchema;
