require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const { mergeResolvers, mergeTypeDefs } = require("@graphql-tools/merge");
const mongoose = require("mongoose");
const userSchema = require("./schema/userSchema");
const userResolvers = require("./resolvers/userResolvers");
const houseSchema = require("./schema/houseSchema");
const contactUsSchema = require("./schema/contactUsSchema");
const contactUsResolvers = require("./resolvers/contactUsResolvers");
const houseResolvers = require("./resolvers/houseResolvers");
const requestedHouseSchema = require("./schema/requestedHousesSchema");
const requestHouseResolvers = require("./resolvers/requestHouseResolvers");
const userRequestResolvers = require("./resolvers/UserRequestResolvers");
const userRequestSchema = require("./schema/userRequestsScheme");

const resolvers = mergeResolvers([
  contactUsResolvers,
  userResolvers,
  houseResolvers,
  requestHouseResolvers,
  userRequestResolvers
]);
const typeDefs = mergeTypeDefs([
  contactUsSchema,
  userSchema,
  houseSchema,
  requestedHouseSchema,
  userRequestSchema
]);

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("🌞💥💥💥🔥🔥🔥Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }

  server.listen().then(({ url }) => {
    console.log(`}{}{}==>>> Server is running on ${url}`);
  });
};

startServer();
