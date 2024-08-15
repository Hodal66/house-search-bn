const { gql } = require("apollo-server");
const houseSchema = gql`
  # All My House Inputs and Types
  input AddMyHouseInput {
    location: String!
    description: String!
    status: String!
    price: Int!
    size: Int!
    numberOfBeds: Int!
    image_cover: [ImageToBeSaved!]
    images_url: [ImageToBeSaved!]
    user_id:[ID]!
    request_id:[ID]!
  }

  type MyHouseInputTobeReturned {
    _id: ID
    location: String
    description: String
    status: String
    price: Int
    size: Int
    numberOfBeds: Int
    image_cover: [ImageToBeSavedReturned!]
    images_url: [ImageToBeSavedReturned!]
    user_id:[UserToBeReturned!]
    request_id:[userRequestCreatedPopulated!]
  }
  input UpdateMyHouseInput {
    _id: ID!
    location: String
    description: String
    status: String
    price: Int
    size: Int
    image_cover: String
    numberOfBeds: Int
  }
  input ImageToBeSaved {
    url: String!
    filename: String!
  }
  type ImageToBeSavedReturned {
    url: String
    filename: String
  }
  # All About ContactUs Content Inputs and Types
  type Query {
    getMyHouse(id: ID!): MyHouseInputTobeReturned
    getMyHouses: [MyHouseInputTobeReturned]
    getFilteredRentedHouses:[MyHouseInputTobeReturned]
    getFilteredUnRentedHouses:[MyHouseInputTobeReturned]
    getFilteredPendingHouses:[MyHouseInputTobeReturned]
  }

  type Mutation {
    # Mutation About MyHouse
    addMyHouse(input: AddMyHouseInput): MyHouseInputTobeReturned
    updateMyHouse(input: UpdateMyHouseInput): MyHouseInputTobeReturned
    deleteMyHouse(id: ID!): String
  }
`;
module.exports = houseSchema;
