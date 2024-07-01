require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const mongoose = require("mongoose");
const typeDefs = require("./schema/typeDefs.jsx");
const resolvers = require("./schema/resolvers.jsx");
const color =require('colors');

console.log(color.styles.blue);
const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    process.exit(1);
  }

  server.listen().then(({ url }) => {
    console.log(`Server is running on ${url}`);
  });
};

startServer();
